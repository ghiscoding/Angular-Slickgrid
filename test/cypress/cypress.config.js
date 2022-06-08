const { defineConfig } = require('cypress')

module.exports = defineConfig({
  baseExampleUrl: 'http://localhost:4300/#',
  video: false,
  viewportWidth: 1200,
  viewportHeight: 950,
  fixturesFolder: 'fixtures',
  projectId: 'hqnfoi',
  screenshotsFolder: 'screenshots',
  videosFolder: 'videos',
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:4300',
    specPattern: 'integration/**/*.{js,jsx,ts,tsx}',
    supportFile: 'support/index.js',
  },
})
