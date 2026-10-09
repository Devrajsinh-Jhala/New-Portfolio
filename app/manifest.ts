import type { MetadataRoute } from "next"

import { siteDescription } from "@/lib/site-metadata"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Devrajsinh Jhala",
    short_name: "Devraj",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3f9",
    theme_color: "#0c0a12",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
