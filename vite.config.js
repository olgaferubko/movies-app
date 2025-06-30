import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    host: true,
    port: parseInt(process.env.FRONTEND_PORT || "3000"),
  }
});