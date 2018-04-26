import React from 'react';
import PropTypes from 'prop-types';
import embedTypes from '../../config/embedTypes';
import { showEmbed } from '../../utils';

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
  // Get the styles options for the Select Control.
  const embedStyles = embedTypes.reduce((acc, { value, styles }) => (
    (undefined !== styles && value === embedType) ?
      acc.concat(styles) : acc.concat()), []);

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
                  options={embedStyles}
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
