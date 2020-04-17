module.exports = {
  root: true,
  extends: 'eslint:recommended',
  plugins: ['prettier'],
  rules: {
    'max-len': 'off',
    strict: 'error',
    'prettier/prettier': 'error',
  },
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
}
