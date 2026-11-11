import md from "../../story/part1.md?raw"
import { StoryPage } from "@/components/StoryPage"

export default function Part1() {
  return <StoryPage md={md} current="part1.html" hero="bowl" prev={{ href: "index.html", label: "Home" }} next={{ href: "part2.html", label: "Part II" }} />
}
