import { useEffect, useState } from "react";
import type { GraphData, GraphShapeId } from "../types";
import type { EngineProps } from "./types";
import GraphShape from "../components/GraphShape";

export default function GraphEngine({ data, ctx }: EngineProps<GraphData>) {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<GraphShapeId | null>(null);
  const current = data.rounds[round];
  const total = data.rounds.length;

  useEffect(() => {
    ctx.progress(round, total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, total]);

  useEffect(() => {
    setPicked(null);
  }, [round]);

  const choose = (shape: GraphShapeId) => {
    if (picked) return;
    setPicked(shape);
    if (shape === current.answer) {
      ctx.hit(170);
      ctx.sfx.good();
    } else {
      ctx.miss();
      ctx.sfx.bad();
    }
  };

  const next = () => {
    if (round + 1 >= total) {
      ctx.finish();
      return;
    }
    setRound(round + 1);
  };

  const correct = picked === current.answer;

  return (
    <div className="engine engine-graph">
      <div className="round-head">
        <span className="pill pill-ghost">
          Clue {round + 1} / {total}
        </span>
      </div>
      <h2 className="question">{current.prompt}</h2>

      <div className="graph-grid" style={{ gridTemplateColumns: `repeat(${Math.min(4, current.options.length)}, 1fr)` }}>
        {current.options.map((shape, i) => {
          const state =
            picked === null ? "" : shape === current.answer ? "right" : shape === picked ? "wrong" : "muted";
          return (
            <button
              key={shape}
              type="button"
              className={`graph-card ${state}`}
              onClick={() => choose(shape)}
              disabled={picked !== null}
            >
              <GraphShape shape={shape} />
              <span className="graph-letter">{String.fromCharCode(65 + i)}</span>
            </button>
          );
        })}
      </div>

      {picked && (
        <div className={`feedback ${correct ? "feedback-good" : "feedback-bad"}`}>
          <strong>{correct ? "Read it perfectly." : "Not that shape — the answer is highlighted."}</strong>
          <p>{current.why}</p>
          <button type="button" className="btn btn-primary" onClick={next}>
            {round + 1 >= total ? "See results" : "Next clue"}
          </button>
        </div>
      )}
    </div>
  );
}
