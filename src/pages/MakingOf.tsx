import prompts from "../../notes/image-prompts.md?raw"
import aiLog from "../../notes/ai-log.md?raw"
import modelsMd from "../../notes/models.md?raw"
import { Layout } from "@/components/Layout"
import { Markdown } from "@/components/Markdown"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const team = [
  ["Coordinator", "Claude (main session)", "Plan, decisions, merges, final checks, publishing"],
  ["Story architect", "Claude subagent + GPT independent proposal", "Story bible: magic rules, characters, locations, plot (blind drafts, cross-critique, merge)"],
  ["Writer", "Claude subagent", "Parts I, II and III"],
  ["Critic / editor", "GPT (Codex CLI)", "Critique from a different model; the writer revises"],
  ["Art director / images", "Claude writes prompts; GPT image generation via Codex CLI", "All illustrations and the prompt log"],
  ["3D scout", "Claude subagent", "Free .glb models with licences and credits"],
  ["Web builder", "Claude subagent", "This site: Vite + React + TypeScript + Tailwind v4 + shadcn/ui"],
  ["QA", "Claude subagent (cheap tier)", "Word count, link check, requirement checklist, mobile check"],
  ["Music", "Strudel (live-coded pattern)", "Background loop, toggled with the button in the corner"],
]

const libs = [
  ["React 19", "UI components", "MIT"],
  ["Vite", "Build tool, multi-page setup", "MIT"],
  ["TypeScript", "Types", "Apache-2.0"],
  ["Tailwind CSS v4", "Styling", "MIT"],
  ["shadcn/ui + Radix UI", "Cards, tables, badges, sheet menu, progress", "MIT"],
  ["react-markdown + remark-gfm", "Rendering story and notes", "MIT"],
  ["@google/model-viewer", "3D models", "Apache-2.0"],
  ["Strudel", "Background music, loaded from CDN at runtime", "AGPL-3.0"],
  ["lucide-react", "Icons", "ISC"],
  ["Google Fonts: Fraunces, Literata, Inter", "Typography", "OFL"],
]

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-3xl font-semibold text-amber-glow">{title}</h2>
      <div className="mt-4">{children}</div>
      <Separator className="my-12" />
    </section>
  )
}

function SimpleTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>{head.map((h) => <TableHead key={h} className="text-amber-glow">{h}</TableHead>)}</TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r[0]}>
              {r.map((c, i) => <TableCell key={i} className={i === 0 ? "align-top font-medium" : "min-w-48 whitespace-normal align-top text-muted-foreground"}>{c}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const toc = [
  ["idea", "The idea"],
  ["team", "AI team"],
  ["prompts", "Image prompts"],
  ["log", "AI log"],
  ["credits", "Credits"],
]

export default function MakingOf() {
  return (
    <Layout current="making-of.html">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="glow-text text-4xl font-semibold sm:text-5xl">Making-of</h1>
        <p className="mt-3 text-lg text-muted-foreground">How a team of AI agents planned, wrote, illustrated and built The Folding.</p>
        <nav aria-label="Sections" className="mt-6 flex flex-wrap gap-2">
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:border-primary hover:text-foreground">{label}</a>
          ))}
        </nav>
        <Separator className="my-10" />

        <Section id="idea" title="The idea">
          <div className="prose-notes text-[1.05rem]">
            <p>
              The starting idea was a story about brains that grow new folds, and powers to match. The story architect
              proposed three directions (a haunted radio, a jellyfish bloom, a drought fossil) and we chose <em>Low Water</em>:
              a fossil that does not create folds but moves them, taking each one from the person who loves you most.
              That put the stakes inside the friends' own families and gave the ending a cost that is paid in full.
            </p>
          </div>
        </Section>

        <Section id="team" title="AI team">
          <SimpleTable head={["Role", "Who", "Output"]} rows={team} />
          <p className="mt-4 text-sm text-muted-foreground">
            The site is built with Vite, React, TypeScript, Tailwind CSS v4 and shadcn/ui components. The background music
            is a short Strudel pattern.
          </p>
        </Section>

        <Section id="prompts" title="Image prompts">
          <Markdown className="prose-notes" tables>{prompts}</Markdown>
        </Section>

        <Section id="log" title="AI log">
          <Markdown className="prose-notes" tables>{aiLog}</Markdown>
        </Section>

        <section id="credits" className="scroll-mt-20">
          <h2 className="text-3xl font-semibold text-amber-glow">Credits</h2>
          <h3 className="mt-6 text-xl font-semibold">3D models</h3>
          <Markdown className="prose-notes mt-2" tables>{modelsMd.replace(/^# .*\n/, "")}</Markdown>
          <h3 className="mt-8 text-xl font-semibold">Libraries &amp; fonts</h3>
          <div className="mt-3"><SimpleTable head={["Library", "Used for", "Licence"]} rows={libs} /></div>
          <p className="mt-4 text-sm text-muted-foreground">Illustrations: OpenAI image generation via the Codex CLI. Story text: Claude, critiqued by GPT.</p>
        </section>
      </div>
    </Layout>
  )
}
