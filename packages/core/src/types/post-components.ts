/**
 * Custom components that the default Bluesky theme allows.
 *
 * Note: We only use these components in Server Components
 * component that uses them is a Server Component and you can't pass down functions to a
 * client component unless they're Server Actions.
 */
export type PostComponents = {
  PostNotFound?: typeof import("../components/PostNotFound").PostNotFound;
  AvatarImage?: typeof import("../components/AvatarImage").AvatarImage;
  MediaImage?: typeof import("../components/MediaImage").MediaImage;
};
