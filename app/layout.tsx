import type { Metadata } from "next";
import { Figtree, DM_Sans } from "next/font/google";
import "./globals.css";
import "./sections.css";
import { RegionProvider } from "@/components/shared/RegionContext";

const figtree = Figtree({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EVOQ — Every team. Every workflow. Finally connected.",
  description:
    "EVOQ is a unified business software ecosystem designed to connect sales, service, operations, support, and industry-specific workflows into one structured platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-[var(--font-sans)]">
        <RegionProvider>{children}</RegionProvider>
      </body>
    </html>
  );
}
