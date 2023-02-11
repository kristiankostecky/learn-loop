/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@sudolabs-io/eslint-config-sudolabs/typescript-react',
    '@sudolabs-io/eslint-config-sudolabs/with/prettier',
  ],
}
