import MediaCard from "@/components/ui/MediaCard";
import type { CmsPostListItem } from "@/types/cms";
import dayjs from "dayjs";

type MediaListProps = {
  posts: CmsPostListItem[];
  emptyMessage?: string;
};

export default function MediaList({
  posts,
  emptyMessage = "コンテンツがありません",
}: MediaListProps) {
  if (posts.length === 0) {
    return <div className="text-center">{emptyMessage}</div>;
  }

  return (
    <div className="mt-12.5 flex flex-col md:mt-0 md:max-w-135.5 md:flex-1 md:gap-5">
      {posts.map((post) => {
        const formattedDate = dayjs(post.publishedAt).format("YYYY.M.D");
        return (
          <div key={post.id} className="w-full">
            <MediaCard id={post.id} date={formattedDate} text={post.title} />
          </div>
        );
      })}
    </div>
  );
}
