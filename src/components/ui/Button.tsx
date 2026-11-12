import Link from "next/link";

type ButtonProps = {
  href?: string;
  text: string;
  addStyles?: string;
};

export default function Button({ href, text, addStyles = "" }: ButtonProps) {
  const linkStyles =
    "bg-green hover:text-green border-green flex w-fit min-w-50 items-center justify-center overflow-hidden rounded-[1px_20px] border px-12.75 py-[8px_10px] text-sm font-bold text-whiteAccent transition-all hover:bg-white";

  const divStyles =
    "bg-green border-green flex w-fit min-w-50 items-center justify-center overflow-hidden rounded-[1px_20px] border px-12.75 py-[8px_10px] text-sm font-bold text-whiteAccent";

  if (href) {
    return (
      <Link href={href} className={`${linkStyles} ${addStyles}`}>
        {text}
      </Link>
    );
  }

  return <div className={`${divStyles} ${addStyles}`}>{text}</div>;
}
