import { getPosts } from "@/services/microcms";
import { CMS_ENDPOINTS } from "@/constants/cmsEndpoints";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default async function Sidebar() {
  const posts = await getPosts(CMS_ENDPOINTS.NEWS, 4);

  return (
    <div className="sticky top-0 m-auto max-w-[605px] md:m-0">
      <div>
        <Link
          href="/reservation/"
          className="hover:opacity-hover block w-full transition-all"
        >
          <Image
            className="block h-auto w-full"
            src="/sidebar-contact.jpg"
            alt="ご予約はこちら"
            width={300}
            height={183}
            loading="eager"
            decoding="async"
          />
        </Link>
      </div>
      <div className="mt-10.25">
        <h2 className="border-green border-b px-1 pb-1.5 text-[1.0625rem] leading-6.25 font-bold">
          最近の投稿
        </h2>
        <div className="mt-3 grid gap-2.25 md:gap-2.75">
          {posts.map((post) => {
            const formattedDate = dayjs(post.publishedAt).format("YYYY/M/D");
            return (
              <Link
                key={post.id}
                href={`/news/${post.id}/`}
                className="hover:opacity-hover grid w-full gap-1.5 border-b border-[#939393] pb-1.25 transition-all"
              >
                <p className="text-[0.8125rem] leading-3 tracking-[.12em]">
                  {formattedDate}
                </p>
                <h3 className="[display: -webkit-box] [-webkit-box-orient: vertical] line-clamp-2 overflow-hidden text-[0.9375rem] leading-6.25 font-bold tracking-[.12em]">
                  {post.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
