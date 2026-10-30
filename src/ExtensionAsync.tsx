import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useDemoOptions } from "./demo-options";

/** Timers model requests, never decoration. Unmount cancels all local work. */
function useTimers() {
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const clear = () => { timers.current.forEach(clearTimeout); timers.current.clear(); };
  useEffect(() => () => { timers.current.forEach(clearTimeout); timers.current.clear(); }, []);
  const later = (callback: () => void, delay: number) => {
    const timer = setTimeout(() => { timers.current.delete(timer); callback(); }, delay);
    timers.current.add(timer);
    return timer;
  };
  return { clear, later };
}

function ValidationDemo() {
  const minimum = useDemoOptions(49);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null), emailRef = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const focusFrame = useRef<number | null>(null);
  useEffect(() => () => { if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current); }, []);
  const nameError = name.trim().length < minimum ? `이름을 ${minimum}자 이상 입력하세요.` : "";
  const emailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "이메일 형식을 확인하세요. 예: demo@example.com";
  const invalid = !!(nameError || emailError);
  useEffect(() => { setSuccess(false); }, [minimum]);
  return <form className="extension-async" noValidate onSubmit={event => {
    event.preventDefault(); setSubmitted(true); setSuccess(!invalid);
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    if (invalid) focusFrame.current = requestAnimationFrame(() => summary.current?.focus());
  }}>
    <p>잘못 입력한 채 확인해 보세요. 입력값은 전송하지 않습니다.</p>
    {submitted && invalid && <div ref={summary} tabIndex={-1} role="alert" className="extension-error-summary">
      <strong>입력을 수정해 주세요.</strong>
      <div className="extension-actions">
        {nameError && <Button type="button" variant="link" size="sm" onClick={() => nameRef.current?.focus()}>이름 오류로 이동</Button>}
        {emailError && <Button type="button" variant="link" size="sm" onClick={() => emailRef.current?.focus()}>이메일 오류로 이동</Button>}
      </div>
    </div>}
    <div><label htmlFor="extension-name">이름</label>
      <Input ref={nameRef} id="extension-name" autoComplete="off" value={name} onChange={e => {setName(e.target.value);setSuccess(false);}} aria-invalid={submitted && !!nameError} aria-describedby="extension-name-help" />
      <p id="extension-name-help">{submitted && nameError ? nameError : `${minimum}자 이상 · 공백만 입력할 수 없습니다.`}</p>
    </div>
    <div><label htmlFor="extension-email">이메일</label>
      <Input ref={emailRef} id="extension-email" type="email" autoComplete="off" value={email} onChange={e => {setEmail(e.target.value);setSuccess(false);}} aria-invalid={submitted && !!emailError} aria-describedby="extension-email-help" />
      <p id="extension-email-help">{submitted && emailError ? emailError : "예: demo@example.com · 실제 이메일은 필요 없습니다."}</p>
    </div>
    <div className="extension-actions"><Button type="submit">입력 확인</Button><Button type="button" variant="outline" onClick={() => {setName("");setEmail("");setSubmitted(false);setSuccess(false);}}>입력 초기화</Button></div>
    <p role="status">{success ? "검증 통과 · 실제 저장이나 전송은 하지 않았습니다." : "오류는 색상뿐 아니라 텍스트로도 안내합니다."}</p>
  </form>;
}

