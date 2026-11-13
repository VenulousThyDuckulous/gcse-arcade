import type { Subject } from "../types";
import { subjects } from "../data/subjects";
import { games, gamesBySubject } from "../data";

interface Props {
  onPickSubject: (subjectId: string) => void;
  onSurprise: () => void;
  xp: number;
  level: number;
}

export default function Home({ onPickSubject, onSurprise, xp, level }: Props) {
  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">GCSE revision games · 2026 specifications</p>
        <h1 className="hero-title">
          Revise like it's
          <span className="hero-glow"> arcade hour</span>.
        </h1>
        <p className="hero-sub">
          Pick a subject, pick a topic, then play. {games.length} games covering the content that actually
          shows up in exams — with an explanation after every answer.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary btn-lg" href="#subjects">
            Choose a subject
          </a>
          <button type="button" className="btn btn-secondary btn-lg" onClick={onSurprise}>
            🎲 Surprise me
          </button>
        </div>
        <div className="hero-stats">
          <div>
            <strong>{games.length}</strong>
            <span>games</span>
          </div>
          <div>
            <strong>{subjects.length}</strong>
            <span>subjects</span>
          </div>
          <div>
            <strong>9</strong>
            <span>game types</span>
          </div>
          <div>
            <strong>{level}</strong>
            <span>your level</span>
          </div>
          <div>
            <strong>{xp}</strong>
            <span>XP earned</span>
          </div>
        </div>
      </section>

      <section id="subjects" className="subjects">
        <div className="section-head">
          <h2 className="section-title">Step 1 — pick a subject</h2>
          <p className="section-sub">Every game is mapped to a topic inside that subject.</p>
        </div>
        <div className="subject-grid">
          {subjects.map((subject: Subject) => {
            const count = gamesBySubject(subject.id).length;
            return (
              <button
                key={subject.id}
                type="button"
                className="subject-card"
                style={
                  {
                    "--accent": subject.accent,
                    "--accent2": subject.accent2,
                  } as React.CSSProperties
                }
                onClick={() => onPickSubject(subject.id)}
              >
                <span className="subject-emoji" aria-hidden="true">
                  {subject.emoji}
                </span>
                <span className="subject-body">
                  <span className="subject-name">{subject.name}</span>
                  <span className="subject-blurb">{subject.blurb}</span>
                  <span className="subject-meta">
                    <span>{count} games</span>
                    <span>{subject.topics.length} topics</span>
                  </span>
                  <span className="subject-spec">{subject.spec}</span>
                </span>
                <span className="subject-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="how">
        <h2 className="section-title">How it works</h2>
        <div className="how-grid">
          <div className="how-card">
            <span className="how-num">1</span>
            <h3>Pick a subject</h3>
            <p>Maths, the three sciences, English, History, Geography, Computer Science, French or RS.</p>
          </div>
          <div className="how-card">
            <span className="how-num">2</span>
            <h3>Pick a topic</h3>
            <p>Narrow it down — cell biology, bonding, the Cold War, binary. Nothing vague.</p>
          </div>
          <div className="how-card">
            <span className="how-num">3</span>
            <h3>Play the game</h3>
            <p>Streaks multiply your score. Every miss comes with the reason, so revision sticks.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
