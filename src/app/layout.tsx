import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import PerformanceMonitor from "@/components/performance-monitor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0066FF",
};

export const metadata: Metadata = {
  title: "Engineering Digital Excellence",
  description:
    "A leading software development company delivering custom software solutions, cloud infrastructure, AI/ML platforms, and mobile applications. Trusted by 50+ companies worldwide with 200+ projects delivered and 99% client satisfaction.",
  keywords: [
    "software development company",
    "custom software development",
    "cloud solutions",
    "AWS",
    "Azure",
    "Google Cloud",
    "AI development",
    "machine learning",
    "mobile app development",
    "React",
    "Next.js",
    "Node.js",
    "UI/UX design",
    "DevOps",
    "agile development",
    "digital transformation",
  ],
  authors: [{ name: "Your Company", url: "https://example.com" }],
  creator: "Your Company",
  publisher: "Your Company",
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
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    siteName: "Your Company",
    title: "Engineering Digital Excellence",
    description:
      "We build world-class software solutions that transform businesses. Custom development, cloud, AI/ML, and mobile apps — trusted by 50+ companies worldwide.",
    images: [
      {
        url: "/images/hero-bg.png",
        width: 1920,
        height: 1080,
        alt: "Engineering Digital Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Digital Excellence",
    description:
      "We build world-class software solutions that transform businesses. Custom development, cloud, AI/ML, and mobile apps.",
    images: ["/images/hero-bg.png"],
  },
  alternates: {
    canonical: "https://example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="64x64" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
      </body>
    </html>
  );
}
