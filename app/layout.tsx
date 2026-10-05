import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["300", "400"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "600"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Fenil Shah — Creator / Filmmaker / Builder",
  description: "Mumbai, India — Creator · Filmmaker · BTech CS (AIML) · Builder. Content Creator, 44M+ Views, Visual Storyteller, NASA HERC Awardee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${ibmPlexMono.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}

