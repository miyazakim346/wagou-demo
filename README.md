# wagou-demo（茶舗 和合 サンプルサイト）

> ※ データと API キーは含まれていないため、コードのみの公開です。

茶舗（日本茶のお店）を想定した、Next.js と microCMS によるホームページです（自主制作）。掲載の住所・電話番号は架空のものです。

デザインカンプ・サイトマップ・仕様書をもとに、microCMS の設計、フロントエンドの実装、公開（Cloudflare Pages）と Basic 認証の設定までを担当しました。

## 使用技術

Next.js（App Router・静的書き出し） / React / TypeScript / Tailwind CSS / Splide / microCMS / Cloudflare Pages / Cloudflare Pages Functions（Basic 認証） / ESLint / Prettier

## 主な機能

- microCMS から取得したお知らせ・メディアの一覧と詳細（カテゴリー別の一覧・ページ送りつき）
- 固定ページを microCMS の内容から生成
- トップのスライダー・メニューのモーダル・ローディング画面
- 予約フォームと完了ページ
- 静的書き出し（`output: "export"`）のため、存在しない URL は `out/404.html` を表示

## フォルダ構成

| フォルダ | 役割 |
| --- | --- |
| `src/app` | ページ・ルーティング |
| `src/components` | 画面の部品（`layout/` と `ui/`） |
| `src/features` | まとまった機能（ローディング画面） |
| `src/services` | microCMS との通信 |
| `src/lib` | データの加工（HTML の無害化など） |
| `src/constants` `src/config` `src/types` `src/utils` | 定数・設定・型・汎用関数 |
| `functions` | Cloudflare Pages Functions（Basic 認証） |

## 動かすには

このリポジトリは、制作の内容を見ていただくための公開用です。**microCMS のデータと API キーは含まれていないため、そのままでは動きません。**

```bash
cp .env.example .env   # 各キーの値は含まれていません
npm install
npm run dev
```

必要な環境変数の名前は `.env.example` にあります。
