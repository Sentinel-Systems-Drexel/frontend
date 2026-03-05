// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://dev.georgejosef.com",
  base: "/sentinel-systems/client/",
  vite: {
    plugins: [tailwindcss()]
  }
});