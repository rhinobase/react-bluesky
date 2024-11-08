import type { HTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "../utils";

export type PostContainer = PropsWithChildren<{
  className?: HTMLAttributes<HTMLDivElement>["className"];
  link: string;
}>;

export function PostContainer({ children, className, link }: PostContainer) {
  return (
    <div
      className={classNames(
        "group/post w-full min-w-[300px] max-w-[600px] mx-6 rounded-xl transition-all duration-200 box-border",
        "bg-white data-[theme=light]:bg-white dark:bg-[rgb(21,32,43)] data-[theme=dark]:bg-[rgb(21,32,43)]",
        "hover:bg-[rgb(247,249,249)] data-[theme=light]:hover:bg-[rgb(247,249,249)] dark:hover:bg-[rgb(30,39,50)] data-[theme=dark]:hover:bg-[rgb(30,39,50)]",
        "text-black data-[theme=light]:text-black dark:text-white data-[theme=dark]:text-white",
        "border border-[rgb(207,217,222)] data-[theme=light]:border-[rgb(207,217,222)] dark:border-[rgb(66,83,100)] data-[theme=dark]:border-[rgb(66,83,100)]",
        className,
      )}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="cursor-default"
      >
        <article className="relative box-[inherit] px-4 py-3 space-y-2.5">
          {children}
        </article>
      </a>
    </div>
  );
}
