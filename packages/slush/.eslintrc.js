/**
 * @type {import('eslint').Linter.Config}
 */
const eslintConfig = {
    extends: ['../../.eslintrc.js'],
    rules: {
        'prettier/prettier': 'error',
        'import/no-absolute-path': 'error',
    },
}

// eslint-disable-next-line no-undef
module.exports = eslintConfig
