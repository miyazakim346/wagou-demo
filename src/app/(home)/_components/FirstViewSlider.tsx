"use client";

// ============ Splide ============
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";

export default function FirstViewSlider() {
  const slideItems = [
    {
      src: "/slider-1.png",
      alt: "スライド画像1",
    },
    {
      src: "/slider-2.png",
      alt: "スライド画像2",
    },
    {
      src: "/slider-3.png",
      alt: "スライド画像3",
    },
    {
      src: "/slider-4.png",
      alt: "スライド画像4",
    },
    {
      src: "/slider-5.png",
      alt: "スライド画像5",
    },
  ];

  return (
    <div className="relative isolate overflow-hidden pt-166.5 md:overflow-visible lg:pt-184.5">
      {/* ===== SP画像 ===== */}
      <Image
        className="sssm:w-37.5 ssm:w-42.5 absolute right-1.25 bottom-3.5 z-10 block lg:hidden"
        src="/slider-deco_sp.png"
        alt="ひと休み和み合う茶舗和合"
        width={170}
        height={324}
        loading="eager"
        decoding="async"
      />

      {/* ===== PC画像 ===== */}
      <Image
        className="l:bottom-2.5 absolute right-18 -bottom-16.5 z-10 hidden lg:block"
        src="/slider-deco.png"
        alt="ひと休み和み合う茶舗和合"
        width={200}
        height={384}
        loading="eager"
        decoding="async"
      />
      <div className="l:w-[76.2%] absolute top-0 left-1/2 m-auto w-196 max-w-250 -translate-x-1/2 md:top-[2%] lg:w-[86%] xl:top-0 xl:w-[89%]">
        <Splide
          options={{
            autoplay: true, // 自動再生
            type: "fade", // 自動再生
            rewind: true, // スライダーの終わりまで行ったら先頭に巻き戻す
            pauseOnHover: false, // カーソルが乗ってもスクロールを停止させない
            interval: 3000, // 自動再生の間隔
            speed: 2000, // スライダーの移動時間
            pagination: true,
            arrows: false,

            // ページネーションなどタグがないコードにスタイルを充てる
            classes: {
              pagination:
                "splide__pagination !-bottom-7 !gap-0.5 md:!-bottom-8.5 md:!gap-1.5",
              page: "splide__pagination__page !w-1.5 !h-1.5 md:!w-2 md:!h-2  ![background:var(--color-dotGreen)] [&.is-active]:![background:var(--color-green)] [&.is-active]:![transform:scale(1)]",
            },
          }}
        >
          {slideItems.map((slideItem) => {
            return (
              <SplideSlide
                className="flex items-center justify-center"
                key={slideItem.src}
              >
                <Image
                  className="m-auto block h-auto w-full max-w-full"
                  src={slideItem.src}
                  alt={slideItem.alt}
                  width={990}
                  height={737}
                  loading="eager"
                  decoding="async"
                />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
}
