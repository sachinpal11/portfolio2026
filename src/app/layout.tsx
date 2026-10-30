import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { CursorFollower } from "@/components/layout/CursorFollower";
import { Navbar } from "@/components/layout/Navbar";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import { ProgressiveBlur } from "@/components/layout/ProgressiveBlur";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

/** Geometric grotesk used across the whole site. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sachin — Portfolio",
  description: "Portfolio of Sachin, web developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <SmoothScroll>
          <Navbar />
          <CursorFollower />
          {children}
          <NoiseOverlay />
          <ProgressiveBlur edge="top" />
          <ProgressiveBlur edge="bottom" />
        </SmoothScroll>
      </body>
    </html>
  );
}
