import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { ReactNode } from "react";

export default function Demo({
  id,
  reduced,
}: {
  id: number;
  reduced: boolean;
}) {
  const systemReduce = useReducedMotion(),
    reduce = reduced || !!systemReduce;
  const [on, setOn] = useState(false),
    [cycle, setCycle] = useState(0),
    [running, setRunning] = useState(false),
    [value, setValue] = useState(0),
    [text, setText] = useState("VIBE CODING"),
    [choice, setChoice] = useState("최신순"),
    [pos, setPos] = useState({ x: 0, y: 0 });
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroll.current;
    if (id !== 44 || !el) return;
    function wheel(event: WheelEvent) {
      const next = Math.max(
        0,
        Math.min(
          el!.scrollWidth - el!.clientWidth,
          el!.scrollLeft + event.deltaY,
        ),
      );
      if (next !== el!.scrollLeft) {
        event.preventDefault();
        el!.scrollLeft = next;
      }
    }
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  }, [id]);
  function replay() {
    setCycle((c) => c + 1);
    setRunning(true);
    setOn((v) => !v);
  }
  useEffect(() => {
    if (!running || ![24, 33, 34, 36].includes(id)) return;
    const start = performance.now(),
      target = "VIBE CODING";
    const timer = window.setInterval(
      () => {
        const p = reduce
          ? 1
          : Math.min((performance.now() - start) / (id === 24 ? 700 : 1400), 1);
        if (id === 33) setText(target.slice(0, Math.ceil(target.length * p)));
        if (id === 34)
          setText(
            target
              .split("")
              .map((c, i) =>
                i < target.length * p
                  ? c
                  : "·*#+"[(i + Math.floor(p * 40)) % 4],
              )
              .join(""),
          );
        if (id === 36) setValue(Math.round(p * 4800));
        if (id === 24) setText(p === 1 ? "✓ 저장 완료" : "저장 중…");
        if (p === 1) {
          clearInterval(timer);
          setRunning(false);
        }
      },
      reduce ? 1 : 35,
    );
    return () => clearInterval(timer);
  }, [cycle, id, reduce, running]);
  const dur = reduce ? 0 : 0.9;
  const ball = <div className="ball">UI</div>;
  const tiles = (n = 4) =>
    Array.from({ length: n }, (_, i) => (
      <div className="tile" key={i}>
        {String(i + 1).padStart(2, "0")}
      </div>
    ));
  const action = <Button onClick={replay}>다시 재생</Button>;
  const scrolling = (kind: number) => (
    <div
      className="scroll-demo"
      ref={scroll}
      tabIndex={0}
      role="region"
      aria-label="스크롤 체험 영역"
      onScroll={(e) => setValue(e.currentTarget.scrollTop)}
    >
      <div style={{ height: kind === 18 ? 480 : 640, position: "relative" }}>
        {kind === 6 ? (
          <>
            <div className="sticky-bar">상단에 붙어 있는 헤더</div>
            {tiles(8)}
          </>
        ) : kind === 18 ? (
          <>
            <p className="scroll-hint">↓ 아래로 스크롤해 보세요</p>
            <motion.div
              className="tile reveal-tile"
              initial={reduce ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ root: scroll, once: false }}
              transition={{ duration: dur }}
            >
              뷰포트 진입 → 등장
            </motion.div>
          </>
        ) : kind === 22 ? (
          <>
            <div
              className="parallax-back"
              style={{
                transform: `translateY(${reduce ? 0 : value * 0.65}px)`,
              }}
            >
              BACKGROUND · 느리게
            </div>
            <div
              className="parallax-front"
              style={{
                transform: `translateY(${reduce ? 0 : value * 0.15}px)`,
              }}
            >
              FOREGROUND · 빠르게
            </div>
            <p className="scroll-hint">↓ 스크롤하면 깊이가 달라집니다</p>
          </>
        ) : (
          <div className="pinned">
            <strong>PINNED / 고정된 무대</strong>
            <h3>
              {
                ["01 기획", "02 디자인", "03 배포"][
                  Math.min(2, Math.floor(value / 145))
                ]
              }
            </h3>
            <p>바깥 이야기는 스크롤하고 무대는 고정됩니다.</p>
          </div>
        )}
      </div>
    </div>
  );
  let content: ReactNode;
  switch (id) {
    case 1:
      content = (
        <div className="sample-hero">
          <small>YOUR NEXT IDEA</small>
          <h3>새로운 시작을 설계하세요.</h3>
          <p>핵심 메시지와 하나의 행동 버튼.</p>
          <Button
            onClick={() =>
              toast.success("CTA를 눌러 다음 단계로 이동했습니다.")
            }
          >
            시작하기 →
          </Button>
        </div>
      );
      break;
    case 2:
      content = (
        <>
          <label htmlFor="width">가상 화면 너비: {value || 100}%</label>
          <Slider
            id="width"
            aria-label="가상 화면 너비"
            min={35}
            max={100}
            value={[value || 100]}
            onValueChange={(v) => setValue(v[0])}
          />
          <div className="resizable-demo" style={{ width: `${value || 100}%` }}>
            <div className="responsive-tiles">{tiles(6)}</div>
          </div>
        </>
      );
      break;
    case 3:
      content = (
        <div className="sample-cards">
          {["개요", "기능", "요금"].map((x) => (
            <article className="tile" key={x}>
              <strong>{x}</strong>
              <p>독립된 정보 단위</p>
            </article>
          ))}
        </div>
      );
      break;
    case 4:
      content = <div className="bento">{tiles(4)}</div>;
      break;
    case 5:
      content = (
        <div className="sidebar-demo">
          <nav aria-label="데모 메뉴">
            {["홈", "작업", "설정"].map((x) => (
              <Button
                key={x}
                variant={choice === x ? "default" : "ghost"}
                onClick={() => setChoice(x)}
              >
                {x}
              </Button>
            ))}
          </nav>
          <div className="tile">
            <h3>{choice === "최신순" ? "홈" : choice}</h3>넓은 작업 영역
          </div>
        </div>
      );
      break;
    case 6:
      content = scrolling(6);
      break;
    case 7:
      content = (
        <div className="split-demo">
          <div className="tile">이미지 영역 ◇</div>
          <div>
            <h3>
              절반의 이미지,
              <br />
              절반의 이야기.
            </h3>
            <p>좁은 화면에서는 위아래로 쌓입니다.</p>
          </div>
        </div>
      );
      break;
    case 8:
      content = (
        <Tabs defaultValue="개요">
          <TabsList>
            {["개요", "기능", "요금"].map((x) => (
              <TabsTrigger key={x} value={x}>
                {x}
              </TabsTrigger>
            ))}
          </TabsList>
          {["개요", "기능", "요금"].map((x) => (
            <TabsContent key={x} value={x}>
              <div className="tile">{x} 탭의 내용입니다.</div>
            </TabsContent>
          ))}
        </Tabs>
      );
      break;
    case 9:
      content = (
        <Accordion type="single" collapsible>
          <AccordionItem value="faq">
            <AccordionTrigger>바이브코딩이란 무엇인가요?</AccordionTrigger>
            <AccordionContent>
              자연어로 의도를 전달하고 결과를 확인하며 구현하는 방식입니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq2">
            <AccordionTrigger>다시 접을 수 있나요?</AccordionTrigger>
            <AccordionContent>같은 질문을 다시 누르세요.</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      break;
    case 10:
      content = (
        <Dialog>
          <DialogTrigger asChild>
            <Button>확인 모달 열기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>작업을 확인하세요</DialogTitle>
              <DialogDescription>
                배경이 어두워지고 포커스는 창 안에 머뭅니다. Escape로 닫아
                보세요.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
      break;
    case 11:
      content = (
        <Sheet>
          <SheetTrigger asChild>
            <Button>오른쪽 드로워 열기</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>설정 패널</SheetTitle>
              <SheetDescription>
                오른쪽에서 열리는 보조 작업 공간. Escape 또는 바깥을 눌러
                닫으세요.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );
      break;
    case 12:
      content = (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">정렬: {choice} ▾</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={choice} onValueChange={setChoice}>
              {["최신순", "인기순", "이름순"].map((x) => (
                <DropdownMenuRadioItem key={x} value={x}>
                  {x}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
      break;
    case 13:
      content = (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setOn(!on)}
                aria-expanded={on}
              >
                도움말 ⓘ
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              마우스나 포커스로 표시되는 보충 설명입니다.
            </TooltipContent>
          </Tooltip>
          {on && (
            <p role="status">
              터치 대안: 버튼을 누르면 같은 도움말을 볼 수 있습니다.
            </p>
          )}
        </>
      );
      break;
    case 14:
      content = (
        <Button
          onClick={() => toast.success("저장되었습니다.", { duration: 3000 })}
        >
          저장 알림 띄우기
        </Button>
      );
      break;
    case 15:
    case 23:
      content = (
        <>
          <div
            className="snap-track"
            ref={scroll}
            tabIndex={0}
            role="region"
            aria-label="좌우로 넘기는 슬라이드"
          >
            {["첫 번째 이야기", "두 번째 이야기", "세 번째 이야기"].map(
              (x, i) => (
                <div className="snap-slide" key={x}>
                  <strong>0{i + 1}</strong>
                  <h3>{x}</h3>
                  <p>좌우 스와이프 · 스크롤 스냅</p>
                </div>
              ),
            )}
          </div>
          <div className="controls">
            <Button
              variant="outline"
              onClick={() =>
                scroll.current?.scrollBy({
                  left: -scroll.current.clientWidth,
                  behavior: reduce ? "instant" : "smooth",
                })
              }
            >
              이전
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                scroll.current?.scrollBy({
                  left: scroll.current.clientWidth,
                  behavior: reduce ? "instant" : "smooth",
                })
              }
            >
              다음
            </Button>
          </div>
        </>
      );
      break;
    case 16:
      content = (
        <>
          <Button onClick={() => setOn(!on)}>
            {on ? "로딩 상태 보기" : "완료 상태 보기"}
          </Button>
          <div className="loading-demo" aria-busy={!on}>
            {on ? (
              <div className="tile">✓ 프로필을 불러왔습니다.</div>
            ) : (
              <>
                <Skeleton className="size-12 rounded-full" />
                <div className="grow">
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </>
            )}
          </div>
        </>
      );
      break;
    case 17:
      content = (
        <Button
          variant="outline"
          className={`hover-demo ${on ? "is-hovered" : ""}`}
          onClick={() => setOn(!on)}
        >
          호버 · 포커스 · 터치해 보세요
        </Button>
      );
      break;
    case 18:
      content = scrolling(18);
      break;
    case 19:
    case 35:
      content = (
        <>
          {action}
          <div
            key={cycle}
            className={`stagger-row ${running ? "playing" : ""}`}
          >
            {(id === 35 ? "VIBE".split("") : [1, 2, 3, 4]).map((x, i) => (
              <span
                key={i}
                className="tile"
                style={{ animationDelay: `${reduce ? 0 : i * 0.13}s` }}
              >
                {x}
              </span>
            ))}
          </div>
        </>
      );
      break;
    case 20:
      content = (
        <Button
          variant="outline"
          className={`smooth-demo ${on ? "selected-demo" : ""}`}
          onClick={() => setOn(!on)}
        >
          상태 전환 · 200ms
        </Button>
      );
      break;
    case 21:
      content = (
        <>
          <Button variant="outline" onClick={() => setOn(!on)}>
            {on ? "블러 끄기" : "블러 켜기"}
          </Button>
          <div className="glass-scene">
            <span>GLASS · 48 · UI</span>
            <div className={`glass-panel ${on ? "blurred" : ""}`}>
              반투명 유리
              <br />
              배경을 흐리게
            </div>
          </div>
        </>
      );
      break;
    case 22:
      content = scrolling(22);
      break;
    case 24:
      content = (
        <Button onClick={replay} disabled={running}>
          {running || cycle ? text : "저장하기"}
        </Button>
      );
      break;
    case 25:
      content = (
        <>
          <Button onClick={() => setOn(!on)}>페이드 전환</Button>
          <motion.div
            className="motion-stage"
            animate={{ opacity: on ? 0 : 1 }}
            transition={{ duration: dur }}
          >
            {ball}
          </motion.div>
        </>
      );
      break;
    case 26:
      content = (
        <>
          {action}
          <div className="motion-stage">
            <motion.div
              key={cycle}
              initial={{ x: reduce ? 0 : -150 }}
              animate={{ x: 0 }}
              transition={{ duration: dur, ease: "easeOut" }}
            >
              {ball}
            </motion.div>
          </div>
        </>
      );
      break;
    case 27:
      content = (
        <>
          {action}
          <div className="motion-stage">
            <motion.div
              key={cycle}
              initial={{ scale: reduce ? 1 : 0.2 }}
              animate={{ scale: reduce ? 1 : [0.2, 1.18, 1] }}
              transition={{ duration: dur }}
            >
              {ball}
            </motion.div>
          </div>
        </>
      );
      break;
    case 28:
      content = (
        <>
          <Button onClick={() => setOn(!on)}>같은 거리 · 다른 속도 곡선</Button>
          {(["linear", "easeIn", "easeOut", "easeInOut"] as const).map((e) => (
            <div className="easing-row" key={e}>
              <span>{e}</span>
              <motion.div
                className="dot"
                animate={{ x: on ? 180 : 0 }}
                transition={{ duration: reduce ? 0 : 1.5, ease: e }}
              />
            </div>
          ))}
        </>
      );
      break;
    case 29:
      content = (
        <>
          <Button onClick={() => setOn(!on)}>스프링 이동</Button>
          <div className="motion-stage">
            <motion.div
              animate={{ x: on ? 100 : -100 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 170, damping: 9 }
              }
            >
              {ball}
            </motion.div>
          </div>
        </>
      );
      break;
    case 30:
      content = (
        <>
          {action}
          <div className="motion-stage">
            <motion.div
              key={cycle}
              initial={{ y: reduce ? 0 : -65 }}
              animate={{ y: reduce ? 0 : [-65, 25, -22, 25, 5, 25] }}
              transition={{
                duration: reduce ? 0 : 1.4,
                times: [0, 0.3, 0.52, 0.72, 0.86, 1],
              }}
            >
              {ball}
            </motion.div>
          </div>
        </>
      );
      break;
    case 31:
      content = (
        <>
          <Button onClick={() => setOn(!on)}>동시에 시작 신호</Button>
          {[0, 0.5].map((delay, i) => (
            <div className="easing-row" key={delay}>
              <span>{i ? "delay .5s / 1.2s" : "delay 0s / .6s"}</span>
              <motion.div
                className="dot"
                animate={{ x: on ? 150 : 0 }}
                transition={{
                  delay: reduce ? 0 : delay,
                  duration: reduce ? 0 : i ? 1.2 : 0.6,
                }}
              />
            </div>
          ))}
        </>
      );
      break;
    case 32:
    case 39:
      content = (
        <>
          <Button onClick={() => setRunning(!running)}>
            {running ? "일시정지" : "루프 시작"}
          </Button>
          <div className="motion-stage loop-clip">
            <motion.div
              animate={
                id === 32
                  ? { y: running && !reduce ? [0, -25, 0] : 0 }
                  : { x: running && !reduce ? ["0%", "-50%"] : "0%" }
              }
              transition={{
                duration: id === 32 ? 2 : 7,
                repeat: running && !reduce ? Infinity : 0,
                ease: id === 32 ? "easeInOut" : "linear",
              }}
            >
              {id === 32 ? (
                ball
              ) : (
                <span className="marquee-text">
                  DESIGN · CODE · PLAY · DESIGN · CODE · PLAY ·{" "}
                </span>
              )}
            </motion.div>
          </div>
        </>
      );
      break;
    case 33:
    case 34:
    case 36:
      content = (
        <>
          {action}
          <div className="motion-stage">
            <strong
              className="type-demo"
              aria-label={id === 36 ? "카운트업 결과" : "텍스트 효과 결과"}
            >
              {id === 36 ? value.toLocaleString() : text}
              {id === 33 ? "▏" : ""}
            </strong>
          </div>
        </>
      );
      break;
    case 37:
      content = (
        <>
          {action}
          <svg
            key={cycle}
            viewBox="0 0 300 110"
            className="drawing"
            aria-label="선 그리기 데모"
            role="img"
          >
            <motion.path
              d="M10 80 Q65 0 100 60 T200 50 T290 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduce ? 0 : 1.8 }}
            />
          </svg>
        </>
      );
      break;
    case 38:
      content = (
        <Button
          variant="outline"
          className={`morph ${on ? "morphed" : ""}`}
          onClick={() => setOn(!on)}
          aria-label={
            on ? "닫기 아이콘을 메뉴로 전환" : "메뉴 아이콘을 닫기로 전환"
          }
          aria-pressed={on}
        >
          <span />
          <span />
          <span />
        </Button>
      );
      break;
    case 40:
      content = (
        <>
          {action}
          <div className="path-stage">
            <svg viewBox="0 0 300 120" aria-hidden="true">
              <path
                d="M20 100 Q150 -70 280 100"
                fill="none"
                stroke="currentColor"
                strokeDasharray="4 5"
              />
            </svg>
            <div
              key={cycle}
              className={`path-ball ${running ? "path-playing" : ""}`}
            >
              ●
            </div>
          </div>
        </>
      );
      break;
    case 41:
      content = (
        <>
          <Button onClick={replay}>페이지 전환</Button>
          <div key={cycle} className="wipe-stage">
            <strong>{on ? "PAGE B" : "PAGE A"}</strong>
            {running && <div className="wipe" />}
          </div>
        </>
      );
      break;
    case 42:
      content = (
        <>
          <Button onClick={() => setOn(!on)}>
            {on ? "목록으로 돌아가기" : "카드에서 상세로"}
          </Button>
          <div className={`shared-stage ${on ? "detail" : ""}`}>
            <motion.div
              layout
              layoutId="shared-card"
              className="shared-card"
              transition={{ duration: reduce ? 0 : 0.65 }}
            >
              <motion.div layoutId="shared-image" className="shared-image">
                ◇
              </motion.div>
              <motion.h3 layout="position">
                하나의 요소, 이어지는 맥락
              </motion.h3>
              {on && (
                <p>
                  목록의 이미지와 제목이 새 위치·크기로 이동해 상세 화면이
                  됩니다.
                </p>
              )}
            </motion.div>
            {!on && <div className="shared-placeholder">다른 카드</div>}
          </div>
        </>
      );
      break;
    case 43:
      content = scrolling(43);
      break;
    case 44:
      content = (
        <>
          <p>
            영역 안에서 세로 스크롤 → 가로 진행. 방향키·스와이프도 지원합니다.
          </p>
          <div
            className="horizontal-demo"
            ref={scroll}
            tabIndex={0}
            role="region"
            aria-label="가로 스크롤 체험"
          >
            {tiles(8)}
          </div>
          <Button
            variant="outline"
            onClick={(e) =>
              e.currentTarget.previousElementSibling?.scrollBy({
                left: 200,
                behavior: reduce ? "instant" : "smooth",
              })
            }
          >
            다음 카드 →
          </Button>
        </>
      );
      break;
    case 45:
    case 46:
    case 47:
      content = (
        <>
          <p>영역 안에서 마우스를 움직이거나, 아래 슬라이더로 체험하세요.</p>
          <div
            className={`pointer-area ${id === 47 ? "tilt-area" : ""}`}
            onPointerMove={(e) => {
              if (reduce || e.pointerType === "touch") return;
              const r = e.currentTarget.getBoundingClientRect();
              setPos({
                x: (e.clientX - r.left) / r.width - 0.5,
                y: (e.clientY - r.top) / r.height - 0.5,
              });
            }}
            onPointerLeave={() => setPos({ x: 0, y: 0 })}
          >
            {id === 45 ? (
              <motion.div
                animate={{
                  x: reduce ? 0 : pos.x * 35,
                  y: reduce ? 0 : pos.y * 25,
                }}
              >
                <Button onClick={() => toast("자석 버튼을 눌렀습니다.")}>
                  MAGNETIC ↗
                </Button>
              </motion.div>
            ) : id === 46 ? (
              <>
                <span>기본 커서는 유지됩니다.</span>
                <motion.div
                  className="follow-cursor"
                  animate={{
                    x: reduce ? 0 : pos.x * 260,
                    y: reduce ? 0 : pos.y * 110,
                  }}
                  transition={{ type: "spring", stiffness: 140, damping: 18 }}
                />
              </>
            ) : (
              <motion.div
                className="tilt-card"
                animate={{
                  rotateX: reduce ? 0 : -pos.y * 25,
                  rotateY: reduce ? 0 : pos.x * 25,
                }}
                style={{ transformPerspective: 600 }}
              >
                <div
                  className="glare"
                  style={{
                    background: `radial-gradient(circle at ${50 + pos.x * 100}% ${50 + pos.y * 100}%, #ffffffbb, transparent 65%)`,
                  }}
                />
                3D TILT ◇
              </motion.div>
            )}
          </div>
          <Slider
            aria-label="터치와 키보드 방향 조절"
            min={-50}
            max={50}
            value={[pos.x * 100]}
            onValueChange={(v) => setPos({ x: v[0] / 100, y: v[0] / 100 })}
          />
        </>
      );
      break;
    case 48:
      content = (
        <>
          <Button onClick={replay}>축하하기</Button>
          <div key={cycle} className="confetti-stage">
            <strong>{cycle ? "축하합니다!" : "작은 성공을 축하하세요."}</strong>
            {running &&
              !reduce &&
              Array.from({ length: 36 }, (_, i) => (
                <span
                  className="confetti-piece"
                  key={i}
                  style={{
                    left: `${(i * 37) % 100}%`,
                    background: ["#18181b", "#a1a1aa", "#d4d4d8", "#4b5563"][
                      i % 4
                    ],
                    animationDelay: `${(i % 6) * 0.05}s`,
                    transform: `rotate(${i * 27}deg)`,
                  }}
                />
              ))}
          </div>
          {reduce && <p>모션 감소: 색종이 대신 축하 메시지를 표시합니다.</p>}
        </>
      );
      break;
    default:
      content = null;
  }
  return (
    <section
      data-demo={id}
      className={`demo-shell ${reduce ? "reduce-motion" : ""}`}
    >
      <div className="demo-label">
        <span>LIVE EXAMPLE / {String(id).padStart(2, "0")}</span>
        <span>{reduce ? "모션 감소 적용" : "직접 체험"}</span>
      </div>
      <div className="demo-content">{content}</div>
      {[19, 24, 32, 33, 34, 35, 36, 39, 40, 41, 48].includes(id) && (
        <Button
          variant="ghost"
          onClick={() => {
            setRunning(false);
            setCycle(0);
            setValue(0);
            setOn(false);
            setText(id === 24 ? "저장하기" : "VIBE CODING");
          }}
        >
          중지 / 초기화
        </Button>
      )}
    </section>
  );
}
