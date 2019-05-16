module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-cssnext'),
    require('postcss-calc'),
    require('postcss-discard-comments'),
    require('postcss-reporter'),
    require('autoprefixer'),
  ],
}