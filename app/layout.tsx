import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import logoImg from "./icon.svg";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dev-stack-view",
  description: "create a image of your dev stack",
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
      <body className={`${notoSans.variable} min-h-screen antialiased`}>
        <header className="bg-background/90 sticky top-0 z-50 flex w-full justify-center border-b px-4 backdrop-blur">
          <div className="container flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src={logoImg}
                alt="dev-stack-view-logo"
                width="36"
                height="36"
              />
              <span className="text-base font-extrabold text-gray-700">
                dev-stack-view
              </span>
            </Link>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
