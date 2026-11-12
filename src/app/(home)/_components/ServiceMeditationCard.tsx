import Image from "next/image";

type ServiceMeditationCardProps = {
  src: string;
  alt: string;
  text: string;
};

export default function ServiceMeditationCard({
  src,
  alt,
  text,
}: ServiceMeditationCardProps) {
  return (
    <div className="relative mb-1.5 w-full max-w-65.5">
      <div className="bg-whiteAccent absolute right-2.5 -bottom-1.5 w-fit rounded-xs px-2.5 py-1 text-[0.9375rem] leading-3.75 font-bold tracking-[0.12em]">
        {text}
      </div>
      <Image
        className="block h-auto w-full"
        src={src}
        alt={alt}
        width={464}
        height={255}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
