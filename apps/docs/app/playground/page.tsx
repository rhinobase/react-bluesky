"use client";
import { InputField } from "@rafty/ui";
import { useState } from "react";
import { Post } from "react-bluesky";

export default function PlaygroundPage() {
  const [config, setConfig] = useState<
    { handle: string; id: string } | undefined
  >();

  return (
    <div className="max-w-[550px] mx-auto w-full space-y-2 light">
      <InputField
        placeholder="Url"
        onChange={(e) => {
          const fragments = e.target.value.split("/");
          setConfig({
            handle: fragments[4],
            id: fragments[6],
          });
        }}
      />
      {config && <Post {...config} />}
    </div>
  );
}
