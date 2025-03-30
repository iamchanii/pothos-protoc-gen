import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['.direnv', 'node_modules', 'dist'],
  },
  resolve: {
    alias: {
      graphql: 'graphql/index.js',
    },
  },
});
