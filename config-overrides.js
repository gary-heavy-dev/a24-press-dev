const reactAppRewirePostcss = require('react-app-rewire-postcss');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = config => reactAppRewirePostcss(config, {
  plugins: () => [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-cssnext'),
    require('postcss-calc'),
    require('postcss-discard-comments'),
    require('postcss-reporter'),
    require('autoprefixer'),
    postcssPresetEnv({
      stage: 0,
      features: {
        'nesting-rules': true
      }
    })
  ]
})