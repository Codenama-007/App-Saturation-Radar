import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saturation Radar — AI App Market Intelligence",
  description:
    "Analyze your app idea, discover similar products, measure market saturation, and find potential gaps before you build. Scan any website for tech stack, security configuration, and vibe-code signals.",
  keywords: ["market intelligence", "app analysis", "saturation score", "vibe code", "AI app builder"],
  openGraph: {
    title: "Saturation Radar — Know the market before you build",
    description:
      "Market intelligence for AI/vibe-coded app builders. Discover competitors, measure saturation, find gaps.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#08090B] text-[#F5F7FA]">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
