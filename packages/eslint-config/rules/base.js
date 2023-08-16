module.exports = {
    rules: {
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'type'],
                pathGroups: [
                    {
                        pattern: '@klaytn/*',
                        group: 'internal',
                        position: 'before',
                    },
                    {
                        pattern: '@klaytn/*',
                        group: 'internal',
                        position: 'before',
                    },
                    {
                        pattern: './*.module.css',
                        group: 'index',
                        position: 'after',
                    },
                ],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                'newlines-between': 'always',
                pathGroupsExcludedImportTypes: [],
            },
        ],
        'import/first': 'error',
        'import/no-relative-packages': 'error',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
    },
}
