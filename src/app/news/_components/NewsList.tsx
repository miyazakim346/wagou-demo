import NewsCard from "@/components/ui/NewsCard";
import type { CmsPostListItem } from "@/types/cms";

type NewsListProps = {
  posts: CmsPostListItem[];
  emptyMessage?: string;
};

export default function NewsList({
  posts,
  emptyMessage = "コンテンツがありません",
}: NewsListProps) {
  if (posts.length === 0) {
    return <div className="text-center">{emptyMessage}</div>;
  }

  return (
    <div className="grid place-content-center gap-x-6.25 gap-y-9 md:grid-cols-[repeat(auto-fit,364px)] md:gap-y-[31px]">
      {posts.map((post) => (
        <div key={post.id}>
          <NewsCard
            id={post.id}
            img={{
              src: post.eyecatch?.url ?? "/news-thumbnail-01.jpg",
              alt: post.title,
            }}
            category={
              post.category?.map((category) => ({
                id: category.id,
                name: category.name,
              })) ?? []
            }
            text={post.title}
          />
        </div>
      ))}
    </div>
  );
}
