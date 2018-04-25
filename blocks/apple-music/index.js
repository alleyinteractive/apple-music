import MusicBlock from './components/musicBlock';
import MusicDisplay from './components/musicDisplay';
import { appleMusicIcon } from './icons';

const { __ } = window.wp.i18n;
const { registerBlockType } = window.wp.blocks;

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
      query: {
        type: 'array',
        source: 'children',
        selector: '.display-music',
      },
      musicType: {
        type: 'string',
        default: 'artists',
      },
      musicID: {
        type: 'integer',
      },
      item: {
        type: 'object',
      },
      height: {
        type: 'string',
      },
      width: {
        type: 'string',
        default: '100%',
      },
      embedType: {
        type: 'string',
        default: 'preview-player',
      },
      embedStyle: {
        type: 'string',
        default: 'standard',
      },
      iframeSrc: {
        type: 'string',
      },
    },
    edit: MusicBlock,
    save: MusicDisplay,
  },
);
