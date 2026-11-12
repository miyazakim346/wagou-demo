"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ABOUT_PAGE_SLUG } from "@/constants/pageSlugs";

export default function FooterNav() {
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

  // ---------- Styles ------------
  const classUl =
    "m-auto grid w-fit grid-flow-col grid-rows-3 gap-x-7.5 gap-y-2 md:max-w-[652px] md:grid-rows-1  md:grid-cols-[repeat(6,auto)] md:[&>li:last-child>a]:after:content-none";

  const classNavLink =
    "inline-block text-sm leading-10 font-bold text-black relative md:after:content-[''] md:after:w-[1px] md:after:h-5 md:after:bg-black md:after:absolute md:after:top-[50%] md:after:-right-[14px] md:after:-translate-y-[50%] hover:opacity-hover transition-all";

  return (
    <nav>
      <ul className={classUl}>
        {navItems.map((navItem) => (
          <li key={navItem.href}>
            <Link href={navItem.href} className={classNavLink}>
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
