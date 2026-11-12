"use client";

// ============ Splide ============

// SplideTrack を使って、className="splide__track" の自動生成をfalseにしてタグを設置し、overflow-visibleを充てる
// SplideTrack を使って、className="splide__arrows" の自動生成ではなく、設置する
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import type { Splide as SplideInstance } from "@splidejs/splide";
import "@splidejs/react-splide/css";
import { useState } from "react";
import Image from "next/image";

export default function TeaProcessSlider() {
  const slideItems = [
    {
      number: "01",
      title: "かぶせ",
      description:
        "八十八夜前後、新芽が芽吹く頃にお茶の木に黒い幕をかけ10日ほど待ちます。一手間をかけて日光を遮ることで、新芽を柔らかく保ち、緑濃く、旨み成分豊富なお茶になります。このような栽培方法を被覆栽培といい、玉露やかぶせ茶など、旨みの強いお茶を作るために用いられます。",
      img: {
        src: "/teaProcess-01.png",
        alt: "かぶせ",
      },
    },
    {
      number: "02",
      title: "刈り取り",
      description:
        "無農薬栽培のため、茶畑の除草作業を行った後、茶葉の刈り取りを行います。新芽が最も柔らかく、栄養をたっぷりと蓄えたタイミングを見極め、一枚一枚の葉の状態を確かめながら丁寧に収穫します。",
      img: {
        src: "/teaProcess-02.png",
        alt: "刈り取り",
      },
    },
    {
      number: "03",
      title: "茶工場へ",
      description:
        "摘み取った茶葉は、発酵しないよう、すぐに茶工場へ。蒸し→揉み→乾燥とすべての加工工程に目を通し、より良いお茶となるよう調整を行いながらお茶を仕上げていきます。年々の気候変動や茶葉の生育状況に合わせて、加工に工夫を凝らし、茶葉の持つ力を存分に引き出すのが茶師の技術です。",
      img: {
        src: "/teaProcess-03.png",
        alt: "茶工場へ",
      },
    },
    {
      number: "04",
      title: "乾燥",
      description:
        "煎茶の製造において乾燥は、茶葉の品質を安定させ香りを引き出す大切な工程です。揉みながら形を整えた茶葉を温風でゆっくりと乾かし、含まれる水分をおよそ5％ほどまで減らします。乾燥によって保存性が高まり、茶葉特有の爽やかな香りが際立ちます。",
      img: {
        src: "/teaProcess-04.png",
        alt: "乾燥",
      },
    },
  ];

  // プログレスバーに使用
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative w-full max-w-[100vw]">
      <Splide
        options={{
          type: "slide",
          rewind: true, // スライダーの終わりまで行ったら先頭に巻き戻す
          speed: 1000, // スライダーの移動時間
          pagination: false,
          pauseOnFocus: false,
          pauseOnHover: false,
          arrows: true,
          gap: 13,
          fixedWidth: "311px",
          mediaQuery: "min",
          breakpoints: {
            768: {
              fixedWidth: "643px",
              gap: 36,
            },
          },
        }}

        // プログレスバーに使用　カードの何番目かを取得
        onMove={(splide: SplideInstance) => {
          setCurrentIndex(splide.index);
        }}

        // SplideTrack を使って、className="splide__track" の自動生成をfalseにしてタグを設置し、overflow-visibleを充てる
        hasTrack={false}
      >
        {/* SplideTrack を使って、className="splide__track" の自動生成をfalseにしてタグを設置し、overflow-visibleを充てる */}
        <SplideTrack className="overflow-visible!">
          {slideItems.map((slideItem) => {
            return (
              <SplideSlide
                className="bg-whiteAccent flex flex-col items-stretch rounded-[60px_10px] px-3.75 py-3 [box-shadow:0px_4px_24px_0px_rgba(169,169,169,0.25)] md:flex-row-reverse md:justify-center md:gap-2 md:px-[22px_15px] cursor-pointer"
                key={slideItem.number}
              >
                <Image
                  className="block h-auto w-full max-w-full rounded-[60px_10px] md:max-w-62.5"
                  src={slideItem.img.src}
                  alt={slideItem.img.alt}
                  width={250}
                  height={333}
                  loading="eager"
                  decoding="async"
                />
                <div className="relative flex flex-col gap-3 pt-2 md:pt-6">
                  <p className="text-whiteAccent before:bg-green absolute bottom-[101%] -left-0.75 flex items-center gap-3 text-[2.375rem] leading-9.5 font-bold before:block before:h-2.5 before:w-2.5 before:rounded-[50%] before:content-[''] md:static md:pt-0 md:pl-0 md:text-[1.9375rem] md:text-black">
                    {slideItem.number}
                  </p>
                  <h3 className="md:2.5 border-b border-[#C9C9C9] pb-0.75 pl-1.25 text-lg leading-8 font-bold tracking-[.12em] md:pb-2.5 md:pl-2.5">
                    {slideItem.title}
                  </h3>
                  <p className="text-sm leading-7.5 md:pt-0 md:text-[0.9375rem]">
                    {slideItem.description}
                  </p>
                </div>
              </SplideSlide>
            );
          })}

          {/* SplideTrack を使って、className="splide__track" の自動生成をfalseにしてタグを設置し、overflow-visibleを充てる */}
        </SplideTrack>

        <div className="l:-mr-13">
          {/* プログレスバー */}
          <div className="bg-whiteAccent relative mt-12.25 h-2.25 w-full overflow-hidden rounded-[100vh] [box-shadow:0px_4px_24px_0px_rgba(169,169,169,0.25)] md:mt-8 md:ml-auto md:max-w-125">
            <div
              className="bg-green absolute top-0 bottom-0 h-full w-[25%] rounded-[100vh] transition-all"
              style={{
                left: `${(currentIndex / slideItems.length) * 100}%`,
                width: `${100 / slideItems.length}%`,
              }}
            />
          </div>

          {/* SplideTrack を使って、className="splide__arrows" の自動生成ではなく、設置する */}
          <div className="splide__arrows mt-4 flex! justify-end gap-2.5 md:mt-5">
            <button
              className="splide__arrow splide__arrow--prev bg-green! static! grid! h-9! w-9! ![transform:translateY(0)] place-content-center! rounded-[50%] transition-all hover:opacity-70!"
              style={{ opacity: 1 }}
            >
              <Image
                className="block h-auto w-3.5"
                src="/slider-arrow-left.svg"
                alt="前へ"
                width={14}
                height={16}
                loading="eager"
                decoding="async"
              />
            </button>
            <button
              className="splide__arrow splide__arrow--next bg-green! static! grid! h-9! w-9! ![transform:translateY(0)] place-content-center! rounded-[50%] transition-all hover:opacity-70!"
              style={{ opacity: 1 }}
            >
              <Image
                className="block h-auto w-3.5"
                src="/slider-arrow-right.svg"
                alt="次へ"
                width={14}
                height={16}
                loading="eager"
                decoding="async"
              />
            </button>
          </div>
        </div>
      </Splide>
    </div>
  );
}
