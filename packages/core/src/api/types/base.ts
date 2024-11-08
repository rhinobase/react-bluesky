import type { AuthorType } from "./author";

export interface PostBaseType {
  uri: string;
  cid: string;
  author: AuthorType;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  quoteCount: number;
  indexedAt: string;
  labels: unknown[];
}
