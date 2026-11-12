import { getPosts, getPageParams } from "@/services/microcms";
import { CMS_ENDPOINTS } from "@/constants/cmsEndpoints";
import { MEDIA_POSTS_PER_PAGE } from "@/constants/pagination";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import MediaList from "@/app/media/_components/MediaList";
import Pagination from "@/components/ui/Pagination";
import Breadcrumb from "@/components/layout/Breadcrumb";

import type { Metadata } from "next";
import { defaultOpenGraph, siteName } from "@/config/metadata";

export const metadata: Metadata = {
  title: "メディア情報",
  description: "メディア情報一覧ページです。",
  openGraph: {
    ...defaultOpenGraph,
    title: `メディア情報 | ${siteName}`,
    url: "/media/",
  },
};

export default async function Media() {
  const currentPage = 1;

  const posts = await getPosts(CMS_ENDPOINTS.MEDIA, MEDIA_POSTS_PER_PAGE);

  const pageParams = await getPageParams(
    CMS_ENDPOINTS.MEDIA,
    MEDIA_POSTS_PER_PAGE
  );
  const totalPages = pageParams.length;

  const getHref = (pageNumber: number) =>
    pageNumber === 1 ? "/media/" : `/media/page/${pageNumber}/`;

  return (
    <div className="mx-auto mt-20 max-w-[calc(1142px+60px)] px-7.5 py-[36px_0] md:mt-35 md:py-[68px_0]">
      <div className="relative isolate m-auto grid max-w-200 place-items-center md:place-items-end">
        <Image
          className="hidden md:absolute md:bottom-27 md:left-[calc(50%-495px)] md:z-0 md:block md:h-auto md:w-153.5 md:-translate-x-1/2"
          src="/blog-deco.svg"
          alt="イラスト"
          width={440}
          height={440}
          loading="lazy"
          decoding="async"
        />

        <Heading text="メディア情報" as="h1" />
        <main className="mt-18.25 w-full">
          <div className="w-full md:mt-17 md:flex md:min-h-75 md:items-start md:justify-between md:gap-6">
            <Image
              className="absolute bottom-24.75 left-[calc(50%-150px)] z-10 -translate-x-1/2 md:static md:h-auto md:w-32.5 md:translate-x-0"
              src="/media-deco.png"
              alt="イラスト"
              width={100}
              height={105}
              loading="lazy"
              decoding="async"
            />
            <MediaList
              posts={posts}
              emptyMessage="日々のことに関するコンテンツがありません"
            />
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            getHref={getHref}
          />
        </main>
        <div className="mt-8 w-full md:mt-12.5">
          <Breadcrumb
            items={[
              { href: "/", text: "トップページ" },
              { href: "", text: "メディア情報" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
