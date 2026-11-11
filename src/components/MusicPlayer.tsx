import { useEffect, useRef, useState } from "react"
import { Music, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

// Background music, coded in Strudel (https://strudel.cc) and loaded from a CDN at runtime.
// Browsers block sound until the visitor interacts with the page, so the track starts on load when the
// browser allows it, and otherwise on the first click, tap or key press. The mute choice is remembered.
const STRUDEL_SRC = "https://unpkg.com/@strudel/web@1.2.8/dist/index.js"

export const TUNE = `setcps(0.42)
stack(
  // bass: the slow "thinking" pulse
  note("<c3 ab2 f2 g2>").s("sawtooth").lpf(1400).gain(0.9).attack(0.05).release(0.6),
  // arpeggio: neurons firing
  note("<[c4 eb4 g4 bb4]*2 [ab3 c4 eb4 g4]*2 [f3 ab3 c4 eb4]*2 [g3 b3 d4 f4]*2>")
    .s("triangle").gain(0.75).delay(0.35).room(0.6),
  // high bell: a new fold forming
  note("<g5 ~ eb5 ~> ~ <c6 bb5> ~").s("sine").gain(0.5).room(0.8).slow(2),
  // hi-hat made of white noise
  s("white*8").gain("0.16 0.07").decay(0.04).sustain(0)
)`

type StrudelWindow = Window & {
  initStrudel?: () => Promise<unknown>
  evaluate?: (code: string) => Promise<unknown>
  hush?: () => void
}

const MUTE_KEY = "folding-music-muted"

function readMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === "1"
  } catch {
    return false
  }
}

function saveMuted(v: boolean) {
  try {
    localStorage.setItem(MUTE_KEY, v ? "1" : "0")
  } catch {
    /* storage unavailable: ignore */
  }
}

let loader: Promise<void> | null = null
function loadStrudel(): Promise<void> {
  if (loader) return loader
  loader = new Promise((resolve, reject) => {
    const el = document.createElement("script")
    el.src = STRUDEL_SRC
    el.async = true
    el.onload = async () => {
      try {
        await (window as StrudelWindow).initStrudel?.()
        resolve()
      } catch (e) {
        reject(e)
      }
    }
    el.onerror = reject
    document.head.appendChild(el)
  })
  return loader
}

export function MusicPlayer() {
  const [muted, setMuted] = useState(readMuted)
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(false)

  async function start() {
    if (playingRef.current) return
    playingRef.current = true
    try {
      await loadStrudel()
      await (window as StrudelWindow).evaluate?.(TUNE)
      setPlaying(true)
    } catch {
      playingRef.current = false
    }
  }

  function stop() {
    ;(window as StrudelWindow).hush?.()
    playingRef.current = false
    setPlaying(false)
  }

  useEffect(() => {
    if (muted) return
    loadStrudel().catch(() => {})
    const kick = () => {
      start()
      remove()
    }
    const events = ["pointerdown", "keydown", "touchstart"] as const
    const remove = () => events.forEach((e) => window.removeEventListener(e, kick))
    events.forEach((e) => window.addEventListener(e, kick, { once: true }))
    return remove
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted])

  function toggle(e: React.MouseEvent) {
    e.stopPropagation()
    if (playing) {
      stop()
      setMuted(true)
      saveMuted(true)
    } else {
      setMuted(false)
      saveMuted(false)
      start()
    }
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={toggle}
      className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg shadow-violet-500/20"
      aria-label={playing ? "Mute music" : "Play music"}
    >
      {playing ? <Music className="size-4 animate-pulse" /> : <VolumeX className="size-4" />}
      <span className="hidden sm:inline">{playing ? "Music on" : "Music off"}</span>
    </Button>
  )
}
