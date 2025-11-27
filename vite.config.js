import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "petsdigital",
    port: 80,
    strictPort: true
  }
});
