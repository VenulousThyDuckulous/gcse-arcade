import { useEffect, useState } from "react";
import type { OrderData } from "../types";
import type { EngineProps } from "./types";
import { shuffle } from "../lib/utils";

export default function OrderEngine({ data, ctx }: EngineProps<OrderData>) {
  const [round, setRound] = useState(0);
  const [placed, setPlaced] = useState<number[]>([]);
  const [pool, setPool] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [shake, setShake] = useState(false);

  const current = data.rounds[round];
  const totalRounds = data.rounds.length;

  const startRound = (r: number) => {
    const items = data.rounds[r].items;
    setPool(shuffle(items.map((_, i) => i)));
    setPlaced([]);
    setAttempts(0);
    setSolved(false);
    setShake(false);
  };

  useEffect(() => {
    startRound(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const done = data.rounds.slice(0, round).length + (solved ? 1 : 0);
    ctx.progress(done, totalRounds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, solved, totalRounds]);

  const add = (i: number) => {
    if (solved) return;
    setPlaced((p) => [...p, i]);
    setPool((p) => p.filter((x) => x !== i));
    ctx.sfx.tap();
  };

  const remove = (i: number) => {
    if (solved) return;
    setPlaced((p) => p.filter((x) => x !== i));
    setPool((p) => [...p, i]);
    ctx.sfx.tap();
  };

  const check = () => {
    const correct = placed.every((v, i) => v === i) && placed.length === current.items.length;
    if (correct) {
      setSolved(true);
      ctx.hit(attempts === 0 ? 220 : 80);
      ctx.sfx.good();
    } else {
      setAttempts((a) => a + 1);
      setShake(true);
      ctx.miss();
      ctx.sfx.bad();
      window.setTimeout(() => setShake(false), 500);
    }
  };

  const next = () => {
    if (round + 1 >= totalRounds) {
      ctx.finish();
      return;
    }
    const r = round + 1;
    setRound(r);
    startRound(r);
  };

  return (
    <div className="engine engine-order">
      <div className="round-head">
        <span className="pill pill-ghost">
          Round {round + 1} / {totalRounds}
        </span>
      </div>
      <h2 className="question">{current.prompt}</h2>

      <div className={`order-slots ${shake ? "shake" : ""}`}>
        {placed.length === 0 && <p className="empty-slots">Tap the steps below to build the sequence…</p>}
        {placed.map((itemIndex, position) => (
          <button
            key={itemIndex}
            type="button"
            className={`slot ${solved ? "slot-ok" : ""}`}
            onClick={() => remove(itemIndex)}
            disabled={solved}
            title="Tap to remove"
          >
            <span className="slot-num">{position + 1}</span>
            <span>{current.items[itemIndex]}</span>
          </button>
        ))}
      </div>

      <div className="order-pool">
        {pool.map((itemIndex) => (
          <button
            key={itemIndex}
            type="button"
            className="pool-item"
            onClick={() => add(itemIndex)}
            disabled={solved}
          >
            {current.items[itemIndex]}
          </button>
        ))}
      </div>

      {!solved ? (
        <div className="engine-footer">
          <span className="muted sm">
            {placed.length}/{current.items.length} placed
          </span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={check}
            disabled={placed.length !== current.items.length}
          >
            Check order
          </button>
        </div>
      ) : (
        <div className="feedback feedback-good">
          <strong>Perfect sequence.</strong>
          <p>{current.note}</p>
          <button type="button" className="btn btn-primary" onClick={next}>
            {round + 1 >= totalRounds ? "See results" : "Next round"}
          </button>
        </div>
      )}
      {shake && !solved && <p className="shake-note">Not the right order yet — tap a step to move it back.</p>}
    </div>
  );
}
