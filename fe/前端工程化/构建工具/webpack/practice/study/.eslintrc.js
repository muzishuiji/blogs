module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint',
    rules: {
        'react/prefer-stateless-function': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-indent': 0,
        indent: ['error', 4],
        'linebreak-style': ['error', 'windows'],
        'no-undef': 0,
        'no-console': 0,
    },
    globals: {
        document: false,
    },
};
