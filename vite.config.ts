import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ["@maptiler/leaflet-maptilersdk"],
  },
});
