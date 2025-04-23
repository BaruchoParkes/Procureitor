module.exports = {
    testEnvironment: 'jsdom', // Required for React components
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/', // Transform axios but ignore other node_modules
    ],
  };