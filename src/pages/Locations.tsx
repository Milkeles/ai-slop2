import { BookOpen } from "lucide-react"
import { Layout } from "@/components/Layout"
import { SafeImage } from "@/components/SafeImage"
import { ModelViewer } from "@/components/ModelViewer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TOOL_NOTE, imageCaptions, locations } from "@/data/story"

export default function Locations() {
  return (
    <Layout current="locations.html">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="glow-text text-4xl font-semibold sm:text-5xl">Locations</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">A quarry, a one-room museum, and a landscape inside the skull.</p>

        <div className="mt-10 space-y-8">
          {locations.map((l) => (
            <Card key={l.id} className="gap-0 overflow-hidden py-0 lg:grid lg:grid-cols-2">
              <div className="bg-muted">
                <SafeImage name={l.id} alt={imageCaptions[l.id]?.alt ?? l.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <CardHeader className="pt-6">
                  <CardTitle className="font-display text-3xl">{l.name}</CardTitle>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {l.parts.map((p) => (
                      <Badge key={p} variant="secondary"><BookOpen /> {p}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pb-6 pt-4 leading-relaxed">
                  <p>{l.what}</p>
                  <p className="text-muted-foreground"><strong className="text-foreground">Why it matters:</strong> {l.why}</p>
                  {l.model && <ModelViewer name={l.model} compact />}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-semibold">Location table</h2>
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
              {locations.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="align-top font-medium">{l.name}</TableCell>
                  <TableCell className="min-w-64 whitespace-normal align-top text-muted-foreground">{l.visual}</TableCell>
                  <TableCell className="min-w-48 whitespace-normal align-top text-muted-foreground">Appears in {l.parts.join(", ")}. {TOOL_NOTE}.</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  )
}
