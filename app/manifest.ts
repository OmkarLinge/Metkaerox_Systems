import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Metkaerox Systems",
    short_name: "Metkaerox",
    description:
      "Advanced UAV platforms for surveillance, agriculture, firefighting, payload delivery, and industrial missions.",
    start_url: "/",
    display: "standalone",
    background_color: "#070b10",
    theme_color: "#7cf59a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
