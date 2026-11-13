import { useEffect, useState } from "react";
import type { SortData } from "../types";
import type { EngineProps } from "./types";
import { shuffle } from "../lib/utils";

export default function SortEngine({ data, ctx }: EngineProps<SortData>) {
  const [queue] = useState(() => shuffle(data.items));
  const [pos, setPos] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wrongBin, setWrongBin] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const item = queue[pos];
  const total = queue.length;

  useEffect(() => {
    ctx.progress(pos, total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, total]);

  const choose = (binId: string) => {
    if (!item || solved) return;
    if (item.bin === binId) {
      setSolved(true);
      ctx.hit(attempts === 0 ? 110 : 60);
      ctx.sfx.good();
    } else {
      setWrongBin(binId);
      setAttempts((a) => a + 1);
      ctx.miss();
      ctx.sfx.bad();
      window.setTimeout(() => setWrongBin(null), 450);
    }
  };

  const next = () => {
    if (pos + 1 >= total) {
      ctx.finish();
      return;
    }
    setPos(pos + 1);
    setSolved(false);
    setAttempts(0);
  };

  if (!item) return null;

  return (
    <div className="engine engine-sort">
      <div className="round-head">
        <span className="pill pill-ghost">
          Item {pos + 1} / {total}
        </span>
        <span className="muted sm">Sort each fact into the right pile</span>
      </div>

      <div className="sort-bins">
        {data.bins.map((bin) => {
          const isRight = solved && bin.id === item.bin;
          return (
            <button
              key={bin.id}
              type="button"
              className={`sort-bin ${isRight ? "sort-bin-right" : ""} ${
                wrongBin === bin.id ? "wrong" : ""
              }`}
              onClick={() => choose(bin.id)}
              disabled={solved}
            >
              <span className="sort-bin-label">{bin.label}</span>
              <span className="sort-bin-hint">{bin.hint}</span>
            </button>
          );
        })}
      </div>

      <div className={`sort-card ${solved ? "sort-card-ok" : ""}`}>
        <span className="sort-card-text">{item.text}</span>
      </div>

      {solved ? (
        <div className="feedback feedback-good">
          <strong>
            Filed under {data.bins.find((b) => b.id === item.bin)?.label}.
          </strong>
          <p>{item.why}</p>
          <button type="button" className="btn btn-primary" onClick={next}>
            {pos + 1 >= total ? "See results" : "Next item"}
          </button>
        </div>
      ) : (
        <p className="muted sm centered">
          {attempts > 0 ? "Not that pile — read the item again." : "Tap a pile to file this item."}
        </p>
      )}
    </div>
  );
}
