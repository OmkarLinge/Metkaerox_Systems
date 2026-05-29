import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://metkaeroxsystems.com"),
  title: "Metkaerox Systems | Service You Will Love",
  description:
    "Metkaerox Systems - Advanced UAV solutions for surveillance, agriculture, firefighting, payload delivery, and more. India's premier drone technology company.",
  keywords:
    "drone, UAV, surveillance drone, agriculture drone, firefighting drone, SLAM, swarm drones, India",
  openGraph: {
    title: "Metkaerox Systems | Service You Will Love",
    description:
      "Advanced drone technology solutions for defense, agriculture, surveillance and industrial applications.",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      {
        url: "/apple-touch-icon-precomposed.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7cf59a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head />
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
