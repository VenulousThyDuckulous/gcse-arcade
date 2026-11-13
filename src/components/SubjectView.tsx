import type { Game, Subject } from "../types";
import { gamesBySubject, gamesByTopic, engineNames } from "../data";
import { loadProfile } from "../lib/profile";
import { formatScore } from "../lib/utils";

interface Props {
  subject: Subject;
  topicId: string | null;
  onTopic: (topicId: string | null) => void;
  onPlay: (gameId: string) => void;
  onBack: () => void;
}

function Difficulty({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="diff" title={`Difficulty ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <i key={n} className={n <= level ? "dot dot-on" : "dot"} />
      ))}
    </span>
  );
}

export default function SubjectView({ subject, topicId, onTopic, onPlay, onBack }: Props) {
  const all = gamesBySubject(subject.id);
  const list: Game[] = topicId ? gamesByTopic(subject.id, topicId) : all;
  const profile = loadProfile();
  const topicName = subject.topics.find((t) => t.id === topicId)?.name ?? "All topics";

  return (
    <div className="subject-view">
      <button type="button" className="back-link" onClick={onBack}>
        ← All subjects
      </button>

      <header
        className="subject-hero"
        style={
          { "--accent": subject.accent, "--accent2": subject.accent2 } as React.CSSProperties
        }
      >
        <span className="subject-hero-emoji" aria-hidden="true">
          {subject.emoji}
        </span>
        <div>
          <h1>{subject.name}</h1>
          <p>{subject.blurb}</p>
          <p className="subject-spec">{subject.spec}</p>
        </div>
      </header>

      <section className="step">
        <h2 className="section-title">
          <span className="step-num">1</span> Pick a topic
        </h2>
        <div className="topic-row">
          <button
            type="button"
            className={`topic-chip ${topicId === null ? "topic-on" : ""}`}
            onClick={() => onTopic(null)}
          >
            All topics <span className="chip-count">{all.length}</span>
          </button>
          {subject.topics.map((topic) => {
            const count = gamesByTopic(subject.id, topic.id).length;
            return (
              <button
                key={topic.id}
                type="button"
                className={`topic-chip ${topicId === topic.id ? "topic-on" : ""}`}
                onClick={() => onTopic(topic.id)}
              >
                {topic.name} <span className="chip-count">{count}</span>
              </button>
            );
          })}
        </div>
        {topicId && (
          <p className="topic-blurb">{subject.topics.find((t) => t.id === topicId)?.blurb}</p>
        )}
      </section>

      <section className="step">
        <h2 className="section-title">
          <span className="step-num">2</span> Pick a game
        </h2>
        <p className="section-sub">
          {list.length} game{list.length === 1 ? "" : "s"} in {topicName.toLowerCase()}
        </p>
        <div className="game-grid">
          {list.map((game) => {
            const best = profile.best[game.id] ?? 0;
            return (
              <button key={game.id} type="button" className="game-card" onClick={() => onPlay(game.id)}>
                <span className="game-emoji" aria-hidden="true">
                  {game.emoji}
                </span>
                <span className="game-body">
                  <span className="game-title">{game.title}</span>
                  <span className="game-tagline">{game.tagline}</span>
                  <span className="game-meta">
                    <span className="badge">{engineNames[game.engine]}</span>
                    <Difficulty level={game.difficulty} />
                    <span className="muted sm">{game.minutes} min</span>
                  </span>
                  {best > 0 && <span className="game-best">Best {formatScore(best)}</span>}
                </span>
                <span className="game-play">Play ▶</span>
              </button>
            );
          })}
        </div>
        {list.length === 0 && (
          <p className="empty-note">No games in this topic yet — try another topic in {subject.name}.</p>
        )}
      </section>
    </div>
  );
}
