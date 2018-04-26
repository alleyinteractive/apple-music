// Text lockup
import standardBlack from 'Images/standard-black.svg';
import standardWhite from 'Images/standard-white.svg';
import monoWhite from 'Images/mono-white.svg';
import monoBlack from 'Images/mono-black.svg';
// App Icon
import standard from 'Images/app-icon-standard.svg';
import white from 'Images/app-icon-white.svg';
import black from 'Images/app-icon-black.svg';

// Internationalization function.
const { __ } = window.wp.i18n;

/**
 * The list of the embed types to use for embedding Apple Music.
 *
 * @type {Array}
 */
const embedTypes = [
  {
    value: 'preview-player',
    label: __('Preview Player', 'apple-music'),
  },
  {
    value: 'badge',
    label: __('Badge', 'apple-music'),
  },
  {
    value: 'text-lockup',
    label: __('Text Lockup', 'apple-music'),
    styles: [
      {
        value: 'standard-black',
        label: __('Standard Black', 'apple-music'),
        imagePath: standardBlack,
      },
      {
        value: 'standard-white',
        label: __('Standard White', 'apple-music'),
        imagePath: standardWhite,
      },
      {
        value: 'mono-white',
        label: __('Mono White', 'apple-music'),
        imagePath: monoWhite,
      },
      {
        value: 'mono-black',
        label: __('Mono Black', 'apple-music'),
        imagePath: monoBlack,
      },
    ],
  },
  {
    value: 'app-icon',
    label: __('App Icon', 'apple-music'),
    styles: [
      {
        value: 'standard',
        label: __('Standard', 'apple-music'),
        imagePath: standard,
      },
      {
        value: 'FFFFFF',
        label: __('White', 'apple-music'),
        imagePath: white,
      },
      {
        value: '000000',
        label: __('Black', 'apple-music'),
        imagePath: black,
      },
    ],
  },
];

export default embedTypes;
