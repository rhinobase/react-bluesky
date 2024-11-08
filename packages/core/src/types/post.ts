import type { ReactNode } from "react";
import type { PostComponents } from "./post-components";

export type PostProps = {
  onError?(error: unknown): unknown;
  fallback?: ReactNode;
  components?: PostComponents;
  fetchOptions?: RequestInit;
} & (
  | {
      id: string;
      handle: string;
      apiUrl?: string;
    }
  | {
      id?: string;
      handle?: string;
      apiUrl: string | undefined;
    }
);
