import { useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  name: string
  alt: string
  width?: number
  height?: number
  className?: string
  eager?: boolean
}

/** Image from ./assets/img/<name>.webp that hides itself if the file is missing. */
export function SafeImage({ name, alt, width = 1536, height = 1024, className, eager }: Props) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={`./assets/img/${name}.webp`}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("block h-auto w-full object-cover", className)}
    />
  )
}
