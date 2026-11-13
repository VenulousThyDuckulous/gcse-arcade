import type { Game } from "../../types";

export const physicsGames: Game[] = [
  {
    id: "circuit-sprint",
    title: "Circuit Sprint",
    subjectId: "physics",
    topicId: "electricity",
    engine: "hotspot",
    tagline: "Six components, one circuit. Click the part that does the job.",
    emoji: "🔌",
    difficulty: 2,
    minutes: 3,
    data: {
      diagram: "circuit",
      tasks: [
        {
          prompt: "Click the ammeter.",
          answer: "ammeter",
          why: "An ammeter measures current in amperes and is connected in series with the component.",
        },
        {
          prompt: "Click the voltmeter.",
          answer: "voltmeter",
          why: "A voltmeter measures potential difference in volts and is connected in parallel across a component.",
        },
        {
          prompt: "Click the cell.",
          answer: "cell",
          why: "The cell transfers chemical energy into electrical energy, giving the circuit its potential difference.",
        },
        {
          prompt: "Click the component that transfers electrical energy into light.",
          answer: "bulb",
          why: "A filament bulb transfers energy by heating the filament until it glows — mostly wasted as heat.",
        },
        {
          prompt: "Click the resistor.",
          answer: "resistor",
          why: "A resistor opposes the flow of current, transferring energy to the surroundings by heating. Resistance = p.d. ÷ current.",
        },
        {
          prompt: "Click the switch that completes the circuit.",
          answer: "switch",
          why: "A closed switch completes the circuit so charge can flow. Open it and current stops everywhere in series.",
        },
      ],
    },
  },
  {
    id: "energy-equation-match",
    title: "Energy Equation Match",
    subjectId: "physics",
    topicId: "energy",
    engine: "match",
    tagline: "Eight equations, no sheet. Pair each one with what it gives you.",
    emoji: "⚙️",
    difficulty: 3,
    minutes: 4,
    data: {
      instruction: "Match each equation to the quantity it calculates",
      pairs: [
        { left: "E = ½mv²", right: "Kinetic energy" },
        { left: "E = mgh", right: "Gravitational potential energy" },
        { left: "E = mcΔθ", right: "Energy for a temperature change" },
        { left: "P = IV", right: "Electrical power" },
        { left: "E = Pt", right: "Energy transferred by a power over time" },
        { left: "Q = It", right: "Charge flow" },
        { left: "P = I²R", right: "Power dissipated by a resistor" },
        { left: "F = ke", right: "Force on a stretched spring" },
      ],
    },
  },
  {
    id: "em-spectrum-scramble",
    title: "EM Spectrum Scramble",
    subjectId: "physics",
    topicId: "waves",
    engine: "order",
    tagline: "Seven waves, one correct order. Gamma first — or is it?",
    emoji: "🌈",
    difficulty: 2,
    minutes: 3,
    data: {
      rounds: [
        {
          prompt: "Order the electromagnetic spectrum from shortest to longest wavelength.",
          items: [
            "Gamma rays",
            "X-rays",
            "Ultraviolet",
            "Visible light",
            "Infrared",
            "Microwaves",
            "Radio waves",
          ],
          note: "All EM waves travel at 3 × 10⁸ m/s in a vacuum. Shortest wavelength means highest frequency and most energy — which is why gamma and X-rays are ionising and dangerous.",
        },
      ],
    },
  },
];
