import { useMemo } from "react";
import type { PostType } from "../api";
import type { PostComponents } from "../types";
import { PostBody } from "./PostBody";
import { PostContainer } from "./PostContainer";
import { PostEmbed } from "./PostEmbed";
import { PostHeader } from "./PostHeader";
import { PostInfo } from "./PostInfo";

export type PostComponent = {
  content: PostType;
  components?: Omit<PostComponents, "PostNotFound">;
};

export function PostComponent({
  content: postContent,
  components,
}: PostComponent) {
  // useMemo does nothing for RSC but it helps when the component is used in the client (e.g by SWR)
  const content = useMemo(() => postContent, [postContent]);

  return (
    <PostContainer
      link={`https://bsky.app/profile/${
        content.author.handle
      }/post/${content.uri.split("/").pop()}`}
    >
      <PostHeader content={content} components={components} />
      <PostBody content={content} />
      {content.embed && <PostEmbed content={content.embed} />}
      <PostInfo content={content} />
    </PostContainer>
  );
}
