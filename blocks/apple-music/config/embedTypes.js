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
    height: '45px',
    width: '157px',
    backgroundImage: 'url(https://tools.applemusic.com/assets/shared/badges/en-us/music-lrg.svg)',
  },
  {
    value: 'text-lockup',
    label: __('Text Lockup', 'apple-music'),
    height: '30px',
    width: '140px',
    styles: [
      {
        value: 'standard-black',
        label: __('Standard Black', 'apple-music'),
        imagePath: standardBlack,
        backgroundImage: 'url(https://tools.applemusic.com/assets/shared/text-lockups/en-us/standard-black.svg)',
      },
      {
        value: 'standard-white',
        label: __('Standard White', 'apple-music'),
        imagePath: standardWhite,
        backgroundImage: 'url(https://tools.applemusic.com/assets/shared/text-lockups/en-us/standard-white.svg)',
      },
      {
        value: 'mono-white',
        label: __('Mono White', 'apple-music'),
        imagePath: monoWhite,
        backgroundImage: 'url(https://tools.applemusic.com/assets/shared/text-lockups/en-us/mono-white.svg)',
      },
      {
        value: 'mono-black',
        label: __('Mono Black', 'apple-music'),
        imagePath: monoBlack,
        backgroundImage: 'url(https://tools.applemusic.com/assets/shared/text-lockups/en-us/mono-black.svg)',
      },
    ],
  },
  {
    value: 'app-icon',
    label: __('App Icon', 'apple-music'),
    height: '40px',
    width: '40px',
    styles: [
      {
        value: 'standard',
        label: __('Standard', 'apple-music'),
        imagePath: standard,
        backgroundImage: 'url(https://tools.applemusic.com/embed/v1/app-icon.svg)',
      },
      {
        value: 'white',
        label: __('White', 'apple-music'),
        imagePath: white,
        backgroundImage: 'url(https://tools.applemusic.com/embed/v1/app-icon.svg?hex=FFFFFF)',
      },
      {
        value: 'black',
        label: __('Black', 'apple-music'),
        imagePath: black,
        backgroundImage: 'url(https://tools.applemusic.com/embed/v1/app-icon.svg?hex=000000)',
      },
    ],
  },
];

export default embedTypes;
