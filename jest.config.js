module.exports = {
  globalTeardown: './tests/teardown.ts',
  preset: 'ts-jest',
  setupFiles: ['./tests/setup.ts'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
  clearMocks: true,
};
