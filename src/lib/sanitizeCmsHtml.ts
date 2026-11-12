import sanitizeHtml from "sanitize-html";

const cmsHtmlOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "blockquote",
    "pre",
    "code",
    "a",
    "figure",
    "figcaption",
    "img",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
    "hr",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "width", "height", "loading"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: {
    img: ["http", "https"],
  },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => {
      if (attribs.target !== "_blank") {
        return { tagName, attribs };
      }

      return {
        tagName,
        attribs: {
          ...attribs,
          rel: "noopener noreferrer",
        },
      };
    },
  },
};

/**
 * microCMS の本文は管理画面由来でも信頼済みとはみなさず、
 * DOM に挿入する直前に許可リスト方式で無害化する。
 */
export function sanitizeCmsHtml(html: string): string {
  return sanitizeHtml(html, cmsHtmlOptions);
}
