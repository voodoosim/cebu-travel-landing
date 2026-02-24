import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocalBusinessSchema, TourProductsSchema, FAQSchema } from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cebu.sasori.dev'),

  title: {
    default: "세부 골프 투어 | 6개 골프장 맞춤 패키지 | 알타비스타, 에어베이스, 세부CC, 릴로안, 퀸스아일랜드",
    template: "%s | 세부골프투어"
  },

  description: "세부 현지 한국인 운영 골프 투어 전문. 알타비스타, 에어베이스, 세부CC, 클럽필리피노, 릴로안, 퀸스 아일랜드 등 세부 전역 6개 골프장 맞춤 패키지. 공항 픽업, 전용 차량, 한국어 상담.",

  keywords: [
    "세부 골프", "세부 골프 투어", "세부 골프장", "세부 골프 패키지",
    "세부 골프 3박4일", "세부 골프 54홀", "알타비스타 골프", "에어베이스 골프",
    "세부 컨트리클럽", "클럽필리피노 세부", "릴로안 골프", "퀸스아일랜드 골프",
    "세부 골프 여행", "필리핀 세부 골프", "막탄 골프", "세부 골프 리조트",
    "Cebu golf tour", "Cebu golf package", "Cebu golf courses"
  ],

  authors: [{ name: "세부골프투어" }],
  creator: "세부골프투어",
  publisher: "세부골프투어",

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
    title: "세부 골프 투어 | 6개 골프장 맞춤 패키지",
    description: "세부 현지 한국인 운영 골프 투어. 알타비스타, 에어베이스, 세부CC, 릴로안, 퀸스 아일랜드 등 6개 골프장 맞춤 패키지.",
    type: "website",
    locale: "ko_KR",
    siteName: "세부골프투어",
    url: "https://cebu.sasori.dev",
    images: [
      {
        url: '/images/hero-golf.webp',
        width: 1536,
        height: 864,
        alt: "세부 골프장 전경",
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: "세부 골프 투어 | 6개 골프장 맞춤 패키지",
    description: "세부 현지 한국인 운영 골프 투어. 알타비스타, 에어베이스, 세부CC, 릴로안, 퀸스 아일랜드.",
    images: ['/images/hero-golf.webp'],
  },

  alternates: {
    canonical: 'https://cebu.sasori.dev',
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
        <FAQSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
