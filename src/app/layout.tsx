import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}