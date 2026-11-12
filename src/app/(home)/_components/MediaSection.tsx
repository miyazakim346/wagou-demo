import { getPosts } from "@/services/microcms";
import { CMS_ENDPOINTS } from "@/constants/cmsEndpoints";
import dayjs from "dayjs";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import MediaCard from "@/components/ui/MediaCard";
import Button from "@/components/ui/Button";

export default async function MediaSection() {
  const limit = 5;
  const posts = await getPosts(CMS_ENDPOINTS.MEDIA, limit);

  return (
    <div
      id="media"
      className="scroll-mt-(--header-height) overflow-hidden py-[50px_194px] md:py-[100px_50px]"
    >
      <div className="relative isolate m-auto grid max-w-208 place-items-center px-5 md:place-items-end">
        <div className="w-full md:relative md:flex md:justify-between md:gap-6">
          <h2>
            <Heading text="メディア情報" />
          </h2>
          <div className="mt-12.5 flex flex-col md:mt-0 md:max-w-135.5 md:flex-1 md:gap-5">
            {posts.map((post) => {
              const formattedDate = dayjs(post.publishedAt).format("YYYY.M.D");
              return (
                <div key={post.id} className="w-full">
                  <MediaCard
                    id={post.id}
                    date={formattedDate}
                    text={post.title}
                  />
                </div>
              );
            })}
          </div>

          <Image
            className="absolute -bottom-26 left-[calc(50%-150px)] z-0 -translate-x-1/2 md:top-35 md:bottom-auto md:left-[calc(50%-317px)] md:h-auto md:w-32.5"
            src="/media-deco.png"
            alt="イラスト"
            width={100}
            height={105}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="mt-8.75 md:mt-7.75">
          <Button href="./media/" text="全てを見る" />
        </div>
      </div>
    </div>
  );
}
