# The Folding — presentation notes (5–7 minutes)

Tell it; don't read it. Keep the site open and click along in the same order as below.

## 1. The hook (30 s) — home page
- Start with a question: "What if every new wrinkle in your brain gave you a superpower... and someone you love was paying for it?"
- Title: *The Folding*. Three friends, a drought, and a glowing fossil at the bottom of a quarry.
- Point at the cover image: the three friends with their hands on the Coil.

## 2. The story, page by page (2.5 min)
- **Part I: Low Water.** Cutter's Bowl quarry is drier than it has been since 1979. Tavi spots a spiral fossil, and all three touch it. Next morning Ines can see two seconds ahead, Dobri hears words spoken in empty rooms, and Tavi can't fall. Meanwhile their families get strangely worse at things. Spin the **ammonite 3D model**.
- **Part II: Echoes.** The powers grow, and so do the nosebleeds. The twist: by Gran's bed, Dobri sees an amber thread running from her head to his. "It isn't giving me anything. It's taking her." Show the **threads** image, then rotate the **brain model** and point at the lobes: frontal for Ines, temporal for Dobri, cerebellum for Tavi, occipital for Pell.
- **Part III: Return.** Pell, who made the same mistake in 1979, wants to smash the Coil so the loans become permanent. The climax happens on the rusty gantry and inside the Fold. They give everything back, and the memories of that summer go back with it.
- **Epilogue.** Gran remembers what Dobri can't, and she records it for him on a cassette. Show the **recorder model**.

## 3. Characters and locations (1 min) — Characters and Locations pages
- 3 friends + 1 antagonist; 3 locations: the quarry, the Weighhouse museum and the Fold (a world inside the brain).
- Each power is tied to a real brain region, which made the images and the 3D brain easy to explain.
- What worked: copying each character's visual description word for word into every prompt. Ines's yellow windbreaker, Dobri's headphones and green cardigan, and Tavi's knee brace look the same in the cover, the portraits and the gantry scene.
- What didn't: the 3D models. There was no free ammonite or cassette recorder, so a nautilus shell and a boombox stand in for them. **[add your own: an image you'd redo, and why]**

## 4. How I used AI (1.5 min) — Making-of page
- I wrote the idea; I didn't let one AI do everything. A team of AI agents, each with one job:
  - **Claude** planned the story bible (3 alternatives first, then I picked one) and wrote the parts.
  - **GPT** (through the Codex CLI) **critiqued** the draft (a different model from the writer) and **generated all the images**.
  - Another agent **found free 3D models** (not generated) and recorded their licences.
  - Another agent **built the website**: React + shadcn/ui, one HTML file per page.
  - The background music is **code**, written in Strudel. The bass is the "thinking pulse", and the arpeggio is neurons firing.
- What failed: the first ammonite and cassette recorder models didn't exist as free models, so we used a nautilus shell and a boombox. The plan to have two models write competing story plans was too slow for the deadline, so I cut it.
- What I learned: specific constraints (word counts, a fixed style line, copy-pasted character descriptions) matter more than clever prompts.

## 5. Likely questions (short answers)
1. **Why does the power come from wrinkles?** More folds mean more cortex surface, and that's real biology. The story turns that into energy.
2. **Why is there a cost?** Without a price there is no tension. The twist is that the family pays, not the hero.
3. **How did you keep the characters looking the same in every image?** Every prompt re-used the same visual description word for word, plus one shared style line.
4. **Did the AI write everything?** It drafted. I chose the direction, set the rules and the requirements, and the draft was critiqued and revised. [add something you changed by hand]
5. **Why 3D models you didn't make?** The assignment is about the story. Free CC-BY models are credited on the Making-of page.
6. **Why React for a story site?** shadcn gave ready-made, consistent components, and the build still produces separate HTML pages.
7. **What was hardest?** Keeping the magic rules consistent: who loses what, and when.
8. **What would you improve?** Hand-drawn touch-ups on the images, a real ammonite model, and a stronger antagonist arc.
