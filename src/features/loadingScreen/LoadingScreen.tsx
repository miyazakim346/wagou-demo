"use client";

import { useLayoutEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { LOADING_SCREEN_COOKIE_NAME } from "@/constants/loadingScreen";
import { lockPageScroll } from "@/utils/pageScrollLock";
import styles from "./LoadingScreen.module.css";

const LOGO_APPEAR_DURATION = 500; // ロゴが下から浮き上がる時間
const LOGO_FADE_DELAY = 1000; // ロゴのフェードアウトを開始するまでの時間
const BACKGROUND_FADE_DELAY = 2000; // 背景のフェードアウトを開始するまでの時間
const FADE_OUT_DURATION = 900; // ロゴと背景がフェードアウトする時間

// 今日の日付を YYYYMMDD 形式で取得する
function getTodayString(): string {
  const now = new Date();

  return (
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0")
  );
}

// 指定した名前の Cookie を取得する
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

// Cookie を 24 時間保存する
function setCookieForOneDay(name: string, value: string): void {
  document.cookie = `${name}=${value}; max-age=${60 * 60 * 24}; path=/`;
}

// アニメーション終了後に html へ付けるクラスと、再訪時用の style を追加する
function hideVisitedLoadingScreen(): void {
  document.documentElement.classList.add("loading-screen-visited");

  if (document.getElementById("loading-screen-visited-style")) return;

  const style = document.createElement("style");
  style.id = "loading-screen-visited-style";
  style.textContent = "#loading-screen{display:none!important}";
  document.head.appendChild(style);
}

// ローディング画面を出すかどうかを決める
// Cookie はブラウザにしかないので、サーバーでは true（表示する想定）を返す
function shouldShowLoadingScreen(): boolean {
  if (typeof document === "undefined") return true;

  const today = getTodayString();
  return getCookie(LOADING_SCREEN_COOKIE_NAME) !== today;
}

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLogoFadingOut, setIsLogoFadingOut] = useState(false);
  const [isBackgroundFadingOut, setIsBackgroundFadingOut] = useState(false);

  useLayoutEffect(() => {
    // 既に見ている場合は何もしない
    // (scriptが挿入したCSSで既に display:none 済みなので setState 不要)
    if (!shouldShowLoadingScreen()) {
      return;
    }

    const today = getTodayString();
    const unlockPageScroll = lockPageScroll();

    const logoFadeTimer = window.setTimeout(() => {
      setIsLogoFadingOut(true);
    }, LOGO_FADE_DELAY);

    const backgroundFadeTimer = window.setTimeout(() => {
      setIsBackgroundFadingOut(true);
    }, BACKGROUND_FADE_DELAY);

    const removeScreenTimer = window.setTimeout(() => {
      setIsVisible(false);
      setCookieForOneDay(LOADING_SCREEN_COOKIE_NAME, today);
      hideVisitedLoadingScreen();
      unlockPageScroll();
    }, BACKGROUND_FADE_DELAY + FADE_OUT_DURATION);

    return () => {
      clearTimeout(logoFadeTimer);
      clearTimeout(backgroundFadeTimer);
      clearTimeout(removeScreenTimer);
      unlockPageScroll();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="loading-screen"
      role="status"
      aria-label="ページを読み込んでいます"
      className={clsx(
        "fixed inset-0 z-(--z-loading) flex items-center justify-center bg-white transition-opacity",
        isBackgroundFadingOut ? "opacity-0" : "opacity-100"
      )}
      style={{ transitionDuration: `${FADE_OUT_DURATION}ms` }}
    >
      <div
        className={clsx(
          "transition-opacity",
          isLogoFadingOut ? "opacity-0" : "opacity-100"
        )}
        style={{ transitionDuration: `${FADE_OUT_DURATION}ms` }}
      >
        <div
          className={styles.fadeUp}
          style={{ animationDuration: `${LOGO_APPEAR_DURATION}ms` }}
        >
          <Image
            src="/logo-black.png"
            alt="茶舗 和合"
            width={130}
            height={130}
            className="h-auto w-[100px] md:w-[130px]"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
