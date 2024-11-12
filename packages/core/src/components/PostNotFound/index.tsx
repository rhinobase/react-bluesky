import { PostContainer } from "../PostContainer";
import s from "./post-not-found.module.css";

export type PostNotFound = {
  error?: unknown;
};

export const PostNotFound = (props: PostNotFound) => (
  <PostContainer>
    <div className={s.wrapper}>
      <h3 className={s.title}>Post not found</h3>
      <p>The embedded post could not be found…</p>
    </div>
  </PostContainer>
);
