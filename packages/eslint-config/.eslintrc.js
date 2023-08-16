/**
 * @type {import('eslint').Linter.Config}
 */
const eslintConfig = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
        ...['./rules'].map((e) => require.resolve(e)),
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'import-alias'],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                project: ['tsconfig.json', 'apps/*/tsconfig.json', 'packages/*/tsconfig.json'],
            },
        },
    },
    rules: {},
}

module.exports = eslintConfig
