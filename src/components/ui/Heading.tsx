import Image from "next/image";

export type HeadingProps = {
  text: string;
  as?: "div" | "h1";
};

export default function Heading({ text, as: Tag = "div" }: HeadingProps) {
  return (
    <Tag className="text-4 m-auto grid w-fit place-items-center gap-4 text-lg leading-6.5 font-bold tracking-[0.12em] text-black md:gap-10 md:text-[1.625rem]">
      <picture className="w-17.5 md:w-25">
        <source media="(max-width: 767px)" srcSet="/head-leaf_sp.png" />

        <Image
          className="h-auto w-full"
          src="/head-leaf.png"
          width={80}
          height={80}
          alt="見出しアイコン"
        />
      </picture>
      {text}
    </Tag>
  );
}
