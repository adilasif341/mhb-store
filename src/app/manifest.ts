import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MHB Natural",
    short_name: "MHB",
    description: "MHB Natural skincare and hair care store in Pakistan.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbf7",
    theme_color: "#0d4b3e",
  };
}
