import { useEffect, useState } from "react";
import type { QuizData } from "../types";
import type { EngineProps } from "./types";

export default function QuizEngine({ data, ctx }: EngineProps<QuizData>) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [left, setLeft] = useState(data.timer);
  const [timedOut, setTimedOut] = useState(false);

  const question = data.questions[index];
  const total = data.questions.length;

  useEffect(() => {
    ctx.progress(index, total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  useEffect(() => {
    setLeft(data.timer);
    setPicked(null);
    setLocked(false);
    setTimedOut(false);
  }, [index, data.timer]);

  useEffect(() => {
    if (locked) return;
    if (left <= 0) {
      setLocked(true);
      setTimedOut(true);
      ctx.miss();
      ctx.sfx.bad();
      return;
    }
    const id = window.setTimeout(() => setLeft((v) => Math.max(0, v - 0.1)), 100);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, locked]);

  const choose = (i: number) => {
    if (locked) return;
    setPicked(i);
    setLocked(true);
    if (i === question.answer) {
      ctx.hit(100 + Math.round((left / data.timer) * 60));
      ctx.sfx.good();
    } else {
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
  };

  const timePct = Math.max(0, Math.min(100, (left / data.timer) * 100));
  const correct = picked === question.answer;

  return (
    <div className="engine engine-quiz">
      <div className="quiz-meta">
        <span className="pill pill-ghost">
          Question {index + 1} / {total}
        </span>
        <div className={`timer ${timePct < 30 ? "timer-low" : ""}`}>
          <span style={{ width: `${timePct}%` }} />
        </div>
      </div>

      <h2 className="question">{question.q}</h2>

      <div className={`options ${locked ? "options-locked" : ""}`}>
        {question.options.map((opt, i) => {
          const isAnswer = i === question.answer;
          const isPicked = picked === i;
          const state = locked
            ? isAnswer
              ? "right"
              : isPicked
                ? "wrong"
                : "muted"
            : "";
          return (
            <button
              key={opt}
              type="button"
              className={`option ${state}`}
              onClick={() => choose(i)}
              disabled={locked}
            >
              <span className="option-key">{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {locked && (
        <div className={`feedback ${correct ? "feedback-good" : "feedback-bad"}`}>
          <strong>
            {correct
              ? "Correct!"
              : timedOut
                ? "Time's up."
                : "Not quite — here's the thinking."}
          </strong>
          <p>{question.why}</p>
          <button type="button" className="btn btn-primary" onClick={next}>
            {index + 1 >= total ? "See results" : "Next question"}
          </button>
        </div>
      )}
    </div>
  );
}
