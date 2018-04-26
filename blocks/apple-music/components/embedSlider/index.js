import React from 'react';
import PropTypes from 'prop-types';
import embedTypes from '../../config/embedTypes';
import { showEmbed } from '../../utils';

// Import images.
import badge from '../../../../assets/images/badge.svg';

// Internationalization
const { __ } = window.wp.i18n;
// WP components
const {
  Button,
  Dashicon,
  SelectControl,
} = window.wp.components;

/**
 * Embed Slider used in the display tools.
 */
const EmbedSlider = ({
  appIconStyle,
  embedType,
  musicType,
  onAppIconChange,
  onTypeChange,
  onTextLockUpChange,
  textLockUpStyle,
}) => {
  // Get the styles options for the Select Control.
  const embedStyles = embedTypes.reduce((acc, { value, styles }) => (
    (undefined !== styles && value === embedType) ?
      acc.concat(styles) : acc.concat()), []);

  /**
   * The icon image asset source.
   * @param {string} style the image source for the image tag in the icon function.
   * @param {string} fallback The image fallback URL to use.
   * @returns {string} string - the image source or an empty string.
   */
  function imageSrc(style) {
    const src = embedTypes.reduce((acc, { styles }) => (
      (undefined !== styles) ? acc.concat(styles) : acc.concat()), [])
      // Reduce all the available styles by selected style and apply fallback.
      .reduce((acc, { value, imagePath }) => (
        (value === style) ? imagePath : acc.concat()), '');
    return src;
  }

  /**
   * Image Icon. Which image icon to apply.
   * @param {string} type the embedType to look for.
   * @returns {string} the image icon or an empty string.
   */
  function icon(type) {
    // define the default image URL.
    let imageURL = '';

    switch (type) {
      case 'preview-player':
        return <div className=""><Dashicon icon="controls-play" /></div>;
      case 'badge':
        imageURL = badge;
        break;
      case 'text-lockup':
        imageURL = imageSrc(textLockUpStyle);
        break;
      case 'app-icon':
        imageURL = imageSrc(appIconStyle);
        break;
      default:
        imageURL = '';
    }
    return <img src={imageURL} alt="" />;
  }

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
              {icon(value)}
              {__(label, 'apple-music')}
            </Button>
            {
              ('text-lockup' === embedType && 'text-lockup' === value) &&
                <SelectControl
                  value={textLockUpStyle}
                  options={embedStyles}
                  onChange={(x) => onTextLockUpChange(x, 'textLockUpStyle')}
                />
            }
            {
              ('app-icon' === embedType && 'app-icon' === value) &&
                <SelectControl
                  value={appIconStyle}
                  options={embedStyles}
                  onChange={(x) => onAppIconChange(x, 'appIconStyle')}
                />
            }
          </div>
        );
      })}
    </div>
  );
};

EmbedSlider.propTypes = {
  appIconStyle: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  musicType: PropTypes.string.isRequired,
  onAppIconChange: PropTypes.func.isRequired,
  onTextLockUpChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  textLockUpStyle: PropTypes.string.isRequired,
};

export default EmbedSlider;
