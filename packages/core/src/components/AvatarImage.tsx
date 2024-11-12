export type AvatarImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// biome-ignore lint/a11y/useAltText: The alt text is part of `...props`
export const AvatarImage = ({ width, height, ...props }: AvatarImage) => (
  <img
    {...props}
    style={{ width, height, minWidth: width, minHeight: height }}
  />
);
