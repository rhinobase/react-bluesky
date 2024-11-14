import type { ReactNode } from "react";
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

export type PostProps = {
  uri?: string;
  apiUrl?: string;
  components?: PostComponents;
  onError?(error: unknown): unknown;
  fallback?: ReactNode;
  fetchOptions?: RequestInit;
};
