module.exports = {
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': ['error', { ignore: ['children'] }],
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'ignore' }],
    },
}
