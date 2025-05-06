module.exports = {
  webpack: {
    configure: webpackConfig => {
      webpackConfig.ignoreWarnings = [{ module: /typescript/ }];

      return webpackConfig;
    }
  },
  jest: {
    '^providers/AuthProvider$': '<rootDir>/src/__mocks__/providers/AuthProvider.tsx',
    configure: {
      testEnvironment: 'jsdom',
      transformIgnorePatterns: 
        '/node_modules/axios/'
    },
  }
};