import Link from "next/link";

type ButtonOutlineProps = {
  href: string;
  text: string;
  targetBlank?: boolean;
};

export default function ButtonOutline({
  href,
  text,
  targetBlank = false,
}: ButtonOutlineProps) {
  return (
    <Link
      className="border-green hover:bg-green text-green bg-whiteAccent hover:text-whiteAccent flex w-fit min-w-50 items-center justify-center overflow-hidden rounded-[1px_20px] border-2 px-12.75 py-[8px_10px] text-sm font-bold transition-colors duration-300"
      href={href}
      target={targetBlank ? "_blank" : undefined}
    >
      {text}
    </Link>
  );
}
