import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const tableComponents: Components = {
  table: ({ children }) => (
    <div className="my-4 rounded-lg border border-border">
      <Table>{children}</Table>
    </div>
  ),
  thead: ({ children }) => <TableHeader>{children}</TableHeader>,
  tbody: ({ children }) => <TableBody>{children}</TableBody>,
  tr: ({ children }) => <TableRow>{children}</TableRow>,
  th: ({ children }) => <TableHead className="text-amber-glow">{children}</TableHead>,
  td: ({ children }) => <TableCell className="whitespace-normal align-top">{children}</TableCell>,
}

export function Markdown({ children, className, tables }: { children: string; className?: string; tables?: boolean }) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={tables ? tableComponents : undefined}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
