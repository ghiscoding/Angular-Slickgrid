module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: './src/tsconfig.spec.json',
    },
    __TRANSFORM_HTML__: true,
  },
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/+(*.)+(spec|test).+(ts|js)'],
  setupFiles: ['<rootDir>/test-env.ts'],
  setupTestFrameworkScriptFile: '<rootDir>/node_modules/@angular-builders/jest/src/jest-config/setup.js',
  transform: {
    '^.+\\.(ts|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  testPathIgnorePatterns: ['cypress/'],
  moduleDirectories: [
    "node_modules",
    "src/app",
  ],
  collectCoverage: true,
  moduleFileExtensions: [
    'ts',
    'json',
    'js'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  moduleNameMapper: {
    "app/(.*)": "<rootDir>/src/app/$1",
    "@common/(.*)": "<rootDir>/src/app/common/$1",
  }
};
