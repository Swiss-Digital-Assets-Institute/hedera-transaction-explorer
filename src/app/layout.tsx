import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// TODO change font to match THA internal standards
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hedera Transaction Explorer",
  description:
    "This a web application that scans transactions made by accounts in a specific node of the Hedera network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-700`}>
        <div className="flex flex-col min-h-screen">
          <Toaster/>
          <Header />
          <main className="flex-grow bg-slate-200">{children}</main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
