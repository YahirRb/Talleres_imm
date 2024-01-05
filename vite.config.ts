import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const qwikViteConfig = qwikVite({});

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite({
      devTools: {
        clickToSource: ['Alt'], // Press and hold the left or right Alt key
      },
    }), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    server: {
      host: true
    }
  };
});
