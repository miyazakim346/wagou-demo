// 誤ってブラウザ側から使おうとしたときにビルド時にエラー
import "server-only";

import type { CmsEndpoint } from "@/constants/cmsEndpoints";
import type { CmsCategory, CmsPostDetail, CmsPostListItem } from "@/types/cms";
import { createClient } from "microcms-js-sdk";
import { notFound } from "next/navigation";
import { cache } from "react";

// microCMSで通信障害が起きたときの処理を追加

// この2つは少し待つと直る可能性があるため、最大2回だけ再試行する
const RETRYABLE_STATUS_CODES = new Set([429, 503]);
const MAX_RETRY_COUNT = 2;
const RETRY_DELAY_MS = 500;

/**
 * microCMSの呼び出しに失敗したことを上位へ伝える専用エラー。
 *
 * status があればHTTPステータス、causeにはSDKが返した元のエラーが入る。
 * 専用の型にすることで、通常のプログラムエラーと区別しやすくなる。
 */
export class MicroCmsError extends Error {
  constructor(
    message: string,
    public readonly endpoint: string,
    public readonly status: number | undefined,
    cause: unknown
  ) {
    super(message, { cause });
    this.name = "MicroCmsError";
  }
}

// microCMS SDKのエラーメッセージからHTTPステータスを取り出す
function getStatusCode(error: unknown): number | undefined {
  if (!(error instanceof Error)) return undefined;

  const matchedStatus = error.message.match(
    /fetch API response status: (\d{3})\b/
  );

  return matchedStatus ? Number(matchedStatus[1]) : undefined;
}

