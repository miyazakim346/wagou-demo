"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { lockPageScroll } from "@/utils/pageScrollLock";

type ModalMenuCardProps = {
  img: { src: string; alt: string };
  text: string;
  description: string;
};

export default function ModalMenuCard({
  img,
  text,
  description,
}: ModalMenuCardProps) {
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openButton = openButtonRef.current;
    const closeButton = closeButtonRef.current;
    const modal = modalRef.current;

    if (!openButton || !closeButton || !modal) return;

    let unlockPageScroll: (() => void) | null = null;

    const handleDialogClose = () => {
      unlockPageScroll?.();
      unlockPageScroll = null;
      modal.removeEventListener("click", handleBackdropClose);
    };

    const closeModal = () => {
      modal.close();
    };

    const handleBackdropClose = (e: MouseEvent) => {
      const body = bodyRef.current;
      if (!body || body.contains(e.target as Node)) return;
      closeModal();
    };

    const handleModalOpen = () => {
      modal.showModal();
      // スクロールバーを残したままページのスクロールを禁止する
      unlockPageScroll = lockPageScroll();
      modal.addEventListener("click", handleBackdropClose);
    };

    const handleModalClose = () => {
      closeModal();
    };

    openButton.addEventListener("click", handleModalOpen);
    closeButton.addEventListener("click", handleModalClose);
    modal.addEventListener("close", handleDialogClose);

    return () => {
      openButton.removeEventListener("click", handleModalOpen);
      closeButton.removeEventListener("click", handleModalClose);
      modal.removeEventListener("close", handleDialogClose);
      modal.removeEventListener("click", handleBackdropClose);
      unlockPageScroll?.();
    };
  }, []);

  return (
    <>
      {/* modal-button */}
      <button
        type="button"
        ref={openButtonRef}
        className="group relative block w-full max-w-75 overflow-hidden rounded-[10px]"
      >
        <Image
          className="h-auto w-full"
          src={img.src}
          alt={img.alt}
          width={300}
          height={225}
          loading="lazy"
          decoding="async"
        />
        <div className="bg-whiteAccent relative px-4.5 py-[10px_28px]">
          <h3 className="text-left text-base leading-6.25 font-bold tracking-[0.12em]">
            {text}
          </h3>
          <div className="bg-green group-hover:opacity-hover absolute right-0 bottom-0 rounded-[10px_0_10px_0] px-2.5 py-1.5 text-sm leading-5.5 font-bold text-white transition-all">
            詳細へ
          </div>
        </div>
      </button>

      {/* modal-body */}
      <dialog
        ref={modalRef}
        className="fixed top-[50%] left-[50%] max-h-[90vh] w-[88.63633%] max-w-125 translate-[-50%] overflow-y-auto overscroll-y-none bg-transparent backdrop:bg-[#000] backdrop:opacity-[0.15] md:w-full"
      >
        <div
          ref={bodyRef}
          className="bg-whiteAccent grid h-full min-w-full place-items-center overflow-hidden rounded-[20px] px-5 py-[60px_25px] md:py-[70px_26px]"
        >
          <div className="overflow-hidden rounded-[10px]">
            <Image
              className="h-auto w-75"
              src={img.src}
              alt={img.alt}
              width={300}
              height={225}
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3 className="mt-6 text-base leading-10 font-bold tracking-[0.12em] md:mt-3.75">
            {text}
          </h3>
          <div className="mt-3.5 text-center text-sm leading-7.5 whitespace-pre-line md:mt-2.25">
            {description}
          </div>
          <button
            type="button"
            ref={closeButtonRef}
            className="border-green bg-whiteAccent text-green hover:bg-green hover:text-whiteAccent after:bg-green hover:after:bg-whiteAccent mt-22.25 mr-0.75 ml-auto flex w-fit min-w-13 items-center justify-center gap-3 overflow-hidden rounded-[1px_20px] border-2 px-8.25 py-1 text-base leading-6.25 font-bold tracking-[0.12em] transition-all duration-300 after:h-3.75 after:w-4 after:mask-[url('/close-icon.svg')] after:mask-contain after:mask-center after:mask-no-repeat after:content-[''] md:mr-2.5 md:py-[5px_6px]"
          >
            閉じる
          </button>
        </div>
      </dialog>
    </>
  );
}
