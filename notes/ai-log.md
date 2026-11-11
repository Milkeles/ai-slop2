# AI Log

Short dated entries: what we asked, which alternative we chose and why, what failed, what we changed by hand.

## 2026-11-11
- Read the workshop page and expanded the 2-line idea into a full project brief (`instructions.md`): magic rules, graded requirements, site map, agent roles.
- Decided on a mixed Claude + GPT (Codex CLI) team so that the model that writes is never the model that critiques.
- Planned blind parallel drafts of the story bible (Claude + GPT) with a merge step, then cancelled the GPT draft because of the 30–40 minute deadline: two full bibles plus a merge would have doubled the planning time. GPT moved to the critic role instead, so the writer and the critic are still different models.
- GPT critique: 5 fixes applied:
  1. Part II window: the fake Ines is now Pell wrapped in an illusion; he really takes the rucksack, and her arms dip lower than Ines's would and she climbs down stiffly (clues the reader can catch).
  2. Part II twist: Dobri accidentally walks one thread to Gran and lets go. Gran remembers her dog's name, and Dobri loses his afternoon. This sets up how return works and what it costs before the climax, and Tavi later says "Dobri already did one".
  3. Part II confession: Pell explains that a snapped fold can only be burned, used up all at once, and that its memories go with it. Part III now says "He didn't use them. He used them up."
  4. Part I: the Coil's ledge now sits right under the end of the gantry, so "Where it came up, it gets broken" points to the gantry.
  5. Part III: Ines's foresight now goes blank only after she closes her eyes in the Fold. Before that, Pell warns her it will.
  Rejected: none. A few small trims elsewhere kept the total at 4,353 words.
- Images: 10 images generated with OpenAI image generation through two parallel Codex CLI runs (5 each). Every prompt reused the bible's character/location visual lines verbatim plus one shared style line. Result: the characters stay recognisable from the cover to the climax scene. All 10 were usable on the first try.
- 3D models: no free ammonite or portable cassette recorder model was found in time, so a nautilus shell and a boombox with a cassette deck (Poly Pizza, CC BY 3.0) stand in for them.
- Stack change mid-project: plain HTML → Vite + React + shadcn/ui (multi-page build, so every page is still its own HTML file), plus Strudel background music written as code.
- Home page: replaced the static "The world" paragraph with an interactive piece built on pretext (a text layout library). Inspired by its "orbs" demo, but instead of orbs there are three glowing ammonite spirals (the Coil), one per friend, tied together by amber threads; the world intro and the opening of Part I reflow around them live as they drift or are dragged. First version lost paragraph gaps and left single words beside the spirals on phones; fixed by laying out each paragraph separately and using a wider minimum slot.
- Music: first version was too quiet on classroom speakers; raised the volume about 3× and moved the bass up an octave so laptop/projector speakers can play it.
