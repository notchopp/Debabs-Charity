import type { Metadata, Viewport } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "DeBabs Charity - Making Generosity Effortless",
  description: "Connect with your community through meaningful donations. Find items you need, donate what you can spare, and make a difference together.",
  keywords: "charity, donations, community, items, pickup, local",
  authors: [{ name: "DeBabs Charity" }],
  openGraph: {
    title: "DeBabs Charity - Making Generosity Effortless",
    description: "Connect with your community through meaningful donations.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeBabs Charity - Making Generosity Effortless",
    description: "Connect with your community through meaningful donations.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen bg-gradient-to-br from-[#00A86B] via-[#6B3FA0] to-[#1A4CC7]">
          <Sidebar />
          <div className="flex-1 md:ml-64 min-h-screen transition-all duration-300" id="main-content">
            <Header />
            <main className="pt-16 md:pt-20">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
