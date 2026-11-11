import { useEffect, useRef } from "react"
import {
  layout,
  layoutNextLine,
  prepareWithSegments,
  type LayoutCursor,
  type PreparedTextWithSegments,
} from "@chenglou/pretext"

// Live text flow around drifting, draggable "Coils" (the glowing ammonite from the story), one per friend,
// tied together by amber threads. Text layout is done by pretext (https://github.com/chenglou/pretext) with no
// DOM measurement: for every line we find where the coils block it, carve the free slots on both sides and fill
// each slot with the next piece of text. Inspired by pretext's "editorial engine" orbs demo (MIT).

type Interval = { left: number; right: number }
type Coil = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  baseR: number
  angle: number
  spin: number
  color: string
  label: string
}

const COILS = [
  { color: "#f5b041", label: "Ines · frontal lobe", baseR: 84, spin: 0.12 },
  { color: "#5ee7f2", label: "Dobri · temporal lobe", baseR: 70, spin: -0.09 },
  { color: "#b48cff", label: "Tavi · cerebellum", baseR: 62, spin: 0.16 },
]
const H_PAD = 14
const V_PAD = 4

// ---------- spiral artwork (computed once, unit coordinates -1..1) ----------
function buildSpiral() {
  const turns = 3.1
  const thetaMax = turns * Math.PI * 2
  const k = Math.log(1 / 0.46) / (Math.PI * 2) // each whorl is ~46% of the one outside it
  const r = (t: number) => 0.96 * Math.exp(k * (t - thetaMax))
  const pt = (t: number) => [r(t) * Math.cos(t), r(t) * Math.sin(t)] as const
  let outline = ""
  for (let t = 0; t <= thetaMax; t += 0.05) {
    const [x, y] = pt(t)
    outline += `${outline ? "L" : "M"}${x.toFixed(3)} ${y.toFixed(3)}`
  }
  let ribs = ""
  for (let t = Math.PI * 2; t <= thetaMax; t += Math.PI / 9) {
    const [x1, y1] = pt(t)
    const [x2, y2] = pt(t - Math.PI * 2)
    const mx = (x1 + x2) / 2 + Math.cos(t + 1.2) * 0.04
    const my = (y1 + y2) / 2 + Math.sin(t + 1.2) * 0.04
    ribs += `M${x1.toFixed(3)} ${y1.toFixed(3)}Q${mx.toFixed(3)} ${my.toFixed(3)} ${x2.toFixed(3)} ${y2.toFixed(3)}`
  }
  return { outline, ribs }
}
const SPIRAL = buildSpiral()

// ---------- geometry helpers ----------
function circleInterval(c: Coil, top: number, bottom: number): Interval | null {
  const t = top - V_PAD
  const b = bottom + V_PAD
  if (t >= c.y + c.r || b <= c.y - c.r) return null
  const minDy = c.y >= t && c.y <= b ? 0 : c.y < t ? t - c.y : c.y - b
  if (minDy >= c.r) return null
  const dx = Math.sqrt(c.r * c.r - minDy * minDy)
  return { left: c.x - dx - H_PAD, right: c.x + dx + H_PAD }
}

// from pretext/pages/demos/wrap-geometry.ts (MIT)
function carveSlots(base: Interval, blocked: Interval[], minWidth: number): Interval[] {
  let slots: Interval[] = [base]
  for (const iv of blocked) {
    const next: Interval[] = []
    for (const s of slots) {
      if (iv.right <= s.left || iv.left >= s.right) {
        next.push(s)
        continue
      }
      if (iv.left > s.left) next.push({ left: s.left, right: iv.left })
      if (iv.right < s.right) next.push({ left: iv.right, right: s.right })
    }
    slots = next
  }
  return slots.filter((s) => s.right - s.left >= minWidth)
}

