import { getPostParams, getSinglePost } from "@/services/microcms";
import { CMS_ENDPOINTS } from "@/constants/cmsEndpoints";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import TwoColumn from "@/components/layout/TwoColumn";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { getCmsDescription } from "@/lib/getCmsDescription";
import { sanitizeCmsHtml } from "@/lib/sanitizeCmsHtml";


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
  const post = await getSinglePost(CMS_ENDPOINTS.NEWS, id);
  const description = post.contents ? getCmsDescription(post.contents) : "";

  const ogpImage = post.eyecatch?.url ?? "ogp.jpg";

  return {
    title: post.title,
    description,
    openGraph: {
      ...defaultOpenGraph,
      title: `${post.title} | ${siteName}`,
      url: `/news/${id}/`,
      type: "article",
      images: [
        {
          url: ogpImage,
          width: 598,
          height: 399,
        },
      ],
    },
  };
}
export const dynamicParams = false;

export async function generateStaticParams() {
  const postParams = await getPostParams(CMS_ENDPOINTS.NEWS, "id");
  return postParams;
}

export default async function NewsId({ params }: NewsProps) {
  const { id } = await params;

  const post = await getSinglePost(CMS_ENDPOINTS.NEWS, id);

  const formattedDate = dayjs(post.publishedAt).format("YY.M.D");
  const sanitizedContents = post.contents
    ? sanitizeCmsHtml(post.contents)
    : undefined;

  const bodyContent =
    "grid gap-7.5 text-base leading-6.25 [&>h2]:border-b-2 [&>h2]:border-[#8E3231] [&>h2]:py-[10px] [&>h2]:pl-2 [&>h2]:text-[1.5rem] [&>h2]:leading-6.5 [&>h2]:font-bold [&>h3]:bg-[#EBEBEB] [&>h3]:py-[6.5px] [&>h3]:pl-3 [&>h3]:text-[1.25rem] [&>h3]:leading-6.25 [&>h3]:font-bold";

  return (
    <div className="mt-20 md:mt-35">
      <div className="mx-auto max-w-[calc(960px+60px)] px-7.5 py-[36px_0] md:py-[90px_0]">
        <TwoColumn>
          <div className="grid gap-7">
            {
              <div className="overflow-hidden rounded-[60px_10px]">
                <Image
                  className="h-full w-full object-cover object-center"
                  src={post.eyecatch?.url ?? "/news-thumbnail-01.jpg"}
                  alt={post.title}
                  width={380}
                  height={253}
                />
              </div>
            }
            <div className="-mt-1.25 flex flex-wrap items-center gap-2.5 md:mt-0">
              <div className="">
                {post.category?.map((category) => (
                  <Link
                    key={category.id}
                    href={`/news/category/${category.id}/`}
                    className="bg-green text-whiteAccent w-fit rounded-[10px_2px] px-5.5 py-[1.5px] text-[0.8125rem] leading-3.25 font-bold tracking-[.07em] md:py-0.5 [&>figure]:m-auto [&>figure]:block [&>figure]:w-full [&>figure]:max-w-150 [&>figure]:overflow-hidden"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="text-sm leading-6 font-bold">{formattedDate}</div>
            </div>

            <h1 className="text-[1.375rem] leading-6.5 font-bold">
              {post.title}
            </h1>
            {sanitizedContents && (
              <div
                className={bodyContent}
                dangerouslySetInnerHTML={{ __html: sanitizedContents }}
              />
            )}
          </div>
        </TwoColumn>
        <div className="mt-8.8 w-full md:mt-12.5">
          <Breadcrumb
            items={[
              { href: "/", text: "トップページ" },
              { href: "/news/", text: "日々のこと" },
              { href: "", text: `${post.title}` },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
