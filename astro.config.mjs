import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import sentry from "@sentry/astro";
import { fileURLToPath } from "node:url";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    react(),
    sentry({
      enabled: Boolean(process.env.PUBLIC_SENTRY_DSN),
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL(".", import.meta.url)),
      },
    },
  },
});
