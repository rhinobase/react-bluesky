import type { ImgHTMLAttributes } from "react";

export type MediaImage = ImgHTMLAttributes<HTMLImageElement>;

// biome-ignore lint/a11y/useAltText: The alt text is part of `...props`
export const MediaImage = (props: MediaImage) => <img {...props} />;
