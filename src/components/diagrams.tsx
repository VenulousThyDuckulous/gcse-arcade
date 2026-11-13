import type { DiagramId } from "../types";

export interface DiagramProps {
  onPick: (id: string) => void;
  found: string[];
  wrong: string[];
}

interface Spot {
  id: string;
  x: number;
  y: number;
  r: number;
  label: string;
}

const CELL_SPOTS: Spot[] = [
  { id: "membrane", x: 367, y: 155, r: 16, label: "cell membrane" },
  { id: "cytoplasm", x: 312, y: 205, r: 26, label: "cytoplasm" },
  { id: "nucleus", x: 155, y: 130, r: 38, label: "nucleus" },
  { id: "mitochondria", x: 274, y: 104, r: 30, label: "mitochondria" },
  { id: "ribosome", x: 128, y: 218, r: 26, label: "ribosome" },
];

const CIRCUIT_SPOTS: Spot[] = [
  { id: "bulb", x: 200, y: 70, r: 24, label: "bulb" },
  { id: "resistor", x: 270, y: 70, r: 26, label: "resistor" },
  { id: "ammeter", x: 350, y: 150, r: 26, label: "ammeter" },
  { id: "cell", x: 140, y: 230, r: 26, label: "cell" },
  { id: "switch", x: 248, y: 230, r: 26, label: "switch" },
  { id: "voltmeter", x: 270, y: 120, r: 24, label: "voltmeter" },
];

interface AngleSpot {
  id: string;
  x: number;
  y: number;
  num: string;
}

const ANGLE_SPOTS: AngleSpot[] = [
  { id: "1", x: 143, y: 112, num: "1" },
  { id: "2", x: 215, y: 112, num: "2" },
  { id: "3", x: 215, y: 172, num: "3" },
  { id: "4", x: 143, y: 172, num: "4" },
  { id: "5", x: 228, y: 212, num: "5" },
  { id: "6", x: 300, y: 212, num: "6" },
  { id: "7", x: 300, y: 272, num: "7" },
  { id: "8", x: 228, y: 272, num: "8" },
];

function spotClass(id: string, found: string[], wrong: string[]): string {
  if (found.includes(id)) return "spot spot-found";
  if (wrong.includes(id)) return "spot spot-wrong";
  return "spot";
}

function CellDiagram({ onPick, found, wrong }: DiagramProps) {
  return (
    <svg className="diagram" viewBox="0 0 400 310" role="img" aria-label="Animal cell diagram">
      <defs>
        <radialGradient id="cyto" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#2b3f7a" />
          <stop offset="100%" stopColor="#1a2550" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="155" rx="172" ry="118" fill="url(#cyto)" stroke="#7ef0c4" strokeWidth="5" />
      <circle cx="155" cy="130" r="45" fill="#8b6bff" fillOpacity="0.75" stroke="#c9b6ff" strokeWidth="3" />
      <circle cx="155" cy="130" r="16" fill="#38226b" />
      <g opacity="0.95">
        <ellipse cx="274" cy="104" rx="36" ry="20" fill="#ffb703" fillOpacity="0.85" />
        <path d="M247 104 q9 -11 18 0 q9 11 18 0 q9 -11 18 0" fill="none" stroke="#8a5a00" strokeWidth="3" />
      </g>
      <g fill="#7ee0ff">
        <circle cx="118" cy="212" r="6" />
        <circle cx="138" cy="224" r="6" />
        <circle cx="130" cy="200" r="6" />
        <circle cx="152" cy="212" r="6" />
      </g>
      <path d="M232 214 q14 -16 28 0 q-14 16 -28 0" fill="#57d9a3" fillOpacity="0.5" />
      {CELL_SPOTS.map((s) => (
        <circle
          key={s.id}
          cx={s.x}
          cy={s.y}
          r={s.r}
          className={spotClass(s.id, found, wrong)}
          onClick={() => onPick(s.id)}
          tabIndex={0}
          role="button"
          aria-label={`Click ${s.label}`}
        />
      ))}
    </svg>
  );
}

