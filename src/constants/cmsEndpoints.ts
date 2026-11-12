/**
 * microCMSで設定しているAPIのエンドポイント名。
 *
 * エンドポイントを追加・変更するときは、このファイルを修正する。
 * 呼び出し側で文字列を直接書かないことで、入力間違いを防ぎやすくする。
 */
export const CMS_ENDPOINTS = {
  NEWS: "news",
  MEDIA: "media",
  PAGES: "pages",
  CATEGORY: "category",
} as const; // as constを付けることで、それぞれの値を具体的な文字列として型付けする

/**
 * CMS_ENDPOINTSに登録されている値だけを許可する型。
 *
 * 現在は "news" | "media" | "pages" | "category" のいずれかになる。
 */
export type CmsEndpoint = (typeof CMS_ENDPOINTS)[keyof typeof CMS_ENDPOINTS];
