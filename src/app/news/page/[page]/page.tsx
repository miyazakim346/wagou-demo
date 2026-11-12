import { getPosts, getPageParams } from "@/services/microcms";
import { CMS_ENDPOINTS } from "@/constants/cmsEndpoints";
import { NEWS_POSTS_PER_PAGE } from "@/constants/pagination";
import { notFound } from "next/navigation";
import Heading from "@/components/ui/Heading";
import NewsList from "@/app/news/_components/NewsList";
import Pagination from "@/components/ui/Pagination";
import Breadcrumb from "@/components/layout/Breadcrumb";

type NewsProps = {
  params: Promise<{ page: string }>;
};

import type { Metadata } from "next";
import { defaultOpenGraph, siteName } from "@/config/metadata";

// APIで動的出力している動的ページのmeta設定
export async function generateMetadata({
  params,
}: NewsProps): Promise<Metadata> {
  const { page } = await params;

  return {
    title: "お知らせ",
    description: "お知らせ一覧ページです。",
    openGraph: {
      ...defaultOpenGraph,
      title: `お知らせ | ${siteName}`,
      url: `/news/page/${page}/`,
    },
  };
}
export const dynamicParams = false;

export async function generateStaticParams() {
  const pageParams = await getPageParams(
    CMS_ENDPOINTS.NEWS,
    NEWS_POSTS_PER_PAGE
  );
  return (
    pageParams
      // 1ページ目の正規URLは /news/。静的環境での転送は public/_redirects が担当する
      .filter((pageParam) => pageParam.page !== "1")
      .map((pageParam) => ({
        page: pageParam.page,
      }))
  );
}

export default async function NewsPage({ params }: NewsProps) {
  const { page } = await params;

  const currentPage = Number(page);
  if (!Number.isInteger(currentPage) || currentPage < 1) {
    notFound();
  }

  const pageParams = await getPageParams(
    CMS_ENDPOINTS.NEWS,
    NEWS_POSTS_PER_PAGE
  );
  const totalPages = pageParams.length;

  if (currentPage > totalPages) {
    notFound();
  }

  const posts = await getPosts(
    CMS_ENDPOINTS.NEWS,
    NEWS_POSTS_PER_PAGE,
    currentPage
  );

  const getHref = (pageNumber: number) =>
    pageNumber === 1 ? "/news/" : `/news/page/${pageNumber}/`;

  return (
    <div className="mt-20 md:mt-35">
      <div className="mx-auto max-w-[calc(1142px+60px)] px-7.5 py-[36px_0] md:py-[91px_0]">
        <Heading text="日々のこと" as="h1" />
        <main className="mt-18.25 md:mt-17">
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
