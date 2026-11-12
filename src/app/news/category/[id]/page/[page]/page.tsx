import {
  getCategoryPageParams,
  getCategory,
  getPostsByCategory,
  getAllCategoryIds,
} from "@/services/microcms";

import { CMS_ENDPOINTS } from "@/constants/cmsEndpoints";
import { CATEGORY_POSTS_PER_PAGE } from "@/constants/pagination";
// notFound → Next.jsで「このページは存在しません（404）」の関数
import { notFound } from "next/navigation";
import Heading from "@/components/ui/Heading";
import NewsList from "@/app/news/_components/NewsList";
import Pagination from "@/components/ui/Pagination";
import Breadcrumb from "@/components/layout/Breadcrumb";

type NewsProps = {
  params: Promise<{
    id: string;
    page: string;
  }>;
};

import type { Metadata } from "next";
import { defaultOpenGraph, siteName } from "@/config/metadata";

// APIで動的出力している動的ページのmeta設定
export async function generateMetadata({
  params,
}: NewsProps): Promise<Metadata> {
  const { id, page } = await params;
  const category = await getCategory(CMS_ENDPOINTS.CATEGORY, id);

  return {
    title: `「${category.name}」の記事`,
    description: `「${category.name}」の記事一覧ページです。`,
    openGraph: {
      ...defaultOpenGraph,
      title: `「${category.name}」の記事 | ${siteName}`,
      url: `/news/category/${id}/page/${page}`,
    },
  };
}
export const dynamicParams = false;

export async function generateStaticParams() {
  const categoryIds = await getAllCategoryIds(CMS_ENDPOINTS.CATEGORY);

  const results = await Promise.all(
    categoryIds.map(async (id) => {
      const pageParams = await getCategoryPageParams(
        CMS_ENDPOINTS.NEWS,
        id,
        CATEGORY_POSTS_PER_PAGE
      );

      return pageParams.map((pageParam) => ({
        //  ループさせている、一つのカテゴリーID（categoryIds.map(async (id) のid）
        id: id,
        page: pageParam.page,
      }));
    })
  );

  // 1ページ目の正規URLへの転送は、静的環境で動く public/_redirects が担当する
  return results.flat().filter((pageParam) => pageParam.page !== "1");
}

export default async function CategoryPage({ params }: NewsProps) {
  const { id, page } = await params;

  const currentPage = Number(page);

  if (!Number.isInteger(currentPage) || currentPage < 1) {
    notFound();
  }

  // getCategory内で「存在しない404」と「通信障害」を分けて処理している
  const category = await getCategory(CMS_ENDPOINTS.CATEGORY, id);

  const pageParams = await getCategoryPageParams(
    CMS_ENDPOINTS.NEWS,

    id,

    CATEGORY_POSTS_PER_PAGE
  );

  const totalPages = pageParams.length;

  if (currentPage > totalPages) {
    notFound();
  }

  const posts = await getPostsByCategory(
    CMS_ENDPOINTS.NEWS,
    id,
    CATEGORY_POSTS_PER_PAGE,
    currentPage
  );

  const getHref = (pageNumber: number) =>
    pageNumber === 1
      ? `/news/category/${id}`
      : `/news/category/${id}/page/${pageNumber}/`;

  return (
    <div className="mt-[80px] md:mt-[140px]">
      <div className="mx-auto max-w-[calc(1142px+60px)] px-7.5 py-[36px_0] md:py-[91px_0]">
        <Heading text={category.name} as="h1" />

        <main className="mt-[73px] md:mt-[68px]">
          <NewsList
            posts={posts}

            emptyMessage={`${category.name}に関するコンテンツがありません`}
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
              { href: "/news/", text: "日々のこと" },
              { href: "", text: `${category.name}` },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
