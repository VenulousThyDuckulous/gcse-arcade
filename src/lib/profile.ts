const KEY = "gcse-arcade.profile.v1";

export interface Profile {
  xp: number;
  plays: number;
  bestStreak: number;
  best: Record<string, number>;
}

const EMPTY: Profile = { xp: 0, plays: 0, bestStreak: 0, best: {} };

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY, best: {} };
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return {
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      plays: typeof parsed.plays === "number" ? parsed.plays : 0,
      bestStreak: typeof parsed.bestStreak === "number" ? parsed.bestStreak : 0,
      best: parsed.best && typeof parsed.best === "object" ? parsed.best : {},
    };
  } catch {
    return { ...EMPTY, best: {} };
  }
}

export function saveProfile(profile: Profile): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
  } catch {
    /* storage can be unavailable; the site still works in-memory */
  }
}

export function levelFor(xp: number): { level: number; into: number; needed: number } {
  const level = Math.floor(Math.sqrt(xp / 120)) + 1;
  const floor = (level - 1) * (level - 1) * 120;
  const next = level * level * 120;
  return { level, into: xp - floor, needed: Math.max(1, next - floor) };
}
