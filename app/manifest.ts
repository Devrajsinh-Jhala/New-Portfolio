import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Devrajsinh Jhala — Portfolio",
    short_name: "Devrajsinh",
    description:
      "Senior Software Engineer, open-source developer, and applied-ML researcher.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111111",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
