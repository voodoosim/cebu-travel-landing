import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LocalBusinessSchema, TourProductsSchema } from "./components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://세부.com'),

  title: {
    default: "세부가이드 | 골프, 리조트, 관광 통합 가이드 | 세부 여행 토탈 솔루션",
    template: "%s | 세부가이드"
  },

  description: "세부 현지 한국인 운영 통합 가이드. 골프장 6곳 예약, 리조트 예약, 아일랜드호핑, 고래상어투어, 공항 픽업, 전용 차량, 한국어 통역. 세부 여행 원스톱 솔루션.",

  keywords: [
    "세부 여행", "세부 가이드", "세부 골프", "세부 골프 투어", "세부 골프장",
    "세부 리조트", "세부 호텔", "세부 관광", "세부 액티비티",
    "세부 아일랜드호핑", "세부 고래상어", "세부 카와산폭포", "세부 다이빙",
    "알타비스타 골프", "막탄 골프", "세부 공항 픽업", "세부 한국어 가이드",
    "Cebu guide", "Cebu golf", "Cebu travel", "Cebu tour package"
  ],

  authors: [{ name: "세부가이드" }],
  creator: "세부가이드",
  publisher: "세부가이드",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: "세부가이드 | 골프, 리조트, 관광 통합 가이드",
    description: "세부 현지 한국인 운영. 골프, 리조트, 관광, 교통까지 세부 여행 토탈 솔루션.",
    type: "website",
    locale: "ko_KR",
    siteName: "세부가이드",
    url: "https://세부.com",
    images: [
      {
        url: '/images/hero-golf.webp',
        width: 1536,
        height: 864,
        alt: "세부 여행 가이드 - 골프, 리조트, 관광",
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: "세부가이드 | 골프, 리조트, 관광 통합 가이드",
    description: "세부 현지 한국인 운영. 골프, 리조트, 관광, 교통까지 세부 여행 토탈 솔루션.",
    images: ['/images/hero-golf.webp'],
  },

  alternates: {
    canonical: 'https://세부.com',
  },

  category: 'travel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <LocalBusinessSchema />
        <TourProductsSchema />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-[family-name:var(--font-inter)]`}
      >
        {children}
      </body>
    </html>
  );
}
