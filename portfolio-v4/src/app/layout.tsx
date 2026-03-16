import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VersionOrchestrator from "@/components/VersionOrchestrator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dave Smith - AI Orchestrator",
  description: "Architecting the systems and culture where AI and humans collaborate.",
  keywords: ["AI Orchestrator", "Technical Product Lead", "Model Context Protocol", "Next.js", "AI Engineer"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dave Smith",
  "jobTitle": "AI Orchestrator & Technical Product Lead",
  "url": "https://davesmith.design", /* Placeholder */
  "knowsAbout": ["Artificial Intelligence", "Model Context Protocol", "Agentic Workflows", "Next.js 15", "LangGraph"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <VersionOrchestrator />
      </body>
    </html>
  );
}
