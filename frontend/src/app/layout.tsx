import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'sonner';
import AppContextProvider from "../context/AppContext";

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
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-[1440px] mx-auto bg-background">
              <AppContextProvider>
                {children}
                <Toaster />
              </AppContextProvider>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
