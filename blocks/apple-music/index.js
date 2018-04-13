import React from 'react';

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
    category: 'embed',
    icon: 'format-audio',
    keywords: [
      __('Apple Music', 'apple-music'),
      __('Apple', 'apple-music'),
      __('Music', 'apple-music'),
    ],
    supports: {
      html: false,
    },
    attributes: {
      message: {
        type: 'array',
        source: 'children',
        selector: '.message-body',
      },
    },
    edit: () => (
      <div>
        <h2>{__('Call to Action', 'apple-music')}</h2>
      </div>
    ),
    save: () => (
      window.wp.element.createElement('hr')
    ),
  },
);
