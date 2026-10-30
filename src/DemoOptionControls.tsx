import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { demoOptions, setDemoOption, useDemoOptions } from "./demo-options";
export function DemoOptionControls({ id }: { id: number }) {
  const spec = demoOptions[id];
  const value = useDemoOptions(id);
  return <div className="demo-options" data-demo-options={id}>
    <div className="demo-option-heading">
      <span id={`demo-option-label-${id}`}>{spec.label}: <strong>{Number(value.toFixed(2))}{spec.unit}</strong></span>
      <Button size="sm" variant="ghost" onClick={() => setDemoOption(id, spec.initial)} aria-label={`${id}번 데모 옵션 초기화`}>초기화</Button>
    </div>
    <Slider aria-labelledby={`demo-option-label-${id}`} min={spec.min} max={spec.max} step={spec.step} value={[value]} onValueChange={([next]) => setDemoOption(id, next)} />
    <p className="demo-option-bounds">{spec.min}–{spec.max}{spec.unit} · 즉시 반영</p>
  </div>;
}