export function CoilField({ text }: { text: string }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const coilRefs = useRef<(HTMLDivElement | null)[]>([])
  const threadRefs = useRef<(SVGPathElement | null)[]>([])

  useEffect(() => {
    const box = boxRef.current!
    const linesEl = linesRef.current!
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // one prepared handle per paragraph, so every paragraph starts on a fresh row after a small gap
    const paragraphs = text.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean)
    let prepared: PreparedTextWithSegments[] | null = null
    let font = ""
    let minSlot = 90
    let gap = 12
    let lineH = 32
    let W = box.clientWidth
    let H = 600
    let pad = 24
    let raf = 0
    let visible = true
    let disposed = false
    let last = performance.now()
    let time = 0
    const pool: HTMLDivElement[] = []

    const coils: Coil[] = COILS.map((c, i) => ({
      ...c,
      r: c.baseR,
      x: 0,
      y: 0,
      vx: reduced ? 0 : [22, -18, 15][i]!,
      vy: reduced ? 0 : [12, 16, -20][i]!,
      angle: i * 1.7,
      spin: reduced ? 0 : c.spin,
    }))

    function sizeUp() {
      W = box.clientWidth
      const narrow = W < 640
      const fontPx = narrow ? 16 : 19
      lineH = narrow ? 27 : 32
      pad = narrow ? 16 : 28
      minSlot = narrow ? 80 : 110
      gap = Math.round(lineH * 0.45)
      const nextFont = `400 ${fontPx}px Literata`
      if (nextFont !== font || !prepared) {
        font = nextFont
        prepared = paragraphs.map((t) => prepareWithSegments(t, font))
        linesEl.style.font = `${font}`
        linesEl.style.lineHeight = `${lineH}px`
      }
      const scale = narrow ? 0.62 : 1
      coils.forEach((c) => (c.r = c.baseR * scale))
      // room for the text plus the space the coils take away
      const textW = Math.max(100, W - pad * 2)
      const plain = prepared.reduce((s, p) => s + layout(p, textW, lineH).height, 0) + gap * (prepared.length - 1)
      // each coil also wastes the short slivers next to it, so count a wider band than its own area
      const coilArea = coils.reduce((s, c) => s + 2 * (c.r + H_PAD) * (2 * c.r + minSlot * 0.6), 0)
      H = Math.ceil(plain + coilArea / textW + lineH + pad * 2)
      box.style.height = `${H}px`
      coils.forEach((c, i) => {
        if (c.x === 0 && c.y === 0) {
          c.x = W * [0.22, 0.7, 0.5][i]!
          c.y = H * [0.3, 0.55, 0.82][i]!
        }
        c.x = Math.min(Math.max(c.x, c.r), W - c.r)
        c.y = Math.min(Math.max(c.y, c.r), H - c.r)
      })
    }

    function lineDiv(i: number) {
      let el = pool[i]
      if (!el) {
        el = document.createElement("div")
        el.className = "coil-line"
        linesEl.appendChild(el)
        pool[i] = el
      }
      return el
    }

    function flow() {
      if (!prepared) return
      let para = 0
      let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
      let y = pad
      let n = 0
      while (para < prepared.length && y + lineH <= H - pad) {
        const blocked: Interval[] = []
        for (const c of coils) {
          const iv = circleInterval(c, y, y + lineH)
          if (iv) blocked.push(iv)
        }
        const slots = carveSlots({ left: pad, right: W - pad }, blocked, minSlot).sort((a, b) => a.left - b.left)
        let paraEnded = false
        for (const s of slots) {
          const line = layoutNextLine(prepared[para]!, s.right - s.left, cursor)
          if (line === null) {
            paraEnded = true
            break
          }
          const el = lineDiv(n++)
          if (el.textContent !== line.text) el.textContent = line.text
          el.style.transform = `translate(${Math.round(s.left)}px, ${Math.round(y)}px)`
          el.style.display = ""
          cursor = line.end
        }
        // if the paragraph just ran out on this row, move to the next one with a gap
        if (!paraEnded && layoutNextLine(prepared[para]!, W, cursor) === null) paraEnded = true
        y += lineH
        if (paraEnded) {
          para++
          cursor = { segmentIndex: 0, graphemeIndex: 0 }
          y += gap
        }
      }
      for (let i = n; i < pool.length; i++) pool[i]!.style.display = "none"
      // text didn't fit with the coils where they are now: grow the box (never shrinks while moving)
      if (para < prepared.length) {
        H += lineH * 2
        box.style.height = `${H}px`
      }
    }

    function paint() {
      coils.forEach((c, i) => {
        const el = coilRefs.current[i]
        if (el) {
          el.style.width = el.style.height = `${c.r * 2}px`
          el.style.transform = `translate(${c.x - c.r}px, ${c.y - c.r}px) rotate(${c.angle}rad)`
        }
      })
      for (let i = 0; i < coils.length; i++) {
        const a = coils[i]!
        const b = coils[(i + 1) % coils.length]!
        const mx = (a.x + b.x) / 2 + Math.sin(time * 0.9 + i * 2) * 36
        const my = (a.y + b.y) / 2 + Math.cos(time * 0.7 + i) * 36
        threadRefs.current[i]?.setAttribute("d", `M${a.x} ${a.y}Q${mx} ${my} ${b.x} ${b.y}`)
      }
      flow()
    }

    // ---------- dragging ----------
    let drag: { coil: Coil; dx: number; dy: number; lastX: number; lastY: number; lastT: number } | null = null
    const local = (e: PointerEvent) => {
      const r = box.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const hit = (x: number, y: number) =>
      [...coils].reverse().find((c) => (x - c.x) ** 2 + (y - c.y) ** 2 <= c.r * c.r) ?? null

    function onDown(e: PointerEvent) {
      const p = local(e)
      const c = hit(p.x, p.y)
      if (!c) return
      e.preventDefault()
      box.setPointerCapture(e.pointerId)
      drag = { coil: c, dx: p.x - c.x, dy: p.y - c.y, lastX: p.x, lastY: p.y, lastT: performance.now() }
      box.style.cursor = "grabbing"
    }
    function onMove(e: PointerEvent) {
      const p = local(e)
      if (!drag) {
        box.style.cursor = hit(p.x, p.y) ? "grab" : ""
        return
      }
      const c = drag.coil
      const now = performance.now()
      const dt = Math.max(1, now - drag.lastT) / 1000
      c.x = Math.min(Math.max(p.x - drag.dx, c.r), W - c.r)
      c.y = Math.min(Math.max(p.y - drag.dy, c.r), H - c.r)
      c.vx = reduced ? 0 : Math.max(-400, Math.min(400, (p.x - drag.lastX) / dt))
      c.vy = reduced ? 0 : Math.max(-400, Math.min(400, (p.y - drag.lastY) / dt))
      drag.lastX = p.x
      drag.lastY = p.y
      drag.lastT = now
      if (reduced) paint()
    }
    function onUp(e: PointerEvent) {
      if (!drag) return
      box.releasePointerCapture(e.pointerId)
      drag = null
      box.style.cursor = ""
    }

    // ---------- animation ----------
    function step(now: number) {
      raf = 0
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      time += dt
      for (const c of coils) {
        if (drag?.coil === c) continue
        c.x += c.vx * dt
        c.y += c.vy * dt
        if (c.x < c.r || c.x > W - c.r) {
          c.vx *= -1
          c.x = Math.min(Math.max(c.x, c.r), W - c.r)
        }
        if (c.y < c.r || c.y > H - c.r) {
          c.vy *= -1
          c.y = Math.min(Math.max(c.y, c.r), H - c.r)
        }
        // flung coils slow back down to a calm drift
        const speed = Math.hypot(c.vx, c.vy)
        if (speed > 30) {
          c.vx *= 0.985
          c.vy *= 0.985
        }
        c.angle += c.spin * dt
      }
      // coils bounce off each other instead of overlapping
      for (let i = 0; i < coils.length; i++) {
        for (let j = i + 1; j < coils.length; j++) {
          const a = coils[i]!
          const b = coils[j]!
          const dx = b.x - a.x
          const dy = b.y - a.y
          const d = Math.hypot(dx, dy) || 1
          const overlap = a.r + b.r + 6 - d
          if (overlap <= 0) continue
          const nx = dx / d
          const ny = dy / d
          const aFixed = drag?.coil === a
          const bFixed = drag?.coil === b
          const share = aFixed || bFixed ? 1 : 0.5
          if (!aFixed) {
            a.x -= nx * overlap * share
            a.y -= ny * overlap * share
          }
          if (!bFixed) {
            b.x += nx * overlap * share
            b.y += ny * overlap * share
          }
          const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny
          if (rel < 0) {
            if (!aFixed) {
              a.vx += rel * nx
              a.vy += rel * ny
            }
            if (!bFixed) {
              b.vx -= rel * nx
              b.vy -= rel * ny
            }
          }
          for (const c of [a, b]) {
            c.x = Math.min(Math.max(c.x, c.r), W - c.r)
            c.y = Math.min(Math.max(c.y, c.r), H - c.r)
          }
        }
      }
      paint()
      if (visible && !reduced && !disposed) raf = requestAnimationFrame(step)
    }
    const kick = () => {
      if (!raf && !reduced && !disposed) {
        last = performance.now()
        raf = requestAnimationFrame(step)
      }
    }

    const ro = new ResizeObserver(() => {
      sizeUp()
      paint()
    })
    const io = new IntersectionObserver(([entry]) => {
      visible = entry!.isIntersecting
      if (visible) kick()
    })

    document.fonts.load(`400 19px Literata`).finally(() => {
      if (disposed) return
      sizeUp()
      paint()
      ro.observe(box)
      io.observe(box)
      kick()
    })
    box.addEventListener("pointerdown", onDown)
    box.addEventListener("pointermove", onMove)
    box.addEventListener("pointerup", onUp)
    box.addEventListener("pointercancel", onUp)
    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      box.removeEventListener("pointerdown", onDown)
      box.removeEventListener("pointermove", onMove)
      box.removeEventListener("pointerup", onUp)
      box.removeEventListener("pointercancel", onUp)
      linesEl.replaceChildren()
    }
  }, [text])

  return (
    <div
      ref={boxRef}
      className="coil-field relative w-full touch-pan-y overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-card/60 to-background"
      style={{ height: 600 }}
    >
      <p className="sr-only">{text}</p>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        {COILS.map((_, i) => (
          <path
            key={i}
            ref={(el) => {
              threadRefs.current[i] = el
            }}
            fill="none"
            stroke="#f5b041"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="2 6"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div ref={linesRef} className="coil-lines absolute inset-0" aria-hidden />
      {COILS.map((c, i) => (
        <div
          key={c.label}
          ref={(el) => {
            coilRefs.current[i] = el
          }}
          className="coil pointer-events-none absolute left-0 top-0"
          style={{ color: c.color, filter: `drop-shadow(0 0 14px ${c.color}88)` }}
          title={c.label}
          aria-hidden
        >
          <svg viewBox="-1 -1 2 2" className="h-full w-full overflow-visible">
            <circle r="0.98" fill="currentColor" fillOpacity="0.07" />
            <path d={SPIRAL.ribs} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="0.018" />
            <path d={SPIRAL.outline} fill="none" stroke="currentColor" strokeWidth="0.035" strokeLinecap="round" />
          </svg>
        </div>
      ))}
    </div>
  )
}
