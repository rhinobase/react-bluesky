import type { PostType } from "../api";
import type { PostComponents } from "../types";
import { AvatarImage } from "./AvatarImage";

export type PostHeader = {
  content: PostType;
  components?: PostComponents;
};

export function PostHeader({ content, components }: PostHeader) {
  const Img = components?.AvatarImage ?? AvatarImage;

  const profileLink = `https://bsky.app/profile/${content.author.did}?ref_src=embed`;

  return (
    <div className="flex gap-2.5 items-center leading-5 text-[15px] whitespace-nowrap break-words overflow-hidden">
      <a
        href={profileLink}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="size-10 min-w-10 min-h-10 overflow-hidden rounded-full bg-neutral-300 shrink-0"
      >
        <div className="size-full overflow-hidden rounded-[inherit]">
          <Img
            src={content.author.avatar}
            alt={content.author.did}
            width={48}
            height={48}
          />
        </div>
      </a>
      <div className="flex flex-col">
        <a
          href={profileLink}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="cursor-pointer font-bold text-[17px] text-[inherit] leading-5 line-clamp-1 hover:underline underline-offset-2 decoration-2 w-max"
        >
          <p title={content.author.displayName}>{content.author.displayName}</p>
        </a>
        <a
          href={profileLink}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-[rgb(83,100,113)] group-data-[theme=light]/post:text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] group-data-[theme=dark]/post:text-[rgb(139,152,165)] cursor-pointer text-[15px] hover:underline line-clamp-1"
        >
          <p
            title={`@${content.author.handle}`}
          >{`@${content.author.handle}`}</p>
        </a>
      </div>
      <div className="flex-1" />
      <a
        href={profileLink}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="cursor-pointer transition-transform hover:scale-110 shrink-0 mr-1"
      >
        <img
          className="h-8"
          src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%20320%20286'%3e%3cpath%20fill='rgb(10,122,255)'%20d='M69.364%2019.146c36.687%2027.806%2076.147%2084.186%2090.636%20114.439%2014.489-30.253%2053.948-86.633%2090.636-114.439C277.107-.917%20320-16.44%20320%2032.957c0%209.865-5.603%2082.875-8.889%2094.729-11.423%2041.208-53.045%2051.719-90.071%2045.357%2064.719%2011.12%2081.182%2047.953%2045.627%2084.785-80%2082.874-106.667-44.333-106.667-44.333s-26.667%20127.207-106.667%2044.333c-35.555-36.832-19.092-73.665%2045.627-84.785-37.026%206.362-78.648-4.149-90.071-45.357C5.603%20115.832%200%2042.822%200%2032.957%200-16.44%2042.893-.917%2069.364%2019.147Z'/%3e%3c/svg%3e"
          alt="Bluesky Icon"
        />
      </a>
    </div>
  );
}
