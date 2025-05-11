import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'sonner';

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background">
            <div className="max-w-[1440px] mx-auto">
              {children}
              <Toaster />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
