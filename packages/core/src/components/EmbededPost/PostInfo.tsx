import type { PostType } from "../../api";
import { classNames, formatDate, formatNumber } from "../../utils";

export type PostInfo = {
  content: PostType;
};

export function PostInfo({ content }: PostInfo) {
  const createdAt = new Date(content.indexedAt);
  const formattedCreatedAtDate = formatDate(createdAt);

  return (
    <>
      <div className="flex items-center text-[rgb(83,100,113)] group-data-[theme=light]/post:text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] group-data-[theme=dark]/post:text-[rgb(139,152,165)] break-words whitespace-nowrap text-ellipsis">
        <time
          dateTime={createdAt.toISOString()}
          className="text-sm text-[rgb(83,100,113)] group-data-[theme=light]/post:text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] group-data-[theme=dark]/post:text-[rgb(139,152,165)]"
        >
          {formattedCreatedAtDate}
        </time>
      </div>
      <div
        className={classNames(
          "w-full pt-2.5 flex items-center gap-5 text-sm cursor-pointer",
          "border-t border-[rgb(207,217,222)] group-data-[theme=light]/post:border-[rgb(207,217,222)] dark:border-[rgb(66,83,100)] group-data-[theme=dark]/post:border-[rgb(66,83,100)]",
        )}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='%23ec4899'%20d='M12.489%2021.372c8.528-4.78%2010.626-10.47%209.022-14.47-.779-1.941-2.414-3.333-4.342-3.763-1.697-.378-3.552.003-5.169%201.287-1.617-1.284-3.472-1.665-5.17-1.287-1.927.43-3.562%201.822-4.34%203.764-1.605%204%20.493%209.69%209.021%2014.47a1%201%200%200%200%20.978%200Z'/%3e%3c/svg%3e"
            alt="likes_icon"
            className="size-5 min-w-5 min-h-5"
          />
          <p className="font-bold text-neutral-500 mb-px">
            {formatNumber(content.likeCount)}
          </p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='%2320bc07'%20d='M17.957%202.293a1%201%200%201%200-1.414%201.414L17.836%205H6a3%203%200%200%200-3%203v3a1%201%200%201%200%202%200V8a1%201%200%200%201%201-1h11.836l-1.293%201.293a1%201%200%200%200%201.414%201.414l2.47-2.47a1.75%201.75%200%200%200%200-2.474l-2.47-2.47ZM20%2012a1%201%200%200%201%201%201v3a3%203%200%200%201-3%203H6.164l1.293%201.293a1%201%200%201%201-1.414%201.414l-2.47-2.47a1.75%201.75%200%200%201%200-2.474l2.47-2.47a1%201%200%200%201%201.414%201.414L6.164%2017H18a1%201%200%200%200%201-1v-3a1%201%200%200%201%201-1Z'/%3e%3c/svg%3e"
            alt="repost_icon"
            className="size-5 min-w-5 min-h-5"
          />
          <p className="font-bold text-neutral-500 mb-px">
            {content.repostCount}
          </p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='rgb(10,122,255)'%20d='M19.002%203a3%203%200%200%201%203%203v10a3%203%200%200%201-3%203H12.28l-4.762%202.858A1%201%200%200%201%206.002%2021v-2h-1a3%203%200%200%201-3-3V6a3%203%200%200%201%203-3h14Z'/%3e%3c/svg%3e"
            alt="reply-icon"
            className="size-5 min-w-5 min-h-5"
          />
          <p className="font-bold text-neutral-500 mb-px">Reply</p>
        </div>
        <div className="flex-1" />
        <p className="cursor-pointer text-blue-500 font-bold hover:underline hidden min-[450px]:inline">
          Read{" "}
          {content.replyCount > 1
            ? `${content.replyCount} replies`
            : `${content.replyCount} reply`}{" "}
          on Bluesky
        </p>
      </div>
    </>
  );
}
