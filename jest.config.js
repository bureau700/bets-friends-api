module.exports = {
  // globalTeardown: './tests/teardown.ts',
  preset: 'ts-jest',
  globalSetup: './tests/setup.ts',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
  clearMocks: true,
};
