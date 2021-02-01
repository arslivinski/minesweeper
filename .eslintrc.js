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
    'arrow-body-style': [OFF],
    'import/no-unassigned-import': [ERROR, { allow: ['**/*.css'] }],
    'import/no-unused-modules': OFF, // Don't work very well
    'react/jsx-uses-react': OFF,
    'react/prop-types': OFF,
    'react/react-in-jsx-scope': OFF,
  },
};
