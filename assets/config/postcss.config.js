/**
 * PostCSS exports
 */
const stylelint = require('stylelint');
const stylelintConfig = require('./stylelint.config.js');
const postcssBrowserReporter = require('postcss-browser-reporter');
const postcssCssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssFocus = require('postcss-focus');
const postcssNested = require('postcss-nested');
const postcssDiscardComments = require('postcss-discard-comments');
const postcssReporter = require('postcss-reporter');

module.exports = () => ({
  map: 'inline',
  plugins: [
    stylelint(stylelintConfig),
    postcssImport,
    postcssCssNext(),
    postcssNested(),
    postcssFocus(),
    postcssDiscardComments(),
    postcssBrowserReporter(),
    postcssReporter(),
  ],
});
