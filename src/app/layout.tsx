import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocalBusinessSchema, TourProductsSchema } from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cebutravel.com'),

  title: {
    default: "Cebu Travel - Discover the Paradise | Island Hopping & Tours",
    template: "%s | Cebu Travel"
  },

  description: "Experience the best of Cebu with our premium island hopping tours, diving adventures, and city excursions. Book your dream vacation in the Philippines today.",

  keywords: [
    "Cebu", "Travel", "Philippines", "Island Hopping", "Diving",
    "Moalboal", "Oslob", "Kawasan Falls", "Whale Sharks", "Canyoneering",
    "Beach Tours", "Cebu Tours", "Mactan Island"
  ],

  authors: [{ name: "Cebu Travel" }],
  creator: "Cebu Travel",
  publisher: "Cebu Travel",

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
    title: "Cebu Travel - Discover the Paradise",
    description: "Experience the best of Cebu with our premium island hopping tours, diving adventures, and city excursions.",
    type: "website",
    locale: "en_US",
    siteName: "Cebu Travel",
    url: "https://cebutravel.com",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Cebu Travel - Paradise Islands",
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: "Cebu Travel - Discover the Paradise",
    description: "Experience the best of Cebu with our premium tours",
    images: ['/twitter-image.jpg'],
  },

  alternates: {
    canonical: 'https://cebutravel.com',
  },

  category: 'travel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <LocalBusinessSchema />
        <TourProductsSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
