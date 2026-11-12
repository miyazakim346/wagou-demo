import Image from "next/image";
import Heading from "@/components/ui/Heading";
import TeaProcessSlider from "@/app/(home)/_components/TeaProcessSlider";

export default function TeaProcess() {
  return (
    <div
      id="tea-process"
      className="scroll-mt-(--header-height) overflow-hidden py-[50px_150px] md:py-[100px_50px]"
    >
      <div className="relative isolate m-auto flex w-full max-w-264 flex-col gap-6 md:gap-15">
        <Image
          className="l:w-57.25 l:left-[calc(50%-670px)] absolute -bottom-26 left-[calc(50%-220px)] z-10 block h-auto w-45 md:bottom-3.75 md:-left-13"
          src="/teaProcess-deco.png"
          alt="イラスト"
          width={180}
          height={135}
          loading="lazy"
          decoding="async"
        />
        <div className="grid gap-12.5 px-5 text-[0.9375rem] leading-6.25 font-bold tracking-[.12em] md:gap-10.5">
          <h2>
            <Heading text="煎茶ができるまで" />
          </h2>
          <p className="text-center text-[15px] leading-7.5 tracking-normal">
            農薬不使用有機栽培による、
            <br className="md:hidden" />
            人体にも環境にも
            <span className="inline-block">優しいお茶づくりをしています。</span>
            <br />
            茶畑を営むことで
            <span className="inline-block">
              山の緑や豊かな水源を守ることにも
            </span>
            <br className="md:hidden" />
            繋がると考えています。
          </p>
        </div>
        <div className="px-7">
          <TeaProcessSlider />
        </div>
      </div>
    </div>
  );
}
