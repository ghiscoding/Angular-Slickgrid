
require('jest-preset-angular/ngcc-jest-processor');

/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  rootDir: '../',
  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true,
      diagnostics: false,
      isolatedModules: true,
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/InlineHtmlStripStylesTransformer'
      ]
    },
  },
  globalSetup: '<rootDir>/test/jest-global-setup.js',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/app/modules/**/*.{js,ts}',
    '!**/node_modules/**',
    '!src/app/modules/angular-slickgrid/models/**',
  ],
  coverageDirectory: './test/jest-coverage/',
  coveragePathIgnorePatterns: [
    'example-data.js',
    'global-grid-options.ts',
    'jest-global-mocks.ts',
    'jest-pretest.ts',
    'polyfills.ts',
    'public_api.ts',
    'setup-jest.ts',
    'slickgrid-config.ts',
    '\\.d\\.ts$',
    '<rootDir>/node_modules/'
  ],
  moduleDirectories: [
    'node_modules',
    'src/app',
  ],
  moduleFileExtensions: [
    'ts',
    'json',
    'js'
  ],
  moduleNameMapper: {
    'app/(.*)': '<rootDir>/src/app/$1',
    '@common/(.*)': '<rootDir>/src/app/common/$1',
  },
  modulePathIgnorePatterns: [
    'dist',
    'node_modules'
  ],
  preset: 'jest-preset-angular',
  setupFiles: ['<rootDir>/test/jest-pretest.ts'],
  setupFilesAfterEnv: ['jest-extended', '<rootDir>/test/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|html)$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx)',
    '<rootDir>/node_modules/angular-slickgrid/',
    '<rootDir>/node_modules/slickgrid/'
  ],
  // testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/+(*.)+(spec|test).+(ts|js)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/test/cypress/',
    '<rootDir>/node_modules/',
  ]
};
