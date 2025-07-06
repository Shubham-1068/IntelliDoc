import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IntelliDoc",
  description: "An AI-powered tool for generating professional GitHub README files with a live markdown editor",
  openGraph: {
    title: "IntelliDoc",
    description: "Effortlessly create professional READMEs with AI and a live markdown editor",
    url: "https://your-domain.com",
    siteName: "IntelliDoc",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="fixed top-0 w-full z-50">
          <Navbar />
        </div>
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}