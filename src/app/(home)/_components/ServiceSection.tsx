import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import ServiceCard from "@/app/(home)/_components/ServiceCard";
import ServiceMeditationCard from "@/app/(home)/_components/ServiceMeditationCard";
import Button from "@/components/ui/Button";
import {
  TEA_PAGE_SLUG,
  PRODUCT_PAGE_SLUG,
  MEDITATION_PAGE_SLUG,
} from "@/constants/pageSlugs";

export default function ServiceSection() {
  // サービスカード
  const serviceCards = [
    {
      slug: `/${TEA_PAGE_SLUG}/`,
      srcPc: "service-card-01.png",
      srcSp: "service-card-01_sp.png",
      alt: "お茶を楽しむ",
      text: "お茶を楽しむ",
    },
    {
      slug: `/${PRODUCT_PAGE_SLUG}/`,
      srcPc: "service-card-02.png",
      srcSp: "service-card-02_sp.png",
      alt: "商品を買う",
      text: "商品を買う",
    },
  ];

  // サービス・メディテーションカード
  const serviceMeditationCards = [
    {
      src: "service-meditation-card-01.png",
      alt: "セラピー",
      text: "セラピー",
    },
    {
      src: "service-meditation-card-02.png",
      alt: "お茶を感じる会",
      text: "お茶を感じる会",
    },
    {
      src: "service-meditation-card-03.png",
      alt: "ヨガ",
      text: "ヨガ",
    },
  ];

  return (
    <div
      id="service"
      className="scroll-mt-(--header-height) overflow-hidden py-[50px_110px] md:py-[100px_50px]"
    >
      <div className="relative m-auto grid max-w-257 gap-10 px-3 md:gap-20">
        <h2>
          <Heading text="和合でできること" />
        </h2>
        <div className="grid gap-10 md:gap-15">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-10">
            {serviceCards.map((serviceCard) => {
              return (
                <div key={serviceCard.slug}>
                  <ServiceCard
                    slug={serviceCard.slug}
                    srcPc={serviceCard.srcPc}
                    srcSp={serviceCard.srcSp}
                    alt={serviceCard.alt}
                    text={serviceCard.text}
                  />
                </div>
              );
            })}
          </div>

          <Link
            href={`/${MEDITATION_PAGE_SLUG}/`}
            className="group sssm:px-3 ssm:px-[16%] base:px-16.5 relative isolate m-auto grid max-w-241.5 gap-7.25 py-[70px_50px] md:py-[39px_24px]"
          >
            <div className="absolute inset-0 z-0 h-full w-full overflow-hidden rounded-[100px_10px_100px_10px]">
              <Image
                className="h-full w-full object-cover object-bottom sm:hidden"
                src="/serviceMeditation-bg_sp.jpg"
                alt="背景画像"
                width={400}
                height={873}
                loading="lazy"
                decoding="async"
              />
              <Image
                className="hidden h-full w-full object-cover object-bottom sm:block"
                src="/serviceMeditation-bg.jpg"
                alt="背景画像"
                width={966}
                height={397}
                loading="lazy"
                decoding="async"
              />
            </div>
            <Image
              className="ssm:w-47.5 absolute -right-11.5 -bottom-14 block h-auto w-39 lg:-right-21.25 lg:-bottom-1"
              src="/serviceMeditation-deco.png"
              alt="イラスト"
              width={190}
              height={142}
              loading="lazy"
              decoding="async"
            />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <h3 className="sssm:text-[1.25rem] ssm:text-2xl ssm:-mx-8 leading-6.25 font-bold tracking-[0.12em]">
                茶・メディテーション
              </h3>
              <p className="text-[0.8125rem] leading-6.25 font-bold tracking-[0.12em]">
                茶房で心も身体も癒す時間を。
              </p>
            </div>

            <div className="relative z-10 grid place-items-center gap-8.5 md:gap-4.5">
              <div className="m:flex-nowrap flex w-full flex-col items-center justify-center gap-5 sm:flex-row sm:flex-wrap md:flex-row md:gap-6">
                {serviceMeditationCards.map((serviceMeditationCard) => {
                  return (
                    <div key={serviceMeditationCard.src}>
                      <ServiceMeditationCard
                        src={serviceMeditationCard.src}
                        alt={serviceMeditationCard.alt}
                        text={serviceMeditationCard.text}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="relative">
                <Button
                  text="詳しくはこちら"
                  addStyles="transition-all group-hover:bg-white group-hover:text-green"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
