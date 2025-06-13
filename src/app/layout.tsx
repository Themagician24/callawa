import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CALLAWA",
  description: "Geres tous tes rendez-vous en un seul endroit",
  openGraph: {
    title: "CALLAWA",
    description: "Geres tous tes rendez-vous en un seul endroit",
    url: "https://callawa.com",
    siteName: "CALLAWA",
    images: [
      {
        url: "https://callawa.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CALLAWA - Geres tous tes rendez-vous en un seul endroit",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
