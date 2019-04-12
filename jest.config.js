module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: './src/tsconfig.spec.json',
    },
    __TRANSFORM_HTML__: true,
  },
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/assets/**',
    '!**/node_modules/**',
    '!**/test/**'
  ],
  coveragePathIgnorePatterns: [
    '!*.d.ts',
    '!*.enum.ts',
    '!*.interface.ts',
    'constants.ts',
    'environment.ts',
    'example-data.js',
    'globals.ts',
    'index.ts',
    'jest-global-mocks.ts',
    'main.ts',
    'polyfills.ts',
    'public_api.ts',
    'setup-jest.ts',
    'test-env.ts',
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
  setupFiles: ['<rootDir>/test-env.ts'],
  setupTestFrameworkScriptFile: '<rootDir>/setup-jest.ts',
  transform: {
    '^.+\\.(ts|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx)',
    '<rootDir>/node_modules/angular-slickgrid/',
    '<rootDir>/node_modules/slickgrid/'
  ],
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/+(*.)+(spec|test).+(ts|js)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/cypress/',
    '<rootDir>/node_modules/',
  ],
  testResultsProcessor: 'jest-sonar-reporter'
};
