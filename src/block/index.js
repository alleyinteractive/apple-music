// Entry point for Connect to Apple Music Gutenberg block.
import MusicBlock from 'Components/musicBlock';
import MusicDisplay from 'Components/musicDisplay';
import { __ } from '@wordpress/i18n';
import './i18n';
import { appleMusicIcon } from './icons';

const { registerBlockType } = wp.blocks;

/**
 * Register Apple Music block
 */
export default registerBlockType(
  'apple-music/widget',
  {
    title: __('Apple Music', 'connect-to-apple-music'),
    description:
      __('Embed an Apple Music widget into a post.', 'connect-to-apple-music'),
    category: 'widgets',
    icon: {
      src: appleMusicIcon,
    },
    keywords: [
      __('Apple Music', 'connect-to-apple-music'),
    ],
    supports: {
      html: false,
    },
    attributes: {
      appIconStyle: {
        type: 'string',
        default: 'standard',
      },
      embedType: {
        type: 'string',
        default: 'preview-player',
      },
      height: {
        type: 'string',
      },
      baseEmbedURL: {
        type: 'string',
      },
      embedURL: {
        type: 'string',
      },
      imageAttributes: {
        type: 'object',
        default: {
          height: '45px',
          width: '157px',
          src: 'https://tools.applemusic.com/assets/shared/badges/en-us/music-lrg.svg',
        },
      },
      ID: {
        type: 'integer',
      },
      musicType: {
        type: 'string',
        default: 'artists',
      },
      name: {
        type: 'string',
      },
      query: {
        type: 'string',
      },
      textLockUpStyle: {
        type: 'string',
        default: 'standard-black',
      },
      link: {
        type: 'string',
      },
      width: {
        type: 'string',
        default: '660px',
      },
    },
    edit: MusicBlock,
    save: MusicDisplay,
  },
);
