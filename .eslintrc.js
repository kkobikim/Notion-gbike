module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/prop-types': 'off',
    'space-before-function-paren': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'quotes': 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    // 모든 규칙을 비활성화하려면 아래 라인을 사용하세요.
    'off'
  },
  globals: {
    React: true
  }
}
