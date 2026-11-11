module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/tests/unit/**/*.test.js',
    '**/tests/unit/**/*.spec.js'
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'js/**/*.js',
    '!js/**/*.test.js',
    '!js/**/*.spec.js'
  ],
  coverageThreshold: {
    global: {
      branches: 59,
      functions: 50,
      lines: 56,
      statements: 56
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  verbose: true
};
