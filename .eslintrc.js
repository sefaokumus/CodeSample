module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'react-native', '@typescript-eslint', 'import', 'align-assignments', 'align-import', 'promise'],
  rules: {

    'align-assignments/align-assignments': [2, { requiresOnly: false }],
    'align-import/align-import': 'error',
    'no-multi-spaces': 'off', // ['error', { exceptions: { ImportDeclaration: true, VariableDeclarator: true, BinaryExpression: true, } }],
    'multiline-ternary': 'off',
    'react/prop-types': 'warn',
    camelcase: 'off',
    indent: ['error', 2],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc'
        },
        groups: ['external', 'builtin', 'parent', ['sibling', 'index']],
        'newlines-between': 'always-and-inside-groups',
        pathGroups: [
          {
            group: 'external',
            pattern: 'react',
            position: 'before'
          },
          {
            group: 'parent',
            pattern: '@expo/**',
            position: 'before'
          },
          {
            group: 'parent',
            pattern: 'expo/**',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin']
      }
    ]
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off'
      }
    }
  ]
}
