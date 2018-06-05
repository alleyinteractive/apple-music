// Entry point for Apple Music Gutenberg block.
import MusicBlock from 'Components/musicBlock';
import MusicDisplay from 'Components/musicDisplay';
import './i18n';
import { appleMusicIcon } from './icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register Apple Music block
 */
export default registerBlockType(
  'apple-music/widget',
  {
    title: __('Apple Music', 'apple-music'),
    description:
      __('Embed an Apple music widget into a post.', 'apple-music'),
    category: 'widgets',
    icon: {
      src: appleMusicIcon,
    },
    keywords: [
      __('Apple Music', 'apple-music'),
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
      iframeSrc: {
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
      item: {
        type: 'object',
      },
      musicID: {
        type: 'integer',
      },
      musicType: {
        type: 'string',
        default: 'artists',
      },
      query: {
        type: 'string',
      },
      textLockUpStyle: {
        type: 'string',
        default: 'standard-black',
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
