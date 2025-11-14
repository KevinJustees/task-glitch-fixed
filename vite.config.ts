import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // no Node modules required
    },
  },
  build: {
    outDir: "dist",
  },
});
