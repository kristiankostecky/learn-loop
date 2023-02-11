module.exports = {
  '*.{js,jsx,ts,tsx}': [
    // we need to use function to avoid passing
    // staged files as arguments to tsc command,
    // otherwise it will fail.
    () => 'tsc -p tsconfig.json --noEmit',
    'eslint --ignore-path .gitignore --fix',
  ],
}
