export interface AuthorType {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
  associated?: {
    chat: {
      allowIncoming: string;
    };
  };
  labels: unknown[];
  createdAt: string;
}
