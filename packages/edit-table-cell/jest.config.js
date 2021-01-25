module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/scripts/jest/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
}
