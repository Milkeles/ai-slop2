# Project Brief — AI Story Workshop 1

Source assignment: https://vasilkozov.github.io/Workshops/Workshop1/
Repository: https://github.com/Milkeles/ai-slop2 (public, branch `main`)
Live site (after publishing): https://milkeles.github.io/ai-slop2/

This file is the single source of truth for every agent (Claude or Codex/GPT) working on the project.
Read it fully before doing anything. If something here conflicts with a brief you were given, this file wins.

---

## 1. Context (the author's idea)

A fantasy story about a group of friends who obtain magical powers as their brains gain more wrinkles
(gyri and sulci) and produce more energy.

Working title: **"The Folding"** (can be changed by the story team if a better one comes out of iteration).

### Magic-system ground rules (keep the story consistent with these)
- Power comes from **folding**: each new wrinkle adds surface area to the cortex, and more surface means more
  energy. The friends can feel a new fold form (a headache, a flash of light, a sound only they hear).
- Each friend's power is tied to **one region of the brain**, so the powers differ and can be explained
  visually. Suggested map (the story team may change it but must keep it region-based):
  - Frontal lobe: foresight, planning, seeing a few seconds ahead
  - Temporal lobe: memory and language, hearing the "echoes" of places
  - Occipital lobe: light and illusion
  - Cerebellum: movement, balance, speed
- **Cost and limit:** energy builds up like heat. Using too much causes nosebleeds, lost memories or
  "smoothing" (folds fading away). There must be a real price, or the story has no tension.
- **Source:** decide *why* it is happening (an event, an object, a place, a person). The answer must be
  revealed by the end.

---

## 2. Hard requirements (from the assignment; all of them are graded)

| # | Requirement | Our target |
|---|---|---|
| 1 | Story of **3,000+ words**, coherent | 3,500–4,500 words |
| 2 | **3+ story parts**: beginning, middle, end | Part I, Part II, Part III (+ optional epilogue) |
| 3 | **3+ characters**, each described visually | 3–4 friends, plus 1 antagonist if the plot needs one |
| 4 | **3+ locations**, each described visually, each appears in the story | 3–4 clearly different places |
| 5 | **6+ generated images** | 10: cover, 3–4 characters, 3–4 locations, 2–3 key scenes |
| 6 | **3+ linked HTML pages**: the first introduces the story, the last concludes it | see §5 |
| 7 | Working navigation (Previous/Next, menu, chapter cards) | all of these; every link tested |
| 8 | Published on GitHub Pages | §8 |
| 9 | Short presentation of the work | §7 |
| 10 | **English only**: story, site, image descriptions, tables, notes, presentation | |

Character table columns: **name | visual description | notes / tool used**.
Location table columns: **name | visual description | notes / tool used**.
For each important image, record **the tool and the full prompt**.

## 3. Extra requirement (the author's)

**Interactive 3D models on the web pages. DO NOT generate them. Find existing ones.**
- Use free models with a clear licence (CC0 preferred, CC-BY fine with attribution). Good sources:
  Poly Pizza (poly.pizza), Khronos glTF Sample Assets, NIH 3D (3d.nih.gov, brain models), Smithsonian 3D
  (CC0), Kenney, Quaternius. Sketchfab only if the file can be downloaded without an account on our side.
- Format: `.glb` (or glTF converted to `.glb`). Keep each file **under 8 MB** (ideally under 3 MB); compress
  or decimate if needed. Store them in `public/assets/models/`.
- At least **3 models**: one per story page (for example a brain for Part I, an object or creature tied to the
  plot for Part II, a location object for Part III). Each model must make sense in the story; don't add
  decoration for its own sake.
- Display them with `<model-viewer>` from `https://cdn.jsdelivr.net/npm/@google/model-viewer@4.1.0/dist/model-viewer.min.js`
  (pinned version), with `camera-controls`, `auto-rotate`, a poster/loading state, alt text and a caption.
- Every model is credited on the Credits section of the making-of page: title, author, source URL, licence.

---

## 4. Story process (the assignment grades our decisions, not just the output)

Work in cycles and **keep the record** in `notes/ai-log.md` (see §6):
1. **Direction:** get 2–3 alternative directions and pick one with a written reason.
2. **Characters:** name, role, visual appearance, personality, motivation, power (brain region), key object,
   inner conflict. Save the visual description in a form that can be used for image prompts.
3. **Locations:** at least 3 clearly different places (e.g. a school or lab, a city district, a dream-like or
   inner world inside the mind). Each needs a visual description and must matter in the plot.
4. **Plot:** ask for conflicts, turning points and endings, then for **alternatives**; improve motivation,
   pacing and surprise. Fix contradictions with the magic rules in §1.
5. **Write and edit:** 3,500–4,500 words. Show, don't summarise. Dialogue that sounds human. No purple prose.
   Avoid AI tells (e.g. "a testament to", "tapestry", "in that moment", one-line moral at the end of each
   scene). Run a final humanizer/editing pass.
6. **Independent critique:** the draft is reviewed by a *different* model than the one that wrote it
   (Claude writes → GPT critiques, or the reverse), then revised. Log what changed and why.

## 5. Website

