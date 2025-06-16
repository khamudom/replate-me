/**
 * Root layout component for the Replate Me application.
 * This file defines the base HTML structure and metadata for all pages.
 * It includes global styles and sets up the Inter font for consistent typography.
 */
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Replate Me",
  description: "A collection of delicious recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
