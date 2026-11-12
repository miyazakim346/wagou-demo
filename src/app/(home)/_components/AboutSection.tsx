import Image from "next/image";

export default function AboutSection() {
  return (
    <div
      id="about"
      className="m:py-[0_296px] scroll-mt-(--header-height) overflow-hidden py-[38px_659px]"
    >
      <div className="relative isolate m-auto grid max-w-360 gap-7 px-5.5 md:gap-9">
        <h2 className="text-green relative z-10 text-center text-[26px] leading-[2.3] font-bold">
          和み合う、茶舗和合
        </h2>
        <div className="relative z-10 grid gap-10 text-center leading-[2.4] font-bold md:gap-11 md:leading-[2.25]">
          <p>
            こもださんの農園では、
            <br />
            真菰、米、お茶の栽培を行っています。
            <br />
            知多半島の海風と太陽の
            <span className="inline-block">めぐみを有効活用し、</span>
            <br />
            人と自然と植物、
            <br className="sm:hidden" />
            <span className="inline-block">
              すべてが調和するように
              <span className="inline-block">農業をしています。</span>
            </span>
            <br />
            そして、仲間たちが惜しみなく
            <span className="inline-block">心と手をかけてくれるからこそ、</span>
            <br />
            植物の本来もつ力を信頼し、
            <span className="inline-block">
              それを活かすことができています。
            </span>
          </p>
          <p>
            互いに無理しすぎることなく、助け合う心、
            <span className="inline-block">分け合う心を大切に、</span>
            <br />
            ちきゅうであそぶように
            <span className="inline-block">農園をしています。</span>
            <br />
            こうしてうまれた一杯のお茶を、
            <br />
            おもてなしの心とともにお届けしたい。 <br />
            茶舗 和合は、日常から離れ、
            <span className="inline-block">ほっとゆっくりひとやすみ。</span>
          </p>
          <p>
            からだとこころを清め、調える、
            <span className="inline-block">お茶所です。</span>
            <br />
            あなたの大切な今日という日の、
            <br />
            なごみのひとときと
            <br />
            なりますように。
          </p>
        </div>

        <Image
          className="m:bottom-auto m:top-[calc(50%-110px)] m:-left-30.75 m:w-[47.1527%] m:max-w-169.75 m:-translate-y-1/2 absolute -bottom-144.5 left-[calc(50%-405px)] z-0 w-125.75 max-w-[200%]"
          src="/about-01.png"
          alt="Wagou01"
          width={679}
          height={707}
          loading="lazy"
          decoding="async"
        />
        <Image
          className="m:block l:-left-41.25 m:-left-29.25 absolute bottom-[calc(50%-356px)] z-0 hidden w-[47.1527%] max-w-169.75 translate-y-1/2"
          src="/about-02.png"
          alt="Wagou02"
          width={679}
          height={707}
          loading="lazy"
          decoding="async"
        />
        <Image
          className="l:right-px m:-right-16 m:top-[calc(50%-42px)] m:w-[44.375%] m:max-w-159.75 m:-translate-y-1/2 m:bottom-auto absolute right-[calc(50%-400px)] -bottom-179.5 z-0 w-158 max-w-[200%]"
          src="/about-03.png"
          alt="Wagou03"
          width={639}
          height={578}
          loading="lazy"
          decoding="async"
        />
        <Image
          className="m:block absolute right-0.5 bottom-[calc(50%-331px)] z-0 hidden w-[41.4583%] max-w-149.25 translate-y-1/2"
          src="/about-04.png"
          alt="Wagou04"
          width={597}
          height={652}
          loading="lazy"
          decoding="async"
        />
        <Image
          className="m:-bottom-45.25 absolute right-1/2 -bottom-42.75 z-0 translate-x-1/2"
          src="/about-deco.png"
          alt="イラスト"
          width={190}
          height={142}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
