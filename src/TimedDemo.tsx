import { useMemo, type CSSProperties } from "react";
import { useDemoOptions } from "./demo-options";
import { useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useDemoTimeline } from "./use-demo-timeline";

import { timelineSpecs } from "./timeline-specs";
export { timelineSpecs } from "./timeline-specs";
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (p: number) => p * p * (3 - 2 * p);
function keyframes(p: number, points: number[], values: number[]) {
  let i = 0;
  while (i < points.length - 2 && p > points[i + 1]) i++;
  const t = clamp((p - points[i]) / (points[i + 1] - points[i]));
  return values[i] + (values[i + 1] - values[i]) * smooth(t);
}
export default function TimedDemo({
  id,
  reduced,
}: {
  id: number;
  reduced: boolean;
}) {
  const duration = useDemoOptions(id);
  const systemReduce = useReducedMotion();
  const settings = useMemo(() => ({ ...timelineSpecs[id], duration }), [id, duration]);
  const clock = useDemoTimeline(id, settings, reduced || !!systemReduce),
    p = clock.progress,
    ms = p * settings.duration,
    sceneMs = p * timelineSpecs[id].duration;
  const target = "VIBE CODING";
  const ball = (x = 0, y = 0, scale = 1, opacity = 1) => (
    <div
      className="clock-ball"
      style={
        {
          "--clock-x": `${x}px`,
          "--clock-y": `${y}px`,
          "--clock-scale": scale,
          "--clock-opacity": opacity,
        } as CSSProperties
      }
    >
      UI
    </div>
  );
  let scene;
  switch (id) {
    case 19:
    case 35:
      scene = (
        <div className="clock-stagger">
          {(id === 35 ? "VIBE".split("") : [1, 2, 3, 4]).map((v, i) => (
            <span
              key={i}
              className="tile clock-item"
              style={
                {
                  "--item-progress": clamp(
                    (sceneMs - i * (id === 35 ? 120 : 130)) /
                      (id === 35 ? 360 : 500),
                  ),
                } as CSSProperties
              }
            >
              {v}
            </span>
          ))}
        </div>
      );
      break;
    case 20:
      scene = (
        <div
          className="clock-color"
          style={{ "--clock-mix": `${p * 100}%` } as CSSProperties}
          aria-label={`${duration}ms 동안 선택 색상이 변하는 예시`}
        >
          ◇
        </div>
      );
      break;
    case 24:
      scene = (
        <div className="clock-save">
          <strong>
            {p === 1
              ? "✓ 저장 완료"
              : p === 0
                ? "저장 피드백 시작"
                : "저장 중…"}
          </strong>
          <p>실제 데이터를 저장하지 않는 수동 예시입니다.</p>
        </div>
      );
      break;
    case 25:
      scene = ball(0, 0, 1, p);
      break;
    case 26:
      scene = ball(-100 + 100 * (1 - (1 - p) ** 3));
      break;
    case 27:
      scene = ball(0, 0, keyframes(p, [0, 0.6, 0.8, 1], [0.2, 1.18, 0.95, 1]));
      break;
    case 28:
      scene = (
        <svg
          className="clock-easing"
          viewBox="0 0 300 160"
          aria-label="같은 시간, 서로 다른 이징 곡선"
          role="img"
        >
          {["linear", "ease-in", "ease-out", "ease-in-out"].map((label, i) => {
            const v = [
              p,
              p * p,
              1 - (1 - p) ** 2,
              p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2,
            ][i];
            return (
              <g key={label}>
                <text x="0" y={25 + i * 38}>
                  {label}
                </text>
                <path
                  d={`M110 ${21 + i * 38} H280`}
                  stroke="currentColor"
                  opacity="0.12"
                />
                <circle
                  data-easing={label}
                  cx={110 + 160 * v}
                  cy={21 + i * 38}
                  r="7"
                  fill="currentColor"
                />
              </g>
            );
          })}
        </svg>
      );
      break;
    case 29:
      scene = ball(
        -70 +
          140 *
            ((1 - Math.exp(-7 * p) * Math.cos(14 * p)) /
              (1 - Math.exp(-7) * Math.cos(14))),
      );
      break;
    case 30:
      scene = ball(
        0,
        keyframes(p, [0, 0.3, 0.52, 0.72, 0.86, 1], [-65, 25, -22, 25, 5, 25]),
      );
      break;
    case 31:
      scene = (
        <svg
          className="clock-easing"
          viewBox="0 0 300 120"
          role="img"
          aria-label="전체 지속 시간에 비례하는 두 지연·지속 시간 비교"
        >
          {[0, 1].map((i) => (
            <g key={i}>
              <text x="0" y={35 + i * 50}>
                {i ? `${(duration * 0.5 / 1700).toFixed(2)}s + ${(duration * 1.2 / 1700).toFixed(2)}s` : `0s + ${(duration * 0.6 / 1700).toFixed(2)}s`}
              </text>
              <circle
                cx={110 + 160 * clamp((sceneMs - (i ? 500 : 0)) / (i ? 1200 : 600))}
                cy={31 + i * 50}
                r="7"
                fill="currentColor"
              />
            </g>
          ))}
        </svg>
      );
      break;
    case 32:
      scene = ball(0, -25 * Math.sin(p * Math.PI * 2));
      break;
    case 33:
      scene = (
        <strong className="type-demo">
          {target.slice(0, Math.floor(target.length * p))}▏
        </strong>
      );
      break;
    case 34:
      scene = (
        <strong className="type-demo">
          {target
            .split("")
            .map((ch, i) =>
              i < target.length * p
                ? ch
                : "·*#+"[(i + Math.floor(sceneMs / 45)) % 4],
            )
            .join("")}
        </strong>
      );
      break;
    case 36:
      scene = (
        <strong className="type-demo" data-count-up>
          {Math.round(4800 * (1 - (1 - p) ** 3)).toLocaleString()}
        </strong>
      );
      break;
    case 37:
      scene = (
        <svg
          className="drawing"
          viewBox="0 0 300 110"
          role="img"
          aria-label="시계와 동기화된 선 그리기"
        >
          <path
            d="M10 80 Q65 0 100 60 T200 50 T290 30"
            pathLength="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="1"
            strokeDashoffset={1 - p}
          />
        </svg>
      );
      break;
    case 38:
      scene = (
        <svg
          className="clock-morph"
          viewBox="0 0 100 100"
          role="img"
          aria-label="메뉴 아이콘이 닫기 아이콘으로 변하는 예시"
        >
          <path
            d={`M20 ${30 + 20 * p} H80`}
            transform={`rotate(${45 * p} 50 50)`}
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M20 50 H80"
            opacity={1 - p}
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d={`M20 ${70 - 20 * p} H80`}
            transform={`rotate(${-45 * p} 50 50)`}
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
      );
      break;
    case 39:
      scene = (
        <div className="clock-marquee-window">
          <div
            className="clock-marquee"
            style={{ "--marquee-x": `${-50 * p}%` } as CSSProperties}
          >
            <span>DESIGN · CODE · PLAY · </span>
            <span aria-hidden="true">DESIGN · CODE · PLAY · </span>
          </div>
        </div>
      );
      break;
    case 40:
      scene = (
        <svg
          className="clock-path"
          viewBox="0 0 300 120"
          role="img"
          aria-label="곡선을 따라 이동하는 점"
        >
          <path
            d="M20 100 Q150 -70 280 100"
            fill="none"
            stroke="currentColor"
            strokeDasharray="4 5"
            opacity="0.3"
          />
          <circle
            data-path-dot
            cx={20 + 260 * p}
            cy={100 - 340 * p * (1 - p)}
            r="8"
            fill="currentColor"
          />
        </svg>
      );
      break;
    case 41:
      scene = (
        <div className="clock-wipe">
          <strong>{p < 0.5 ? "PAGE A" : "PAGE B"}</strong>
          <div
            className="clock-curtain"
            style={{ "--wipe-x": `${p * 200 - 100}%` } as CSSProperties}
          />
        </div>
      );
      break;
    case 42:
      scene = (
        <div className="clock-shared">
          <div className="shared-placeholder">다른 카드</div>
          <div
            className="clock-shared-card"
            style={{ "--shared-progress": smooth(p) } as CSSProperties}
          >
            <div className="clock-shared-image">◇</div>
            <h3>하나의 요소, 이어지는 맥락</h3>
            <div className="clock-shared-detail">
              <p>
                같은 카드의 실제 너비와 내부 배치가 목록에서 상세로 이어집니다.
              </p>
            </div>
          </div>
        </div>
      );
      break;
    case 48:
      scene = (
        <div className="clock-confetti">
          <strong>작은 성공을 축하합니다!</strong>
          {Array.from({ length: 24 }, (_, i) => (
            <span
              key={i}
              className="clock-piece"
              style={
                {
                  "--piece-x": `${(i * 37) % 100}%`,
                  "--piece-y": `${-20 + 240 * clamp((p - (i % 4) * 0.03) / 0.91)}px`,
                  "--piece-rotate": `${i * 27 + p * 540}deg`,
                  "--piece-opacity": p > 0.8 ? (1 - p) * 5 : 1,
                } as CSSProperties
              }
            />
          ))}
        </div>
      );
      break;
  }
  const state = clock.reduced
    ? "모션 감소 · 수동 장면"
    : !clock.visible
      ? "탭 숨김 · 중지"
      : clock.paused
        ? "일시정지"
        : clock.phase === "hold"
          ? `끝 장면 유지 · ${settings.hold / 1000}초`
          : clock.phase === "reset"
            ? "시작으로 되돌리는 중"
            : clock.automatic
              ? "자동 반복 중"
              : "수동 재생 중";
  return (
    <section
      className={`demo-shell ${clock.reduced ? "reduce-motion" : ""}`}
      data-demo={id}
      data-clock-progress={p.toFixed(5)}
      data-clock-elapsed={clock.elapsed.toFixed(1)}
      data-clock-phase={clock.phase}
      data-clock-cycles={clock.cycles}
      data-clock-paused={clock.paused}
    >
      <div className="demo-label">
        <span>LIVE EXAMPLE / {String(id).padStart(2, "0")}</span>
        <span>
          {clock.reduced
            ? "모션 감소 적용"
            : clock.automatic
              ? "보이는 동안 자동 반복"
              : "수동 체험"}
        </span>
      </div>
      <div className={`clock-scene ${id === 42 ? "clock-scene-shared" : ""}`}>
        {scene}
      </div>
      <div className="timeline-controls">
        <div className="timeline-ends">
          <span>시작 · 0초</span>
          <span>끝 · {(settings.duration / 1000).toFixed(2)}초</span>
        </div>
        <progress
          className="timeline-meter"
          max="100"
          value={p * 100}
          aria-label={`${settings.name} 장면 진행`}
          aria-valuetext={`${Math.round(p * 100)}%, ${state}`}
        />
        <div className="timeline-readout">
          <span>{state}</span>
          <span>
            장면 위치 {(ms / 1000).toFixed(2)} /{" "}
            {(settings.duration / 1000).toFixed(2)}초
          </span>
        </div>
        <p className="timeline-note" id={`timeline-seek-note-${id}`}>
          직접 위치 조절 · 조작하면 일시정지
        </p>
        <Slider
          aria-label={`${settings.name} 장면 위치 조절`}
          aria-describedby={`timeline-seek-note-${id}`}
          min={0}
          max={100}
          step={1}
          value={[p * 100]}
          onFocus={clock.pause}
          onValueChange={(v) => clock.seek(v[0] / 100)}
        />
        <div className="timeline-buttons">
          {clock.reduced ? (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => clock.seek(0)}
                aria-label={`${settings.name} 시작 장면`}
              >
                시작 장면
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => clock.seek(1)}
                aria-label={`${settings.name} 끝 장면`}
              >
                끝 장면
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={clock.toggle}
                aria-label={`${settings.name} ${clock.paused ? "재생" : "일시정지"}`}
              >
                {clock.paused ? "재생" : "일시정지"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={clock.replay}
                aria-label={`${settings.name} 처음부터 다시 재생`}
              >
                처음부터
              </Button>
            </>
          )}
        </div>
        {clock.reduced && (
          <p className="timeline-note">
            자동 반복을 멈췄습니다. 시작·끝 장면이나 슬라이더로 직접 확인하세요.
          </p>
        )}
      </div>
    </section>
  );
}
