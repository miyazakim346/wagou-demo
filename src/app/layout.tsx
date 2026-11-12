import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { loadingScreenCookieScript } from "@/features/loadingScreen/cookieScript";
import type { Metadata } from "next";

// タイトル、ディスクリプション、OGPの設定のmetadataのmetadataBaseキーに設定しておくURL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
if (!SITE_URL) {
  throw new Error("NEXT_PUBLIC_SITE_URL が必要です");
}

const NotoSerifJp = Noto_Serif_JP({
  weight: ["400", "700", "500"],
  variable: "--font-geist-noto-serif-jp",

});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Wagou",
    default: "Wagou",
  },
  description: "",
  openGraph: {
    title: "Wagou",
    description: "",

    url: "/",
    siteName: "Wagou",
    images: [
      {
        url: "/ogp.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ja"
      className={`${NotoSerifJp.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* 常にローディング画面を隠しておく。表示すべき時だけscriptがクラスを付与する */}
        <style
          id="loading-screen-base-style"
          dangerouslySetInnerHTML={{
            __html: `#loading-screen{display:none}html.show-loading-screen #loading-screen{display:flex}`,
          }}
        />
        <script
          id="loading-screen-cookie"
          dangerouslySetInnerHTML={{ __html: loadingScreenCookieScript }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
