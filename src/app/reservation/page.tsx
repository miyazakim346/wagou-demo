import Heading from "@/components/ui/Heading";
import Form from "@/components/layout/Form";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "next/image";

import type { Metadata } from "next";
import { defaultOpenGraph, siteName } from "@/config/metadata";

export const metadata: Metadata = {
  title: "予約",
  description: "予約ページです。",
  openGraph: {
    ...defaultOpenGraph,
    title: `予約 | ${siteName}`,
    url: `/reservation/`,
  },
};

export default function Reservation() {
  return (
    <div className="mt-[80px] overflow-hidden md:mt-[140px]">
      <div className="relative isolate mx-auto max-w-[calc(800px+60px)] px-7.5 py-[36px_0] md:py-[90px_0]">
        <Heading text="ご予約フォーム" as="h1" />
        <div className="mx-auto mt-[60px] max-w-95 md:mt-[72px]">
          <Form />
        </div>
        <div className="mt-8 w-full md:mt-12.5">
          <Breadcrumb
            items={[
              { href: "/", text: "トップページ" },
              { href: "", text: "ご予約フォーム" },
            ]}
          />
        </div>
        <Image
          className="absolute top-9.5 right-[calc(50%-96px)] -z-1 block h-auto w-118.5 max-w-153.5 translate-x-1/2 md:top-[calc(50%-339px)] md:right-[calc(50%-313px)] md:w-153.5 md:translate-1/2"
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
