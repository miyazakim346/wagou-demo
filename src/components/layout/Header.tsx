"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import HamburgerIcon from "../ui/HamburgerIcon";
import GlobalNav from "./GlobalNav";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const DRAWER_ID = "global-navigation-drawer";

const FOCUSABLE_ELEMENTS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isReservation = pathname === "/reservation/";
  const [openedPathname, setOpenedPathname] = useState<string | null>(null);
  const isOpen = openedPathname === pathname;
  const toggleMenu = () => {
    setOpenedPathname((prev) => (prev === pathname ? null : pathname));
  };
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  // スクロールを感知
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  // 画面表示直前に実行されるReactのフック
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // ヘッダーの高さを取得し、stateとCSS変数の両方に反映する
    const updateHeaderHeight = () => {
      const height = header.getBoundingClientRect().height;
      setHeaderHeight(height);
      // ヘッダーの高さをCSS変数として書き出す
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
      );
    };

    // 初回計測
    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(header);

    // スクロールイベントリスナーを追加
    window.addEventListener("scroll", handleScroll);

    return () => {
      // クリーンアップ
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ページ内に複数あるGlobalNavの、どのリンクが押されてもドロワーを閉じる
  useEffect(() => {
    const handleGlobalNavClick = (event: MouseEvent) => {
      const clickedElement = event.target;
      if (!(clickedElement instanceof Element)) return;

      // data-global-nav は、GlobalNavコンポーネントのnav要素に付けた目印
      const globalNavLink = clickedElement.closest("[data-global-nav] a");
      if (!globalNavLink) return;

      setOpenedPathname(null);
    };

    document.addEventListener("click", handleGlobalNavClick);

    return () => {
      document.removeEventListener("click", handleGlobalNavClick);
    };
  }, []);

  // ドロワーが開いている間だけ、キーボードのフォーカスを管理する
  useEffect(() => {
    if (!isOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusableElements =
      drawer.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // 開いたことがキーボード利用者にも分かるよう、最初のリンクへ移動する
    firstElement?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      // Escキーで閉じ、操作を始めたハンバーガーボタンへ戻す
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenedPathname(null);
        menuButtonRef.current?.focus();
        return;
      }

      // Tabキー以外、または移動先がない場合は何もしない
      if (event.key !== "Tab" || !firstElement || !lastElement) return;

      const activeElement = document.activeElement;
      const focusIsOutsideDrawer = !drawer.contains(activeElement);

      // Shift + Tabで先頭から戻るときは、末尾へ移動する
      if (
        event.shiftKey &&
        (activeElement === firstElement || focusIsOutsideDrawer)
      ) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      // Tabで末尾から進むときは、先頭へ移動する
      if (
        !event.shiftKey &&
        (activeElement === lastElement || focusIsOutsideDrawer)
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // 閉じたときはイベントを解除し、ほかの画面操作に影響させない
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // 「ホーム & 未スクロール」になった“瞬間”を検知して isOpen をリセットする。
  const shouldForceClose = isHome && !isScrolled;
  const [prevShouldForceClose, setPrevShouldForceClose] =
    useState(shouldForceClose);

  if (shouldForceClose !== prevShouldForceClose) {
    setPrevShouldForceClose(shouldForceClose);
    if (shouldForceClose) {
      setOpenedPathname(null);
    }
  }

  return (
    <header
      ref={headerRef}
      className={clsx(
        "fixed top-0 right-0 left-0 isolate z-(--z-header) m-auto flex max-w-360 justify-between overflow-hidden px-[15px_10px] py-2.5 md:px-[24px_10px]",
        isHome && "justify-end"
      )}
    >
      <div className={clsx("", isHome ? "hidden" : "block h-fit w-fit")}>
        <Link
          href="/"
          className="hover:opacity-hover relative z-10 inline-block h-fit w-15 transition-all md:mt-2.5 md:w-25"
        >
          <Image
            className="block h-auto w-full"
            src="/logo-black.png"
            alt="茶舗 和合"
            width={100}
            height={100}
            loading="eager"
            decoding="async"
          />
        </Link>
      </div>
      <div
        className={clsx(
          "transition-all transition-discrete duration-300",
          isHome
            ? isScrolled
              ? "block opacity-100"
              : "hidden opacity-0"
            : "block"
        )}
      >
        <HamburgerIcon
          isOpen={isOpen}
          controlsId={DRAWER_ID}
          onClick={toggleMenu}
          buttonRef={menuButtonRef}
        />
      </div>
      <div
        ref={drawerRef}
        id={DRAWER_ID}
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={clsx(
          "ll:pr-[calc(3rem+(100vw-90rem)/2)] fixed top-0 right-0 z-20 flex h-svh min-w-70 flex-col items-end gap-7.5 px-6.75 pb-2.5 duration-300 md:min-w-92.5 md:px-12",
          isOpen ? "translate-x-0" : "translate-x-full",
          isHome && !isScrolled && "md:translate-x-full",
          isHome
            ? "pt-[calc(var(--header-height)+30px)] md:pt-[calc(var(--header-height)+48px)]"
            : "pt-[calc(var(--header-height)+2px)] md:pt-[calc(var(--header-height)-31px)]"
        )}
      >
        <Image
          className="absolute inset-0 z-0 block h-full w-full object-cover object-left md:hidden"
          src="/header-bg_sp.jpg"
          alt="背景画像"
          width={280}
          height={847}
          loading="eager"
          decoding="async"
        />
        <Image
          className="absolute inset-0 z-0 hidden h-full w-full object-cover object-left md:block"
          src="/header-bg.jpg"
          alt="背景画像"
          width={400}
          height={873}
          loading="eager"
          decoding="async"
        />
        <div className="relative z-10 flex h-full flex-col items-end gap-8 md:gap-8">
          <Link
            href="/"
            className="hover:opacity-hover relative inline-block h-fit w-fit transition-all"
          >
            <Image
              className="block h-auto w-25 md:w-32.5"
              src="/logo-black.png"
              alt="茶舗 和合"
              width={100}
              height={100}
              loading="eager"
              decoding="async"
            />
          </Link>

          <GlobalNav textItems="text-right" />
        </div>
      </div>
      <div
        className={clsx(
          "ll:pr-[calc((100vw-90rem)/2)] fixed right-2.5 bottom-2.5 z-(--z-floating) transition-all transition-discrete duration-300 md:right-11 md:bottom-5",
          isHome
            ? isScrolled
              ? "block opacity-100"
              : "hidden opacity-0"
            : "block",
          isReservation && "hidden"
        )}
      >
        <Link
          href="/reservation/"
          className="hover:opacity-hover ssm:w-27.75 block w-25 transition-all"
        >
          <Image
            className="h-auto w-full"
            src="/header-reservation.png"
            alt="予約する"
            width={111}
            height={157}
            loading="eager"
            decoding="async"
          />
        </Link>
      </div>
    </header>
  );
}
