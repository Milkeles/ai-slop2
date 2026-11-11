import { Brain, KeyRound } from "lucide-react"
import { Layout } from "@/components/Layout"
import { SafeImage } from "@/components/SafeImage"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TOOL_NOTE, characters, imageCaptions } from "@/data/story"

export default function Characters() {
  return (
    <Layout current="characters.html">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="glow-text text-4xl font-semibold sm:text-5xl">Characters</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Three friends who woke the Coil, and the man who woke it first, in 1979.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {characters.map((c) => (
            <Card key={c.id} className="gap-0 overflow-hidden py-0">
              <div className="aspect-square bg-muted sm:aspect-[4/3]">
                <SafeImage name={c.id} alt={imageCaptions[c.id]?.alt ?? c.name} width={1024} height={1024} className="h-full w-full object-cover object-top" />
              </div>
              <CardHeader className="pt-5">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-glow">{c.role}</p>
                <CardTitle className="font-display text-2xl">
                  {c.name} <span className="text-base font-normal text-muted-foreground">· {c.age}</span>
                </CardTitle>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge className="bg-amber-glow/15 text-amber-glow"><Brain /> {c.region}</Badge>
                  <Badge variant="secondary" className="whitespace-normal">{c.power}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-6 pt-4 text-[0.95rem] leading-relaxed">
                <p><strong className="text-foreground">Personality:</strong> <span className="text-muted-foreground">{c.personality}</span></p>
                <p><strong className="text-foreground">Motivation:</strong> <span className="text-muted-foreground">{c.motivation}</span></p>
                <p className="flex gap-2"><KeyRound className="mt-1 size-4 shrink-0 text-cyan-glow" aria-hidden /><span><strong>Key object:</strong> <span className="text-muted-foreground">{c.keyObject}</span></span></p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-semibold">Character table</h2>
        <div className="mt-4 rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-amber-glow">Name</TableHead>
                <TableHead className="text-amber-glow">Visual description</TableHead>
                <TableHead className="text-amber-glow">Notes / tool used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {characters.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="align-top font-medium">{c.name}</TableCell>
                  <TableCell className="min-w-64 whitespace-normal align-top text-muted-foreground">{c.visual}</TableCell>
                  <TableCell className="min-w-48 whitespace-normal align-top text-muted-foreground">{c.notes} {TOOL_NOTE}.</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Minor characters (no portraits): Gran Nevena Aneva, about 80, lilac cardigan, smells of quince jam; Hana Marek, smells of hospital hand gel; Pip Doran, 8, smells of strawberry bubblegum.
        </p>
      </div>
    </Layout>
  )
}