function CircuitDiagram({ onPick, found, wrong }: DiagramProps) {
  return (
    <svg className="diagram" viewBox="0 0 420 300" role="img" aria-label="Circuit diagram">
      <g stroke="#ffd166" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M70 70 H350 V230 H70 Z" />
        <path d="M252 70 V120 H288 V70" />
      </g>

      {/* cell */}
      <g stroke="#7ee0ff" strokeWidth="5" strokeLinecap="round">
        <line x1="128" y1="214" x2="128" y2="246" />
        <line x1="140" y1="222" x2="140" y2="238" />
        <line x1="152" y1="214" x2="152" y2="246" />
      </g>

      {/* switch (closed) */}
      <g stroke="#ff9f45" strokeWidth="5" strokeLinecap="round">
        <line x1="232" y1="230" x2="264" y2="230" />
        <circle cx="232" cy="230" r="4" fill="#ff9f45" />
        <circle cx="264" cy="230" r="4" fill="#ff9f45" />
      </g>

      {/* bulb */}
      <circle cx="200" cy="70" r="17" fill="none" stroke="#ffe066" strokeWidth="4" />
      <path d="M190 60 L210 80 M210 60 L190 80" stroke="#ffe066" strokeWidth="3" />

      {/* resistor */}
      <rect x="250" y="61" width="40" height="18" fill="#1a2550" stroke="#ff7b9c" strokeWidth="4" />

      {/* ammeter */}
      <circle cx="350" cy="150" r="19" fill="#101a3a" stroke="#7ee0ff" strokeWidth="4" />
      <text x="350" y="157" textAnchor="middle" fill="#7ee0ff" fontSize="18" fontFamily="inherit">
        A
      </text>

      {/* voltmeter */}
      <circle cx="270" cy="120" r="18" fill="#101a3a" stroke="#c9b6ff" strokeWidth="4" />
      <text x="270" y="127" textAnchor="middle" fill="#c9b6ff" fontSize="17" fontFamily="inherit">
        V
      </text>

      {CIRCUIT_SPOTS.map((s) => (
        <circle
          key={s.id}
          cx={s.x}
          cy={s.y}
          r={s.r}
          className={spotClass(s.id, found, wrong)}
          onClick={() => onPick(s.id)}
          tabIndex={0}
          role="button"
          aria-label={`Click ${s.label}`}
        />
      ))}
    </svg>
  );
}

function AnglesDiagram({ onPick, found, wrong }: DiagramProps) {
  return (
    <svg className="diagram" viewBox="0 0 400 320" role="img" aria-label="Parallel lines cut by a transversal">
      <line x1="50" y1="140" x2="360" y2="140" stroke="#7ee0ff" strokeWidth="4" />
      <line x1="50" y1="240" x2="360" y2="240" stroke="#7ee0ff" strokeWidth="4" />
      <line x1="110" y1="55" x2="345" y2="331" stroke="#ff9f45" strokeWidth="4" />
      <path d="M352 140 l10 -6 M352 140 l10 6" stroke="#7ee0ff" strokeWidth="3" fill="none" />
      <path d="M352 240 l10 -6 M352 240 l10 6" stroke="#7ee0ff" strokeWidth="3" fill="none" />
      {ANGLE_SPOTS.map((s) => (
        <g key={s.id} className={spotClass(s.id, found, wrong)} onClick={() => onPick(s.id)}>
          <circle cx={s.x} cy={s.y} r="17" className="angle-chip" />
          <text x={s.x} y={s.y + 6} textAnchor="middle" className="angle-num">
            {s.num}
          </text>
        </g>
      ))}
      <text x="60" y="128" fill="#7ee0ff" fontSize="13" fontFamily="inherit" opacity="0.7">
        A
      </text>
      <text x="60" y="262" fill="#7ee0ff" fontSize="13" fontFamily="inherit" opacity="0.7">
        B
      </text>
    </svg>
  );
}

export default function Diagram({ id, ...rest }: DiagramProps & { id: DiagramId }) {
  if (id === "cell") return <CellDiagram {...rest} />;
  if (id === "circuit") return <CircuitDiagram {...rest} />;
  return <AnglesDiagram {...rest} />;
}
