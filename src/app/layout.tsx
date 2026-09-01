import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import LeftRail from "@/components/sections/LeftRail";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bali Kumar Wad — Web Developer & UI/UX Designer",
  description: "Personal portfolio of Bali Kumar Wad, a web developer & UI/UX designer crafting high-performance, editorial, and interactive digital experiences.",
  keywords: ["Web Developer", "UI/UX Designer", "Bali Kumar Wad", "Portfolio", "Next.js", "Framer Motion", "TypeScript", "Tailwind CSS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-neutral-50 font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LeftRail />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
