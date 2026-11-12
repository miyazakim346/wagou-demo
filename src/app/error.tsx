"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function Error({ error, retry }: ErrorProps) {
  useEffect(() => {
    // 開発中は元のエラー、公開環境では照合用のdigestが主に表示される
    console.error("[画面エラー]", error);
  }, [error]);

  return (
    <div className="mt-20 md:mt-35">
      <div className="mx-auto max-w-[calc(800px+60px)] px-5 py-[36px_0] md:py-[90px_0]">
        <Heading text="Error" as="h1" />
        <div className="mt-15 grid place-items-center text-center md:mt-17.75">
          <h2 className="text-base leading-6.25 font-bold tracking-normal">
            システムエラー
          </h2>
          <div className="text-center mt-3.75 grid gap-3.75 text-base leading-6.25 md:mt-4">
            <p>
              しばらくしてから
              <br />
              もう一度アクセスしていただくか、
            </p>
            <p>
              「support@example.com」まで
              <br />
              ご連絡ください。
            </p>
          </div>
          <div className="mt-12.5 grid gap-4">
            <button
              type="button"
              onClick={retry}
              className="bg-green hover:text-green border-green text-whiteAccent flex min-w-50 items-center justify-center overflow-hidden rounded-[1px_20px] border px-12.75 py-[8px_10px] text-sm font-bold transition-all hover:bg-white"
            >
              もう一度試す
            </button>
            <Button href="/" text="トップページへ" />
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
              { href: "", text: "Error" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
