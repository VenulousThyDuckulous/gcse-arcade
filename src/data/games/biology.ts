import type { Game } from "../../types";

export const biologyGames: Game[] = [
  {
    id: "cell-labeller",
    title: "Cell Labeller",
    subjectId: "biology",
    topicId: "cells",
    engine: "hotspot",
    tagline: "Click the right organelle before the bell. Five jobs, one cell.",
    emoji: "🔬",
    difficulty: 1,
    minutes: 3,
    data: {
      diagram: "cell",
      tasks: [
        {
          prompt: "Click the nucleus.",
          answer: "nucleus",
          why: "The nucleus holds the DNA and controls the cell's activities, including which proteins are made.",
        },
        {
          prompt: "Click the site of most aerobic respiration.",
          answer: "mitochondria",
          why: "Mitochondria release energy from glucose by aerobic respiration. Muscle cells are packed with them.",
        },
        {
          prompt: "Click the part that controls what enters and leaves the cell.",
          answer: "membrane",
          why: "The cell membrane is partially permeable, so it controls the movement of substances in and out.",
        },
        {
          prompt: "Click where proteins are synthesised.",
          answer: "ribosome",
          why: "Ribosomes are the site of protein synthesis — they build proteins from amino acids.",
        },
        {
          prompt: "Click the jelly-like fluid where most chemical reactions happen.",
          answer: "cytoplasm",
          why: "The cytoplasm contains enzymes and is where most of the cell's chemical reactions take place.",
        },
      ],
    },
  },
  {
    id: "mitosis-mayhem",
    title: "Mitosis Mayhem",
    subjectId: "biology",
    topicId: "cells",
    engine: "order",
    tagline: "One cell becomes two. Get the stages in the right order first time.",
    emoji: "🧫",
    difficulty: 2,
    minutes: 3,
    data: {
      rounds: [
        {
          prompt: "Order the stages of the cell cycle, starting with interphase.",
          items: [
            "Interphase — DNA replicates and the cell grows",
            "Prophase — chromosomes condense and the nuclear membrane breaks down",
            "Metaphase — chromosomes line up along the middle of the cell",
            "Anaphase — spindle fibres pull chromatids to opposite poles",
            "Telophase — new nuclei form around each set of chromosomes",
            "Cytokinesis — the cytoplasm divides and two identical cells form",
          ],
          note: "Mitosis produces two genetically identical diploid cells. That is how growth and repair work — and why a cut heals with the same DNA.",
        },
      ],
    },
  },
  {
    id: "enzyme-sorter",
    title: "Enzyme Sorter",
    subjectId: "biology",
    topicId: "organisation",
    engine: "sort",
    tagline: "Enzymes are fussy about their substrate. Sort nine digestion facts.",
    emoji: "🥪",
    difficulty: 2,
    minutes: 4,
    data: {
      bins: [
        { id: "starch", label: "Starch", hint: "Broken into sugars" },
        { id: "protein", label: "Protein", hint: "Broken into amino acids" },
        { id: "fat", label: "Fat", hint: "Broken into fatty acids and glycerol" },
      ],
      items: [
        {
          text: "Amylase",
          bin: "starch",
          why: "Amylase is a carbohydrase that breaks starch down into maltose. It is made in the salivary glands and pancreas.",
        },
        {
          text: "Maltose",
          bin: "starch",
          why: "Maltose is the sugar produced when starch is digested. Maltase then breaks it into glucose.",
        },
        {
          text: "Pepsin",
          bin: "protein",
          why: "Pepsin is a protease made in the stomach. It works best at pH 2, which is why stomach acid helps it.",
        },
        {
          text: "Protease",
          bin: "protein",
          why: "Proteases break proteins into amino acids, which are absorbed and reassembled into human proteins.",
        },
        {
          text: "Amino acids",
          bin: "protein",
          why: "Amino acids are the products of protein digestion — the monomers used to build new proteins.",
        },
        {
          text: "Lipase",
          bin: "fat",
          why: "Lipase breaks lipids into fatty acids and glycerol. It is made in the pancreas and small intestine.",
        },
        {
          text: "Fatty acids and glycerol",
          bin: "fat",
          why: "These are the products of lipid digestion. They are absorbed in the small intestine and reassembled.",
        },
        {
          text: "Bile — emulsifies this nutrient first",
          bin: "fat",
          why: "Bile is not an enzyme. It breaks fat into smaller droplets (emulsification), increasing the surface area for lipase.",
        },
      ],
    },
  },
];
