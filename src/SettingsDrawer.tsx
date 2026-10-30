import { Settings2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { usePreferences } from "./preferences";
export function SettingsDrawer() {
  const {preferences: p, update, reset, reduced, systemReduced, storageAvailable} = usePreferences();
  return <Sheet><SheetTrigger asChild><Button variant="outline" aria-label="화면 및 모션 설정"><Settings2 />설정</Button></SheetTrigger>
    <SheetContent size="builder" side="right">
      <SheetHeader><SheetTitle>화면 및 모션 설정</SheetTitle><SheetDescription>48개 데모에 바로 적용됩니다. 설정은 이 브라우저에 저장됩니다.</SheetDescription></SheetHeader>
      <div className="settings-body">
        <fieldset><legend>색상 테마</legend><div className="settings-options">{([['system','시스템'],['light','라이트'],['dark','다크']] as const).map(([value,label]) => <Button key={value} variant={p.theme === value ? "default" : "outline"} aria-pressed={p.theme === value} onClick={() => update({theme:value})}>{label}</Button>)}</div></fieldset>
        <fieldset><legend>강조 색상</legend><div className="settings-options">{([['violet','바이올렛'],['blue','블루'],['green','그린']] as const).map(([value,label]) => <Button key={value} variant={p.accent === value ? "default" : "outline"} aria-pressed={p.accent === value} onClick={() => update({accent:value})}>{label}</Button>)}</div><p>버튼, 포커스와 데모 색상이 함께 바뀝니다.</p></fieldset>
        <fieldset><legend>모션</legend><label className="settings-row" htmlFor="reduce"><span>모션 줄이기</span><Switch id="reduce" checked={p.motion === "reduce"} onCheckedChange={checked => update({motion:checked ? "reduce" : "system"})} /></label>
          <p>{systemReduced ? "기기의 모션 줄이기가 켜져 있어 항상 수동 모드로 표시합니다." : "끄면 기기의 모션 설정을 따릅니다."}</p>
          <p role="status">{reduced ? "현재: 수동 모드 · 슬라이더로 장면을 확인하세요." : "현재: 일반 모션"}</p>
          <label className="settings-row" htmlFor="autoloop"><span>자동 반복</span><Switch id="autoloop" checked={p.autoLoop} onCheckedChange={autoLoop => update({autoLoop})} /></label><p>끄면 진행 중인 데모가 끝에서 멈춥니다. 재생 버튼으로 다시 시작할 수 있습니다.</p>
        </fieldset>
        <fieldset><legend>재생 속도</legend><div className="settings-options">{([0.25,0.5,1,1.5,2] as const).map(speed => <Button key={speed} size="sm" variant={p.speed === speed ? "default" : "outline"} aria-pressed={p.speed === speed} onClick={() => update({speed})}>{speed}×</Button>)}</div><p>타임라인 데모의 실제 재생 속도입니다. 수동 모드에서는 자동 재생하지 않습니다.</p></fieldset>
        <Button variant="outline" onClick={reset}><RotateCcw />전체 화면 설정 초기화</Button>
        <p role="status">{storageAvailable ? "이 기기에 자동 저장됨" : "브라우저 저장이 차단되어 이번 방문에만 적용됩니다."}</p>
      </div>
    </SheetContent></Sheet>;
}
