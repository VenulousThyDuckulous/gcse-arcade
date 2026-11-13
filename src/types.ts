export type EngineId =
  | "quiz"
  | "match"
  | "order"
  | "odd"
  | "balance"
  | "tiles"
  | "graph"
  | "sort"
  | "hotspot";

export type Difficulty = 1 | 2 | 3;

export interface Topic {
  id: string;
  name: string;
  blurb: string;
}

export interface Subject {
  id: string;
  name: string;
  short: string;
  emoji: string;
  accent: string;
  accent2: string;
  blurb: string;
  spec: string;
  topics: Topic[];
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  why: string;
}

export interface QuizData {
  timer: number;
  questions: QuizQuestion[];
}

export interface MatchPair {
  left: string;
  right: string;
}

export interface MatchData {
  instruction: string;
  pairs: MatchPair[];
}

export interface OrderRound {
  prompt: string;
  items: string[];
  note: string;
}

export interface OrderData {
  rounds: OrderRound[];
}

export interface OddRound {
  prompt: string;
  options: string[];
  answer: number;
  why: string;
}

export interface OddData {
  rounds: OddRound[];
}

export interface BalanceSpecies {
  formula: string;
  coef: number;
  side: "left" | "right";
}

export interface BalanceRound {
  name: string;
  species: BalanceSpecies[];
  hint: string;
}

export interface BalanceData {
  rounds: BalanceRound[];
}

export interface TileRound {
  prompt: string;
  answer: string[];
  decoys: string[];
  hint: string;
}

export interface TileData {
  rounds: TileRound[];
}

export type GraphShapeId =
  | "line-up"
  | "line-down"
  | "parabola"
  | "curve-up"
  | "curve-down"
  | "reciprocal"
  | "flat-shape"
  | "pyramid-wide"
  | "pyramid-narrow"
  | "barrel";

export interface GraphRound {
  prompt: string;
  options: GraphShapeId[];
  answer: GraphShapeId;
  why: string;
}

export interface GraphData {
  rounds: GraphRound[];
}

export interface SortBin {
  id: string;
  label: string;
  hint: string;
}

export interface SortItem {
  text: string;
  bin: string;
  why: string;
}

export interface SortData {
  bins: SortBin[];
  items: SortItem[];
}

export type DiagramId = "cell" | "angles" | "circuit";

export interface HotspotTask {
  prompt: string;
  answer: string;
  why: string;
}

export interface HotspotData {
  diagram: DiagramId;
  tasks: HotspotTask[];
}

export type GameData =
  | QuizData
  | MatchData
  | OrderData
  | OddData
  | BalanceData
  | TileData
  | GraphData
  | SortData
  | HotspotData;

export interface Game {
  id: string;
  title: string;
  subjectId: string;
  topicId: string;
  engine: EngineId;
  tagline: string;
  emoji: string;
  difficulty: Difficulty;
  minutes: number;
  data: GameData;
}

export interface EngineResult {
  hits: number;
  misses: number;
}
