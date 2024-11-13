import { type PropsWithChildren, useEffect, useRef } from "react";
import { Link } from "./Link";

export type ContainerProps = PropsWithChildren<{
  href?: string;
}>;

export function Container({ children, href }: ContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prevHeight = useRef(0);

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;

        let { height } = entry.contentRect;
        height += 2; // border top and bottom
        if (height !== prevHeight.current) {
          prevHeight.current = height;
          window.parent.postMessage(
            {
              height,
              id: new URLSearchParams(window.location.search).get("id"),
            },
            "*",
          );
        }
      });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div
      ref={ref}
      className="w-full bg-white hover:bg-neutral-50 relative transition-colors max-w-[600px] min-w-[300px] flex border rounded-xl"
      onClick={() => {
        if (ref.current && href) {
          const anchor = ref.current.querySelector("a");
          if (anchor) {
            anchor.click();
          }
        }
      }}
      onKeyDown={() => {
        if (ref.current && href) {
          const anchor = ref.current.querySelector("a");
          if (anchor) {
            anchor.click();
          }
        }
      }}
    >
      {href && <Link href={href} />}
      <div className="flex-1 px-4 pt-3 pb-2.5">{children}</div>
    </div>
  );
}
