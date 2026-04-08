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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var savedTheme = localStorage.getItem("theme");
                  var root = document.documentElement;
                  if (savedTheme === "dark") {
                    root.classList.add("dark");
                    root.classList.remove("light");
                  } else {
                    root.classList.add("light");
                    root.classList.remove("dark");
                  }
                } catch (error) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
