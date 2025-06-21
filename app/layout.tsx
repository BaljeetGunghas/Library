import type { Metadata } from "next";
import "./globals.css";
import { Lato } from "next/font/google";
import ResponsiveNavbar from "@/Components/Navbar/ResponsiveNavBar";

const fonts = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Velvet Haven Library | Explore Books, Rent & Read",
  description:
    "Discover and rent top-rated books in categories like history, fiction, productivity, biography, and more. Powered by Next.js.",
  keywords: [
    "library",
    "online book rental",
    "read books",
    "rent books online",
    "Next.js library app",
    "Velvet Haven",
  ],
  authors: [{ name: "Velvet Haven Team" }],
  creator: "Velvet Haven",
  metadataBase: new URL("https://velvet-haven.netlify.app"),
  openGraph: {
    title: "Velvet Haven Library",
    description:
      "Browse our curated collection of books and rent them instantly!",
    url: "https://velvet-haven.netlify.app",
    siteName: "Velvet Haven Library",
    images: [
      {
        url: "https://velvet-haven.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Velvet Haven Book Library",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velvet Haven Library",
    description: "Explore and rent books across a variety of genres.",
    images: ["https://velvet-haven.netlify.app/og-image.jpg"],
    creator: "@VelvetHaven",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${fonts.className} antialiased bg-amber-300 custom-scrollbar scroll-smooth`}
      >
        <ResponsiveNavbar />
        <div
          className="main_bg"
          style={{ position: "relative", overflow: "hidden", zIndex: 10 }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
