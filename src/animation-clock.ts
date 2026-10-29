// One requestAnimationFrame source for every visible playground. Hidden tabs
// suspend the source and reset its timestamp, so there is no catch-up jump.
type FrameListener = (delta: number, now: number) => void;
const frames = new Set<FrameListener>();
const visibility = new Set<() => void>();
let raf = 0;
let last: number | undefined;
let listening = false;
function start() {
  if (!raf && frames.size && !document.hidden)
    raf = requestAnimationFrame(tick);
}
function tick(now: number) {
  raf = 0;
  if (document.hidden || !frames.size) {
    last = undefined;
    return;
  }
  const delta = last === undefined ? 0 : now - last;
  last = now;
  for (const listener of frames) listener(delta, now);
  start();
}
function changed() {
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
  last = undefined;
  for (const listener of visibility) listener();
  start();
}
function attach() {
  if (!listening) {
    document.addEventListener("visibilitychange", changed);
    listening = true;
  }
}
function release() {
  if (!frames.size) {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    last = undefined;
  }
  if (!frames.size && !visibility.size && listening) {
    document.removeEventListener("visibilitychange", changed);
    listening = false;
  }
}
export function subscribeFrames(listener: FrameListener) {
  attach();
  frames.add(listener);
  start();
  return () => {
    frames.delete(listener);
    release();
  };
}
export function subscribeVisibility(listener: () => void) {
  attach();
  visibility.add(listener);
  return () => {
    visibility.delete(listener);
    release();
  };
}
export const documentVisible = () => !document.hidden;
