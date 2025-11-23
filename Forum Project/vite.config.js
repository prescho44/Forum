import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import jsconfigPath from "vite-jsconfig-paths";
import js from "@eslint/js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPath()],
  base: process.env.BASE_PATH || "/",
});
