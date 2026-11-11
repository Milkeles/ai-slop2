/** Word count of story markdown, ignoring headings markers and [[...]] media markers. */
export function wordCount(md: string): number {
  const text = md
    .split("\n")
    .filter((l) => !/^\s*\[\[(img|model):[\w-]+\]\]\s*$/.test(l))
    .join(" ")
    .replace(/[#>*_`]/g, " ")
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length
}

export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 220))
}
