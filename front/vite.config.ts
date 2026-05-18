/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
// import { visualizer } from 'rollup-plugin-visualizer'; // розкоментувати для аналізу бандлу

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    // visualizer({ open: true, gzipSize: true, filename: 'dist/stats.html' }),
  ],
  resolve: {
    alias: [{
      find: '@',
      replacement: '/src'
    }]
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router'],
          'vendor-redux':    ['@reduxjs/toolkit', 'react-redux'],
          'vendor-motion':   ['framer-motion'],
          'vendor-leaflet':  ['leaflet', 'react-leaflet'],
          'vendor-socket':   ['socket.io-client'],
          'chunk-datepicker': ['react-datepicker'],
          'chunk-swiper':    ['swiper'],
          'chunk-select':    ['react-select'],
          'vendor-toast':    ['react-toastify'],
        }
      }
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});