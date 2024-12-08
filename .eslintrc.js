module.exports = {
    root: true,
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-native/all'
    ],
    plugins: ['react', 'react-native'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
    rules: {
      'react-native/no-unused-styles': 2,
      'react-native/split-platform-components': 2,
      'react-native/no-inline-styles': 2
    }
  };