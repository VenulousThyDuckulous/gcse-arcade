import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3006,
    strictPort: true,
    allowedHosts: ["pv-8007cf8642bf-d7fba033-b6a2-48f4-80cd-7486fa0f159e.style.dev"],
  },
});
