module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/scripts/jest/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
}
