"use client";
import type { PropsWithChildren } from "react";
import { ShikiProvider } from "../../providers";

export default function PlaygroundLayout(props: PropsWithChildren) {
  return <ShikiProvider>{props.children}</ShikiProvider>;
}
