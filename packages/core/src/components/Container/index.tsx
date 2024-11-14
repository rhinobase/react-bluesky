import { type PropsWithChildren, useEffect, useRef } from "react";
import { classNames, eventHandler } from "../../utils";
import { Link } from "../Link";
import "../../theme.css";
import s from "./container.module.css";

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

  const handleInteraction = eventHandler(() => {
    if (ref.current && href) {
      const anchor = ref.current.querySelector("a");
      if (anchor) {
        anchor.click();
      }
    }
  });

  return (
    <div
      ref={ref}
      className={classNames("react-bluesky-theme", s.container)}
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
    >
      {href && <Link href={href} />}
      <div className={s.article}>{children}</div>
    </div>
  );
}
