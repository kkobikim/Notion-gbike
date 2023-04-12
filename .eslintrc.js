module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'standard',
    'plugin:@typescript-eslint/recommended' // 추가
  ],
  parser: '@typescript-eslint/parser', // 추가
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint' // 추가
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/prop-types': 'off',
    'space-before-function-paren': 0,
    'react-hooks/rules-of-hooks': 'error',
    'quotes': 'off',
    'semi': 'off',
    'comma-dangle': 'off'
  },
  globals: {
    React: true
  }
}
