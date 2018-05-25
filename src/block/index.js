/* global wp */
/* eslint no-undef: "error" */

// Entry point for Apple Music Gutenberg block.
import './i18n';
import MusicBlock from './components/musicBlock';
import MusicDisplay from './components/musicDisplay';
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
    icon: appleMusicIcon,
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
      inlineStyle: {
        type: 'object',
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
