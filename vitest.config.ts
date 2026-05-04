import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}', 'api/**/*.test.ts'],
    pool: 'threads',
    poolOptions: {
      threads: {
        maxThreads: process.env.CI ? 2 : undefined,
        minThreads: process.env.CI ? 1 : undefined,
      },
    },
    fileParallelism: process.env.CI ? false : undefined,
  },
});
