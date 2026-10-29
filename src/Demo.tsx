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
import type { CSSProperties, ReactNode } from "react";
import TimedDemo, { timelineSpecs } from "./TimedDemo";
import { GestureProgress } from "./GestureProgress";

export default function Demo(props: { id: number; reduced: boolean }) {
  return timelineSpecs[props.id] ? (
    <TimedDemo {...props} />
  ) : (
    <GestureDemo {...props} />
  );
}

function GestureDemo({ id, reduced }: { id: number; reduced: boolean }) {
  const systemReduce = useReducedMotion(),
    reduce = reduced || !!systemReduce;
  const [on, setOn] = useState(false),
    [value, setValue] = useState(0),
    [gesture, setGesture] = useState(0),
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
  const dur = reduce ? 0 : 0.9;
  const tiles = (n = 4) =>
    Array.from({ length: n }, (_, i) => (
      <div className="tile" key={i}>
        {String(i + 1).padStart(2, "0")}
      </div>
    ));
  const scrolling = (kind: number) => (
    <>
      <div
        className="scroll-demo"
        ref={scroll}
        tabIndex={0}
        role="region"
        aria-label="스크롤 체험 영역"
        onScroll={(e) => {
          const el = e.currentTarget;
          setValue(el.scrollTop);
          setGesture(
            (el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight)) *
              100,
          );
        }}
      >
        <div
          className={
            kind === 18 ? "scroll-story scroll-story-reveal" : "scroll-story"
          }
        >
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
                style={
                  {
                    "--parallax-y": `${reduce ? 0 : value * 0.65}px`,
                  } as CSSProperties
                }
              >
                BACKGROUND · 느리게
              </div>
              <div
                className="parallax-front"
                style={
                  {
                    "--parallax-y": `${reduce ? 0 : value * 0.15}px`,
                  } as CSSProperties
                }
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
      <GestureProgress
        value={gesture}
        label="실제 세로 스크롤 위치"
        start="맨 위"
        end="맨 아래"
      />
    </>
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
          <div
            className="resizable-demo"
            style={{ "--demo-width": `${value || 100}%` } as CSSProperties}
          >
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
            onScroll={(e) => {
              const el = e.currentTarget;
              setGesture(
                (el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)) *
                  100,
              );
            }}
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
          <GestureProgress
            value={gesture}
            label="실제 가로 스크롤 위치"
            start="첫 카드"
            end="마지막 카드"
          />
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
                <Skeleton shape="circle" className="size-12" />
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
        <>
          <Button
            variant="outline"
            className={`hover-demo ${on ? "is-hovered" : ""}`}
            onPointerEnter={() => setGesture(100)}
            onPointerLeave={() => setGesture(0)}
            onFocus={() => setGesture(100)}
            onBlur={() => setGesture(0)}
            onClick={() => setOn(!on)}
          >
            호버 · 포커스 · 터치해 보세요
          </Button>
          <GestureProgress
            value={on ? 100 : gesture}
            label="실제 호버·포커스·터치 상태"
            start="기본"
            end="반응"
          />
        </>
      );
      break;
    case 18:
      content = scrolling(18);
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
            onScroll={(e) => {
              const el = e.currentTarget;
              setGesture(
                (el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)) *
                  100,
              );
            }}
            ref={scroll}
            tabIndex={0}
            role="region"
            aria-label="가로 스크롤 체험"
          >
            {tiles(8)}
          </div>
          <Button
            variant="outline"
            onClick={() =>
              scroll.current?.scrollBy({
                left: 200,
                behavior: reduce ? "instant" : "smooth",
              })
            }
          >
            다음 카드 →
          </Button>
          <GestureProgress
            value={gesture}
            label="실제 가로 스크롤 위치"
            start="첫 카드"
            end="마지막 카드"
          />
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
              >
                <div
                  className="glare"
                  style={
                    {
                      "--glare-x": `${50 + pos.x * 100}%`,
                      "--glare-y": `${50 + pos.y * 100}%`,
                    } as CSSProperties
                  }
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
          <GestureProgress
            value={50 + pos.x * 100}
            label="실제 포인터 가로 위치"
            start="왼쪽"
            end="오른쪽"
          />
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
    </section>
  );
}
