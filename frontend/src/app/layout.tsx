import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Watch Shop",
  description: "Watch Shop - Nơi mua sắm đồng hồ uy tín",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <div className="min-h-screen bg-white">
          <div className="mx-auto max-w-[1440px]">
            <Header />
            <main className="px-4 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
