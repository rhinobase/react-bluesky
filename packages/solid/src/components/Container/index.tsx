import {
  type ParentProps,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";
import "../../theme.css";
import { classNames } from "../../utils";
import { Link } from "../Link";
import s from "./container.module.css";

type ContainerProps = ParentProps<{
  href?: string;
}>;

export function Container(props: ContainerProps) {
  let ref: HTMLDivElement | null = null;
  const [prevHeight, setPrevHeight] = createSignal(0);

  createEffect(() => {
    if (ref) {
      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;

        let { height } = entry.contentRect;
        height += 2; // Add borders
        if (height !== prevHeight()) {
          setPrevHeight(height);
          window.parent.postMessage(
            {
              height,
              id: new URLSearchParams(window.location.search).get("id"),
            },
            "*",
          );
        }
      });
      observer.observe(ref);

      onCleanup(() => observer.disconnect());
    }
  });

  const handleInteraction = () => {
    if (ref && props.href) {
      const anchor = ref.querySelector("a");
      if (anchor) {
        (anchor as HTMLAnchorElement).click();
      }
    }
  };

  return (
    <div
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      ref={(el) => (ref = el)}
      class={classNames("bsky-react-post-theme", s.container)}
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
    >
      {props.href && <Link href={props.href} />}
      <div class={s.article}>{props.children}</div>
    </div>
  );
}
