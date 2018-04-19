import AppleMusicBlock from './components/edit';
import AppleMusicDisplay from './components/save';

const { __ } = window.wp.i18n;
const { registerBlockType } = window.wp.blocks;

/**
 * Register block
 */
export default registerBlockType(
  'apple-music/demo',
  {
    title: __('Apple Music', 'apple-music'),
    description:
      __('Embed the apple music player into a post.', 'apple-music'),
    category: 'widgets',
    icon: 'format-audio',
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
      iframeSrc: {
        type: 'string',
      },
    },
    edit: AppleMusicBlock,
    save: AppleMusicDisplay,
  },
);
