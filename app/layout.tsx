import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURÉLIA — Modern Couture, Quietly Bold",
  description:
    "AURÉLIA is a luxury atelier crafting limited-edition garments from regenerative fabrics. Discover the collection.",
  keywords: [
    "luxury fashion",
    "couture",
    "sustainable clothing",
    "designer atelier",
    "limited edition",
  ],
  openGraph: {
    title: "AURÉLIA — Modern Couture, Quietly Bold",
    description:
      "Limited-edition garments, handcrafted from regenerative fabrics in our Paris atelier.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <div className="grain-overlay" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
      </body>
    </html>
  );
}