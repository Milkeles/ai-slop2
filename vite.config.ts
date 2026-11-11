import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const pages = ["index", "part1", "part2", "part3", "characters", "locations", "making-of"]

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, path.resolve(__dirname, `${p}.html`)])),
    },
  },
})
