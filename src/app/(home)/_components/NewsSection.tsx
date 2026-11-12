import { getPosts } from "@/services/microcms";
import { CMS_ENDPOINTS } from "@/constants/cmsEndpoints";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import NewsCard from "@/components/ui/NewsCard";
import Button from "@/components/ui/Button";

export default async function BlogSection() {
  const limit = 3;
  const posts = await getPosts(CMS_ENDPOINTS.NEWS, limit);

  return (
    <div
      id="blog"
      className="scroll-mt-(--header-height) py-12.5 md:py-[100px_50px]"
    >
      <div className="relative isolate z-2 m-auto grid max-w-295.5 place-items-center px-5">
        <h2>
          <Heading text="日々のこと" />
        </h2>
        <div className="mt-12.5 grid place-content-center gap-9 md:mt-15.25 md:grid-cols-3 md:gap-6.25 md:[&>div:nth-child(1)]:pt-7 md:[&>div:nth-child(2)]:pt-3.5">
          {posts.map((post) => {
            return (
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
            );
          })}
        </div>
        <div className="mt-10 md:mt-11.5">
          <Button href="./news/" text="一覧へ" />
        </div>

        <Image
          className="absolute -bottom-106 left-[calc(50%-115px)] -z-1 -translate-x-1/2 md:-bottom-79 md:left-[calc(50%-572px)] md:h-auto md:w-153.5"
          src="/blog-deco.svg"
          alt="イラスト"
          width={440}
          height={440}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
