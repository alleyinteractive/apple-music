import React from 'react';
import PropTypes from 'prop-types';
import embedTypes from '../../config/embedTypes';
import { showEmbed } from '../../utils';

// import badge from '../../../../assets/images/badge.svg';

// Internationalization
const { __ } = window.wp.i18n;
// WP components
const {
  Button,
  SelectControl,
} = window.wp.components;

/**
 * Embed Slider used in the display tools.
 */
const EmbedSlider = ({
  musicType,
  embedType,
  embedStyle,
  onTypeChange,
  onStyleChange,
}) => {
  const embedStyles = embedTypes.map((x) => {
    if (undefined !== x.styles && x.value === embedType) {
      return x.styles;
    }
    return '';
  });

  const test = [
    {
      value: 'standard-black',
      label: __('Standard Black', 'apple-news'),
    },
    {
      value: 'standard-white',
      label: __('Standard White', 'apple-news'),
    },
    {
      value: 'mono-white',
      label: __('Mono White', 'apple-news'),
    },
    {
      value: 'mono-black',
      label: __('Mono Black', 'apple-news'),
    },
  ];

  console.log('Map', embedStyles);
  console.log('Test', test);

  return (
    <div>
      {embedTypes.map(({ value, label }) => {
        // If the musicType doesn't support embeds don't show preview player.
        if ('preview-player' === value && ! showEmbed(musicType)) {
          return null;
        }
        return (
          <div>
            <Button
              key={value}
              onClick={() => onTypeChange(value, 'embedType')}
            >
              {__(label, 'apple-music')}
            </Button>
            {
              (['text-lockup', 'app-icon'].includes(value) &&
                embedType === value) &&
                <SelectControl
                  value={embedStyle}
                  options={embedStyle}
                  onChange={(style) => onStyleChange(style, 'embedStyle')}
                />
            }
          </div>
        );
      })}
    </div>
  );
};

EmbedSlider.propTypes = {
  embedStyle: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  musicType: PropTypes.string.isRequired,
  onStyleChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
};

export default EmbedSlider;
