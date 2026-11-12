import Breadcrumb from "@/components/layout/Breadcrumb";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="mt-20 md:mt-35">
      <div className="mx-auto max-w-[calc(800px+60px)] px-5 py-[36px_0] md:py-[90px_0]">
        <Heading text="404" as="h1" />
        <div className="mt-15 grid place-items-center text-center md:mt-17.75">
          <h2 className="text-base leading-6.25 font-bold tracking-normal">
            ページが見つかりませんでした。
          </h2>
          <div className="text-center mt-3.75 grid gap-3.75 text-base leading-6.25 md:mt-4">
            <p>
              お探しのページは移動もしくは
              <br />
              削除された可能性があります。
            </p>
            <p>トップページから再度お探しください。</p>
          </div>
          <div className="mt-12.5">
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
              { href: "", text: "404" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
