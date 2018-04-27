import React from 'react';
import PropTypes from 'prop-types';
import badge from 'Images/badge.svg';
import embedTypes from 'Config/embedTypes';
import { showEmbed } from 'Utils';
// Use a different declaration for styles since we are using this variable name.
import css from './embedSlider.css';

// Internationalization
const { __, sprintf } = window.wp.i18n;
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
  onChange,
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
    let alt = __('Apple Music Icon', 'apple-music');
    let imgClass = '';

    switch (type) {
      case 'preview-player':
        return (
          <div className={css.imageWrapper}>
            <div className={css.previewPlayer}>
              <Dashicon icon="controls-play" />
            </div>
          </div>
        );
      case 'badge':
        alt = __('badge icon', 'apple-music');
        imageURL = badge;
        break;
      case 'text-lockup':
        alt = sprintf(
          __('%s text lockup icon', 'apple-music'),
          textLockUpStyle
        );
        imgClass = textLockUpStyle;
        imageURL = imageSrc(textLockUpStyle);
        break;
      case 'app-icon':
        alt = sprintf(
          __('%s text lockup icon', 'apple-music'),
          appIconStyle
        );
        imgClass = appIconStyle;
        imageURL = imageSrc(appIconStyle);
        break;
      default:
        imageURL = '';
    }
    return imageURL ? (
      <div className={`${css.imageWrapper} ${css[imgClass]}`}>
        <img
          src={imageURL}
          alt={alt}
        />
      </div>
    ) : '';
  }

  return (
    <div className={css.slider}>
      {embedTypes.map(({ value, label }) => {
        // If the musicType doesn't support embeds don't show preview player.
        if ('preview-player' === value && ! showEmbed(musicType)) {
          return null;
        }
        // Active class for the selected embed type.
        const activeClass = embedType === value ? css.active : '';

        return (
          <div className={`${css.slide} ${activeClass}`}>
            <Button
              className={css.iconSelector}
              key={value}
              onClick={() => onChange(value, 'embedType')}
            >
              {icon(value)}
              <p>{__(label, 'apple-music')}</p>
            </Button>
            {
              ('text-lockup' === embedType && 'text-lockup' === value) &&
                <SelectControl
                  className={css.selectStyle}
                  value={textLockUpStyle}
                  options={embedStyles}
                  onChange={(x) => onChange(x, 'textLockUpStyle')}
                />
            }
            {
              ('app-icon' === embedType && 'app-icon' === value) &&
                <SelectControl
                  className={css.selectStyle}
                  value={appIconStyle}
                  options={embedStyles}
                  onChange={(x) => onChange(x, 'appIconStyle')}
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
  onChange: PropTypes.func.isRequired,
  textLockUpStyle: PropTypes.string.isRequired,
};

export default EmbedSlider;
