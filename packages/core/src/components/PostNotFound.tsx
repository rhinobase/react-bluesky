import { PostContainer } from "./PostContainer";

export type PostNotFound = {
  error?: unknown;
};

export const PostNotFound = (props: PostNotFound) => (
  <PostContainer>
    <div className="flex flex-col items-center gap-2 pb-3">
      <h3 className="text-xl">Tweet not found</h3>
      <p>The embedded tweet could not be found…</p>
    </div>
  </PostContainer>
);
