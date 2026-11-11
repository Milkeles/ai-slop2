import md from "../../story/part2.md?raw"
import { StoryPage } from "@/components/StoryPage"

export default function Part2() {
  return <StoryPage md={md} current="part2.html" hero="fold" prev={{ href: "part1.html", label: "Part I" }} next={{ href: "part3.html", label: "Part III" }} />
}
