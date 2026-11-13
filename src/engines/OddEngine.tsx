import { useEffect, useState } from "react";
import type { OddData } from "../types";
import type { EngineProps } from "./types";

export default function OddEngine({ data, ctx }: EngineProps<OddData>) {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const current = data.rounds[round];
  const total = data.rounds.length;

  useEffect(() => {
    ctx.progress(round, total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, total]);

  useEffect(() => {
    setPicked(null);
  }, [round]);

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === current.answer) {
      ctx.hit(160);
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
    <div className="engine engine-odd">
      <div className="round-head">
        <span className="pill pill-ghost">
          Round {round + 1} / {total}
        </span>
      </div>
      <h2 className="question">{current.prompt}</h2>

      <div className="odd-grid">
        {current.options.map((opt, i) => {
          const state =
            picked === null ? "" : i === current.answer ? "right" : i === picked ? "wrong" : "muted";
          return (
            <button
              key={opt}
              type="button"
              className={`odd-card ${state}`}
              onClick={() => choose(i)}
              disabled={picked !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className={`feedback ${correct ? "feedback-good" : "feedback-bad"}`}>
          <strong>{correct ? "Spotted it." : "That one fits — the odd one out is highlighted."}</strong>
          <p>{current.why}</p>
          <button type="button" className="btn btn-primary" onClick={next}>
            {round + 1 >= total ? "See results" : "Next round"}
          </button>
        </div>
      )}
    </div>
  );
}
