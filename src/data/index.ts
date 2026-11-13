import type { Game } from "../types";
import { mathsGames } from "./games/maths";
import { biologyGames } from "./games/biology";
import { chemistryGames } from "./games/chemistry";
import { physicsGames } from "./games/physics";
import { englishGames } from "./games/english";
import { historyGames } from "./games/history";
import { geographyGames } from "./games/geography";
import { computingGames } from "./games/computing";
import { frenchGames } from "./games/french";
import { rsGames } from "./games/rs";

export const games: Game[] = [
  ...mathsGames,
  ...biologyGames,
  ...chemistryGames,
  ...physicsGames,
  ...englishGames,
  ...historyGames,
  ...geographyGames,
  ...computingGames,
  ...frenchGames,
  ...rsGames,
];

export function gamesBySubject(subjectId: string): Game[] {
  return games.filter((g) => g.subjectId === subjectId);
}

export function gamesByTopic(subjectId: string, topicId: string): Game[] {
  return games.filter((g) => g.subjectId === subjectId && g.topicId === topicId);
}

export function gameById(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

export const engineNames: Record<Game["engine"], string> = {
  quiz: "Quiz rush",
  match: "Match up",
  order: "Sequence",
  odd: "Odd one out",
  balance: "Balance",
  tiles: "Sentence build",
  graph: "Graph read",
  sort: "Sorting",
  hotspot: "Diagram hunt",
};
