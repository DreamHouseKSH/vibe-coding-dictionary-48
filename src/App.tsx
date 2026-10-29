import { useState } from "react";
import { MotionConfig } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  ArrowUpRight,
  BookOpen,
  Plus,
  Check,
  Copy,
  Search,
} from "lucide-react";
import { terms } from "./terms";
import { InlineDemo } from "./InlineDemo";

const categories = [
  ["all", "전체"],
  ["ep1-layout", "레이아웃"],
  ["ep1-comp", "컴포넌트"],
  ["ep1-effect", "시각 효과"],
  ["ep2-basic", "기본 모션"],
  ["ep2-text", "텍스트 · 그래픽"],
  ["ep2-adv", "전환 · 반응"],
] as const;
export default function App() {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("all"),
    [selected, setSelected] = useState<number[]>([]),
    [reduce, setReduce] = useState(false),
    [copyError, setCopyError] = useState(false),
    [copyFailedTerm, setCopyFailedTerm] = useState<number | null>(null);
  const shown = terms.filter(
    (t) =>
      (category === "all" || t.cat === category) &&
      `${t.ko} ${t.en} ${t.desc}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  const prompt =
    "다음 조건으로 반응형 웹페이지를 구현해줘.\n\n" +
    terms
      .filter((t) => selected.includes(t.id))
      .map((t) => `- ${t.ko} (${t.en}): ${t.prompt}`)
      .join("\n") +
    "\n\n키보드, 터치, 명확한 포커스, prefers-reduced-motion을 지원해줘.";
  function toggle(id: number) {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  }
  async function copy(text: string, termId?: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyError(false);
      setCopyFailedTerm(null);
      toast.success("프롬프트를 복사했습니다.");
    } catch {
      setCopyError(true);
      setCopyFailedTerm(termId ?? null);
      toast.error("복사할 수 없습니다. 아래 텍스트를 선택해 직접 복사하세요.");
    }
  }
  return (
    <MotionConfig reducedMotion={reduce ? "always" : "user"}>
      <a className="skip" href="#dictionary">
        본문으로 이동
      </a>
      <div id="top" className={reduce ? "app reduce-motion" : "app"}>
        <header className="site-header">
          <a href="#top" className="brand">
            <BookOpen size={20} />
            <span>VIBE / 48</span>
          </a>
          <div className="header-actions">
            <label htmlFor="reduce" className="motion-setting">
              <Switch
                id="reduce"
                checked={reduce}
                onCheckedChange={setReduce}
                aria-label="모션 줄이기"
              />
              모션 줄이기
            </label>
            <Sheet>
              <SheetTrigger asChild>
                <Button>
                  프롬프트 빌더{" "}
                  <Badge variant="secondary">{selected.length}</Badge>
                </Button>
              </SheetTrigger>
              <SheetContent size="builder">
                <SheetHeader>
                  <SheetTitle>나만의 프롬프트</SheetTitle>
                  <SheetDescription>
                    용어를 담고, 원하는 동작을 조합하세요.
                  </SheetDescription>
                </SheetHeader>
                <div className="builder-body">
                  <p>{selected.length}개 선택</p>
                  <div className="selected">
                    {terms
                      .filter((t) => selected.includes(t.id))
                      .map((t) => (
                        <Button
                          key={t.id}
                          size="sm"
                          variant="secondary"
                          onClick={() => toggle(t.id)}
                        >
                          {t.ko} ×
                        </Button>
                      ))}
                  </div>
                  <label htmlFor="prompt">완성 프롬프트</label>
                  <Textarea
                    id="prompt"
                    size="builder"
                    readOnly
                    value={prompt}
                    rows={14}
                  />
                  <Button
                    disabled={!selected.length}
                    onClick={() => copy(prompt)}
                  >
                    <Copy />
                    전체 복사
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!selected.length}
                    onClick={() => setSelected([])}
                  >
                    비우기
                  </Button>
                  <p role="status">
                    {copyError
                      ? "자동 복사가 차단됐습니다. 텍스트를 선택해 직접 복사하세요."
                      : ""}
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main>
          <section className="hero">
            <div className="eyebrow">
              THE INTERACTIVE UI DICTIONARY · 한국어
            </div>
            <h1>
              느낌을 설명하던 말이,
              <br />
              <span>정확한 프롬프트가 됩니다.</span>
            </h1>
            <p className="intro">
              레이아웃부터 모션까지, 48개의 UI 용어를 카드 안에서 직접 움직여
              보세요.
              <br className="desktop-break" /> 마음에 드는 동작을 담으면 나만의
              구현 프롬프트가 완성됩니다.
            </p>
            <div className="hero-bottom">
              <Button asChild size="lg">
                <a href="#dictionary">
                  용어 탐색하기 <ArrowUpRight />
                </a>
              </Button>
              <p>
                <strong>48</strong> 용어 <span>/</span> <strong>6</strong>{" "}
                카테고리 <span>/</span> 직접 체험
              </p>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-grid">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <code>idea → interface</code>
            </div>
          </section>
          <section className="source-note">
            <div>
              <Badge variant="outline">출처와 확인 범위</Badge>
              <p>
                코드깎는노인 채널로 소개된 두 영상의{" "}
                <strong>사용자 제공 요약을 바탕으로 재구성</strong>했습니다.
                영상 제목은 확인했으나 자막·세부 항목은 독립 검증하지
                못했습니다. 타임스탬프는 제공하지 않습니다. 비공식 학습 자료이며
                채널의 보증·제휴를 의미하지 않습니다.
              </p>
            </div>
            <div className="source-links">
              <a
                href="https://youtu.be/mlhKEy-2bgI"
                target="_blank"
                rel="noreferrer"
              >
                1편 · UI와 구조 ↗
              </a>
              <a
                href="https://youtu.be/r7iS0Gw3Jq4"
                target="_blank"
                rel="noreferrer"
              >
                2편 · 모션과 애니메이션 ↗
              </a>
            </div>
          </section>
          <section className="summary">
            <p>
              <strong>01 / UI & 구조</strong> 정확한 용어 + 원하는 동작 + 적용
              조건
            </p>
            <p>
              <strong>02 / 모션 & 반응</strong> 효과 이름 + 시간·이징 + 시작
              조건 + 모션 감소
            </p>
          </section>
          <section id="dictionary" className="dictionary">
            <div className="catalog-header">
              <div>
                <div className="eyebrow">EXPLORE THE COLLECTION</div>
                <h2>
                  UI & Motion Library{" "}
                  <span>{shown.length.toString().padStart(2, "0")}</span>
                </h2>
              </div>
              <div className="search">
                <Search size={17} />
                <Input
                  aria-label="용어 검색"
                  leadingIcon
                  placeholder="용어 검색 · 예: 스프링, Tabs"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="filters" aria-label="카테고리">
              {categories.map(([id, label]) => (
                <Button
                  key={id}
                  size="sm"
                  variant={category === id ? "default" : "outline"}
                  aria-pressed={category === id}
                  onClick={() => setCategory(id)}
                >
                  {label}
                  <span>
                    {id === "all"
                      ? 48
                      : terms.filter((t) => t.cat === id).length}
                  </span>
                </Button>
              ))}
            </div>
            <p className="result-count" aria-live="polite">
              {shown.length}개 용어 · 카드에서 바로 체험하세요 · 화면 밖의
              모션은 중지됩니다
            </p>
            <div className="term-grid">
              {shown.map((t) => (
                <Card key={t.id} data-term={t.id} variant="catalog">
                  <CardHeader>
                    <div className="card-meta">
                      <span>{String(t.id).padStart(2, "0")}</span>
                      <Badge variant="secondary">
                        {t.ep === 1 ? "UI & 구조" : "모션 & 반응"}
                      </Badge>
                    </div>
                    <CardTitle>
                      <h3>{t.ko}</h3>
                    </CardTitle>
                    <CardDescription size="caption" className="mt-1">
                      {t.en}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="term-desc">{t.desc}</p>
                    <InlineDemo id={t.id} title={t.ko} reduced={reduce} />
                    <div className="card-actions">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copy(t.prompt, t.id)}
                        aria-label={`${t.ko} 예시 복사`}
                      >
                        <Copy size={14} />
                        예시 복사
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          selected.includes(t.id) ? "secondary" : "ghost"
                        }
                        aria-label={`${t.ko} ${selected.includes(t.id) ? "빼기" : "담기"}`}
                        aria-pressed={selected.includes(t.id)}
                        onClick={() => toggle(t.id)}
                      >
                        {selected.includes(t.id) ? <Check /> : <Plus />}
                        {selected.includes(t.id) ? "담음" : "담기"}
                      </Button>
                    </div>
                    <details
                      className="term-prompt"
                      open={copyFailedTerm === t.id}
                    >
                      <summary>프롬프트 예시 보기</summary>
                      <p>{t.prompt}</p>
                      {copyFailedTerm === t.id && (
                        <Textarea
                          aria-label={`${t.ko} 직접 복사용 예시`}
                          value={t.prompt}
                          readOnly
                        />
                      )}
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
            {!shown.length && (
              <div className="empty">
                <h3>검색 결과가 없습니다.</h3>
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                  }}
                >
                  검색 초기화
                </Button>
              </div>
            )}
          </section>
        </main>
        <footer>
          <span>VIBE / 48</span>
          <p>이름을 배우고, 움직임을 이해하고, 직접 만들어 보세요.</p>
          <a href="https://github.com/DreamHouseKSH/vibe-coding-dictionary-48">
            GitHub ↗
          </a>
        </footer>
        <Toaster richColors position="bottom-center" />
      </div>
    </MotionConfig>
  );
}
