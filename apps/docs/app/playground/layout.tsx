import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { ShikiProvider } from "../../providers";

export const metadata: Metadata = {
  title: "Playground",
  description: "Try out the bsky-react-post library.",
};

export default function PlaygroundLayout(props: PropsWithChildren) {
  return <ShikiProvider>{props.children}</ShikiProvider>;
}
