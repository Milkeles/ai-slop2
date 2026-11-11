import { useEffect, useState, type ReactNode } from "react"
import { Menu, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MusicPlayer } from "@/components/MusicPlayer"
import { cn } from "@/lib/utils"

export const NAV = [
  { href: "index.html", label: "Home" },
  { href: "part1.html", label: "Part I" },
  { href: "part2.html", label: "Part II" },
  { href: "part3.html", label: "Part III" },
  { href: "characters.html", label: "Characters" },
  { href: "locations.html", label: "Locations" },
  { href: "making-of.html", label: "Making-of" },
]

function ReadingProgress() {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setValue(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  return <Progress value={value} aria-label="Reading progress" className="h-1 rounded-none bg-transparent" />
}

export function Layout({ current, children, progress }: { current: string; children: ReactNode; progress?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-primary focus:px-3 focus:py-1 focus:text-primary-foreground">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <a href="index.html" className="flex items-center gap-2 font-display text-lg font-semibold tracking-wide">
            <Sparkles className="size-5 text-amber-glow" aria-hidden />
            <span className="glow-text">The Folding</span>
          </a>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    aria-current={current === n.href ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                      current === n.href && "bg-primary/15 text-primary ring-1 ring-primary/40",
                    )}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-display">The Folding</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-4">
                <ul className="flex flex-col gap-1">
                  {NAV.map((n) => (
                    <li key={n.href}>
                      <a
                        href={n.href}
                        aria-current={current === n.href ? "page" : undefined}
                        className={cn(
                          "block rounded-md px-3 py-2 text-base text-muted-foreground hover:bg-accent hover:text-foreground",
                          current === n.href && "bg-primary/15 text-primary",
                        )}
                      >
                        {n.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {progress && <ReadingProgress />}
      </header>
      <main id="main" className="flex-1">{children}</main>
      <footer className="mt-16 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-display text-foreground">The Folding</span> · a short story made with an AI team for a school workshop.
          </p>
          <p>
            <a href="making-of.html" className="underline hover:text-foreground">How it was made &amp; credits</a>
          </p>
        </div>
      </footer>
      <MusicPlayer />
    </div>
  )
}
