import { getPosts, getPageParams } from "@/services/microcms";
import { CMS_ENDPOINTS } from "@/constants/cmsEndpoints";
import { NEWS_POSTS_PER_PAGE } from "@/constants/pagination";
import Heading from "@/components/ui/Heading";
import NewsList from "@/app/news/_components/NewsList";
import Pagination from "@/components/ui/Pagination";
import Breadcrumb from "@/components/layout/Breadcrumb";

import type { Metadata } from "next";
import { defaultOpenGraph, siteName } from "@/config/metadata";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "お知らせ一覧ページです。",
  openGraph: {
    ...defaultOpenGraph,
    title: `お知らせ | ${siteName}`,
    url: "/news/",
  },
};

export default async function News() {
  const currentPage = 1;

  const posts = await getPosts(CMS_ENDPOINTS.NEWS, NEWS_POSTS_PER_PAGE);

  const pageParams = await getPageParams(
    CMS_ENDPOINTS.NEWS,
    NEWS_POSTS_PER_PAGE
  );
  const totalPages = pageParams.length;

  const getHref = (pageNumber: number) =>
    pageNumber === 1 ? "/news/" : `/news/page/${pageNumber}/`;

  return (
    <div className="mt-[80px] md:mt-[140px]">
      <div className="mx-auto max-w-[calc(1142px+60px)] px-7.5 py-[36px_0] md:py-[91px_0]">
        <Heading text="日々のこと" as="h1" />
        <main className="mt-[73px] md:mt-[68px]">
          <NewsList
            posts={posts}
            emptyMessage="日々のことに関するコンテンツがありません"
          />
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
              { href: "", text: "日々のこと" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