type Outcome = "success" | "empty" | "error";
function AsyncStatesDemo() {
  const latency = useDemoOptions(50);
  const [outcome, setOutcome] = useState<Outcome>("success");
  const [state, setState] = useState<"idle" | "loading" | Outcome>("idle");
  const [message, setMessage] = useState("결과를 고른 뒤 불러오기를 누르세요.");
  const request = useRef(0);
  const pendingOutcome = useRef<Outcome>("success");
  useEffect(() => {
    if (state !== "loading") return;
    const version = request.current;
    const timer = setTimeout(() => {
      if (version !== request.current) return;
      const result = pendingOutcome.current; setState(result);
      setMessage(result === "success" ? "2개의 예시를 불러왔습니다." : result === "empty" ? "결과가 없습니다. 조건을 바꿔 다시 시도하세요." : "연결 실패를 모의했습니다. 입력은 유지됩니다. 재시도할 수 있습니다.");
    }, latency);
    return () => clearTimeout(timer);
  }, [state, latency]);
  function start() {
    if (state === "loading") return;
    request.current++; pendingOutcome.current = outcome; setState("loading");setMessage("불러오는 중… 중복 요청을 막고 있습니다.");
  }
  return <div className="extension-async">
    <fieldset><legend>다음 요청 결과 (모의)</legend><div className="extension-actions">{([['success','성공'],['empty','빈 결과'],['error','실패']] as const).map(([value,label]) => <Button key={value} variant={outcome === value ? "default" : "outline"} size="sm" disabled={state === "loading"} aria-pressed={outcome === value} onClick={() => setOutcome(value)}>{label}</Button>)}</div></fieldset>
    <p>서버 통신 없이 {latency}ms 지연을 재현합니다. 대기 중 지연을 바꾸면 타이머를 다시 시작합니다.</p>
    <div className="extension-actions"><Button disabled={state === "loading"} onClick={start}>{state === "error" ? "다시 시도" : "불러오기"}</Button><Button variant="outline" disabled={state !== "loading"} onClick={() => {request.current++;setState("idle");setMessage("요청을 취소했습니다. 늦은 결과는 반영하지 않습니다.");}}>요청 취소</Button></div>
    <p role="status">{message}</p>
    <div className="extension-result" aria-busy={state === "loading"}>
      {state === "loading" ? <p>응답을 기다리고 있습니다.</p> : state === "success" ? <ul><li>반응형 카드</li><li>키보드 내비게이션</li></ul> : state === "empty" ? <p>빈 목록 · 위에서 성공을 선택하고 다시 불러오세요.</p> : state === "error" ? <p>오류 상태 · 같은 결과를 다시 선택하면 실패를 재현합니다.</p> : <p>아직 불러온 내용이 없습니다.</p>}
    </div>
  </div>;
}

function OptimisticDemo() {
  const latency = useDemoOptions(51);
  const [liked, setLiked] = useState(false), [confirmed, setConfirmed] = useState(false);
  const [failure, setFailure] = useState(false), [pending, setPending] = useState(false);
  const [status, setStatus] = useState("좋아요를 누르면 응답 전에 화면부터 바뀝니다.");
  const previous = useRef(false), requestedFailure = useRef(false), version = useRef(0);
  const [canUndo, setCanUndo] = useState(false);
  useEffect(() => {
    if (!pending) return;
    const token = version.current;
    const timer = setTimeout(() => {
      if (token !== version.current) return;
      setPending(false);
      if (requestedFailure.current) {setLiked(previous.current);setConfirmed(previous.current);setCanUndo(false);setStatus("모의 요청 실패 · 이전 상태로 되돌렸습니다.");}
      else {setConfirmed(liked);setStatus("모의 요청 성공 · 실행 취소로 이전 상태를 복원할 수 있습니다.");}
    }, latency);
    return () => clearTimeout(timer);
  }, [pending, latency, liked]);
  return <div className="extension-async">
    <label className="extension-switch" htmlFor="extension-optimistic-fail"><span>요청 실패 재현</span><Switch id="extension-optimistic-fail" checked={failure} disabled={pending} onCheckedChange={setFailure} /></label>
    <div className="extension-actions"><Button aria-pressed={liked} disabled={pending} onClick={() => {version.current++;previous.current=confirmed;requestedFailure.current=failure;setLiked(!liked);setPending(true);setCanUndo(true);setStatus("화면에 먼저 반영했습니다. 서버 결과는 아직 미확정입니다.");}}>{liked ? "좋아요 취소" : "좋아요"} · {liked ? 13 : 12}</Button>
      <Button variant="outline" disabled={!canUndo} onClick={() => {version.current++;setPending(false);setLiked(previous.current);setConfirmed(previous.current);setCanUndo(false);setStatus("실행 취소 완료 · 대기 중인 결과도 무효화했습니다.");}}>실행 취소</Button></div>
    <p role="status">{status}</p>
    <p>표시 상태: {liked ? "좋아요" : "선택 안 함"} / 확정 상태: {confirmed ? "좋아요" : "선택 안 함"}{pending ? " · 응답 대기" : ""}</p>
    <p>실제 서버는 없습니다. 지연 {latency}ms · 실패 시 롤백, 성공 후에도 되돌리기를 제공합니다.</p>
  </div>;
}

