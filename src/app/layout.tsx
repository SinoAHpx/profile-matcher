import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StatusBar from "@/components/status-bar";
import GlobalBottomBar from "@/components/global-bottom-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Egho",
  description: "一个使用本地存储和 cookie 的简单演示认证系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body
        className={`h-full ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StatusBar />
        <div className="h-full">{children}</div>
        <GlobalBottomBar />
      </body>
    </html>
  );
}
