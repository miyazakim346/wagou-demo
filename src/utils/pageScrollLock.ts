// スクロールバーを残したままページのスクロールを禁止する
export function lockPageScroll(): () => void {
  const htmlElement = document.documentElement;
  const bodyElement = document.body;
  const scrollPosition = window.scrollY;
  const previousHtmlOverflowY = htmlElement.style.overflowY;
  const previousBodyPosition = bodyElement.style.position;
  const previousBodyTop = bodyElement.style.top;
  const previousBodyWidth = bodyElement.style.width;
  let isUnlocked = false;

  htmlElement.style.overflowY = "scroll";
  bodyElement.style.position = "fixed";
  bodyElement.style.top = `-${scrollPosition}px`;
  bodyElement.style.width = "100%";

  // スクロール禁止前の状態に戻す
  return function unlockPageScroll(): void {
    if (isUnlocked) return;
    isUnlocked = true;

    const previousScrollBehavior = htmlElement.style.scrollBehavior;

    htmlElement.style.overflowY = previousHtmlOverflowY;
    bodyElement.style.position = previousBodyPosition;
    bodyElement.style.top = previousBodyTop;
    bodyElement.style.width = previousBodyWidth;

    // CSSのスムーススクロールを一時的に無効化して元の位置へ戻す
    htmlElement.style.scrollBehavior = "auto";
    window.scrollTo(0, scrollPosition);
    htmlElement.style.scrollBehavior = previousScrollBehavior;
  };
}
