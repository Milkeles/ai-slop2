import { Fragment } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Layout } from "@/components/Layout"
import { Markdown } from "@/components/Markdown"
import { Figure } from "@/components/Figure"
import { ModelViewer } from "@/components/ModelViewer"
import { SafeImage } from "@/components/SafeImage"
import { imageCaptions } from "@/data/story"
import { readingMinutes, wordCount } from "@/lib/text"

type Link = { href: string; label: string }

type Chunk = { kind: "text"; body: string } | { kind: "img"; name: string } | { kind: "model"; name: string }

function splitStory(md: string): { title: string; chunks: Chunk[] } {
  const lines = md.replace(/\r\n/g, "\n").split("\n")
  let title = ""
  const first = lines.findIndex((l) => l.trim() !== "")
  if (first >= 0 && /^#\s+/.test(lines[first])) {
    title = lines[first].replace(/^#\s+/, "").trim()
    lines.splice(first, 1)
  }
  const chunks: Chunk[] = []
  let buf: string[] = []
  const flush = () => {
    const body = buf.join("\n").trim()
    if (body) chunks.push({ kind: "text", body })
    buf = []
  }
  for (const line of lines) {
    const m = line.trim().match(/^\[\[(img|model):([\w-]+)\]\]$/)
    if (m) {
      flush()
      chunks.push(m[1] === "img" ? { kind: "img", name: m[2] } : { kind: "model", name: m[2] })
    } else buf.push(line)
  }
  flush()
  return { title, chunks }
}

export function StoryPage({ md, current, hero, prev, next }: { md: string; current: string; hero: string; prev: Link; next: Link }) {
  const { title, chunks } = splitStory(md)
  const [num, name] = title.includes("—") ? title.split("—").map((s) => s.trim()) : [title, ""]
  const words = wordCount(md)
  let firstText = true
  return (
    <Layout current={current} progress>
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60">
          <SafeImage name={hero} alt={imageCaptions[hero]?.alt ?? ""} eager className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-24 text-center sm:pt-32">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-cyan-glow">{num}</p>
          <h1 className="glow-text mt-3 text-4xl font-semibold sm:text-6xl">{name || num}</h1>
          <div className="mt-5 flex justify-center gap-2">
            <Badge variant="secondary">{words.toLocaleString("en")} words</Badge>
            <Badge variant="outline">~{readingMinutes(words)} min read</Badge>
          </div>
        </div>
      </header>

      <article className="px-4">
        {chunks.map((c, i) => {
          if (c.kind === "img") return <Figure key={i} name={c.name} />
          if (c.kind === "model") return <ModelViewer key={i} name={c.name} />
          const cls = "prose-story" + (firstText ? " dropcap" : "")
          firstText = false
          return (
            <Fragment key={i}>
              <Markdown className={cls}>{c.body}</Markdown>
            </Fragment>
          )
        })}
      </article>

      <nav aria-label="Chapter" className="mx-auto mt-16 flex max-w-3xl flex-wrap justify-between gap-3 px-4">
        <Button asChild variant="outline" size="lg">
          <a href={prev.href}>
            <ArrowLeft /> {prev.label}
          </a>
        </Button>
        <Button asChild size="lg">
          <a href={next.href}>
            {next.label} <ArrowRight />
          </a>
        </Button>
      </nav>
    </Layout>
  )
}
