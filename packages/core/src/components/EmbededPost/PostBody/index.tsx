import { Fragment } from "react/jsx-runtime";
import type { PostType } from "../../../api";
import s from "./post-body.module.css";

export type PostBody = {
  content: PostType;
};

export function PostBody({ content }: PostBody) {
  const body = content.record.text.split("#")[0];

  const hashtags = content.record.text.split("#").slice(1);

  return (
    <p className={s.text} lang={content.record.langs[0]} dir="auto">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used to preserve the text encoding */}
      <span dangerouslySetInnerHTML={{ __html: body }} />
      {hashtags.map((hashtag, index) => (
        <Fragment
          key={`hashtag.${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index
          }`}
        >
          <a
            href={`https://bsky.app/tag/${hashtag.trim()}?ref_src=embed`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={s.hashLink}
          >
            <span>#{hashtag.trim()}</span>
          </a>{" "}
        </Fragment>
      ))}
    </p>
  );
}