**Stack (changed on 2026-11-11 at the author's request):** Vite + React + TypeScript + Tailwind v4 + shadcn/ui,
built as a **multi-page app** (one real HTML file per page, so the "3+ HTML pages" rule still holds). Background
music is coded in **Strudel** and starts on the first interaction (browsers block autoplay before that). Story text
lives in `story/part*.md` and is rendered at build time. It must work from the `/ai-slop2/` sub-path, so use
relative links only (`part2.html`, `./assets/img/ines.webp`), never `/...`. Static files live in `public/assets/`.

| Page | Content |
|---|---|
| `index.html` | Cover image, title, logline, short intro to the world, chapter cards for all parts, "Begin" button. **Introduces the story.** |
| `part1.html` | Part I (beginning) + its images + 3D model |
| `part2.html` | Part II (middle) + its images + 3D model |
| `part3.html` | Part III (end, + epilogue) + its images + 3D model. **Concludes the story.** |
| `characters.html` | Character cards + the character table |
| `locations.html` | Location cards + the location table |
| `making-of.html` | AI workflow: tools, image prompt table, what worked, what failed, what we changed, what we learned; Credits (3D models, libraries) |

Navigation: top menu on every page, Previous/Next at the bottom of the story pages, chapter cards on
the home page. The current page is highlighted in the menu.

Design:
- One visual style across the site, matching the image style (§6). A dark "neural" theme (deep navy or
  violet with glowing synapse accents) suits the idea, but keep text highly readable: body text 18px or larger,
  line length around 65–75 characters, contrast AA.
- **Balance of text and visuals is graded:** break each part with images, pull quotes or a 3D model every
  ~500–700 words, so the story never turns into a wall of text or a gallery.
- Responsive down to 360px width; no horizontal scrolling; images use `loading="lazy"`, `width`/`height` and
  meaningful `alt` text.
- Valid HTML, no console errors, no broken links or missing files (filenames are case-sensitive on Pages).
- Shared code: `src/components/` (layout, model viewer, music player), page components in `src/pages/`.

## 6. Images

- Tool: **OpenAI image generation via the Codex CLI** (`image_generation` feature). Log the exact prompt,
  tool and date of every image in `notes/image-prompts.md`; this feeds the prompt table on `making-of.html`.
- **Style sheet first:** write one shared style line (medium, palette, lighting, mood) and append it to every
  prompt so the images look like one book. Describe each character the same way in every prompt where they
  appear (copy from the character sheet), so they stay recognisable.
- Final files go in `public/assets/img/` with short lowercase English names (`cover.webp`, `mira.webp`, `archive.webp`).
  Convert to WebP, max 1600 px on the long side, under ~400 KB each. Keep the originals out of the repo.
- No text, logos or watermarks in the images; no real people.
- At least 6 images; target 10 (see §2).

`notes/ai-log.md` records, in short dated entries: what we asked, which alternative we chose and why, what
failed (bad images, contradictions, weak ending), and what we changed by hand. This is the raw material for
the presentation and for answering questions (20 points).

## 7. Presentation

`presentation/notes.md`: speaker notes for **5–7 minutes**, written to be *told*, not read
(storytelling is graded). Structure:
1. The idea and the hook (30 s)
2. Walk through the site page by page, in the same order as the site (presentation and site must match)
3. Characters and locations: show the images, explain one prompt that worked and one that failed
4. AI workflow: which agents and models did what, what we changed by hand, what we learned
5. Likely questions and short answers (at least 8)

## 8. Publishing

- Repository `Milkeles/ai-slop2`, branch `main`. A GitHub Actions workflow (`.github/workflows/deploy.yml`)
  runs `npm ci && npm run build` and deploys `dist/` to Pages (Pages source: GitHub Actions).
- Wait up to 10 minutes, then check every page and every asset on the live URL (HTTP 200).
- Add `.gitignore` for editor files (`*.swp`, `*~`), `node_modules/`, raw/original images.
- Keep `instructions.md` in the repo. Notes in `notes/` and `presentation/` may stay public.

## 9. Agent roles (orchestration)

| Role | Who | Output |
|---|---|---|
| Coordinator | Claude (main session) | Plan, decisions, merges, final checks, publishing |
| Story architect | Claude subagent + GPT independent proposal (peer protocol: blind drafts, then cross-critique and merge) | `story/bible.md`: magic rules, characters, locations, plot outline |
| Writer | Claude subagent | `story/part1.md`, `part2.md`, `part3.md` |
| Critic / editor | GPT (Codex), a different model from the writer | `notes/critique.md`, then the writer revises |
| Art director | Claude writes prompts from the bible; GPT (Codex) generates images | `assets/img/*`, `notes/image-prompts.md` |
| 3D scout | Claude subagent | `assets/models/*.glb`, `notes/models.md` (source, licence, size, page) |
| Web builder | Claude subagent | All HTML/CSS/JS pages |
| QA | Claude subagent (cheap tier) | `notes/qa.md`: word count, link check, requirement checklist, mobile check |

Rules for all agents:
- Never include the user's e-mail or other personal data in prompts, requests or files.
- Write only inside this project folder (GPT: only inside the folder it was given with `--write-dir`).
- English only. Don't overwrite another role's files; leave notes in `notes/` instead.

## 10. Definition of done

- [ ] Story 3,000+ words (actual count recorded in `notes/qa.md`), coherent, beginning/middle/end
- [ ] 3+ characters and 3+ locations, described visually, all appear in the story
- [ ] 6+ generated images (target 10), prompts logged
- [ ] 3+ interactive, credited, found (not generated) 3D models
- [ ] 7 linked HTML pages, navigation tested, no broken links
- [ ] Character, location and image-prompt tables on the site
- [ ] Presentation notes ready
- [ ] Live on GitHub Pages and checked on the live URL
