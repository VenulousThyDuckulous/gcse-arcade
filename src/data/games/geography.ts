import type { Game } from "../../types";

export const geographyGames: Game[] = [
  {
    id: "tectonic-tussle",
    title: "Tectonic Tussle",
    subjectId: "geography",
    topicId: "tectonics",
    engine: "sort",
    tagline: "Destructive, constructive or conservative? File nine plate facts.",
    emoji: "🌋",
    difficulty: 2,
    minutes: 4,
    data: {
      bins: [
        { id: "destructive", label: "Destructive", hint: "Plates move together" },
        { id: "constructive", label: "Constructive", hint: "Plates move apart" },
        { id: "conservative", label: "Conservative", hint: "Plates slide past" },
      ],
      items: [
        {
          text: "Oceanic crust sinks beneath continental crust",
          bin: "destructive",
          why: "Subduction happens because oceanic crust is denser. It melts, feeding magma chambers and explosive volcanoes.",
        },
        {
          text: "Fold mountains such as the Himalayas",
          bin: "destructive",
          why: "Two continental plates collide and sediments are compressed and uplifted — neither plate subducts easily.",
        },
        {
          text: "Composite volcanoes with explosive eruptions",
          bin: "destructive",
          why: "Thick, acidic magma traps gas, so pressure builds and erupts violently — as at Mount Merapi.",
        },
        {
          text: "The Mid-Atlantic Ridge",
          bin: "constructive",
          why: "Magma rises between diverging plates and creates new oceanic crust, forming an underwater ridge.",
        },
        {
          text: "Rift valleys such as the East African Rift",
          bin: "constructive",
          why: "Crust is pulled apart and the central block drops between parallel faults.",
        },
        {
          text: "Shield volcanoes with runny, gentle lava",
          bin: "constructive",
          why: "Basaltic magma is low in silica, so gas escapes easily and lava flows far — frequent but less violent.",
        },
        {
          text: "The San Andreas Fault",
          bin: "conservative",
          why: "The Pacific and North American plates slide past each other; friction builds and releases as earthquakes.",
        },
        {
          text: "Earthquakes but no volcanic eruptions",
          bin: "conservative",
          why: "No magma is produced when plates slide past one another — only stored friction is released.",
        },
        {
          text: "A deep ocean trench",
          bin: "destructive",
          why: "The subducting plate bends downwards, creating trenches such as the Mariana Trench (about 11 km deep).",
        },
      ],
    },
  },
  {
    id: "river-landforms",
    title: "River Landforms",
    subjectId: "geography",
    topicId: "rivers",
    engine: "order",
    tagline: "Landforms are processes in sequence. Build a waterfall, then an oxbow lake.",
    emoji: "🏞️",
    difficulty: 3,
    minutes: 5,
    data: {
      rounds: [
        {
          prompt: "Order the formation of a waterfall and gorge.",
          items: [
            "The river flows over a band of hard rock resting on softer rock",
            "The softer rock is eroded faster by hydraulic action and abrasion",
            "A step forms and the plunge pool deepens below it",
            "The hard rock is undercut and its overhang collapses",
            "The waterfall retreats upstream, leaving a steep-sided gorge",
          ],
          note: "High-force water at the base does the damage — the plunge pool is where hydraulic action and abrasion are strongest.",
        },
        {
          prompt: "Order the formation of a meander and then an oxbow lake.",
          items: [
            "Faster flow on the outside bend erodes the bank sideways",
            "Slower flow on the inside bend deposits sediment, forming a slip-off slope",
            "The meander becomes more pronounced as erosion continues",
            "Two outer bends erode towards each other and the neck narrows",
            "The river cuts through the neck during a flood, leaving an oxbow lake",
          ],
          note: "Erosion on the outside, deposition on the inside: that is the whole story of a meander.",
        },
      ],
    },
  },
  {
    id: "population-puzzler",
    title: "Population Puzzler",
    subjectId: "geography",
    topicId: "population",
    engine: "graph",
    tagline: "Read a population pyramid like a detective. Three shapes, four clues.",
    emoji: "👥",
    difficulty: 2,
    minutes: 3,
    data: {
      rounds: [
        {
          prompt: "A country has a very high birth rate and a falling death rate. Which pyramid fits?",
          options: ["pyramid-wide", "pyramid-narrow", "barrel"],
          answer: "pyramid-wide",
          why: "A wide base and rapidly narrowing top means many young dependants and a short life expectancy — stage 2 of the demographic transition model.",
        },
        {
          prompt: "Japan has a low birth rate and very long life expectancy. Which shape?",
          options: ["pyramid-narrow", "pyramid-wide", "barrel"],
          answer: "pyramid-narrow",
          why: "A narrow base and heavy top shows an ageing population: fewer workers supporting more pensioners.",
        },
        {
          prompt: "Birth and death rates are both low and roughly equal. Which shape?",
          options: ["barrel", "pyramid-wide", "pyramid-narrow"],
          answer: "barrel",
          why: "A barrel (or column) shape means a stable population with low growth — stage 4 of the model.",
        },
        {
          prompt: "Which shape warns a government it needs more schools and maternity wards?",
          options: ["pyramid-wide", "barrel", "pyramid-narrow"],
          answer: "pyramid-wide",
          why: "A youth bulge means high demand for schools, childcare and later for jobs.",
        },
      ],
    },
  },
];
