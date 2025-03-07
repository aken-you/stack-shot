import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import logoImg from "./icon.svg";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import GithubLogo from "../public/stack/GitHub.svg";
import { Analytics } from "@vercel/analytics/react";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "stack-shot",
  description: "create a image of your tech stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
      </head>
      <body className={`${notoSans.className} min-h-screen antialiased`}>
        <header className="bg-background/90 sticky top-0 z-50 flex w-full items-center justify-center border-b px-4 backdrop-blur">
          <div className="container flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src={logoImg}
                alt="stack-shot-logo"
                width="36"
                height="36"
              />
              <span className="text-base font-extrabold text-gray-700">
                stack-shot
              </span>
            </Link>
          </div>

          <Link href="https://github.com/aken-you/stack-shot" className="h-fit">
            <Image src={GithubLogo} alt="github-link" width="32" height="32" />
          </Link>
        </header>

        <main>{children}</main>
      </body>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      )}
      <Analytics />
    </html>
  );
}
