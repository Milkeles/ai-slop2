import md from "../../story/part3.md?raw"
import { StoryPage } from "@/components/StoryPage"

export default function Part3() {
  return <StoryPage md={md} current="part3.html" hero="gantry" prev={{ href: "part2.html", label: "Part II" }} next={{ href: "characters.html", label: "Characters" }} />
}
