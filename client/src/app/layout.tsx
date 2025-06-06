import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/Providers";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RankDevs",
  description: "Track, rank, and showcase your dev journey.",
  icons: {
    icon: "/RDLogo.svg", // must be in public/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {" "}
          {/* wrap everything inside Providers */}
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
