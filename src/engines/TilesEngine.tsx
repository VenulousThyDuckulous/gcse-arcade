import { useEffect, useState } from "react";
import type { TileData } from "../types";
import type { EngineProps } from "./types";
import { shuffle } from "../lib/utils";

interface Tile {
  id: string;
  text: string;
}

function buildTiles(answer: string[], decoys: string[]): Tile[] {
  return shuffle([
    ...answer.map((text, i) => ({ id: `a${i}`, text })),
    ...decoys.map((text, i) => ({ id: `d${i}`, text })),
  ]);
}

export default function TilesEngine({ data, ctx }: EngineProps<TileData>) {
  const [round, setRound] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [placed, setPlaced] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(false);

  const current = data.rounds[round];
  const total = data.rounds.length;

  const startRound = (r: number) => {
    const item = data.rounds[r];
    setTiles(buildTiles(item.answer, item.decoys));
    setPlaced([]);
    setSolved(false);
    setAttempts(0);
    setShake(false);
  };

  useEffect(() => {
    startRound(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ctx.progress(round + (solved ? 1 : 0), total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, solved, total]);

  const line = placed.map((id) => tiles.find((t) => t.id === id)?.text ?? "");

  const add = (id: string) => {
    if (solved) return;
    setPlaced((p) => [...p, id]);
    ctx.sfx.tap();
  };

  const remove = (id: string) => {
    if (solved) return;
    setPlaced((p) => p.filter((x) => x !== id));
    ctx.sfx.tap();
  };

  const check = () => {
    const correct =
      line.length === current.answer.length && line.every((word, i) => word === current.answer[i]);
    if (correct) {
      setSolved(true);
      ctx.hit(attempts === 0 ? 210 : 80);
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
    if (round + 1 >= total) {
      ctx.finish();
      return;
    }
    const r = round + 1;
    setRound(r);
    startRound(r);
  };

  return (
    <div className="engine engine-tiles">
      <div className="round-head">
        <span className="pill pill-ghost">
          Sentence {round + 1} / {total}
        </span>
        <span className="muted sm">{current.answer.length} words</span>
      </div>
      <h2 className="question">{current.prompt}</h2>

      <div className={`tile-line ${shake ? "shake" : ""} ${solved ? "tile-line-ok" : ""}`}>
        {placed.length === 0 && <span className="empty-slots">Build your French sentence here…</span>}
        {placed.map((id) => (
          <button
            key={id}
            type="button"
            className="tile tile-placed"
            onClick={() => remove(id)}
            disabled={solved}
          >
            {tiles.find((t) => t.id === id)?.text}
          </button>
        ))}
      </div>

      <div className="tile-pool">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            className="tile"
            onClick={() => add(tile.id)}
            disabled={solved || placed.includes(tile.id)}
          >
            {tile.text}
          </button>
        ))}
      </div>

      {!solved ? (
        <div className="engine-footer">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setPlaced([])}
            disabled={placed.length === 0}
          >
            Clear
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={check}
            disabled={placed.length !== current.answer.length}
          >
            Check sentence
          </button>
        </div>
      ) : (
        <div className="feedback feedback-good">
          <strong>“{current.answer.join(" ")}”</strong>
          <p>{current.hint}</p>
          <button type="button" className="btn btn-primary" onClick={next}>
            {round + 1 >= total ? "See results" : "Next sentence"}
          </button>
        </div>
      )}
    </div>
  );
}
