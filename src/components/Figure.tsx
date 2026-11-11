import { useState } from "react"
import { imageCaptions } from "@/data/story"

export function Figure({ name }: { name: string }) {
  const meta = imageCaptions[name] ?? { alt: name, caption: "" }
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <figure className="mx-auto my-10 max-w-3xl">
      <img
        src={`./assets/img/${name}.webp`}
        alt={meta.alt}
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-auto w-full rounded-xl border border-border shadow-2xl shadow-violet-900/40"
      />
      {meta.caption && (
        <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">{meta.caption}</figcaption>
      )}
    </figure>
  )
}
