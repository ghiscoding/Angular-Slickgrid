import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  viewportWidth: 1200,
  viewportHeight: 1020,
  fixturesFolder: 'fixtures',
  projectId: 'hqnfoi',
  screenshotsFolder: 'screenshots',
  videosFolder: 'videos',
  numTestsKeptInMemory: 5,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'http://localhost:4300/#',
    experimentalRunAllSpecs: true,
    specPattern: 'e2e/*.cy.ts',
    supportFile: 'support/index.ts',
    excludeSpecPattern: process.env.CI ? ['**/node_modules/**', '**/000-*.cy.{js,ts}'] : ['**/node_modules/**'],
    testIsolation: false,
  },
});