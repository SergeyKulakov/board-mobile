/* eslint-disable max-len */
module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/Constants/',
    '/src/Config',
    '/src/Assets/',
  ],
  setupFiles: ['<rootDir>/jest/setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-native-navigation)/',
  ],
  moduleFileExtensions: ['js', 'json'],
}
