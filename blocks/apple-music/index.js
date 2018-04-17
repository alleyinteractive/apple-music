import React from 'react';
import AppleMusicBlock from './components/edit';

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
    },
    edit: AppleMusicBlock,
    save: (props) => (
      <div className={props.className}>
        <div className="display-music">
          {props.attributes.music}
        </div>
      </div>
    ),
  },
);
