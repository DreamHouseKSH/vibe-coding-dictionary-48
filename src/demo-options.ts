import { useSyncExternalStore } from "react";
import { timelineSpecs } from "./timeline-specs";
export type DemoOption = { label: string; unit: string; min: number; max: number; step: number; initial: number };
const option = (label: string, unit: string, min: number, max: number, initial: number, step = 1): DemoOption => ({ label, unit, min, max, step, initial });
export const demoOptions: Record<number, DemoOption> = {
  49: option("최소 이름 길이", "자", 2, 8, 3),
  50: option("모의 응답 지연", "ms", 300, 3000, 1200, 100),
  51: option("모의 저장 지연", "ms", 300, 3000, 1000, 100),
  52: option("최대 제안 수", "개", 2, 6, 4),
  53: option("정렬 항목 수", "개", 3, 6, 4),
  54: option("컨테이너 너비", "%", 40, 100, 100, 5),
  55: option("페이지당 항목", "개", 2, 5, 3),
  56: option("입력 대기 시간", "ms", 100, 1000, 350, 50),
  1: option("히어로 안쪽 여백", "px", 12, 48, 24),
  2: option("가상 화면 너비", "%", 35, 100, 100),
  3: option("카드 간격", "px", 0, 24, 8),
  4: option("벤토 항목 수", "개", 4, 8, 4),
  5: option("사이드바 너비", "px", 72, 140, 90),
  6: option("고정 헤더 상단 간격", "px", 0, 40, 0),
  7: option("이미지 영역 비율", "%", 30, 65, 50),
  8: option("탭 수", "개", 2, 3, 3),
  9: option("질문 수", "개", 1, 4, 2),
  10: option("모달 안내 항목 수", "개", 1, 4, 1),
  11: option("드로워 방향 (0 왼쪽 · 1 오른쪽)", "", 0, 1, 1),
  12: option("정렬 선택지 수", "개", 2, 3, 3),
  13: option("툴팁 표시 지연", "ms", 0, 1500, 700, 100),
  14: option("알림 유지 시간", "ms", 1000, 8000, 3000, 500),
  15: option("슬라이드 너비", "%", 60, 100, 100, 5),
  16: option("스켈레톤 텍스트 줄 수", "줄", 1, 4, 2),
  17: option("호버 상승 거리", "px", 0, 16, 6),
  18: option("등장 이동 거리", "px", 0, 80, 35, 5),
  21: option("유리 블러 강도", "px", 0, 20, 8),
  22: option("배경 패럴랙스 배율", "배", 0, 1, 0.65, 0.05),
  23: option("스냅 카드 너비", "%", 60, 100, 100, 5),
  43: option("장면 전환 스크롤 거리", "px", 80, 200, 145, 5),
  44: option("세로 휠 → 가로 이동 배율", "배", 0.5, 2, 1, 0.1),
  45: option("자석 이동 강도", "배", 0.2, 2, 1, 0.1),
  46: option("커서 추적 스프링 강도", "", 50, 300, 140, 10),
  47: option("최대 기울기", "°", 0, 40, 25),
};
for (const [id, spec] of Object.entries(timelineSpecs)) {
  demoOptions[Number(id)] = option("모션 지속 시간", "ms", 100, 6000, spec.duration, 10);
}
function normalize(value: number, spec: DemoOption) {
  const bounded = Math.min(spec.max, Math.max(spec.min, value));
  return Number((spec.min + Math.round((bounded - spec.min) / spec.step) * spec.step).toFixed(3));
}
const key = "vibe48-demo-options-v1";
let values: Record<number, number> = {};
try {
  const stored = JSON.parse(localStorage.getItem(key) || "{}");
  for (const [id, spec] of Object.entries(demoOptions)) {
    const value = stored[id];
    if (typeof value === "number" && Number.isFinite(value)) values[Number(id)] = normalize(value, spec);
  }
} catch { /* Private browsing or invalid storage: session values still work. */ }
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
const snapshot = () => values;
export function setDemoOption(id: number, value: number) {
  const spec = demoOptions[id];
  if (!spec || !Number.isFinite(value)) return;
  values = { ...values, [id]: normalize(value, spec) };
  try { localStorage.setItem(key, JSON.stringify(values)); } catch { /* Session-only fallback. */ }
  listeners.forEach((listener) => listener());
}
export function resetDemoOptions() {
  values = {};
  try { localStorage.removeItem(key); } catch { /* Session-only fallback. */ }
  listeners.forEach((listener) => listener());
}
export function useAllDemoOptions() { return useSyncExternalStore(subscribe, snapshot, snapshot); }
export function useDemoOptions(id: number) {
  const all = useAllDemoOptions();
  return all[id] ?? demoOptions[id].initial;
}
export function demoOptionPrompt(id: number) {
  const spec = demoOptions[id];
  return `${spec.label}: ${values[id] ?? spec.initial}${spec.unit}`;
}
