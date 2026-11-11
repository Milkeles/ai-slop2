import "@google/model-viewer"
import type { DetailedHTMLProps, HTMLAttributes } from "react"
import { Box } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { models } from "@/data/story"

type ModelViewerAttrs = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string
  alt?: string
  "camera-controls"?: boolean | string
  "auto-rotate"?: boolean | string
  "shadow-intensity"?: string
  "touch-action"?: string
  exposure?: string
  loading?: string
  reveal?: string
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttrs
    }
  }
}

export function ModelViewer({ name, compact }: { name: string; compact?: boolean }) {
  const meta = models[name] ?? { alt: name, caption: "", credit: "" }
  return (
    <Card className={compact ? "gap-3 overflow-hidden py-0" : "mx-auto my-10 max-w-3xl gap-3 overflow-hidden py-0"}>
      <model-viewer
        src={`./assets/models/${name}.glb`}
        alt={meta.alt}
        camera-controls
        auto-rotate
        shadow-intensity="1"
        touch-action="pan-y"
        exposure="1.1"
        loading="lazy"
        style={compact ? { height: 260 } : undefined}
      >
        <div slot="poster" className="flex h-full w-full items-center justify-center gap-2 text-sm text-muted-foreground">
          <Box className="size-5 animate-pulse" /> Loading 3D model…
        </div>
      </model-viewer>
      <CardContent className="pb-4 font-sans">
        <p className="text-sm text-foreground">{meta.caption}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          3D model: {meta.credit}. Drag to rotate.
        </p>
      </CardContent>
    </Card>
  )
}
