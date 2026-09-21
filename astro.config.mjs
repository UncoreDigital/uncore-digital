// @ts-check
import { defineConfig } from 'astro/config';
import analytics from '@vercel/analytics/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [analytics()],
});
