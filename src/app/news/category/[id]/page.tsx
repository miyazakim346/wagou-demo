import {
  getCategory,
  getPostsByCategory,
  getCategoryPageParams,
  getAllCategoryIds,
} from "@/services/microcms";

import { CMS_ENDPOINTS } from "@/constants/cmsEndpoints";
import { CATEGORY_POSTS_PER_PAGE } from "@/constants/pagination";
import Heading from "@/components/ui/Heading";
import NewsList from "@/app/news/_components/NewsList";
import Pagination from "@/components/ui/Pagination";
import Breadcrumb from "@/components/layout/Breadcrumb";

type NewsProps = {
  params: Promise<{ id: string }>;
};

import type { Metadata } from "next";
import { defaultOpenGraph, siteName } from "@/config/metadata";

// APIで動的出力している動的ページのmeta設定
export async function generateMetadata({
  params,
}: NewsProps): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategory(CMS_ENDPOINTS.CATEGORY, id);

  return {
    title: `「${category.name}」の記事`,
    description: `「${category.name}」の記事一覧ページです。`,
    openGraph: {
      ...defaultOpenGraph,
      title: `「${category.name}」の記事 | ${siteName}`,
      url: `/news/category/${id}/`,
    },
  };
}
export const dynamicParams = false;

export async function generateStaticParams() {
  const categoryIds = await getAllCategoryIds(CMS_ENDPOINTS.CATEGORY);
  return categoryIds.map((id) => ({ id: id }));
}

export default async function CategoryFirstPage({ params }: NewsProps) {
  const { id } = await params;
  const currentPage = 1;
  // getCategory内で「存在しない404」と「通信障害」を分けて処理している
  const category = await getCategory(CMS_ENDPOINTS.CATEGORY, id);

  const posts = await getPostsByCategory(
    CMS_ENDPOINTS.NEWS,
    id,
    CATEGORY_POSTS_PER_PAGE
  );

  const pageParams = await getCategoryPageParams(
    CMS_ENDPOINTS.NEWS,
    id,
    CATEGORY_POSTS_PER_PAGE
  );

  const totalPages = pageParams.length;

  const getHref = (pageNumber: number) =>
    pageNumber === 1
      ? `/news/category/${id}/`
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
