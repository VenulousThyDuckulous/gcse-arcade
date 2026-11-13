import { useEffect, useState } from "react";
import type { MatchData } from "../types";
import type { EngineProps } from "./types";
import { shuffle } from "../lib/utils";

export default function MatchEngine({ data, ctx }: EngineProps<MatchData>) {
  const [right, setRight] = useState(() => shuffle(data.pairs.map((p, i) => ({ i, text: p.right }))));
  const [selected, setSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const total = data.pairs.length;

  useEffect(() => {
    ctx.progress(matched.length, total);
    if (matched.length === total && total > 0) {
      const id = window.setTimeout(() => ctx.finish(), 600);
      return () => window.clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched.length, total]);

  const pickLeft = (i: number) => {
    if (matched.includes(i)) return;
    setSelected(i);
    ctx.sfx.tap();
  };

  const pickRight = (i: number) => {
    if (matched.includes(i) || selected === null) return;
    if (selected === i) {
      setMatched((m) => [...m, i]);
      setSelected(null);
      ctx.hit(120);
      ctx.sfx.good();
    } else {
      setWrong(i);
      ctx.miss();
      ctx.sfx.bad();
      window.setTimeout(() => setWrong(null), 480);
    }
  };

  const reset = () => {
    setRight(shuffle(data.pairs.map((p, i) => ({ i, text: p.right }))));
    setMatched([]);
    setSelected(null);
  };

  return (
    <div className="engine engine-match">
      <p className="engine-hint">{data.instruction}</p>
      <div className="match-grid">
        <div className="match-col">
          {data.pairs.map((pair, i) => (
            <button
              key={pair.left}
              type="button"
              className={`match-card match-left ${matched.includes(i) ? "matched" : ""} ${
                selected === i ? "selected" : ""
              }`}
              onClick={() => pickLeft(i)}
              disabled={matched.includes(i)}
            >
              {pair.left}
            </button>
          ))}
        </div>
        <div className="match-col">
          {right.map((item) => (
            <button
              key={item.text}
              type="button"
              className={`match-card match-right ${matched.includes(item.i) ? "matched" : ""} ${
                wrong === item.i ? "wrong" : ""
              }`}
              onClick={() => pickRight(item.i)}
              disabled={matched.includes(item.i)}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
      <div className="engine-footer">
        <span className="pill pill-ghost">
          {matched.length} / {total} pairs
        </span>
        <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
          Reshuffle
        </button>
      </div>
    </div>
  );
}
