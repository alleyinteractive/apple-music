// Import internationalization function.
const { __ } = window.wp.i18n;
/**
 * The list of the embed types to use for embedding Apple Music.
 *
 * @type {Array}
 */
const embedTypes = [
  {
    value: 'preview-player', label: __('Preview Player', 'apple-music'),
  },
  {
    value: 'badge', label: __('Badge', 'apple-music'),
  },
  {
    value: 'text-lockup', label: __('Text Lockup', 'apple-music'),
  },
  {
    value: 'app-icon', label: __('App Icon', 'apple-music'),
  },
];

export default embedTypes;
