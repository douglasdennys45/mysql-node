export default {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/main.ts',
      '!<rootDir>/src/**/contracts/**',
      '!<rootDir>/src/**/index.ts'
    ],
    moduleNameMapper: {
      '@/test/(.+)': '<rootDir>/test/$1',
      '@/(.+)': '<rootDir>/src/$1'
    },
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    preset: 'ts-jest',
    testMatch: ['**/*.spec.ts', '**/*.test.ts'],
    roots: [
      '<rootDir>/src',
      '<rootDir>/test'
    ],
    transform: {
      '\\.ts$': 'ts-jest'
    },
    setupFiles: ['dotenv/config']
  }