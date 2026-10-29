export function GestureProgress({
  value,
  label,
  start = "시작",
  end = "끝",
}: {
  value: number;
  label: string;
  start?: string;
  end?: string;
}) {
  const progress = Math.max(0, Math.min(100, value));
  return (
    <div className="gesture-progress">
      <div className="timeline-readout">
        <span>{label}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <progress
        className="timeline-meter"
        max="100"
        value={progress}
        aria-label={label}
      />
      <div className="timeline-ends">
        <span>{start}</span>
        <span>{end}</span>
      </div>
    </div>
  );
}
