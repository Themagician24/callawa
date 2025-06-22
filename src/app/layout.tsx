// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

// Chargement des polices avec les variables CSS
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CALLAWA",
    template: "%s | CALLAWA",
  },
  description: "Gère tous tes rendez-vous en un seul endroit.",
  metadataBase: new URL("https://callawa.com"),
  openGraph: {
    title: "CALLAWA",
    description: "Gère tous tes rendez-vous en un seul endroit.",
    url: "https://callawa.com",
    siteName: "CALLAWA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CALLAWA - Gère tous tes rendez-vous en un seul endroit",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CALLAWA",
    description: "Gère tous tes rendez-vous en un seul endroit.",
    images: ["/og-image.png"],
    creator: "@callawa_app",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="fr" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Toaster />
        {children}
      </body>
    </html>
    </TRPCReactProvider>
    
  );
}
