import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'hqnfoi',
  video: false,
  viewportWidth: 1200,
  viewportHeight: 1020,
  fixturesFolder: 'test/cypress/fixtures',
  screenshotsFolder: 'test/cypress/screenshots',
  videosFolder: 'test/cypress/videos',
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 90000,
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
    supportFile: 'test/cypress/support/index.ts',
    specPattern: 'test/cypress/e2e/**/*.cy.ts',
    excludeSpecPattern: process.env.CI ? ['**/node_modules/**', '**/000-*.cy.ts'] : ['**/node_modules/**'],
    testIsolation: false,
  },
});
