import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  documentVisible,
  subscribeFrames,
  subscribeVisibility,
} from "./animation-clock";
import {
  advanceTimeline,
  timelinePosition,
  type TimelineSpec,
  type TimelineState,
} from "./timeline-model";
export type { TimelineSpec } from "./timeline-model";
// Only the 22 eligible examples can enter this page-session cache.
const saved = new Map<number, TimelineState>();
export function useDemoTimeline(
  id: number,
  spec: TimelineSpec,
  reduced: boolean,
) {
  const [frame, setFrame] = useState<TimelineState>(
    () =>
      saved.get(id) ?? {
        elapsed: reduced && spec.auto ? spec.duration : 0,
        paused: !spec.auto,
        cycles: 0,
      },
  );
  const current = useRef(frame);
  const visible = useSyncExternalStore(
    subscribeVisibility,
    documentVisible,
    () => true,
  );
  function commit(next: TimelineState) {
    current.current = next;
    saved.set(id, next);
    setFrame({ ...next });
  }
  useEffect(() => {
    if (reduced || frame.paused || !visible) return;
    let published = 0;
    return subscribeFrames((delta, now) => {
      const previous = current.current;
      if (previous.paused || document.hidden) return;
      const next = advanceTimeline(previous, delta, spec);
      current.current = next;
      saved.set(id, next);
      // Both the visual pose and progress use this exact snapshot at 30fps.
      if (
        now - published >= 32 ||
        next.paused ||
        next.cycles !== previous.cycles
      ) {
        published = now;
        setFrame({ ...next });
      }
    });
  }, [id, spec, reduced, visible, frame.paused]);
  const position = timelinePosition(frame.elapsed, spec);
  return {
    ...frame,
    ...position,
    reduced,
    visible,
    playing: !frame.paused && !reduced && visible,
    pause: () => commit({ ...current.current, paused: true }),
    toggle: () =>
      commit({
        ...current.current,
        elapsed:
          !spec.auto && current.current.elapsed >= spec.duration
            ? 0
            : current.current.elapsed,
        paused: !current.current.paused,
      }),
    replay: () => commit({ elapsed: 0, paused: false, cycles: 0 }),
    seek: (progress: number) =>
      commit({
        ...current.current,
        elapsed: Math.max(0, Math.min(1, progress)) * spec.duration,
        paused: true,
      }),
  };
}
