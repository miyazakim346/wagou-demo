import Breadcrumb from "@/components/layout/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Image from "next/image";

import type { Metadata } from "next";
import { defaultOpenGraph, siteName } from "@/config/metadata";

export const metadata: Metadata = {
  title: "予約完了",
  description: "予約完了ページです。",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `予約完了 | ${siteName}`,
    url: `/reservation/thanks/`,
  },
};

export default function Thanks() {
  return (
    <div className="mt-20 md:mt-35">
      <div className="mx-auto max-w-[calc(800px+60px)] px-5 py-[36px_0] md:py-[90px_0]">
        <Heading text="ご予約フォーム" as="h1" />
        <div className="mt-15 text-center md:mt-17.75">
          <h2 className="text-base leading-6.25 font-bold tracking-normal">
            ご予約申請完了いたしました。
          </h2>
          <div className="tex-center mt-3.75 grid gap-3.75 text-base leading-6.25 md:mt-4">
            <p>
              ご入力いただいたメールアドレス
              <span className="inline-block">に自動返信にて</span>
              <br />
              お問い合わせ内容をお送りしております。
            </p>
            <p>
              3日以内にご返信させて頂きますので、
              <br />
              今しばらくお待ちくださいませ。
            </p>
          </div>

          <Image
            className="m-auto mt-12.5 block w-42.5 md:h-auto md:w-50 md:translate-x-0"
            src="/thancks.png"
            alt="イラスト"
            width={170}
            height={112}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="mt-9 w-full md:mt-12.5">
          <Breadcrumb
            items={[
              { href: "/", text: "トップページ" },
              { href: "/reservation/", text: "ご予約フォーム" },
              { href: "", text: "ご予約完了ページ" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
