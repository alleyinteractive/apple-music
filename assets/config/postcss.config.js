/**
 * PostCSS exports
 */
const stylelint = require('stylelint');
const stylelintConfig = require('./stylelint.config.js');
const postcssCssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssFocus = require('postcss-focus');
const postcssNested = require('postcss-nested');
const postcssDiscardComments = require('postcss-discard-comments');
const postcssReporter = require('postcss-reporter');
const postcssUnits = require('postcss-units');

module.exports = () => ({
  map: 'inline',
  plugins: [
    stylelint(stylelintConfig),
    postcssImport,
    postcssCssNext(),
    postcssNested(),
    postcssFocus(),
    postcssDiscardComments(),
    postcssUnits(),
    postcssReporter(),
  ],
});
