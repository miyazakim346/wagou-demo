import { LOADING_SCREEN_COOKIE_NAME } from "@/constants/loadingScreen";
export const loadingScreenCookieScript = `
  (() => {
    const now = new Date();
    const today =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");
    const hasViewedToday = document.cookie
      .split("; ")
      .some(
        (cookie) => cookie === "${LOADING_SCREEN_COOKIE_NAME}=" + today
      );

    if (!hasViewedToday) {
      document.documentElement.classList.add("show-loading-screen");
    }
  })();
`;
