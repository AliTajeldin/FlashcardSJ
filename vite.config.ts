import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import dsv from '@rollup/plugin-dsv';
import path from 'path';

export default defineConfig({
  plugins: [solidPlugin(), dsv()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
