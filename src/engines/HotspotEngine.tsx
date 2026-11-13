import { useEffect, useState } from "react";
import type { HotspotData } from "../types";
import type { EngineProps } from "./types";
import Diagram from "../components/diagrams";

export default function HotspotEngine({ data, ctx }: EngineProps<HotspotData>) {
  const [index, setIndex] = useState(0);
  const [found, setFound] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const task = data.tasks[index];
  const total = data.tasks.length;

  useEffect(() => {
    ctx.progress(index, total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  const pick = (id: string) => {
    if (done) return;
    if (id === task.answer) {
      setFound((f) => [...f, id]);
      setDone(true);
      ctx.hit(wrong.length === 0 ? 160 : 90);
      ctx.sfx.good();
    } else {
      setWrong((w) => (w.includes(id) ? w : [...w, id]));
      ctx.miss();
      ctx.sfx.bad();
    }
  };

  const next = () => {
    if (index + 1 >= total) {
      ctx.finish();
      return;
    }
    setIndex(index + 1);
    setDone(false);
    setFound([]);
    setWrong([]);
  };

  return (
    <div className="engine engine-hotspot">
      <div className="round-head">
        <span className="pill pill-ghost">
          Find {index + 1} / {total}
        </span>
        <span className="muted sm">Click the diagram</span>
      </div>
      <h2 className="question">{task.prompt}</h2>

      <div className="diagram-wrap">
        <Diagram id={data.diagram} onPick={pick} found={found} wrong={wrong} />
      </div>

      {done ? (
        <div className="feedback feedback-good">
          <strong>Found it.</strong>
          <p>{task.why}</p>
          <button type="button" className="btn btn-primary" onClick={next}>
            {index + 1 >= total ? "See results" : "Next target"}
          </button>
        </div>
      ) : (
        <p className="muted sm centered">
          {wrong.length > 0 ? "Not that one — try again, no penalty for a second look." : "Tap the part that matches the clue."}
        </p>
      )}
    </div>
  );
}
