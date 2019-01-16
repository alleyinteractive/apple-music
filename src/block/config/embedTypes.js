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
import { __ } from '@wordpress/i18n';
import '../i18n';
/**
 * The list of the embed types to use for embedding Apple Music.
 *
 * @type {Array}
 */
const embedTypes = [
  {
    value: 'preview-player',
    label: __('Preview player', 'connect-to-apple-music'),
  },
  {
    value: 'badge',
    label: __('Badge', 'connect-to-apple-music'),
    height: '45px',
    width: '157px',
    imageSource: 'https://tools.applemusic.com/assets/shared/badges/en-us/music-lrg.svg',
  },
  {
    value: 'text-lockup',
    label: __('Text lockup', 'connect-to-apple-music'),
    height: '30px',
    width: '140px',
    styles: [
      {
        default: true,
        value: 'standard-black',
        label: __('Standard black', 'connect-to-apple-music'),
        imagePath: standardBlack,
        imageSource: 'https://tools.applemusic.com/assets/shared/text-lockups/en-us/music-standard-black.svg',
      },
      {
        value: 'standard-white',
        label: __('Standard white', 'connect-to-apple-music'),
        imagePath: standardWhite,
        imageSource: 'https://tools.applemusic.com/assets/shared/text-lockups/en-us/music-standard-white.svg',
      },
      {
        value: 'mono-white',
        label: __('Mono white', 'connect-to-apple-music'),
        imagePath: monoWhite,
        imageSource: 'https://tools.applemusic.com/assets/shared/text-lockups/en-us/music-mono-white.svg',
      },
      {
        value: 'mono-black',
        label: __('Mono black', 'connect-to-apple-music'),
        imagePath: monoBlack,
        imageSource: 'https://tools.applemusic.com/assets/shared/text-lockups/en-us/music-mono-black.svg',
      },
    ],
  },
  {
    value: 'app-icon',
    label: __('App icon', 'connect-to-apple-music'),
    height: '40px',
    width: '40px',
    styles: [
      {
        default: true,
        value: 'standard',
        label: __('Standard', 'connect-to-apple-music'),
        imagePath: standard,
        imageSource: 'https://tools.applemusic.com/embed/v1/app-icon.svg',
      },
      {
        value: 'white',
        label: __('White', 'connect-to-apple-music'),
        imagePath: white,
        imageSource: 'https://tools.applemusic.com/embed/v1/app-icon.svg?hex=FFFFFF',
      },
      {
        value: 'black',
        label: __('Black', 'connect-to-apple-music'),
        imagePath: black,
        imageSource: 'https://tools.applemusic.com/embed/v1/app-icon.svg?hex=000000',
      },
    ],
  },
];

export default embedTypes;
