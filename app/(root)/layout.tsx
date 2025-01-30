import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Header from '@/components/shared/Header'
import Footer from "@/components/shared/Footer";
import Leftsidebar from "@/components/shared/Leftsidebar";
import Rightsidebar from "@/components/shared/Rightsidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThreadHub",
  description: "A social media app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <Header />
          <main className="flex flex-row">
            <Leftsidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <Rightsidebar />
          </main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
