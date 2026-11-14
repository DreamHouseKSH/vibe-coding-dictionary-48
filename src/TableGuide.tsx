import { toast } from "sonner";
import { ArrowLeft, ArrowUpRight, BookOpen, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { SettingsDrawer } from "./SettingsDrawer";
import { usePreferences } from "./preferences";
import { aiPrompt, aiRules, demoCss, sources } from "./table-guide-data";

const people = [
  { name: "김하늘", team: "플랫폼 개발팀", sales: 12840, rate: 94.2 },
  { name: "이도윤", team: "데이터 분석팀", sales: 9310, rate: 88.5 },
  { name: "박서연", team: "디자인 시스템팀", sales: 15720, rate: 97.1 },
  { name: "최지호", team: "모바일 앱 개발팀", sales: 7480, rate: 81.3 },
  { name: "정수아", team: "고객 경험 연구팀", sales: 11090, rate: 90.8 },
  { name: "한민준", team: "인프라 운영팀", sales: 6620, rate: 79.6 },
  { name: "오유진", team: "보안 및 접근성팀", sales: 13950, rate: 95.4 },
];

const tocLabel: Record<string, string> = { "nng-mobile": "NN/g 모바일 표", "nng-tasks": "NN/g 4가지 작업", material: "Material", w3c: "W3C WAI" };

export function TableGuide() {
  const { reduced } = usePreferences();
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("프롬프트를 복사했습니다.");
    } catch {
      toast.error("복사할 수 없습니다. 아래 텍스트를 선택해 직접 복사하세요.");
    }
  }
  return (
    <>
      <a className="skip" href="#guide">본문으로 이동</a>
      <div id="top" className={reduced ? "app reduce-motion" : "app"}>
        <header className="site-header">
          <a href="./" className="brand"><BookOpen size={20} /><span>VIBE / UI</span></a>
          <div className="header-actions">
            <SettingsDrawer />
            <Button asChild variant="outline"><a href="./"><ArrowLeft />사전으로</a></Button>
          </div>
        </header>
        <main>
          <section className="hero tg-hero">
            <div className="eyebrow">TABLE GUIDELINES · 지침서 전체 정리</div>
            <h1>표는 예쁘기 전에,<br /><span>읽혀야 합니다.</span></h1>
            <p className="intro">
              NN/g 2편, Material Design, W3C WAI. 표 가독성 지침 4종의 내용을 빠짐없이 모아
              AI가 표를 만들 때 바로 적용할 수 있는 규칙과 예시로 정리했습니다.
            </p>
            <div className="hero-bottom">
              <Button asChild size="lg"><a href="#guide">전체 규칙 보기 <ArrowUpRight /></a></Button>
              <p><strong>4</strong> 지침서 <span>/</span> <strong>{aiRules.length}</strong> 적용 규칙 <span>/</span> 직접 체험</p>
            </div>
          </section>
          <section className="source-note">
            <div>
              <Badge variant="outline">출처와 확인 범위</Badge>
              <p>
                2026-11-14에 아래 원문 페이지(W3C는 하위 5개 페이지 포함, Material은 M1·M2 문서)를 직접 읽고
                <strong> 한국어로 풀어 쓴 정리</strong>입니다. 문장을 그대로 옮기지 않았고, 비공식 요약이며 각 기관의 보증을 뜻하지 않습니다.
                정확한 문구와 도해는 원문을 확인하세요. 사전의 57번 카드 &quot;데이터 표 읽기 규칙&quot;은 이 내용의 짧은 버전입니다.
              </p>
            </div>
            <div className="source-links">
              {sources.map((s) => (
                <a key={s.id} href={s.url} target="_blank" rel="noreferrer">{s.no} · {s.org} ↗</a>
              ))}
            </div>
          </section>
          <nav className="tg-toc" aria-label="목차">
            <a href="#ai-rules">AI 적용 규칙</a>
            <a href="#demo">작동 예시</a>
            {sources.map((s) => (<a key={s.id} href={`#${s.id}`}>{s.no} {tocLabel[s.id]}</a>))}
            <a href="#compare">충돌 정리</a>
          </nav>
          <div id="guide" className="tg-body">
            <section id="ai-rules" className="tg-section">
              <div className="eyebrow">AI CODING RULES · {aiRules.length}</div>
              <h2>AI가 표를 만들 때 바로 쓰는 규칙</h2>
              <p className="tg-lead">네 지침서를 모아 AI 코딩 지시로 바꾼 것입니다. 오른쪽 배지가 근거 지침서입니다. 규칙마다 아래에서 원문 내용과 함께 볼 수 있습니다.</p>
              <ol className="tg-rules">
                {aiRules.map((r) => (
                  <li key={r.rule}><span>{r.rule}</span><Badge variant="secondary">{r.src}</Badge></li>
                ))}
              </ol>
              <div className="tg-actions">
                <Button onClick={() => copy(aiPrompt)}><Copy />규칙 프롬프트 복사</Button>
              </div>
              <details className="term-prompt">
                <summary>프롬프트 미리보기</summary>
                <p className="tg-prewrap">{aiPrompt}</p>
              </details>
            </section>

            <section id="demo" className="tg-section">
              <div className="eyebrow">LIVE EXAMPLE</div>
              <h2>규칙을 적용한 표 예시</h2>
              <p className="tg-lead">caption, th scope, 숫자 오른쪽 정렬, 고정 헤더와 첫 열, 지브라와 호버, 가로 스크롤 안내(마지막 열이 살짝 잘림)를 적용했습니다. 좁은 화면에서 직접 스크롤해 보세요.</p>
              <div className="tg-scroll" role="region" aria-label="규칙 적용 표 예시, 가로·세로 스크롤 가능" tabIndex={0}>
                <table className="tg-table">
                  <caption>팀별 분기 실적 <span>첫 열은 이름, 나머지는 소속 팀과 수치입니다. 숫자는 오른쪽 정렬.</span></caption>
                  <thead>
                    <tr>
                      <th scope="col">이름</th>
                      <th scope="col">소속 팀</th>
                      <th scope="col" className="num">매출(만 원)</th>
                      <th scope="col" className="num">달성률(%)</th>
                      <th scope="col">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {people.map((p) => (
                      <tr key={p.name}>
                        <th scope="row">{p.name}</th>
                        <td>{p.team}</td>
                        <td className="num">{p.sales.toLocaleString("ko-KR")}</td>
                        <td className="num">{p.rate.toFixed(1)}</td>
                        <td>{p.rate >= 90 ? "목표 달성" : "추가 확인 필요"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <pre className="tg-code" aria-label="예시 CSS"><code>{demoCss}</code></pre>
            </section>

            {sources.map((s) => (
              <section key={s.id} id={s.id} className="tg-section">
                <div className="card-meta"><span>{s.no}</span><Badge variant="secondary">{s.org}</Badge></div>
                <h2>{s.title}</h2>
                <p className="tg-meta">{s.meta} · <a href={s.url} target="_blank" rel="noreferrer">원문 ↗</a>{s.extra?.map((e) => (<span key={e.url}> · <a href={e.url} target="_blank" rel="noreferrer">{e.label} ↗</a></span>))}</p>
                <p className="tg-lead">{s.summary}</p>
                <div className="tg-groups">
                  {s.groups.map((g) => (
                    <Card key={g.h} variant="catalog">
                      <CardHeader>
                        <CardTitle><h3>{g.h}</h3></CardTitle>
                        {g.lead && <CardDescription>{g.lead}</CardDescription>}
                      </CardHeader>
                      <CardContent>
                        {g.items && <ul className="tg-list">{g.items.map((i) => <li key={i}>{i}</li>)}</ul>}
                        {g.table && (
                          <div className="tg-scroll" role="region" aria-label={g.table.caption} tabIndex={0}>
                            <table className="tg-table tg-spec">
                              <caption>{g.table.caption}</caption>
                              <thead><tr>{g.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                              <tbody>{g.table.rows.map((r) => (<tr key={r[0]}><th scope="row">{r[0]}</th>{r.slice(1).map((c) => <td key={c}>{c}</td>)}</tr>))}</tbody>
                            </table>
                          </div>
                        )}
                        {g.code && (<><p className="tg-codelabel">{g.codeLabel}</p><pre className="tg-code"><code>{g.code}</code></pre></>)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}

            <section id="compare" className="tg-section">
              <div className="eyebrow">WHEN SOURCES DIFFER</div>
              <h2>지침이 다를 때 고르는 법</h2>
              <div className="tg-scroll" role="region" aria-label="지침 충돌 정리 표" tabIndex={0}>
                <table className="tg-table tg-spec">
                  <caption>값이 다른 항목과 권장 선택</caption>
                  <thead><tr><th scope="col">항목</th><th scope="col">Material 1</th><th scope="col">Material 2</th><th scope="col">이 페이지의 선택</th></tr></thead>
                  <tbody>
                    <tr><th scope="row">데이터 행 높이</th><td>48dp</td><td>52dp</td><td>52dp(M2, 현행). 모바일은 터치 48dp 확보</td></tr>
                    <tr><th scope="row">열 사이 패딩</th><td>56dp 이상</td><td>32dp 이상</td><td>32dp 이상. 긴 헤더는 가로 스크롤 또는 말줄임+툴팁</td></tr>
                    <tr><th scope="row">헤더 행 높이</th><td>(별도 값 없음)</td><td>56dp</td><td>56dp</td></tr>
                    <tr><th scope="row">셀 패딩</th><td>(별도 값 없음)</td><td>상하 6dp, 좌 8dp</td><td>밀도에 맞춰 조정. 모바일은 더 넉넉히</td></tr>
                    <tr><th scope="row">긴 헤더</th><td>전체 표시+가로 스크롤 또는 줄여 쓰고 호버로 전체</td><td>말줄임+툴팁</td><td>모바일은 호버가 없으므로 가로 스크롤 또는 줄바꿈</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="tg-lead">Material은 데스크톱 호버를 전제로 한 규칙이 많습니다. 터치 화면에서는 호버 의존 정보(툴팁, 정렬 힌트)를 다른 방법으로 제공하고, 모바일 패턴은 NN/g Mobile Tables를 따르세요.</p>
            </section>
          </div>
        </main>
        <footer>
          <span>VIBE / UI</span>
          <p>표는 데이터의 관계를 보여주는 도구입니다. 구조와 읽기 쉬움을 먼저 지키세요.</p>
          <a href="https://github.com/DreamHouseKSH/vibe-coding-dictionary-48">GitHub ↗</a>
        </footer>
        <Toaster richColors position="bottom-center" />
      </div>
    </>
  );
}
