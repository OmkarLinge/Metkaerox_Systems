import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
};

import ClientLayout from "@/components/ClientLayout";

const bootScript = `
  (function () {
    try {
      var root = document.documentElement;
      var savedTheme = localStorage.getItem("theme");
      var theme = savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

      root.classList.remove("light", "dark");
      root.classList.add(theme);
    } catch (error) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="/models/drone_scout.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/inside_drone.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: bootScript,
          }}
        />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
