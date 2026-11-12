import Link from "next/link";

type BreadcrumbProps = {
  items: {
    href?: string;
    text: string;
  }[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <ul className="m-auto flex w-full flex-wrap items-center py-[36px_24px] md:gap-[7.5px] md:py-10">
      {items.map((item) => {
        return (
          <li
            className="flex items-center gap-2.5 not-last-of-type:pr-[10px] not-last-of-type:after:block not-last-of-type:after:h-2.75 not-last-of-type:after:w-1.75 not-last-of-type:after:bg-[url('/right-arrow.svg')] not-last-of-type:after:bg-contain not-last-of-type:after:bg-center not-last-of-type:after:bg-no-repeat not-last-of-type:after:content-[''] md:not-last-of-type:pr-0 [&_div]:underline"
            key={item.href}
          >
            {item.href ? (
              <Link
                href={item.href}
                className="hover:opacity-hover inline-block text-sm leading-6.5 transition-all"
              >
                {item.text}
              </Link>
            ) : (
              <div className="inline-block text-sm leading-6.5">
                {item.text}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
