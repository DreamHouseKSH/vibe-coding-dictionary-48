export type TimelineSpec = {
  name: string;
  duration: number;
  hold: number;
  reset: number;
  auto: boolean;
};
export type TimelineState = {
  elapsed: number;
  paused: boolean;
  cycles: number;
};
export function advanceTimeline(
  state: TimelineState,
  delta: number,
  spec: TimelineSpec,
): TimelineState {
  if (state.paused) return state;
  let elapsed = state.elapsed + Math.max(0, delta),
    cycles = state.cycles,
    paused = false;
  if (spec.auto) {
    const total = spec.duration + spec.hold + spec.reset;
    if (elapsed >= total) {
      cycles += Math.floor(elapsed / total);
      elapsed %= total;
    }
  } else if (elapsed >= spec.duration) {
    elapsed = spec.duration;
    paused = true;
  }
  return { elapsed, cycles, paused };
}
export function timelinePosition(elapsed: number, spec: TimelineSpec) {
  if (elapsed < spec.duration)
    return { progress: elapsed / spec.duration, phase: "motion" as const };
  if (elapsed < spec.duration + spec.hold || !spec.reset)
    return { progress: 1, phase: "hold" as const };
  const reset = Math.min(1, (elapsed - spec.duration - spec.hold) / spec.reset);
  return {
    progress: 1 - reset * reset * (3 - 2 * reset),
    phase: "reset" as const,
  };
}
