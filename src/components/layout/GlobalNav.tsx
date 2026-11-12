"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { ABOUT_PAGE_SLUG } from "@/constants/pageSlugs";

type GlobalNavProps = {
  textItems?: "text-left" | "text-right";
};

export default function GlobalNav({ textItems = "text-left" }: GlobalNavProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navItems = [
    { href: `/${ABOUT_PAGE_SLUG}/`, label: "和合について" },
    { href: isHome ? "#menu" : "/#menu", label: "おしながき" },
    { href: isHome ? "#service" : "/#service", label: "茶・メディテーション" },
    { href: isHome ? "#blog" : "/#blog", label: "日々のこと" },
    { href: isHome ? "#media" : "/#media", label: "メディア情報" },
    { href: isHome ? "#info" : "/#info", label: "アクセス" },
  ] as const;

  return (
    // Header側から「GlobalNav内のリンクが押された」と判別するための目印
    <nav data-global-nav>
      <ul className={clsx("flex w-fit flex-col gap-5", textItems)}>
        {navItems.map((navItem) => (
          <li className="w-full" key={navItem.href}>
            <Link
              href={navItem.href}
              className="hover:text-red inline-block w-full text-base leading-10 font-bold text-black transition-all"
            >
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
