import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Chronos from "@/components/Chronos";
import { profile, SITE_URL } from "@/lib/profile";

const { person } = profile;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${person.shortName} — ${person.title}`, template: `%s — ${person.shortName}` },
  description: person.thesis,
  authors: [{ name: person.name }],
  keywords: ["AI Orchestrator", "Technical Product Lead", "Model Context Protocol", "MCP", "AI enablement", "Copilot ROI", "Engineering Manager", "Human-in-the-loop"],
  alternates: { canonical: "/v4/" },
  openGraph: { type: "profile", siteName: person.shortName, title: `${person.shortName} — ${person.title}`, description: person.headline, url: "/v4/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0d0c0a", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-signal focus:px-3 focus:py-2 focus:text-bg">
          Skip to content
        </a>
        <TopBar />
        {children}
        <Chronos />
      </body>
    </html>
  );
}
