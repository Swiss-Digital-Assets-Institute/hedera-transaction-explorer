import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"]});

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
      <body className={`${roboto.className} text-greyCool-700`}>
        <div className="flex flex-col min-h-screen">
          <Toaster/>
          <Header />
          <main className="flex-grow bg-greyCool-200">{children}</main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
