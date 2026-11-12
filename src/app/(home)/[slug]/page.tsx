import { getPostParams, getSinglePost } from "@/services/microcms";
import { CMS_ENDPOINTS } from "@/constants/cmsEndpoints";
import Heading from "@/components/ui/Heading";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { getCmsDescription } from "@/lib/getCmsDescription";
import { sanitizeCmsHtml } from "@/lib/sanitizeCmsHtml";

type CmsPageProps = {
  params: Promise<{ slug: string }>;
};

import type { Metadata } from "next";
import { defaultOpenGraph, siteName } from "@/config/metadata";

// APIで動的出力している動的ページのmeta設定
export async function generateMetadata({
  params,
}: CmsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSinglePost(CMS_ENDPOINTS.PAGES, slug);
  const description = post.contents ? getCmsDescription(post.contents) : "";

  return {
    title: post.title,
    description,
    openGraph: {
      ...defaultOpenGraph,
      title: `${post.title} | ${siteName}`,
      url: `/${slug}/`,
    },
  };
}
export const dynamicParams = false;

export async function generateStaticParams() {
  const postParams = await getPostParams(CMS_ENDPOINTS.PAGES, "slug");

  return postParams;
}

const bodyContent =
  "[&>h2]:border-green grid gap-9 md:gap-7.5 text-base leading-6.25 md:gap-10 [&>figure]:m-auto [&>figure]:block [&>figure]:w-full [&>figure]:max-w-150 [&>figure]:overflow-hidden [&>h2]:border-l-5 [&>h2]:bg-[#EEEEEE] [&>h2]:py-3.75 [&>h2]:pl-4 md:[&>h2]:pl-2 [&>h2]:text-[1.5rem] [&>h2]:leading-6.5 [&>h2]:font-bold md:[&>h2]:pl-4 [&>h3]:flex [&>h3]:w-fit [&>h3]:items-center [&>h3]:gap-3.5  [&>h3]:text-[1.25rem] [&>h3]:leading-6.25 [&>h3]:font-bold [&>h3]:before:block [&>h3]:before:h-px [&>h3]:before:w-12.5 [&>h3]:before:bg-[#2D2D2D] [&>h3]:before:content-[''] [&>h3]:after:block [&>h3]:after:h-px [&>h3]:after:w-12.5 [&>h3]:after:bg-[#2D2D2D] [&>h3]:after:content-['']";

export default async function CmsPage({ params }: CmsPageProps) {
  const { slug } = await params;

  const post = await getSinglePost(CMS_ENDPOINTS.PAGES, slug);

  const sanitizedContents = post.contents
    ? sanitizeCmsHtml(post.contents)
    : undefined;

  return (
    <div className="mt-20 md:mt-35">
      <div className="mx-auto max-w-[calc(800px+60px)] px-7.5 py-[36px_0] md:py-[90px_0]">
        <Heading text={post.title} as="h1" />
        <main className="mt-15 md:mt-18">
          {sanitizedContents ? (
            <div
              className={bodyContent}
              dangerouslySetInnerHTML={{ __html: sanitizedContents }}
            />
          ) : (
            <div className="text-center">コンテンツがありません</div>
          )}
        </main>
        <div className="mt-9 w-full md:mt-12.5">
          <Breadcrumb
            items={[
              { href: "/", text: "トップページ" },
              { href: "", text: `${post.title}` },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
