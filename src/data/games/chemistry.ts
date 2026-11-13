import type { Game } from "../../types";

export const chemistryGames: Game[] = [
  {
    id: "equation-balancer",
    title: "Equation Balancer",
    subjectId: "chemistry",
    topicId: "chemical-changes",
    engine: "balance",
    tagline: "Atoms cannot vanish. Turn the dials until both sides agree.",
    emoji: "🧪",
    difficulty: 2,
    minutes: 5,
    data: {
      rounds: [
        {
          name: "Hydrogen burns in oxygen",
          hint: "Water is H₂O, so you need two H₂ for every O₂.",
          species: [
            { formula: "H₂", coef: 2, side: "left" },
            { formula: "O₂", coef: 1, side: "left" },
            { formula: "H₂O", coef: 2, side: "right" },
          ],
        },
        {
          name: "Magnesium burns in oxygen",
          hint: "Start with MgO: one Mg and one O on the right, but oxygen comes in pairs.",
          species: [
            { formula: "Mg", coef: 2, side: "left" },
            { formula: "O₂", coef: 1, side: "left" },
            { formula: "MgO", coef: 2, side: "right" },
          ],
        },
        {
          name: "Methane burns",
          hint: "Four hydrogen atoms need two H₂O molecules on the right.",
          species: [
            { formula: "CH₄", coef: 1, side: "left" },
            { formula: "O₂", coef: 2, side: "left" },
            { formula: "CO₂", coef: 1, side: "right" },
            { formula: "H₂O", coef: 2, side: "right" },
          ],
        },
        {
          name: "Sodium reacts with water",
          hint: "Sodium hydroxide and hydrogen: balance the hydrogen last.",
          species: [
            { formula: "Na", coef: 2, side: "left" },
            { formula: "H₂O", coef: 2, side: "left" },
            { formula: "NaOH", coef: 2, side: "right" },
            { formula: "H₂", coef: 1, side: "right" },
          ],
        },
        {
          name: "Sulfuric acid neutralises sodium hydroxide",
          hint: "Two OH⁻ are needed to neutralise the two H⁺ from H₂SO₄.",
          species: [
            { formula: "H₂SO₄", coef: 1, side: "left" },
            { formula: "NaOH", coef: 2, side: "left" },
            { formula: "Na₂SO₄", coef: 1, side: "right" },
            { formula: "H₂O", coef: 2, side: "right" },
          ],
        },
        {
          name: "Iron rusts",
          hint: "Iron(III) oxide is Fe₂O₃, so you need an even number of iron atoms.",
          species: [
            { formula: "Fe", coef: 4, side: "left" },
            { formula: "O₂", coef: 3, side: "left" },
            { formula: "Fe₂O₃", coef: 2, side: "right" },
          ],
        },
      ],
    },
  },
  {
    id: "bonding-bins",
    title: "Bonding Bins",
    subjectId: "chemistry",
    topicId: "bonding",
    engine: "sort",
    tagline: "Ionic, covalent or metallic? Eight substances and properties to file.",
    emoji: "🔗",
    difficulty: 2,
    minutes: 4,
    data: {
      bins: [
        { id: "ionic", label: "Ionic", hint: "Metal + non-metal, electrons transferred" },
        { id: "covalent", label: "Covalent", hint: "Non-metals sharing electrons" },
        { id: "metallic", label: "Metallic", hint: "Delocalised electrons in a lattice" },
      ],
      items: [
        {
          text: "Sodium chloride",
          bin: "ionic",
          why: "Na⁺ and Cl⁻ ions held in a giant ionic lattice. High melting point, conducts only when molten or dissolved.",
        },
        {
          text: "Magnesium oxide",
          bin: "ionic",
          why: "Mg²⁺ and O²⁻ ions. The 2+ and 2- charges make the electrostatic attraction very strong, so it melts at over 2800 °C.",
        },
        {
          text: "Water",
          bin: "covalent",
          why: "Two O–H covalent bonds. Simple molecular, so weak intermolecular forces give a low melting point.",
        },
        {
          text: "Carbon dioxide",
          bin: "covalent",
          why: "O=C=O, a simple molecule with no overall charge and no free electrons — it does not conduct electricity.",
        },
        {
          text: "Diamond",
          bin: "covalent",
          why: "Each carbon is covalently bonded to four others in a giant covalent structure. Very hard, very high melting point.",
        },
        {
          text: "Copper",
          bin: "metallic",
          why: "A lattice of Cu²⁺ ions with delocalised electrons that carry charge — which is why it conducts even as a solid.",
        },
        {
          text: "Conducts electricity when solid",
          bin: "metallic",
          why: "Only metallic and graphite structures have delocalised electrons free to move in the solid state.",
        },
        {
          text: "Made by transferring electrons",
          bin: "ionic",
          why: "Metal atoms lose electrons and non-metal atoms gain them, forming oppositely charged ions.",
        },
      ],
    },
  },
  {
    id: "reactivity-rumble",
    title: "Reactivity Rumble",
    subjectId: "chemistry",
    topicId: "chemical-changes",
    engine: "order",
    tagline: "Rank the metals from most to least reactive. Get one wrong and it hurts.",
    emoji: "💥",
    difficulty: 2,
    minutes: 3,
    data: {
      rounds: [
        {
          prompt: "Put the reactivity series in order, most reactive first.",
          items: [
            "Potassium (K)",
            "Sodium (Na)",
            "Calcium (Ca)",
            "Magnesium (Mg)",
            "Aluminium (Al)",
            "Zinc (Zn)",
            "Iron (Fe)",
            "Copper (Cu)",
            "Gold (Au)",
          ],
          note: "A more reactive metal displaces a less reactive one from its salt: zinc + copper sulfate → zinc sulfate + copper. Gold sits at the bottom, which is why it is found native.",
        },
      ],
    },
  },
];
