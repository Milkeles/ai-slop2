export const TOOL_NOTE = "OpenAI image generation via Codex CLI; prompt on Making-of page"

export const SITE = {
  title: "The Folding",
  logline:
    "When a drought exposes a glowing fossil at the bottom of a quarry, three friends start growing new folds in their brains, and powers to match, until they learn that every fold has an owner and someone they love is paying for it.",
}

export type Character = {
  id: string
  name: string
  age: number
  role: string
  power: string
  region: string
  keyObject: string
  personality: string
  motivation: string
  visual: string
  notes: string
}

export const characters: Character[] = [
  {
    id: "ines",
    name: "Ines Marek",
    age: 14,
    role: "The planner",
    power: "Foresight (2 to 10 seconds ahead)",
    region: "Frontal lobe",
    keyObject: "A cheap black digital wristwatch she uses to time how far ahead she sees",
    personality: "Organised, quick, bossy when scared, with a dry sense of humour.",
    motivation:
      "Keep everything under control. Her mum Hana is a single parent and an ER nurse on night shifts, so Ines runs the house.",
    visual:
      "Slim 14-year-old girl, olive skin, dark brown chin-length bob with a straight fringe, thick eyebrows, brown eyes. Mustard-yellow windbreaker over a grey T-shirt, black cargo trousers, white trainers, black digital watch on her left wrist, a list in blue ballpoint on the back of her hand.",
    notes: "Donor: her mum, who loses planning and judgement.",
  },
  {
    id: "dobri",
    name: "Dobri Anev",
    age: 13,
    role: "The listener",
    power: "Echoes of words spoken in a place, and memories in motion",
    region: "Temporal lobe",
    keyObject: "Gran's silver portable cassette recorder with old over-ear headphones",
    personality: "Quiet, observant, funny in a whisper, avoids conflict.",
    motivation:
      "His parents work abroad and Gran Nevena raised him. She used to be \"the town's memory\". Now she forgets, and he wants her back.",
    visual:
      "Short, thin 13-year-old boy, pale freckled skin, messy black curls, large round tortoiseshell glasses, grey-green eyes. Oversized faded green cardigan, white T-shirt, brown corduroys, scuffed boots, headphones round his neck wired to a silver cassette recorder on his belt.",
    notes: "Donor: Gran, who loses words, names and memories.",
  },
  {
    id: "tavi",
    name: "Tavi Doran",
    age: 14,
    role: "The runner",
    power: "Perfect balance, speed and reflexes",
    region: "Cerebellum",
    keyObject: "A black hinged knee brace",
    personality: "Loud, generous, impatient, jokes about his own bad luck.",
    motivation:
      "He was the fastest runner in school until he fell from the quarry gantry and tore his knee. He wants to be fast again before the athletics trials.",
    visual:
      "Tall, long-limbed 14-year-old boy, dark brown skin, close-cropped black hair with a shaved line above the left ear, brown eyes, plaster on his chin. Red running vest, black shorts, black hinged brace on his right knee, mismatched socks, worn blue running shoes.",
    notes: "Donor: his sister Pip (8), who loses her balance and her swimming.",
  },
  {
    id: "pell",
    name: "Augustin \"Gus\" Pell",
    age: 60,
    role: "Keeper of the Weighhouse (antagonist)",
    power: "Makes and bends light: glows, images, illusions",
    region: "Occipital lobe",
    keyObject: "An old slide projector, where he makes his mother's face out of light",
    personality: "Gruff, precise, lonely, ashamed.",
    motivation:
      "He found the Coil in the 1979 drought. His mother paid for it and died not knowing his face. He wants to break the Coil so no other family suffers.",
    visual:
      "Tall, stooped man of about sixty, gaunt and pale, deep lines round the eyes, thin white hair combed back, short white beard. Long brown canvas work coat over a grey wool waistcoat and collarless shirt, heavy boots, a brass jeweller's loupe on a cord, chalk-white fingertips.",
    notes: "Donor (1979): his mother, who stopped recognising faces. Her threads snapped.",
  },
]

export type Location = {
  id: string
  name: string
  what: string
  why: string
  parts: string[]
  visual: string
  model?: string
}

