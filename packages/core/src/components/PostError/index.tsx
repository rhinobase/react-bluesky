import { classNames } from "../../utils";
import s from "./post-error.module.css";

export type PostError = {
  error: string;
};

export function PostError(props: PostError) {
  return (
    <div className={classNames("bsky-react-post-theme", s.container)}>
      <p className={s.text}>{props.error}</p>
    </div>
  );
}
