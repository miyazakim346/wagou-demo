import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  getHref: (pageNumber: number) => string;
};

export default function Pagination({
  currentPage,
  totalPages,
  getHref,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevHref = currentPage <= 1 ? "" : getHref(currentPage - 1);
  const nextHref = currentPage >= totalPages ? "" : getHref(currentPage + 1);

  const classPagination =
    "text-green bg-whiteAccent border-green inline-block border px-[16px] py-1.5 text-base leading-[26px] transition-all  hover:bg-green hover:text-whiteAccent";
  const classArrow = "inline-block px-[16px] py-[7px] transition-all ";

  const isCurrent = "text-whiteAccent! bg-green!";

  return (
    <div className="mx-auto mt-[66px] flex w-fit items-center justify-center gap-0">
      {prevHref ? (
        <Link href={prevHref} className={`${classArrow} hover:opacity-hover`}>
          <Image
            className="md:w-[11px]"
            src="/pagination-prev.svg"
            alt="前へ"
            width={11}
            height={14}
            loading="lazy"
            decoding="async"
          />
        </Link>
      ) : (
        <span className={`${classArrow} opacity-30`} aria-hidden="true">
          <Image
            className="md:w-[11px]"
            src="/pagination-prev.svg"
            alt=""
            width={11}
            height={14}
            loading="lazy"
            decoding="async"
          />
        </span>
      )}
      <div className="flex w-fit items-center justify-center gap-[5px]">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;

          return (
            <Link
              key={pageNumber}
              href={getHref(pageNumber)}
              className={clsx(
                classPagination,
                currentPage === pageNumber && isCurrent
              )}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>
      {nextHref ? (
        <Link href={nextHref} className={`${classArrow} hover:opacity-hover`}>
          <Image
            className="md:w-[11px]"
            src="/pagination-next.svg"
            alt="次へ"
            width={11}
            height={14}
            loading="lazy"
            decoding="async"
          />
        </Link>
      ) : (
        <span className={`${classArrow} opacity-30`} aria-hidden="true">
          <Image
            className="md:w-[11px]"
            src="/pagination-next.svg"
            alt=""
            width={11}
            height={14}
            loading="lazy"
            decoding="async"
          />
        </span>
      )}
    </div>
  );
}
