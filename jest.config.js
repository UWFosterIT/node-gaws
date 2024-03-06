export default {
  roots: [
    '<rootDir>',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js|mts)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  testEnvironment: 'node',

  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(got|get-stream|p-cancelable|@szmarczak|lowercase-keys|@sindresorhus|cacheable-request|normalize-url|responselike|mimic-response|form-data-encoder|cacheable-lookup|tslog)/)',
  ],
  testPathIgnorePatterns: [
    'config.ts',
    'config-sample.ts',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
