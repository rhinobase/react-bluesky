import type { HTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "../../utils";
import s from "./post-container.module.css";
import "../../theme.css";

export type PostContainer = PropsWithChildren<{
  className?: HTMLAttributes<HTMLDivElement>["className"];
}>;

export function PostContainer({ children, className }: PostContainer) {
  return (
    <div className={classNames("react-bluesky-theme", s.root, className)}>
      <article className={s.article}>{children}</article>
    </div>
  );
}
