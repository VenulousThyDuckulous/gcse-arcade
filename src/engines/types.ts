import type { ReactNode } from "react";

export interface EngineCtx {
  hit: (points?: number) => void;
  miss: () => void;
  finish: () => void;
  progress: (done: number, total: number) => void;
  sfx: {
    good: () => void;
    bad: () => void;
    tap: () => void;
    win: () => void;
  };
}

export interface EngineProps<T> {
  data: T;
  ctx: EngineCtx;
}

export type EngineComponent<T> = (props: EngineProps<T>) => ReactNode;
