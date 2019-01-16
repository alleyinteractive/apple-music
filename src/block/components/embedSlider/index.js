import React, { Component } from 'react';
import PropTypes from 'prop-types';
import badge from 'Images/badge.svg';
import embedTypes from 'Config/embedTypes';
import { __, sprintf } from '@wordpress/i18n';
import {
  getIconImagePath,
  getImageAttributes,
  showEmbed,
} from 'Utils';
// Use "css" as a declaration for styles since we are using "styles" below.
import css from './embedSlider.css';

// WP components
const {
  Button,
  Dashicon,
  SelectControl,
} = wp.components;

/**
 * Embed Slider used in the display tools.
 */
class EmbedSlider extends Component {
  /**
   * Image Icon. Which image icon to apply.
   * Adds an image element or the preview player dashicon.
   * @param {string} type the embedType to look for.
   * @returns {string} the image icon or an empty string.
   */
  renderIcon(type) {
    const {
      appIconStyle,
      textLockUpStyle,
    } = this.props;
    // define the default image URL.
    let imageURL = '';
    let imgClass = '';
    let alt = __('Apple Music icon', 'connect-to-apple-music');

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
        alt = __('badge icon', 'connect-to-apple-music');
        imageURL = badge;
        break;
      case 'text-lockup':
        alt = sprintf(
          __('%s text lockup icon', 'connect-to-apple-music'),
          textLockUpStyle
        );
        imgClass = textLockUpStyle;
        imageURL = getIconImagePath(textLockUpStyle);
        break;
      case 'app-icon':
        alt = sprintf(
          __('%s app icon', 'connect-to-apple-music'),
          appIconStyle
        );
        imgClass = appIconStyle;
        imageURL = getIconImagePath(appIconStyle);
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

  render() {
    const {
      appIconStyle,
      embedType,
      inPanel,
      musicType,
      setAttributes,
      textLockUpStyle,
    } = this.props;

    // Class for slider context. In panel or editor.
    const sliderClass = inPanel ? '' : css.slider;
    // Additional class to add to slide.
    const panelSlideClass = inPanel ? css.panelSlide : '';

    // Get the styles options for the Select Control.
    const embedStyles = embedTypes.reduce((acc, { value, styles }) => (
      (undefined !== styles && value === embedType) ?
        acc.concat(styles) : acc), []);

    return (
      <div className={sliderClass}>
        {
          inPanel &&
          <p>{__('Select embed Type', 'connect-to-apple-music')}</p>
        }
        {embedTypes.map(({ value, label }) => {
          // If the musicType doesn't support embeds don't show preview player.
          if ('preview-player' === value && ! showEmbed(musicType)) {
            return null;
          }
          // Active class for the selected embed type.
          const activeClass = embedType === value ? css.active : '';

          return (
            <div className={`${css.slide} ${panelSlideClass} ${activeClass}`}>
              <Button
                className={css.iconSelector}
                key={value}
                onClick={() => setAttributes({
                  embedType: value,
                  imageAttributes: getImageAttributes(value),
                })}
              >
                {this.renderIcon(value)}
                <p>{__(label, 'connect-to-apple-music')}</p>
              </Button>
              { // Select field will only display when text-lockup is active.
                ('text-lockup' === embedType && 'text-lockup' === value) &&
                  <SelectControl
                    className={css.selectStyle}
                    value={textLockUpStyle}
                    options={embedStyles}
                    onChange={(x) => setAttributes({
                      textLockUpStyle: x,
                      imageAttributes: getImageAttributes(embedType, x),
                    })}
                  />
              }
              { // Select field will only display when app-icon is active.
                ('app-icon' === embedType && 'app-icon' === value) &&
                  <SelectControl
                    className={css.selectStyle}
                    value={appIconStyle}
                    options={embedStyles}
                    onChange={(x) => setAttributes({
                      appIconStyle: x,
                      imageAttributes: getImageAttributes(embedType, x),
                    })}
                  />
              }
            </div>
          );
        })}
      </div>
    );
  }
}

EmbedSlider.defaultProps = {
  inPanel: true,
};

EmbedSlider.propTypes = {
  appIconStyle: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  inPanel: PropTypes.bool,
  musicType: PropTypes.string.isRequired,
  setAttributes: PropTypes.func.isRequired,
  textLockUpStyle: PropTypes.string.isRequired,
};

export default EmbedSlider;