// 指定した時間だけ処理を待つ。リトライ前の待機に使用する
function wait(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * すべてのmicroCMS呼び出しで使う共通処理。
 *
 * 一時的な429/503だけを再試行し、それ以外はすぐに失敗させる。
 * 最後に必ずMicroCmsErrorへ変換するため、画面側やCIのログで原因を追いやすい。
 */
async function requestMicroCms<T>(
  endpoint: string,
  request: () => Promise<T>,
  expectedStatusCodes: readonly number[] = []
): Promise<T> {
  for (let retryCount = 0; retryCount <= MAX_RETRY_COUNT; retryCount++) {
    try {
      return await request();
    } catch (error) {
      const status = getStatusCode(error);
      const canRetry =
        status !== undefined &&
        RETRYABLE_STATUS_CODES.has(status) &&
        retryCount < MAX_RETRY_COUNT;

      if (canRetry) {
        // 1回目は500ms、2回目は1000ms待ち、APIへの連続アクセスを避ける
        const delay = RETRY_DELAY_MS * (retryCount + 1);

        console.warn(
          `[microCMS] ${status}エラーのため再試行します。` +
            ` endpoint=${endpoint}, retry=${retryCount + 1}/${MAX_RETRY_COUNT}, wait=${delay}ms`
        );

        await wait(delay);
        continue;
      }

      const microCmsError = new MicroCmsError(
        `microCMSからデータを取得できませんでした。` +
          ` endpoint=${endpoint}${status ? `, status=${status}` : ""}`,
        endpoint,
        status,
        error
      );

      if (status === undefined || !expectedStatusCodes.includes(status)) {
        console.error("[microCMS] API呼び出しに失敗しました。", {
          endpoint,
          status: status ?? "取得不可",
          attempts: retryCount + 1,
          cause: error,
        });
      }

      throw microCmsError;
    }
  }

  // for文の中で必ずreturnかthrowされるため、通常ここには到達しない
  throw new MicroCmsError(
    "microCMSのリトライ処理が予期せず終了しました。",
    endpoint,
    undefined,
    undefined
  );
}

// microCMSの接続
// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// microCMSのクライアントを初期化
const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// microCMSから取得する項目を共通化
const LIST_FIELDS = "id,title,eyecatch,category,publishedAt";
const DETAIL_FIELDS = `${LIST_FIELDS},contents`;

// 記事一覧：microCMSから記事を取得
export async function getPosts(
  endpoint: CmsEndpoint,
  limit: number,
  currentPage?: number
): Promise<CmsPostListItem[]> {
  // offset →　記事の先頭から何件飛ばすかを指定項目
  const offsetValue = currentPage ? (currentPage - 1) * limit : 0;

  const data = await requestMicroCms(endpoint, () =>
    client.get({
      endpoint: endpoint,
      queries: {
        fields: LIST_FIELDS,
        limit: limit,
        // news/page/●●を作成のため設置
        offset: offsetValue,
        orders: "-publishedAt", //公開日時が新しい順番
      },
    })
  );

  return data.contents;
}

// 記事一覧のページ総数を取得し、
export async function getPageParams(endpoint: CmsEndpoint, limit: number) {
  // newsの全記事数だけを取得し、ページ1からtotalPagesまでのページを取得
  const data = await requestMicroCms(endpoint, () =>
    client.get({
      endpoint: endpoint,
      queries: { limit: 0 },
    })
  );

  const totalPages = Math.ceil(data.totalCount / limit);
  if (totalPages === 0) return [];

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

// 詳細記事：詳細記事を取得
export const getSinglePost = cache(async function getSinglePost(
  endpoint: CmsEndpoint,
  id: string
): Promise<CmsPostDetail> {
  try {
    return await requestMicroCms(
      `${endpoint}/${id}`,
      () =>
        client.get({
          endpoint: `${endpoint}/${id}`,
          queries: {
            fields: DETAIL_FIELDS,
          },
        }),
      [404]
    );
  } catch (error) {
    // 記事が存在しない404は、システム障害ではなく「ページなし」として扱う
    if (error instanceof MicroCmsError && error.status === 404) {
      notFound();
    }

    throw error;
  }
});

// 記事のIDをオブジェクトで渡す
// src\app\(home)\[slug]\page.tsx
// src\app\news\[id]\page.tsx
// src\app\news\category\[id]\page.tsxで使用
export async function getPostParams(
  endpoint: CmsEndpoint,
  paramName: "slug" | "id"
) {
  const contentIds = await requestMicroCms(endpoint, () =>
    client.getAllContentIds({ endpoint: endpoint })
  );

  return contentIds.map((contentId) => ({
    [paramName]: String(contentId), // 各記事のIDをパラメータとして返す
  }));
}

// カテゴリー一覧：カテゴリーに紐づく記事を取得
export async function getPostsByCategory(
  endpoint: CmsEndpoint,
  id: string,
  limit: number,
  currentPage?: number
): Promise<CmsPostListItem[]> {
  const offsetValue = currentPage ? (currentPage - 1) * limit : 0;

  const data = await requestMicroCms(endpoint, () =>
    client.get({
      endpoint: endpoint,
      queries: {
        fields: LIST_FIELDS,

        // 下記の場合は、[equals]　（単数用）
        // category?: { slug: string; name: string };

        // 下記の場合は、[contains]　（複数の配列用）
        // category?: { slug: string; name: string }[];
        filters: `category[contains]${id}`,
        limit: limit,
        offset: offsetValue,
        orders: "-publishedAt",
      },
    })
  );

  return data.contents;
}

// カテゴリごとのページ情報を配列で取得する関数
// カテゴリ一覧：ページネーションで使用
export async function getCategoryPageParams(
  endpoint: CmsEndpoint,
  id: string,
  limit: number
) {
  const data = await requestMicroCms(endpoint, () =>
    client.get({
      endpoint: endpoint,
      queries: {
        filters: `category[contains]${id}`,
        limit: 0,
      },
    })
  );

  const totalPages = Math.ceil(data.totalCount / limit);
  if (totalPages === 0) return [];

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

// カテゴリ一覧：カテゴリー情報を取得
// カテゴリーもmetadataとページ本文の両方で使うため、同じ取得処理を共有する
export const getCategory = cache(async function getCategory(
  endpoint: CmsEndpoint,
  id: string
): Promise<CmsCategory> {
  try {
    return await requestMicroCms(
      `${endpoint}/${id}`,
      () =>
        client.get({
          endpoint: endpoint,
          contentId: id,
        }),
      [404]
    );
  } catch (error) {
    // カテゴリーが存在しない場合だけ404ページを表示する
    if (error instanceof MicroCmsError && error.status === 404) {
      notFound();
    }

    throw error;
  }
});

// 全カテゴリIDを取得
export async function getAllCategoryIds(
  endpoint: CmsEndpoint
): Promise<string[]> {
  const contentIds = await requestMicroCms(endpoint, () =>
    client.getAllContentIds({ endpoint })
  );
  return contentIds.map(String);
}
