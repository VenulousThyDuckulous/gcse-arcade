import { useMemo, useRef, useState } from "react";
import type {
  BalanceData,
  Game,
  GraphData,
  HotspotData,
  MatchData,
  OddData,
  OrderData,
  QuizData,
  SortData,
  TileData,
} from "../types";
import { engineNames } from "../data";
import { levelFor, loadProfile } from "../lib/profile";
import { sound } from "../lib/sound";
import { formatScore } from "../lib/utils";
import type { EngineCtx } from "../engines/types";
import QuizEngine from "../engines/QuizEngine";
import MatchEngine from "../engines/MatchEngine";
import OrderEngine from "../engines/OrderEngine";
import OddEngine from "../engines/OddEngine";
import BalanceEngine from "../engines/BalanceEngine";
import TilesEngine from "../engines/TilesEngine";
import GraphEngine from "../engines/GraphEngine";
import SortEngine from "../engines/SortEngine";
import HotspotEngine from "../engines/HotspotEngine";

export interface FinishPayload {
  gameId: string;
  score: number;
  accuracy: number;
  xp: number;
  streak: number;
}

interface Props {
  game: Game;
  subjectName: string;
  topicName: string;
  onExit: () => void;
  onNextGame: (() => void) | null;
  onFinish: (payload: FinishPayload) => void;
}

interface Result {
  score: number;
  hits: number;
  misses: number;
  accuracy: number;
  xp: number;
  bestStreak: number;
  isBest: boolean;
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        duration: 2.2 + Math.random() * 1.6,
        color: ["#ff5d8f", "#ffd166", "#4fa8ff", "#39d98a", "#c77dff"][i % 5],
        rotate: Math.random() * 360,
      })),
    [],
  );
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background: p.color,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function GameShell({ game, subjectName, topicName, onExit, onNextGame, onFinish }: Props) {
  const [attempt, setAttempt] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [progress, setProgress] = useState({ done: 0, total: 1 });
  const [result, setResult] = useState<Result | null>(null);

  const scoreRef = useRef(0);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);
  const multRef = useRef(1);

  const hit = (points = 100) => {
    const gained = Math.round(points * multRef.current);
    scoreRef.current += gained;
    hitsRef.current += 1;
    streakRef.current += 1;
    bestStreakRef.current = Math.max(bestStreakRef.current, streakRef.current);
    multRef.current = 1 + Math.min(4, Math.floor(streakRef.current / 3));
    setScore(scoreRef.current);
    setStreak(streakRef.current);
    setMultiplier(multRef.current);
  };

  const miss = () => {
    missesRef.current += 1;
    streakRef.current = 0;
    multRef.current = 1;
    setStreak(0);
    setMultiplier(1);
  };

  const finish = () => {
    const hits = hitsRef.current;
    const misses = missesRef.current;
    const total = hits + misses;
    const accuracy = total === 0 ? 0 : Math.round((hits / total) * 100);
    const xp = Math.round(scoreRef.current / 10) + (accuracy === 100 ? 30 : 0);
    const previousBest = loadProfile().best[game.id] ?? 0;
    setResult({
      score: scoreRef.current,
      hits,
      misses,
      accuracy,
      xp,
      bestStreak: bestStreakRef.current,
      isBest: scoreRef.current > previousBest,
    });
    onFinish({ gameId: game.id, score: scoreRef.current, accuracy, xp, streak: bestStreakRef.current });
    sound.win();
  };

  const restart = () => {
    scoreRef.current = 0;
    hitsRef.current = 0;
    missesRef.current = 0;
    streakRef.current = 0;
    bestStreakRef.current = 0;
    multRef.current = 1;
    setScore(0);
    setStreak(0);
    setMultiplier(1);
    setProgress({ done: 0, total: 1 });
    setResult(null);
    setAttempt((a) => a + 1);
    sound.tap();
  };

  const ctx: EngineCtx = {
    hit,
    miss,
    finish,
    progress: (done, total) => setProgress({ done, total }),
    sfx: sound,
  };

  const renderEngine = () => {
    switch (game.engine) {
      case "quiz":
        return <QuizEngine data={game.data as QuizData} ctx={ctx} />;
      case "match":
        return <MatchEngine data={game.data as MatchData} ctx={ctx} />;
      case "order":
        return <OrderEngine data={game.data as OrderData} ctx={ctx} />;
      case "odd":
        return <OddEngine data={game.data as OddData} ctx={ctx} />;
      case "balance":
        return <BalanceEngine data={game.data as BalanceData} ctx={ctx} />;
      case "tiles":
        return <TilesEngine data={game.data as TileData} ctx={ctx} />;
      case "graph":
        return <GraphEngine data={game.data as GraphData} ctx={ctx} />;
      case "sort":
        return <SortEngine data={game.data as SortData} ctx={ctx} />;
      case "hotspot":
        return <HotspotEngine data={game.data as HotspotData} ctx={ctx} />;
    }
  };

  const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;
  const profile = loadProfile();
  const level = levelFor(profile.xp);

  return (
    <div className="game-screen">
      <div className="game-top">
        <button type="button" className="icon-btn" onClick={onExit} aria-label="Back to games">
          ←
        </button>
        <div className="game-head">
          <h1 className="game-title">
            <span aria-hidden="true">{game.emoji}</span> {game.title}
          </h1>
          <p className="game-crumb">
            {subjectName} · {topicName} · {engineNames[game.engine]}
          </p>
        </div>
        <div className="hud">
          <div className="hud-score">
            <span className="hud-label">Score</span>
            <span className="hud-value">{formatScore(score)}</span>
          </div>
          <div className={`hud-mult ${multiplier > 1 ? "hud-mult-hot" : ""}`}>
            ×{multiplier}
            <span className="hud-streak">{streak} streak</span>
          </div>
        </div>
      </div>

      <div className="progress-bar" aria-hidden="true">
        <span style={{ width: `${result ? 100 : pct}%` }} />
      </div>

      {result ? (
        <div className="results">
          <Confetti />
          <p className="results-eyebrow">{result.isBest ? "New personal best" : "Run complete"}</p>
          <p className="results-score">{formatScore(result.score)}</p>
          <p className="results-sub">
            {result.accuracy}% accuracy · best streak {result.bestStreak}
          </p>

          <div className="results-grid">
            <div className="stat">
              <span className="stat-label">Correct</span>
              <span className="stat-value stat-good">{result.hits}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Missed</span>
              <span className="stat-value stat-bad">{result.misses}</span>
            </div>
            <div className="stat">
              <span className="stat-label">XP earned</span>
              <span className="stat-value stat-xp">+{result.xp}</span>
            </div>
          </div>

          <div className="level-strip">
            <span>Level {level.level}</span>
            <div className="level-bar">
              <span style={{ width: `${Math.round((level.into / level.needed) * 100)}%` }} />
            </div>
            <span>{profile.xp + result.xp} XP</span>
          </div>

          <div className="results-actions">
            <button type="button" className="btn btn-primary" onClick={restart}>
              Play again
            </button>
            {onNextGame && (
              <button type="button" className="btn btn-secondary" onClick={onNextGame}>
                Next game →
              </button>
            )}
            <button type="button" className="btn btn-ghost" onClick={onExit}>
              Back to {subjectName}
            </button>
          </div>
        </div>
      ) : (
        <div className="engine-wrap" key={attempt}>
          {renderEngine()}
        </div>
      )}
    </div>
  );
}
