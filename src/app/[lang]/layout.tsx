import type { Metadata, Viewport } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "../globals.css";
import { Locale } from "../dictionaries";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  weight: "400",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "David Hobby - Mô hình & Đồ chơi cao cấp",
  description: "Khám phá bộ sưu tập mô hình và đồ chơi sở thích đa dạng tại David Hobby.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "David Hobby - Mô hình & Đồ chơi cao cấp",
    description: "Khám phá bộ sưu tập mô hình và đồ chơi sở thích đa dạng tại David Hobby.",
    url: "https://davidhobby.com",
    siteName: "David Hobby",
    images: [
      {
        url: "/images/banner-temp.png", // Ảnh sẽ hiện ra khi bạn gửi link
        width: 1200,
        height: 630,
        alt: "David Hobby Banner",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "vi" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const lang = (await params).lang as Locale;
  return (
    <html lang={lang} className={`${inter.variable} ${archivoBlack.variable}`}>
      <body>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
