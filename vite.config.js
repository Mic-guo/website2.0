import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/",
  server: {
    port: 8000,
    historyApiFallback: true,
  },
  optimizeDeps: {
    include: ["three"],
    exclude: ["@splinetool/r3f-spline"],
  },
  assetsInclude: ["**/*.splinecode", "**/*.glb"],
});
