import type { GraphShapeId } from "../types";

const PYRAMIDS: Record<string, number[]> = {
  // widths from bottom row to top row
  "pyramid-wide": [46, 44, 40, 35, 29, 22, 15, 9],
  "pyramid-narrow": [15, 17, 19, 23, 27, 30, 26, 20],
  barrel: [21, 23, 25, 26, 26, 24, 21, 17],
};

export default function GraphShape({ shape }: { shape: GraphShapeId }) {
  const isPyramid = shape.startsWith("pyramid") || shape === "barrel";

  return (
    <svg className="graph-svg" viewBox="0 0 150 115" role="img" aria-label="graph option">
      {isPyramid ? (
        <>
          <line x1="75" y1="8" x2="75" y2="108" stroke="currentColor" strokeOpacity="0.25" />
          <line x1="15" y1="108" x2="135" y2="108" stroke="currentColor" strokeOpacity="0.25" />
          {(PYRAMIDS[shape] ?? []).map((w, i) => (
            <rect
              key={i}
              x={75 - w / 2}
              y={100 - i * 11.5}
              width={w}
              height={8.5}
              rx={2.5}
              fill="currentColor"
              fillOpacity={0.55 + i * 0.04}
            />
          ))}
        </>
      ) : (
        <>
          <line x1="22" y1="10" x2="22" y2="98" stroke="currentColor" strokeOpacity="0.35" />
          <line x1="22" y1="98" x2="138" y2="98" stroke="currentColor" strokeOpacity="0.35" />
          {shape === "line-up" && (
            <line x1="28" y1="90" x2="128" y2="18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          )}
          {shape === "line-down" && (
            <line x1="28" y1="18" x2="128" y2="90" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          )}
          {shape === "parabola" && (
            <path
              d="M30 20 Q75 118 120 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}
          {shape === "curve-up" && (
            <path
              d="M26 92 C60 92 95 78 124 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}
          {shape === "curve-down" && (
            <path
              d="M26 16 C60 16 95 32 124 92"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}
          {shape === "reciprocal" && (
            <path
              d="M30 12 C50 58 58 82 124 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}
          {shape === "flat-shape" && (
            <line x1="28" y1="56" x2="128" y2="56" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          )}
        </>
      )}
    </svg>
  );
}
