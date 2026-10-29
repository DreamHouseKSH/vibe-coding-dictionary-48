import { lazy, Suspense, useEffect, useRef, useState } from "react";

const Demo = lazy(() => import("./Demo"));

/** Mount only visible playgrounds. Leaving the viewport or filtering unmounts
 * the demo, cancelling its timers, observers and library-owned animations. */
export function InlineDemo({
  id,
  title,
  reduced,
}: {
  id: number;
  title: string;
  reduced: boolean;
}) {
  const host = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!host.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px 0px" },
    );
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={host}
      data-demo-host={id}
      className="inline-demo-host"
      aria-label={`${title} 직접 체험`}
    >
      {visible ? (
        <Suspense
          fallback={<p className="demo-placeholder">데모를 불러오는 중…</p>}
        >
          <Demo key={`${id}-${reduced}`} id={id} reduced={reduced} />
        </Suspense>
      ) : (
        <p className="demo-placeholder">
          이 영역이 보이면 데모가 준비됩니다.
          <br />
          화면 밖의 모션은 중지됩니다.
        </p>
      )}
    </section>
  );
}
