"use client";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { InputField } from "@rafty/ui";
import { ThemeToggle } from "apps/docs/components/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Post } from "react-bluesky";
import BlueskyLogo from "../../public/bluesky.svg";
import { CopyButton } from "./CopyButton";
import { CodeHighlighter } from "./Highlight";

const DEFAULT_POST = {
  uri: "https://bsky.app/profile/adima7.bsky.social/post/3laq6uzwjbc2t",
  default: true,
};

export default function PlaygroundPage() {
  const [config, setConfig] = useState<{
    uri: string;
    default?: boolean;
  }>(DEFAULT_POST);

  const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setConfig({
      uri: e.target.value,
    });
  };

  const content = `<Post uri="${config.uri}" />`;

  return (
    <div className="overflow-y-auto">
      <div className="max-w-[550px] mx-auto size-full flex flex-col items-center w-full py-14 px-4 md:pt-32">
        <ThemeToggle className="absolute top-4 right-4" />
        <div className="flex flex-col items-center gap-6 w-full">
          <Link href="https://bsky.social/about?ref_src=embed" target="_blank">
            <Image
              alt="Bluesky"
              src={BlueskyLogo}
              width={500}
              height={500}
              className="h-10 w-full hover:scale-110 transition-all ease-in-out cursor-pointer"
            />
          </Link>
          <h2 className="text-4xl font-bold text-center">
            Embed a Bluesky Post in React
          </h2>
          <InputField
            size="lg"
            placeholder="https://bsky.app/profile/adima7.bsky.social/post/3laq6uzwjbc2t"
            onChange={handleChange}
          />
          <ArrowDownIcon className="size-5 stroke-2" />
          {!config.default && (
            <div className="w-full flex items-center gap-2">
              <div className="p-2.5 bg-white dark:bg-[#0d1117] w-full border h-max overflow-x-auto [&::-webkit-scrollbar]:hidden border-secondary-200 dark:border-secondary-800 rounded-md">
                <CodeHighlighter content={content} language="js" />
              </div>
              <CopyButton data={content} />
            </div>
          )}
        </div>
        {config && <Post {...config} />}
      </div>
    </div>
  );
}
