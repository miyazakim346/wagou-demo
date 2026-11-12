import Image from "next/image";
import Link from "next/link";

type NewsCardProps = {
  id: string;
  img: {
    src: string;
    alt: string;
  };
  category: {
    id: string;
    name: string;
  }[];
  text: string;
};

export default function NewsCard({ id, img, category, text }: NewsCardProps) {
  return (
    <div className="w-full max-w-95 overflow-hidden rounded-[0.625rem] [box-shadow:0px_4px_20px_0px_rgba(169,169,169,0.25)] md:max-w-91">
      <Link href={`/news/${id}/`} className="block w-full">
        <Image
          className="block h-auto w-full"
          src={img.src}
          alt={img.alt}
          width={300}
          height={225}
          loading="eager"
          decoding="async"
        />
      </Link>
      <div className="bg-whiteAccent relative p-5 px-5 md:min-h-22.5">
        <div className="absolute right-0 bottom-full flex w-fit gap-1">
          {category &&
            category.map((category) => {
              return (
                <Link
                  key={category.id}
                  className="bg-green text-whiteAccent block rounded-[10px_10px_0_0] px-4.25 py-0.75 text-[0.8125rem] leading-3.25 font-bold tracking-[.07em]"
                  href={`/news/category/${category.id}/`}
                >
                  {category.name}
                </Link>
              );
            })}
        </div>
        <Link href={`/news/${id}/`} className="block w-full">
          <h3 className="[display: -webkit-box] [-webkit-box-orient: vertical] line-clamp-2 overflow-hidden text-[0.875rem] leading-6.25 font-bold">
            {text}
          </h3>
        </Link>
      </div>
    </div>
  );
}
