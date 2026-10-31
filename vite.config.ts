import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import tsPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// Sandbox preview runs plain HTTP behind the platform proxy, so the local
// certificate plugin is skipped there. Shared/production behaviour is unchanged.
const isPreview = process.env.BASE44_PREVIEW_MODE === "1";

export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  plugins: [
    react(),
    ...(isPreview ? [] : [mkcert({ source: "coding" })]),
    tsPaths(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        // Vite 8 bundles with Rolldown: split the React runtime into its own chunk.
        advancedChunks: {
          groups: [{ name: "react-vendor", test: /node_modules[\\/](react|react-dom|react-router)/ }],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
