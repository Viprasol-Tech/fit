import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Content Engine | AI-Powered Content for Fitness Creators",
  description:
    "The ultimate AI-driven content engine for health & fitness creators. Generate viral content, track trends, and grow to 100K followers.",
  keywords: [
    "fitness content",
    "AI content generator",
    "social media",
    "Instagram",
    "TikTok",
    "fitness creator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-950`}
      >
        {children}
      </body>
    </html>
  );
}
