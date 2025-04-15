module.exports = {
  testEnvironment: 'node', // For backend Express/supertest
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest', // Use babel-jest, rely on .babelrc
  },
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx'],
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)', // Matches .test.js
    '**/tests/**/*.[tj]s?(x)', // Matches Backend/tests/
    '**/tests/**/*.cjs', // Support .cjs if needed
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library|supertest|express|sequelize|mysql2|jest-runtime)/)', // Transform CommonJS/ESM modules
    '/Backend/(?!tests)/', // Transform Backend CommonJS files
  ],
  setupFilesAfterEnv: [], // Remove jest.setup.mjs for now
};