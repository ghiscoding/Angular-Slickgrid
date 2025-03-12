/// <reference types="vitest" />

import angular from '@analogjs/vite-plugin-angular';
import { configDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [angular()],
    test: {
      environment: 'jsdom',
      include: ['**/*.spec.ts'],
      reporters: ['default'],
      globals: true,
      pool: 'threads',
      fakeTimers: {
        toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'queueMicrotask'],
      },
      // globalSetup: 'test/vitest-global-setup.ts',
      setupFiles: ['./test/test-setup.ts', 'test/vitest-pretest.ts', 'test/vitest-global-mocks.ts'],
      coverage: {
        include: ['src/app/modules/angular-slickgrid/**/*.ts'],
        exclude: [
          ...configDefaults.exclude,
          '**/__tests__/**',
          '**/interfaces/**',
          '**/models/**',
          '**/*.d.ts',
          '**/slickgrid-config.ts',
          '**/global-grid-options.ts',
          '**/*.interface.ts',
          '**/interfaces.ts',
          '**/index.ts',
          '**/*.spec.ts',
        ],
      },
      provider: 'v8',
      reportOnFailure: true,
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
