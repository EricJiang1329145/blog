import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config = {
  testEnvironment: 'node',
  roots: ['<rootDir>/lib'],
  modulePathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/.open-next/',
    '<rootDir>/blog-publisher/',
    '<rootDir>/scripts/dist/',
  ],
  moduleNameMapper: {
    '^marked$': '<rootDir>/node_modules/marked/lib/marked.umd.js',
  },
};

export default createJestConfig(config);
