import type { JSXElement } from "solid-js";
import type { PostNotFound } from "../components/PostNotFound";

/**
 * Custom components that the default Bluesky theme allows.
 *
 * Note: We only use these components in Server Components
 * component that uses them is a Server Component and you can't pass down functions to a
 * client component unless they're Server Actions.
 */
export type PostComponents = {
  PostNotFound?: typeof PostNotFound;
};

export type PostProps = PostHandleWithApiUrlProps & {
  /**
   * Components to replace the default bluesky components.
   */
  components?: PostComponents;
  /**
   * A function to handle errors when fetching the post
   */
  onError?(error: unknown): unknown;
  /**
   * The fallback component to render while the post is loading.
   * @default PostSkeleton
   */
  fallback?: JSXElement;
  /**
   * The options to pass to the fetch function.
   */
  fetchOptions?: RequestInit;
};

export type PostHandleProps = {
  /**
   * The post ID
   * @example "3laq6uzwjbc2t"
   */
  id: string;
} & (
  | {
      /**
       * The profile handle of the post author
       * @example "adima7.bsky.social"
       */
      handle: string;
      did?: never;
    }
  | {
      /**
       * The DID of the post author
       * @example "did:plc:xdwatsttsxnl5h65mf3ddxbq"
       */
      did: string;
      handle?: never;
    }
);

export type PostHandleWithApiUrlProps =
  | PostHandleProps
  | {
      /**
       * the API URL to fetch the post from when using the post client-side with SWR.
       * @default "https://bsky-react-post.rhinobase.io/api/post/?uri=${uri}"
       */
      apiUrl: string;
    };
