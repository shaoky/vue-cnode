module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // 'no-mixed-spaces-and-tabs': 0,
    'no-tabs': 0,
    "indent": ["error", "tab"],
    // allow async-await
    'generator-star-spacing': 0,
    'no-unused-vars': 0,  //引入包不用，报错
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
