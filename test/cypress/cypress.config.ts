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
    experimentalStrategy: 'detect-flake-and-pass-on-threshold',
    experimentalOptions: {
      maxRetries: 2,
      passesRequired: 1,
    },

    // you must also explicitly set openMode and runMode to
    // either true or false when using experimental retries
    openMode: false, // Cypress UI
    runMode: true, // run in CI
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