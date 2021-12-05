 module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true
    },
    extends: [
        '@ecomfe/eslint-config',
        '@ecomfe/eslint-config/vue'
    ],
    globals: {
        // yog: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'warn',
        'no-debugger': 'error',
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'comma-dangle': ['error', 'never'],
        'quote-props': ['error', 'consistent-as-needed'],
        'max-len': ['off'],
        'vue/html-self-closing': ['error', { // 自闭合标签
            html: {
                void: 'always',
                normal: 'never',
                component: 'never'
            },
            svg: 'always',
            math: 'always'
        }],
        'vue/html-closing-bracket-newline': ['error', {
            singleline: 'never',
            multiline: 'never'
        }],
        'indent': ['error', 4, {
            SwitchCase: 1
        }],
        'vue/script-indent': ['error', 4, {
            baseIndent: 0,
            switchCase: 1,
            ignores: []
        }],
        'vue/require-direct-export': ['off']
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        },
        {
            files: 'server/*',
            env: {
                node: true,
                es6: true
            }
        }
    ]
};
