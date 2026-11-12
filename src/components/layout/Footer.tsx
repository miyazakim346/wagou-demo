import Image from "next/image";
import FooterNav from "@/components/layout/FooterNav";

export default function Footer() {
  return (
    <footer className="relative isolate w-full overflow-hidden py-[126px_12px] md:py-[180px_24px]">
      <Image
        className="base:hidden absolute inset-0 z-0 block h-full w-full object-cover object-top-right"
        src="/footer-bg_sp.jpg"
        alt="背景画像"
        width={768}
        height={957}
        loading="eager"
        decoding="async"
      />
      <Image
        className="base:block absolute inset-0 z-0 hidden h-full w-full object-cover object-top-right"
        src="/footer-bg.jpg"
        alt="背景画像"
        width={1440}
        height={1185}
        loading="eager"
        decoding="async"
      />
      <div className="relative z-10 m-auto max-w-360 px-5 lg:px-16">
        <div className="grid gap-7.75 md:gap-4.5">
          <div className="grid place-items-center">
            <Image
              className="block h-auto w-27.5 object-cover object-right md:w-27.5 lg:w-32.5"
              src="/logo-black.png"
              alt="茶舗 和合"
              width={110}
              height={110}
              loading="eager"
              decoding="async"
            />
            <p className="mt-3 text-center text-lg leading-10 font-bold md:mt-5.5">
              茶舗和合
            </p>
            <p className="mt-px text-center text-base leading-6.25 font-bold tracking-[.12em]">
              愛知県〇〇市〇〇町0丁目0-0
            </p>
          </div>

          <FooterNav />
        </div>
        <p className="mt-4.75 text-center text-sm leading-[1.6] md:mt-3.5">
          このサイトは、コーディングの練習用に作ったサンプルです。
          <br className="md:hidden" />
          掲載の住所・電話番号は架空のものです。
        </p>
        <p className="mt-1 text-center text-sm leading-[1.6]">copyright</p>
      </div>
    </footer>
  );
}
