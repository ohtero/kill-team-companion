/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@services': '/src/services',
      '@classExtensions': '/src/classExtensions'
    }
  },
  test: {
    globals: true,
    environment: 'node'
  }
});
