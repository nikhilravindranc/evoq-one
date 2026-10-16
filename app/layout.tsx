import type { Metadata } from "next";
import { Figtree, DM_Sans } from "next/font/google";
import "./globals.css";
import "./sections.css";
import { RegionProvider } from "@/components/shared/RegionContext";
import { PAGES, SITE, SiteJsonLd } from "@/lib/seo";

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
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: { default: PAGES["/"].title, template: "%s" },
  description: PAGES["/"].description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: PAGES["/"].title,
    description: PAGES["/"].description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
  },
  twitter: { card: "summary_large_image", title: PAGES["/"].title, description: PAGES["/"].description, images: [SITE.ogImage] },
  robots: { index: true, follow: true },
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
      suppressHydrationWarning /* the Billing pages add a "js" class to <html> before hydration */
    >
      <body className="min-h-full bg-white font-[var(--font-sans)]">
        <SiteJsonLd />
        <RegionProvider>{children}</RegionProvider>
      </body>
    </html>
  );
}
