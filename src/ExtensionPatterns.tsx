import { useId, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDemoOptions } from "./demo-options";

const cities = ["서울", "부산", "인천", "대전", "대구", "광주"];
function ComboboxDemo() {
  const limit = useDemoOptions(52);
  const uid = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const options = cities.filter(city => city.includes(query.trim())).slice(0, limit);
  const index = Math.min(active, Math.max(0, options.length - 1));
  function choose(city: string) {
    setSelected(city); setQuery(city); setOpen(false); input.current?.focus();
  }
  return <div className="extension-pattern">
    <label htmlFor={`${uid}-input`}>도시 자동 완성</label>
    <Input ref={input} id={`${uid}-input`} role="combobox" value={query} autoComplete="off"
      aria-autocomplete="list" aria-expanded={open} aria-controls={`${uid}-list`}
      aria-activedescendant={open && options.length ? `${uid}-option-${index}` : undefined}
      aria-describedby={`${uid}-help`}
      onChange={event => { setQuery(event.target.value); setSelected(""); setActive(0); setOpen(true); }}
      onFocus={() => setOpen(true)}
      onBlur={event => { if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={event => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault(); setOpen(true);
          setActive(open ? (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % Math.max(1, options.length) : 0);
        } else if (event.key === "Enter" && open && options[index]) { event.preventDefault(); choose(options[index]); }
        else if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
        else if (event.key === "Tab") setOpen(false);
      }} />
    <p id={`${uid}-help`}>↑↓ 이동 · Enter 선택 · Escape 닫기. 목록은 이 카드 안에서만 열립니다.</p>
    <div id={`${uid}-list`} role="listbox" aria-label="추천 도시" hidden={!open} className="extension-combo-list">
      {options.map((city, i) => <Button key={city} id={`${uid}-option-${i}`} role="option" aria-selected={i === index} tabIndex={-1} variant={i === index ? "secondary" : "ghost"} onPointerDown={event => event.preventDefault()} onClick={() => choose(city)}>{city}</Button>)}
    </div>
    {open && !options.length && <p role="status">일치하는 도시가 없습니다. 검색어를 지워 보세요.</p>}
    <p role="status">{selected ? `선택됨: ${selected}` : `최대 ${limit}개 추천 · 아직 선택하지 않았습니다.`}</p>
    <Button variant="outline" size="sm" onClick={() => {setQuery(""); setSelected(""); setActive(0); input.current?.focus();}}>선택 초기화</Button>
  </div>;
}

const tasks = ["기획", "설계", "구현", "검증", "개선", "공유"];
function ReorderDemo() {
  const count = useDemoOptions(53);
  const [order, setOrder] = useState(tasks);
  const [dragged, setDragged] = useState<string | null>(null);
  const [message, setMessage] = useState("드래그하거나 위·아래 버튼으로 순서를 바꾸세요.");
  const list = useRef<HTMLOListElement>(null);
  const pointer = useRef<{ item: string; target: number; pointerId: number } | null>(null);
  const visible = order.filter(item => tasks.indexOf(item) < count);
  function move(item: string, target: number) {
    const from = visible.indexOf(item);
    if (from < 0) return;
    const to = Math.max(0, Math.min(visible.length - 1, target));
    const next = visible.filter(value => value !== item);
    next.splice(to, 0, item);
    setOrder([...next, ...order.filter(value => !visible.includes(value))]);
    setMessage(from === to ? `${item}: ${to + 1}번째 위치를 유지합니다.` : `${item}: ${from + 1}번째에서 ${to + 1}번째로 이동했습니다.`);
  }
  return <div className="extension-pattern">
    <p id="reorder-help">손잡이를 세로로 드래그하세요. 터치·마우스 또는 위·아래 버튼을 사용할 수 있습니다. Escape로 드래그를 취소합니다.</p>
    <ol ref={list} className="extension-reorder-list" aria-label="작업 순서">
      {visible.map((item, index) => <li key={item} data-reorder-item={item} className="extension-reorder-item" data-dragging={dragged === item}>
        <span className="extension-drag-handle"><Button size="sm" variant="outline" aria-label={`${item} 드래그 손잡이`} aria-describedby="reorder-help"
          onPointerDown={event => {
            if (event.button !== 0) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            pointer.current = {item, target:index, pointerId:event.pointerId}; setDragged(item);
            setMessage(`${item} 이동 중. 놓으면 순서가 변경됩니다.`);
          }}
          onPointerMove={event => {
            const drag = pointer.current;
            if (!drag || drag.pointerId !== event.pointerId) return;
            const rows = Array.from(list.current?.children ?? []);
            let nearest = 0, distance = Infinity;
            rows.forEach((row, i) => { const bounds = row.getBoundingClientRect(); const d = Math.abs(event.clientY - (bounds.top + bounds.height / 2)); if (d < distance) {distance=d; nearest=i;} });
            if (drag.target !== nearest) setMessage(`${item}: ${nearest+1}번째 위치에 놓을 준비가 되었습니다.`);
            drag.target=nearest;
          }}
          onPointerUp={event => {
            const drag = pointer.current;
            if (!drag || drag.pointerId !== event.pointerId) return;
            move(drag.item, drag.target); pointer.current=null; setDragged(null);
          }}
          onLostPointerCapture={() => {if (pointer.current) {pointer.current=null;setDragged(null);setMessage("드래그가 중단되어 원래 순서를 유지합니다.");}}}
          onPointerCancel={() => {pointer.current=null; setDragged(null); setMessage("드래그를 취소했습니다. 원래 순서를 유지합니다.");}}
          onKeyDown={event => {if (event.key === "Escape" && pointer.current) {pointer.current=null;setDragged(null);setMessage("드래그를 취소했습니다.");}}}>↕ {item}</Button></span>
        <div className="extension-row-actions">
          <Button size="sm" variant="ghost" aria-label={`${item} 위로`} aria-disabled={index === 0} onClick={() => move(item, index-1)}>위</Button>
          <Button size="sm" variant="ghost" aria-label={`${item} 아래로`} aria-disabled={index === visible.length-1} onClick={() => move(item, index+1)}>아래</Button>
        </div>
      </li>)}
    </ol>
    <p role="status" aria-atomic="true">{message}</p>
    <Button variant="outline" size="sm" onClick={() => {pointer.current=null;setDragged(null);setOrder(tasks);setMessage("기본 순서로 초기화했습니다.");}}>순서 초기화</Button>
  </div>;
}

function ContainerDemo() {
  const width = useDemoOptions(54);
  return <div className="extension-pattern">
    <p>브라우저 폭이 아닌, 아래 컨테이너의 폭으로 배치가 바뀝니다. 상단 옵션을 조절하세요.</p>
    <div className="extension-container-frame" style={{"--container-demo-width":`${width}%`} as CSSProperties}>
      <div className="extension-container-card">
        <div className="extension-container-art" aria-hidden="true">UI</div>
        <div><strong>하나의 카드</strong><p className="extension-container-narrow">좁은 컨테이너 · 세로 배치</p><p className="extension-container-wide">넓은 컨테이너 · 가로 배치</p><span>실시간 {width}% 폭</span></div>
      </div>
    </div>
    <p className="extension-container-support">컨테이너 쿼리 미지원 브라우저에서는 안전한 세로 배치를 유지합니다.</p>
  </div>;
}

const lessons = ["레이아웃", "폼 입력", "접근성", "상태 관리", "오류 복구", "키보드", "터치", "색상", "모션", "성능", "테스트", "배포"];
function PaginationDemo() {
  const size = useDemoOptions(55);
  const [requestedPage, setPage] = useState(1);
  const total = Math.ceil(lessons.length / size);
  const page = Math.min(requestedPage, total);
  const start = (page-1)*size;
  return <div className="extension-pattern">
    <p role="status">전체 {lessons.length}개 중 {start+1}–{Math.min(start+size,lessons.length)}개 · {page}/{total}페이지</p>
    <ol start={start+1} className="extension-page-list">{lessons.slice(start,start+size).map(item=><li key={item}>{item}</li>)}</ol>
    <nav aria-label="데모 페이지 이동" className="extension-page-nav">
      <Button size="sm" variant="outline" aria-disabled={page === 1} onClick={()=>setPage(Math.max(1,page-1))}>이전</Button>
      {Array.from({length:total},(_,i)=>i+1).map(number=><Button key={number} size="sm" variant={page===number?"default":"outline"} aria-label={`${number}페이지`} aria-current={page===number?"page":undefined} onClick={()=>setPage(number)}>{number}</Button>)}
      <Button size="sm" variant="outline" aria-disabled={page===total} onClick={()=>setPage(Math.min(total,page+1))}>다음</Button>
    </nav>
    <Button variant="ghost" size="sm" onClick={()=>setPage(1)}>첫 페이지로 초기화</Button>
    <p>페이지당 항목 수를 줄이거나 늘려도 유효한 페이지 범위 안에 머뭅니다. 서버 요청 없는 로컬 예시입니다.</p>
  </div>;
}

export function ExtensionPatterns({id}: {id:number}) {
  switch(id) {
    case 52: return <ComboboxDemo />;
    case 53: return <ReorderDemo />;
    case 54: return <ContainerDemo />;
    case 55: return <PaginationDemo />;
    default: return null;
  }
}
