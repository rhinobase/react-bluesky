import { Post } from "bsky-react-post/server";
import type { PropsWithChildren } from "react";

export default function HomeLayout(props: PropsWithChildren) {
  return (
    <>
      <div className="bsky_mdx mt-16">
        <Post handle="adima7.bsky.social" id="3laq6uzwjbc2t" />
      </div>
      {props.children}
    </>
  );
}
