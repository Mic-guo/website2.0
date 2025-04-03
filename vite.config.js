import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/",
  server: {
    port: 8000,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["three"],
    exclude: ["@splinetool/r3f-spline"],
  },
  assetsInclude: ["**/*.splinecode", "**/*.glb", "**/*.jpeg"],
  publicDir: "public",
});
