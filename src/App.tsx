import { useEffect, useMemo, useState } from "react";
import { games, gamesBySubject, gameById } from "./data";
import { subjectById } from "./data/subjects";
import { isMuted, setMuted, sound } from "./lib/sound";
import { levelFor, loadProfile, saveProfile, type Profile } from "./lib/profile";
import Home from "./components/Home";
import SubjectView from "./components/SubjectView";
import GameShell, { type FinishPayload } from "./components/GameShell";
import type { Game } from "./types";

type Route =
  | { name: "home" }
  | { name: "subject"; subjectId: string; topicId: string | null }
  | { name: "game"; gameId: string; topicId: string | null };

export default function App() {
  const [profile, setProfile] = useState<Profile>(() => loadProfile());
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [muted, setMutedState] = useState<boolean>(() => isMuted());

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [route]);

  const level = levelFor(profile.xp);

  const record = ({ gameId, score, xp, streak }: FinishPayload) => {
    setProfile((prev) => ({
      xp: prev.xp + xp,
      plays: prev.plays + 1,
      bestStreak: Math.max(prev.bestStreak, streak),
      best: { ...prev.best, [gameId]: Math.max(prev.best[gameId] ?? 0, score) },
    }));
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
  };

  const activeGame: Game | undefined = route.name === "game" ? gameById(route.gameId) : undefined;

  const nextGameId = useMemo(() => {
    if (!activeGame) return null;
    const siblings = gamesBySubject(activeGame.subjectId);
    const i = siblings.findIndex((g) => g.id === activeGame.id);
    if (i === -1 || siblings.length < 2) return null;
    return siblings[(i + 1) % siblings.length].id;
  }, [activeGame]);

  const surprise = () => {
    const pick = games[Math.floor(Math.random() * games.length)];
    setRoute({ name: "game", gameId: pick.id, topicId: null });
    sound.tap();
  };

  return (
    <div className="app">
      <header className="site-header">
        <button
          type="button"
          className="brand"
          onClick={() => setRoute({ name: "home" })}
          aria-label="GCSE Arcade home"
        >
          <span className="brand-mark">🎮</span>
          <span className="brand-text">
            GCSE <em>Arcade</em>
          </span>
        </button>

        <div className="header-right">
          <div className="xp-chip" title={`${profile.xp} XP`}>
            <span className="xp-level">Lv {level.level}</span>
            <span className="xp-bar">
              <span style={{ width: `${Math.round((level.into / level.needed) * 100)}%` }} />
            </span>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleMute}
            aria-label={muted ? "Unmute sound" : "Mute sound"}
            title={muted ? "Sound off" : "Sound on"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </header>

      <main className="container">
        {route.name === "home" && (
          <Home
            xp={profile.xp}
            level={level.level}
            onPickSubject={(subjectId) => setRoute({ name: "subject", subjectId, topicId: null })}
            onSurprise={surprise}
          />
        )}

        {route.name === "subject" &&
          (() => {
            const subject = subjectById(route.subjectId);
            if (!subject) return <p>Subject not found.</p>;
            return (
              <SubjectView
                subject={subject}
                topicId={route.topicId}
                onTopic={(topicId) => setRoute({ ...route, topicId })}
                onPlay={(gameId) => setRoute({ name: "game", gameId, topicId: route.topicId })}
                onBack={() => setRoute({ name: "home" })}
              />
            );
          })()}

        {route.name === "game" &&
          (activeGame ? (
            <GameShell
              key={activeGame.id}
              game={activeGame}
              subjectName={subjectById(activeGame.subjectId)?.short ?? ""}
              topicName={
                subjectById(activeGame.subjectId)?.topics.find((t) => t.id === activeGame.topicId)?.name ??
                ""
              }
              onExit={() =>
                setRoute({ name: "subject", subjectId: activeGame.subjectId, topicId: route.topicId })
              }
              onNextGame={
                nextGameId
                  ? () => setRoute({ name: "game", gameId: nextGameId, topicId: route.topicId })
                  : null
              }
              onFinish={record}
            />
          ) : (
            <p>Game not found.</p>
          ))}
      </main>

      <footer className="site-footer">
        <p>
          Built for GCSE revision across AQA, Edexcel and OCR specifications. Every game is practice, not a
          past paper — always check answers against your own specification.
        </p>
        <p className="footer-meta">
          {games.length} games · {profile.plays} plays · best streak {profile.bestStreak}
        </p>
      </footer>
    </div>
  );
}
