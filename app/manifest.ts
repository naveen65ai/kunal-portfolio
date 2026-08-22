import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kunal Kumar — Designer & 3D Artist",
    short_name: "Kunal Kumar",
    description:
      "Bold brands, useful interfaces, expressive 3D visuals. Work made to be remembered.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff2df",
    theme_color: "#fff2df",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
