import { classNames } from "../../utils";
import s from "./post-error.module.css";
import "../../theme.css";

export type PostError = {
  error: string;
};

export function PostError(props: PostError) {
  return (
    <div class={classNames("bsky-react-post-theme", s.container)}>
      <p class={s.text}>{props.error}</p>
    </div>
  );
}
