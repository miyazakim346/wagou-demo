import Image from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  slug: string;
  srcPc: string;
  srcSp: string;
  alt: string;
  text: string;
};

export default function ServiceCard({
  srcPc,
  srcSp,
  alt,
  text,
  slug,
}: ServiceCardProps) {
  return (
    <Link
      href={`${slug}`}
      className="group relative block w-full max-w-119 pt-4.25 pr-1.5 md:pt-3.25 md:pr-3"
    >
      <h3 className="text-green bg-whiteAccent flx-col absolute top-0 right-0 flex h-49.5 w-fit justify-center px-4 py-4 text-lg leading-2.75 font-bold tracking-[0.4em] [writing-mode:vertical-rl]">
        {text}
      </h3>
      <Image
        className="h-auto w-full md:hidden"
        src={srcSp}
        alt={alt}
        width={410}
        height={227}
        loading="lazy"
        decoding="async"
      />
      <Image
        className="hidden h-auto w-full md:block"
        src={srcPc}
        alt={alt}
        width={464}
        height={255}
        loading="lazy"
        decoding="async"
      />
      <div className="bg-green text-whiteAccent group-hover:text-green border-green absolute bottom-0 left-0 rounded-[10px_0_10px_0] border px-[27px_21px] py-[5px_8px] text-sm leading-5.5 font-bold transition-all group-hover:bg-white">
        詳しくはこちら
      </div>
    </Link>
  );
}
