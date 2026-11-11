import { ArrowRight, BookOpen, Clapperboard, MapPin, Users } from "lucide-react"
import p1 from "../../story/part1.md?raw"
import p2 from "../../story/part2.md?raw"
import p3 from "../../story/part3.md?raw"
import { Layout } from "@/components/Layout"
import { SafeImage } from "@/components/SafeImage"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SITE, imageCaptions, parts } from "@/data/story"
import { wordCount } from "@/lib/text"
import { CoilField } from "@/components/CoilField"

const mds = [p1, p2, p3]

const WORLD_INTRO =
  "Above the small town of Limeburn sits Cutter's Bowl, a flooded limestone quarry that only gives up its secrets in a drought. This August the water is the lowest since 1979, and on a newly bare ledge lies the Coil: an ammonite fossil whose spiral glows faintly. Every time a friend presses a palm to it, a new fold grows in their brain, and with it a power: seeing seconds ahead, hearing the echoes of old words, perfect balance, light that looks solid. Nobody tells them where the folds come from, or who is paying."

// The opening of Part I (story text only: no headings, image markers or pull quotes), about 220 words.
function opening(md: string, maxWords = 220) {
  const out: string[] = []
  let n = 0
  for (const para of md.split(/\n\s*\n/)) {
    const t = para.trim()
    if (!t || t.startsWith("#") || t.startsWith("[[") || t.startsWith(">")) continue
    out.push(t)
    n += t.split(/\s+/).length
    if (n >= maxWords) break
  }
  return out.join("\n\n") + " …"
}

const WORLD_TEXT = `${WORLD_INTRO}\n\nFROM PART I\n\n${opening(p1)}`

const extras = [
  { href: "characters.html", title: "Characters", text: "Ines, Dobri, Tavi and the keeper of the Weighhouse.", icon: Users },
  { href: "locations.html", title: "Locations", text: "Cutter's Bowl, the Weighhouse and the Fold.", icon: MapPin },
  { href: "making-of.html", title: "Making-of", text: "How an AI team wrote, drew and built this story.", icon: Clapperboard },
]

export default function Home() {
  return (
    <Layout current="index.html">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SafeImage name="cover" alt={imageCaptions.cover.alt} eager className="h-full w-full object-cover opacity-70" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div className="mx-auto flex min-h-[78vh] max-w-4xl flex-col items-center justify-end px-4 pb-16 pt-28 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-glow">A story in three parts</p>
          <h1 className="glow-text mt-4 text-5xl font-semibold sm:text-7xl">The Folding</h1>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-foreground/90 sm:text-xl">{SITE.logline}</p>
          <Button asChild size="lg" className="mt-8 shadow-lg shadow-primary/30">
            <a href="part1.html">
              <BookOpen /> Begin reading
            </a>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12" aria-labelledby="world">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <h2 id="world" className="text-2xl font-semibold text-amber-glow">The world</h2>
          <p className="font-sans text-xs text-muted-foreground">
            Drag the coils. The text reflows around them live, laid out by{" "}
            <a className="underline underline-offset-2 hover:text-foreground" href="https://github.com/chenglou/pretext">pretext</a>.
          </p>
        </div>
        <CoilField text={WORLD_TEXT} />
      </section>

      <section className="mx-auto max-w-6xl px-4" aria-labelledby="chapters">
        <h2 id="chapters" className="mb-6 text-2xl font-semibold">Chapters</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {parts.map((p, i) => (
            <a key={p.href} href={p.href} className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-ring">
              <Card className="h-full gap-0 overflow-hidden py-0 transition-all group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:shadow-xl group-hover:shadow-primary/20">
                <div className="aspect-[3/2] bg-muted">
                  <SafeImage name={p.img} alt={imageCaptions[p.img]?.alt ?? ""} className="h-full w-full object-cover" />
                </div>
                <CardHeader className="pt-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">{p.num}</span>
                    <Badge variant="secondary">{wordCount(mds[i]).toLocaleString("en")} words</Badge>
                  </div>
                  <CardTitle className="font-display text-2xl">{p.title}</CardTitle>
                  <CardDescription className="text-base">{p.teaser}</CardDescription>
                </CardHeader>
                <CardContent className="pb-5 pt-3 text-sm text-primary">
                  Read {p.num} <ArrowRight className="inline size-4 transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4" aria-label="More">
        <div className="grid gap-4 sm:grid-cols-3">
          {extras.map(({ href, title, text, icon: Icon }) => (
            <a key={href} href={href} className="group block rounded-xl">
              <Card className="h-full transition-colors group-hover:border-amber-glow/60">
                <CardHeader>
                  <Icon className="size-6 text-amber-glow" aria-hidden />
                  <CardTitle className="font-display text-xl">{title}</CardTitle>
                  <CardDescription>{text}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </section>
    </Layout>
  )
}
