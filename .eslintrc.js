/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription: eslint 代码检测配置
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 15:25:59
 * @LastEditTime: 2020-05-03 17:34:30
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    quotes: [1, 'single'],
    semi: [2, 'never'],
    indent: [2, 2]
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
