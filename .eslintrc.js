'use strict';

const ERROR = 'error';

module.exports = {
  env: {
    browser: true,
  },
  extends: ['@arslivinski'],
  rules: {
    'import/no-unused-modules': [
      ERROR,
      {
        missingExports: true,
        unusedExports: true,
        ignoreExports: ['./.*.js'],
      },
    ],
  },
};
