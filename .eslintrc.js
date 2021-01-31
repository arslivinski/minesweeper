'use strict';

const OFF = 'off';
const ERROR = 'error';

module.exports = {
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['@arslivinski', 'plugin:react/recommended'],
  rules: {
    'import/no-unused-modules': [
      ERROR,
      {
        missingExports: true,
        unusedExports: true,
        ignoreExports: ['./.*.js', './*.js', './src/main.jsx'],
      },
    ],
    'react/jsx-uses-react': OFF,
    'react/react-in-jsx-scope': OFF,
  },
};
