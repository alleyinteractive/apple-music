import React from 'react';
import musicTypes from './musicTypes';

const { __ } = window.wp.i18n;
const { registerBlockType, InspectorControls } = window.wp.blocks;
// Get components from Components
const {
  PanelBody,
  PanelRow,
  TextControl,
  SelectControl,
} = window.wp.components;

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
      __('Apple', 'apple-music'),
      __('Music', 'apple-music'),
    ],
    supports: {
      html: false,
    },
    attributes: {
      music: {
        type: 'array',
        source: 'children',
        selector: '.display-music',
      },
      musicType: {
        type: 'string',
        default: 'artists',
      },
    },
    edit: ({
      attributes,
      setAttributes,
      isSelected,
      className,
    }) => {
      const onChangeMessage = (music) => {
        setAttributes({ music });
      };
      // on Select assign the musicType attribute.
      const onSelect = (musicType) => {
        setAttributes({ musicType });
      };

      // Get the current selected musicType object
      const typeObject = musicTypes.find((type) => (
        type.value === attributes.musicType
      ));

      return (
        <div>
          { isSelected &&
            <InspectorControls key="inspector">
              <PanelBody title={__('Apple Music Settings', 'apple-music')}>
                <TextControl
                  label={`Search ${typeObject.label}`}
                  value={attributes.music}
                  onChange={onChangeMessage}
                />
                <PanelRow>
                  <SelectControl
                    label={__('Music Type', 'apple-music')}
                    value={attributes.musicType}
                    options={musicTypes.map(({ value, label }) => (
                      { value, label }
                    ))}
                    onChange={onSelect}
                  />
                </PanelRow>
              </PanelBody>
            </InspectorControls>
          }
          <div className={className}>
            {attributes.music}
          </div>
        </div>
      );
    },
    save: (props) => (
      <div className={props.className}>
        <div className="display-music">
          {props.attributes.music}
        </div>
      </div>
    ),
  },
);
