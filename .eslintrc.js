/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@sudolabs-io/eslint-config-sudolabs/typescript-react',
    '@sudolabs-io/eslint-config-sudolabs/with/prettier',
    'plugin:typescript-sort-keys/recommended',
  ],
  plugins: [
    'sort-keys-fix',
    'typescript-sort-keys',
    'eslint-plugin-sort-destructure-keys',
  ],
  rules: {
    '@typescript-eslint/no-throw-literal': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['tailwind.config.js'],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        controlComponents: ['Input'],
        depth: 3,
        labelAttributes: ['label'],
        labelComponents: ['Label'],
      },
    ],
    'react/button-has-type': 'off',
    'react/jsx-sort-props': 'error',
    'simple-import-sort/imports': 'off',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
  },
}
