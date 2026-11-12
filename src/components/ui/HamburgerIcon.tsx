import clsx from "clsx";
import type { RefObject } from "react";

type HamburgerIconProps = {
  isOpen: boolean;
  controlsId: string;
  onClick: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

export default function HamburgerIcon({
  isOpen = false,
  controlsId,
  onClick,
  buttonRef,
}: HamburgerIconProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      // ボタンが操作するドロワーのidと、現在の開閉状態を読み上げソフトへ伝える
      aria-controls={controlsId}
      aria-expanded={isOpen}
      aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
      data-open={isOpen}
      className={clsx(
        "group relative z-30 grid h-[calc(18px+20px)] w-[calc(30px+20px)] place-items-center",
        isOpen && "is-active"
      )}
    >
      {/* 3本線は装飾なので、読み上げソフトにはボタン名だけを伝える */}
      <span aria-hidden="true" className="relative block h-4.5 w-7.5">
        <span className="absolute top-0 right-0 block h-0.5 w-full bg-black transition-transform duration-300 group-[.is-active]:top-1/2 group-[.is-active]:rotate-45"></span>

        <span className="absolute top-[50%] right-0 block h-0.5 w-3/4 translate-y-[-50%] bg-black duration-300 group-[.is-active]:hidden"></span>

        <span className="absolute right-0 bottom-0 block h-0.5 w-2/4 bg-black transition-transform duration-300 group-[.is-active]:top-1/2 group-[.is-active]:w-full group-[.is-active]:-rotate-45"></span>
      </span>
    </button>
  );
}
