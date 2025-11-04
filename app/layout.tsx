import type React from "react";
import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-m-plus-rounded",
});

export const metadata: Metadata = {
  title: "デジクリ アドベントカレンダー 2025",
  description:
    "12月25日まで、1日1本の記事をみんなで投稿していくアドベントカレンダー",
  openGraph: {
    title: "デジクリ アドベントカレンダー 2025",
    description:
      "12月25日まで、1日1本の記事をみんなで投稿していくアドベントカレンダー",
    type: "website",
    locale: "ja_JP",
    siteName: "デジクリ アドベントカレンダー",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "デジクリ アドベントカレンダー 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "デジクリ アドベントカレンダー 2025",
    description:
      "12月25日まで、1日1本の記事をみんなで投稿していくアドベントカレンダー",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${mPlusRounded.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
