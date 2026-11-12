import Image from "next/image";
import GlobalNav from "@/components/layout/GlobalNav";
import FirstViewSlider from "@/app/(home)/_components/FirstViewSlider";

export default function FirstView() {
  return (
    <div className="relative isolate w-full overflow-hidden py-[74px_217px] lg:py-[88px_350px] xl:py-[44px_404px]">
      <Image
        className="absolute inset-0 z-0 block h-full w-full object-cover object-bottom md:hidden"
        src="/firstView-bg_sp.png"
        alt="背景画像"
        width={768}
        height={957}
        loading="eager"
        decoding="async"
      />
      <Image
        className="absolute inset-0 z-0 hidden h-full w-full object-cover object-bottom md:block"
        src="/firstView-bg.png"
        alt="背景画像"
        width={1440}
        height={1185}
        loading="eager"
        decoding="async"
      />
      <div className="relative z-10 m-auto max-w-360 lg:px-16">
        <div className="absolute -top-13.5 left-3.25 z-20 w-fit lg:top-0 lg:left-64/1440 lg:flex lg:flex-col lg:justify-between lg:gap-12.5 lg:pt-9.25">
          <h1>
            <Image
              className="block h-auto w-20 object-cover object-right md:w-27.5 lg:w-32.5"
              src="/logo-black.png"
              alt="茶舗 和合"
              width={130}
              height={130}
              loading="eager"
              decoding="async"
            />
          </h1>

          <div className="hidden lg:block">
            <GlobalNav />
          </div>
        </div>
        <div className="l:pl-0 pl-0 lg:pl-22">
          <FirstViewSlider />
        </div>
      </div>
    </div>
  );
}
