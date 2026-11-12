import Image from "next/image";
import Heading from "@/components/ui/Heading";
import ModalMenuCard from "@/app/(home)/_components/ModalMenuCard";

export default function MenuSection() {
  // サービスカード
  const menuCards = [
    {
      img: {
        src: "/menu-image-1.jpg",
        alt: "さえみどり",
      },
      text: "さえみどり",
      description:
        "天然玉露ともいわれるほど、旨みのある煎茶です。\n一煎一煎と淹れるびに、鮮やかになっていき、\nお茶の色味とともに味わい深くなっていきます。",
    },
    {
      img: {
        src: "/menu-image-2.jpg",
        alt: "おおいわせ",
      },
      text: "おおいわせ",
      description:
        "天然玉露ともいわれるほど、旨みのある煎茶です。\n一煎一煎と淹れるびに、鮮やかになっていき、\nお茶の色味とともに味わい深くなっていきます。",
    },
    {
      img: {
        src: "/menu-image-3.jpg",
        alt: "しゅんめい",
      },
      text: "しゅんめい",
      description:
        "天然玉露ともいわれるほど、旨みのある煎茶です。\n一煎一煎と淹れるびに、鮮やかになっていき、\nお茶の色味とともに味わい深くなっていきます。",
    },
    {
      img: {
        src: "/menu-image-4.jpg",
        alt: "玉露やぶきた",
      },
      text: "玉露やぶきた",
      description:
        "天然玉露ともいわれるほど、旨みのある煎茶です。\n一煎一煎と淹れるびに、鮮やかになっていき、\nお茶の色味とともに味わい深くなっていきます。",
    },
    {
      img: {
        src: "/menu-image-5.jpg",
        alt: "まこも茶",
      },
      text: "まこも茶",
      description:
        "天然玉露ともいわれるほど、旨みのある煎茶です。\n一煎一煎と淹れるびに、鮮やかになっていき、\nお茶の色味とともに味わい深くなっていきます。",
    },
    {
      img: {
        src: "/menu-image-6.jpg",
        alt: "和紅茶",
      },
      text: "和紅茶",
      description:
        "天然玉露ともいわれるほど、旨みのある煎茶です。\n一煎一煎と淹れるびに、鮮やかになっていき、\nお茶の色味とともに味わい深くなっていきます。",
    },
    {
      img: {
        src: "/menu-image-7.jpg",
        alt: "米粉のどら焼き",
      },
      text: "米粉のどら焼き",
      description:
        "天然玉露ともいわれるほど、旨みのある煎茶です。\n一煎一煎と淹れるびに、鮮やかになっていき、\nお茶の色味とともに味わい深くなっていきます。",
    },
    {
      img: {
        src: "/menu-image-8.jpg",
        alt: "和合のあぶり餅",
      },
      text: "和合のあぶり餅",
      description:
        "天然玉露ともいわれるほど、旨みのある煎茶です。\n一煎一煎と淹れるびに、鮮やかになっていき、\nお茶の色味とともに味わい深くなっていきます。",
    },
    {
      img: {
        src: "/menu-image-9.jpg",
        alt: "磯部餅",
      },
      text: "磯部餅",
      description:
        "天然玉露ともいわれるほど、旨みのある煎茶です。\n一煎一煎と淹れるびに、鮮やかになっていき、\nお茶の色味とともに味わい深くなっていきます。",
    },
  ];

  return (
    <div
      id="menu"
      className="scroll-mt-(--header-height) overflow-hidden py-[50px_136px] md:py-[100px_50px]"
    >
      <div className="relative m-auto grid max-w-257 gap-12 px-5.5 md:gap-15">
        <div className="isolate grid gap-12.5 text-[0.9375rem] leading-6.25 font-bold tracking-[.12em] md:relative md:gap-10.5">
          <h2>
            <Heading text="おしながき" />
          </h2>
          <p className="text-center">
            急須で三煎目まで
            <span className="inline-block">お楽しみいただけます。</span>
          </p>

          <Image
            className="absolute -bottom-21.25 left-[calc(50%-208px)] z-10 block h-auto w-22.5 md:-bottom-7.25 md:left-[calc(50%-305px)] md:w-25.5"
            src="/menu-deco.png"
            alt="イラスト"
            width={190}
            height={142}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="grid place-content-center gap-7.5 md:grid-cols-[repeat(auto-fit,300px)] md:gap-10.5">
          {menuCards.map((menuCard) => {
            return (
              <div key={menuCard.img.src}>
                <ModalMenuCard
                  img={{
                    src: menuCard.img.src,
                    alt: menuCard.img.alt,
                  }}
                  text={menuCard.text}
                  description={menuCard.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
