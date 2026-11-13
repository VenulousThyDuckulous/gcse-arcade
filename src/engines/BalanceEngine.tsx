import { useEffect, useMemo, useState } from "react";
import type { BalanceData } from "../types";
import type { EngineProps } from "./types";

const SUBS: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
};

export function parseFormula(formula: string): Record<string, number> {
  const plain = formula.replace(/[₀-₉]/g, (c) => SUBS[c] ?? "");
  const out: Record<string, number> = {};
  const re = /([A-Z][a-z]?)(\d*)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(plain)) !== null) {
    const symbol = match[1];
    const count = match[2] ? Number(match[2]) : 1;
    out[symbol] = (out[symbol] ?? 0) + count;
  }
  return out;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export default function BalanceEngine({ data, ctx }: EngineProps<BalanceData>) {
  const [round, setRound] = useState(0);
  const [coefs, setCoefs] = useState<number[]>([]);
  const [status, setStatus] = useState<"idle" | "ok" | "bad">("idle");
  const [message, setMessage] = useState("");
  const [hint, setHint] = useState(false);
  const current = data.rounds[round];
  const total = data.rounds.length;

  useEffect(() => {
    setCoefs(current.species.map(() => 1));
    setStatus("idle");
    setMessage("");
    setHint(false);
    ctx.progress(round, total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, total]);

  const tally = useMemo(() => {
    const left: Record<string, number> = {};
    const right: Record<string, number> = {};
    current.species.forEach((s, i) => {
      const counts = parseFormula(s.formula);
      const target = s.side === "left" ? left : right;
      const coef = coefs[i] ?? 1;
      Object.entries(counts).forEach(([el, n]) => {
        target[el] = (target[el] ?? 0) + n * coef;
      });
    });
    const elements = Array.from(new Set([...Object.keys(left), ...Object.keys(right)]));
    const balanced = elements.every((el) => (left[el] ?? 0) === (right[el] ?? 0));
    const divisor = coefs.reduce((acc, n) => gcd(acc, n), 0);
    return { left, right, elements, balanced, divisor };
  }, [current, coefs]);

  const bump = (i: number, delta: number) => {
    setStatus("idle");
    setCoefs((c) => c.map((v, idx) => (idx === i ? Math.min(9, Math.max(1, v + delta)) : v)));
    ctx.sfx.tap();
  };

  const check = () => {
    if (tally.balanced && tally.divisor === 1) {
      setStatus("ok");
      setMessage("Balanced. Every atom is accounted for, in the simplest whole-number ratio.");
      ctx.hit(260);
      ctx.sfx.good();
    } else if (tally.balanced) {
      setStatus("bad");
      setMessage("Balanced — but not in its simplest ratio. Divide every coefficient down.");
      ctx.miss();
      ctx.sfx.bad();
    } else {
      const wrong = tally.elements.filter((el) => (tally.left[el] ?? 0) !== (tally.right[el] ?? 0));
      setStatus("bad");
      setMessage(
        `Not yet: ${wrong
          .map((el) => `${el} is ${tally.left[el] ?? 0} on the left but ${tally.right[el] ?? 0} on the right`)
          .join("; ")}.`,
      );
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

  return (
    <div className="engine engine-balance">
      <div className="round-head">
        <span className="pill pill-ghost">
          Reaction {round + 1} / {total}
        </span>
        <span className="muted sm">{current.name}</span>
      </div>

      <div className="balance-board">
        {(["left", "right"] as const).map((side) => (
          <div className="balance-side" key={side}>
            {current.species
              .map((s, i) => ({ s, i }))
              .filter(({ s }) => s.side === side)
              .map(({ s, i }, position, arr) => (
                <div className="species" key={`${s.formula}-${i}`}>
                  <div className="coef-control">
                    <button
                      type="button"
                      aria-label={`decrease coefficient of ${s.formula}`}
                      onClick={() => bump(i, -1)}
                      disabled={status === "ok"}
                    >
                      −
                    </button>
                    <span className={`coef ${coefs[i] === s.coef ? "coef-right" : ""}`}>{coefs[i]}</span>
                    <button
                      type="button"
                      aria-label={`increase coefficient of ${s.formula}`}
                      onClick={() => bump(i, 1)}
                      disabled={status === "ok"}
                    >
                      +
                    </button>
                  </div>
                  <div className="formula">{s.formula}</div>
                  {position < arr.length - 1 && <span className="plus">+</span>}
                </div>
              ))}
            {side === "left" ? (
              <span className="arrow">→</span>
            ) : (
              <span className="arrow arrow-hidden">→</span>
            )}
          </div>
        ))}
      </div>

      <div className="atom-table">
        {tally.elements.map((el) => {
          const l = tally.left[el] ?? 0;
          const r = tally.right[el] ?? 0;
          return (
            <div className={`atom-row ${l === r ? "atom-ok" : ""}`} key={el}>
              <span className="atom-el">{el}</span>
              <span>{l}</span>
              <span className="atom-eq">/</span>
              <span>{r}</span>
            </div>
          );
        })}
      </div>

      {status !== "ok" ? (
        <div className="engine-footer">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setHint(true)}>
            {hint ? "Hint shown" : "Need a hint?"}
          </button>
          <button type="button" className="btn btn-primary" onClick={check}>
            Check equation
          </button>
        </div>
      ) : (
        <div className="feedback feedback-good">
          <strong>{message}</strong>
          <button type="button" className="btn btn-primary" onClick={next}>
            {round + 1 >= total ? "See results" : "Next reaction"}
          </button>
        </div>
      )}

      {status === "bad" && <p className="shake-note">{message}</p>}
      {hint && status !== "ok" && <p className="hint-line">💡 {current.hint}</p>}
    </div>
  );
}
