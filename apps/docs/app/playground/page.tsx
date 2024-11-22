"use client";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { InputField, useBoolean } from "@rafty/ui";
import { ThemeToggle } from "apps/docs/components/ThemeToggle";
import { Post, type PostHandleProps } from "bsky-react-post";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BlueskyLogo from "../../public/bluesky.svg";
import { CopyButton } from "./CopyButton";
import { CodeHighlighter } from "./Highlight";

type PostType = PostHandleProps & { default?: boolean };

const DEFAULT_POST: PostType = {
  handle: "adima7.bsky.social",
  id: "3laq6uzwjbc2t",
  default: true,
};

export default function PlaygroundPage() {
  const [config, setConfig] = useState<PostType>(DEFAULT_POST);
  const [isError, setIsError] = useBoolean();

  const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = e.target.value;

    try {
      let tmpConfig = DEFAULT_POST;

      if (value !== "") {
        let config: PostType;

        const urlp = new URL(value);
        const split = urlp.pathname.slice(1).split("/");

        const [profile, didOrHandle, type, rkey] = split;

        if (profile === "profile" && type === "post") {
          config = {
            handle: didOrHandle,
            id: rkey,
          };
        } else {
          config = {
            did: didOrHandle,
            id: rkey,
          };
        }

        tmpConfig = config;
      }

      setConfig(tmpConfig);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  const content =
    "did" in config && config.did
      ? `<Post did="${config.did}" id="${config.id}" />`
      : `<Post handle="${config.handle}" id="${config.id}" />`;

  return (
    <div className="overflow-y-auto">
      <div className="max-w-[600px] mx-auto mb-8 size-full flex flex-col items-center gap-8 w-full py-14 px-4 md:px-0 md:py-0 md:pt-32">
        <ThemeToggle className="absolute top-4 right-4" />
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
        {!isError ? (
          <Post {...config} />
        ) : (
          <div className="w-full rounded-lg border border-red-500 bg-red-50 dark:border-red-300 dark:bg-red-900/50 px-4 py-3 select-none">
            <p className="text-red-500 dark:text-red-300 text-center">
              Invalid Bluesky URL
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
