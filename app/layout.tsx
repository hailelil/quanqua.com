import type { Metadata } from "next";
import { Inter, Noto_Sans_Ethiopic } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StructuredData from "./components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Quanqua - Ethiopian Language Translator | Translate Ethiopian Languages",
    template: "%s | Quanqua - Ethiopian Language Translator"
  },
  description: "Translate between English, Amharic (አማርኛ), Tigrigna (ትግርኛ), and Afaan Oromo with beautiful Ge'ez script support. Free, accurate, and culturally respectful Ethiopian language translation tool with audio playback and translation history.",
  keywords: [
    "Ethiopian translator",
    "Amharic translator",
    "Tigrigna translator",
    "Afaan Oromo translator",
    "Ge'ez script",
    "Amharic to English",
    "English to Amharic",
    "Ethiopian languages",
    "free translation",
    "Amharic translation",
    "Tigrigna translation",
    "bilingual translator",
    "multilingual tool"
  ],
  authors: [{ name: "Quanqua Team" }],
  creator: "Quanqua",
  publisher: "Quanqua",
  metadataBase: new URL("https://quanqua.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Quanqua - Ethiopian Language Translator",
    description: "Translate Ethiopian languages with beautiful Ge'ez script support. Free, accurate translations for Amharic, Tigrigna, and Afaan Oromo.",
    url: "https://quanqua.com",
    siteName: "Quanqua",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quanqua - Ethiopian Language Translator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quanqua - Ethiopian Language Translator",
    description: "Translate Ethiopian languages with beautiful Ge'ez script support. Free and accurate.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoSansEthiopic.variable} antialiased`}
      >
        {/* AdSense Script - Loads early like GoDaddy header placement */}
        <Script
          id="adsbygoogle-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-3072038849045349",
                enable_page_level_ads: true
              });
            `,
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3072038849045349"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