export const locations: Location[] = [
  {
    id: "bowl",
    name: "Cutter's Bowl",
    what: "An abandoned limestone quarry above the town of Limeburn, half-flooded, with a rusted conveyor gantry reaching out over the water.",
    why: "The Coil is found here, Tavi once fell from the gantry, and the climax happens here.",
    parts: ["Part I", "Part II", "Part III"],
    visual:
      "Deep quarry with stepped white and cream terraces; turquoise water low from drought, a pale ring of bare rock and cracked mud; a rusted orange gantry on steel legs; dry grass, thistles and a broken fence under a hot late-August sky.",
  },
  {
    id: "weighhouse",
    name: "The Weighhouse",
    what: "The old weighbridge office at the quarry gate, now a one-room fossil museum where Gus Pell lives.",
    why: "The first warning, the confession and the 1979 echoes happen here, and the Coil ends here under glass.",
    parts: ["Part I", "Part II", "Epilogue"],
    visual:
      "Small red-brick building beside a disused weighbridge, corrugated roof, one tall arched window. Inside: glass cases of fossils, handwritten labels, wooden drawers, and a slide projector throwing a square of white light through floating dust.",
    model: "projector",
  },
  {
    id: "fold",
    name: "The Fold",
    what: "The inner landscape that holders enter by touching the Coil with their eyes closed.",
    why: "The twist is seen here (the threads), and the folds are returned here.",
    parts: ["Part I (a flash)", "Part II", "Part III"],
    visual:
      "Endless dreamlike landscape inside a brain: pale pink-white ridges like folded dunes, narrow valleys glowing soft blue, thin amber threads running toward a dark horizon, a huge grey stone spiral half-sunk at the centre under a dim violet sky.",
  },
]

export const imageCaptions: Record<string, { alt: string; caption: string }> = {
  cover: {
    alt: "Three friends on a quarry ledge at dusk with their hands on a glowing ammonite, amber threads rising from it, a gantry silhouette behind",
    caption: "Low water at Cutter's Bowl: three hands on the Coil.",
  },
  ines: {
    alt: "Portrait of Ines, a girl with a dark bob and a mustard windbreaker, raising her black digital wristwatch",
    caption: "Ines times the future on a cheap black wristwatch.",
  },
  dobri: {
    alt: "Portrait of Dobri, a freckled boy in round glasses and a green cardigan, wearing old headphones",
    caption: "Dobri listens to what a room remembers.",
  },
  tavi: {
    alt: "Portrait of Tavi, a tall boy in a red running vest and knee brace, mid-stride on a rock edge",
    caption: "Tavi, brace off, running the rim.",
  },
  pell: {
    alt: "Portrait of Gus Pell, a stooped white-bearded man in a canvas coat, standing in a projector beam",
    caption: "Gus Pell in the projector's beam.",
  },
  bowl: {
    alt: "A deep limestone quarry with white terraces and low turquoise water, a rusted orange gantry reaching over it",
    caption: "Cutter's Bowl, lower than it has been since 1979.",
  },
  weighhouse: {
    alt: "Inside a crowded one-room fossil museum with glass cases and a slide projector casting a square of light",
    caption: "The Weighhouse: fossils, handwritten labels and a square of white light.",
  },
  fold: {
    alt: "A dreamlike landscape of pale brain-like ridges and glowing blue valleys with a giant stone spiral under a violet sky",
    caption: "The Fold: ridges, valleys and the great stone spiral.",
  },
  threads: {
    alt: "A boy sitting by his grandmother's bed at night while amber threads of light flow from her head to his",
    caption: "\"It isn't giving me anything. It's taking her.\"",
  },
  gantry: {
    alt: "At night a boy balances on a rusted gantry beam over black water among floating false lights, a man with a sledgehammer at the far end",
    caption: "The gantry at midnight: false lights, one real beam.",
  },
}

export const models: Record<string, { alt: string; caption: string; credit: string }> = {
  ammonite: {
    alt: "3D model of a spiral chambered shell standing in for the Coil",
    caption: "The Coil: a spiral the size of a dinner plate. It doesn't give. It moves.",
    credit: "\"Nautilus shell\" by Poly by Google, CC BY 3.0, via Poly Pizza",
  },
  brain: {
    alt: "3D model of a human brain showing its lobes",
    caption:
      "Four regions, four powers: frontal (Ines, foresight), temporal (Dobri, echoes), cerebellum (Tavi, balance), occipital (Pell, light). Each donor loses what that region does.",
    credit: "\"Brain\" by J-Toastie, CC BY 3.0, via Poly Pizza",
  },
  recorder: {
    alt: "3D model of a cassette player standing in for Gran's recorder",
    caption: "Gran's recorder: the summer Dobri lost, kept on tape.",
    credit: "\"Boombox\" by Poly by Google, CC BY 3.0, via Poly Pizza",
  },
  projector: {
    alt: "3D model of an old projector",
    caption: "Pell's projector, where his mother's face is made of light.",
    credit: "\"projector\" by Jonathan Granskog, CC BY 3.0, via Poly Pizza",
  },
}

export const parts = [
  { href: "part1.html", num: "Part I", title: "Low Water", img: "bowl", teaser: "A drought, a glowing spiral, three hands, and a click inside the skull." },
  { href: "part2.html", num: "Part II", title: "Echoes", img: "threads", teaser: "The powers grow, the costs show, and Dobri finds out who is paying." },
  { href: "part3.html", num: "Part III", title: "Return", img: "gantry", teaser: "Midnight on the gantry, and a walk into the Fold with no way to see ahead." },
]
