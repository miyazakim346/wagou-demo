import { decodeHTML } from "entities";
import sanitizeHtml from "sanitize-html";

import { sanitizeCmsHtml } from "@/lib/sanitizeCmsHtml";

/**
 * microCMS本文の最初の段落を、metadata用の説明文に変換する。
 *
 * 本文表示用のHTMLはタグを残す必要があるが、descriptionには文字だけを設定する。
 */
export function getCmsDescription(html: string): string {
  const safeHtml = sanitizeCmsHtml(html);
  const firstParagraphHtml =
    safeHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "";

  // strongやaなど、最初の段落内に残っているHTMLタグをすべて取り除く
  const textWithEntities = sanitizeHtml(firstParagraphHtml, {
    allowedTags: [],
    allowedAttributes: {},
  });

  // &amp; や &nbsp; などを通常の文字に戻し、余分な空白を1つにまとめる
  return decodeHTML(textWithEntities).replace(/\s+/g, " ").trim();
}
