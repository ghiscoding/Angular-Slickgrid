
const cypress = require('cypress');
const fse = require('fs-extra');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

async function runTests() {
  await fse.remove('mochawesome-report') // remove the report folder
  const { totalFailed } = await cypress.run({
    browser: "chrome",
    reporter: "mochawesome",
    reporterOptions: {
      overwrite: false,
      html: false,
      json: true,
      quiet: true
    },
  }); // get the number of failed tests
  const jsonReport = await merge(); // generate JSON report
  await generator.create(jsonReport);
  process.exit(totalFailed); // exit with the number of failed tests
}

runTests();
