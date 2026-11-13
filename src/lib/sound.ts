type Voice = "good" | "bad" | "tap" | "win";

const MUTE_KEY = "gcse-arcade.muted";

let ctx: AudioContext | null = null;
let muted = false;

try {
  muted = localStorage.getItem(MUTE_KEY) === "1";
} catch {
  muted = false;
}

function audio(): AudioContext | null {
  if (muted) return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function blip(freq: number, duration: number, type: OscillatorType, gain: number, delay = 0): void {
  const ac = audio();
  if (!ac) return;
  const start = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const env = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  env.gain.setValueAtTime(0.0001, start);
  env.gain.exponentialRampToValueAtTime(gain, start + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(env).connect(ac.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export function isMuted(): boolean {
  return muted;
}

export function setMuted(next: boolean): void {
  muted = next;
  try {
    localStorage.setItem(MUTE_KEY, next ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (!next) blip(660, 0.08, "triangle", 0.05);
}

export const sound = {
  good: () => {
    blip(587.33, 0.1, "triangle", 0.07);
    blip(880, 0.14, "triangle", 0.05, 0.06);
  },
  bad: () => {
    blip(196, 0.16, "sawtooth", 0.045);
    blip(146.83, 0.2, "sawtooth", 0.04, 0.09);
  },
  tap: () => blip(392, 0.05, "sine", 0.035),
  win: () => {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => blip(f, 0.22, "triangle", 0.06, i * 0.1));
  },
} satisfies Record<Voice, () => void>;