const searchItems = ["카드 레이아웃", "카드 간격", "캐러셀", "스크롤 스냅", "스크롤 리빌", "스프링 모션", "모션 줄이기"];
function DebounceDemo() {
  const delay = useDemoOptions(56);
  const [query, setQuery] = useState("");
  const [composing, setComposing] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [status, setStatus] = useState("‘카드’ 또는 ‘스크롤’을 입력하세요.");
  const [sent, setSent] = useState(0), [ignored, setIgnored] = useState(0);
  const generation = useRef(0);
  const {clear, later} = useTimers();
  const active = useRef(true);
  useEffect(() => { active.current=true;return () => {active.current=false;}; }, []);
  useEffect(() => {
    const token = ++generation.current;
    if (composing) {setResults([]);setStatus("한글 조합 중 · 입력이 끝날 때까지 요청하지 않습니다.");return;}
    if (!query.trim()) {setResults([]);setStatus("검색어를 입력하면 요청을 준비합니다.");return;}
    setStatus(`${delay}ms 입력 대기 중… 이전 결과를 새 결과로 표시하지 않습니다.`);
    setResults([]);
    const timer = setTimeout(() => {
      setSent(n => n+1);setStatus(`‘${query}’ 검색 중…`);
      // Short queries intentionally return slower: later requests can finish first.
      later(() => {
        if (!active.current) return;
        if (token !== generation.current) {setIgnored(n => n+1);return;}
        const matches = searchItems.filter(item => item.includes(query.trim()));
        setResults(matches);setStatus(`‘${query}’ 결과 ${matches.length}개 · 최신 요청만 반영했습니다.`);
      }, query.trim().length < 2 ? 1600 : 400);
    }, delay);
    return () => clearTimeout(timer);
  // `later` uses a stable ref-backed timer bank; dependency is the input/config.
  }, [query, delay, composing]);
  return <div className="extension-async">
    <label htmlFor="extension-debounce">데모 검색어</label><Input id="extension-debounce" value={query} onCompositionStart={() => {generation.current++;setComposing(true);}} onCompositionEnd={e => {generation.current++;setQuery(e.currentTarget.value);setComposing(false);}} onChange={e => {generation.current++;setQuery(e.target.value);}} autoComplete="off" />
    <p>한 글자 요청은 1600ms, 두 글자 이상은 400ms 후 도착합니다. ‘카’를 입력하고 요청이 시작되면 ‘카드’로 바꿔 보세요.</p>
    <div className="extension-actions"><Button variant="outline" onClick={() => {generation.current++;clear();setQuery("");setComposing(false);setResults([]);setSent(0);setIgnored(0);setStatus("검색을 초기화했습니다.");}}>검색 초기화</Button></div>
    <p role="status">{status}</p><p>발생한 모의 요청 {sent}회 · 무시한 오래된 응답 {ignored}회</p>
    <ul className="extension-result">{results.map(item => <li key={item}>{item}</li>)}</ul>
    <p>실제 네트워크 요청은 없습니다. 입력 대기 시간을 바꾸면 새 대기 시간을 즉시 적용합니다.</p>
  </div>;
}

export function ExtensionAsync({ id }: {id: number}) {
  switch (id) {
    case 49: return <ValidationDemo />;
    case 50: return <AsyncStatesDemo />;
    case 51: return <OptimisticDemo />;
    case 56: return <DebounceDemo />;
    default: return null;
  }
}
