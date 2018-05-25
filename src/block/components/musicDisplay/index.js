/* global wp */
/* eslint no-undef: "error" */

import React from 'react';
import PropTypes from 'prop-types';
import PreviewPlayer from 'Components/previewPlayer';
import {
  getNestedObject,
  getIconStyle,
} from 'Utils';
import { affiliateToken } from '../../settings';

// CSS
import styles from './musicDisplay.css';

// Internationalization
const { __ } = wp.i18n;

/**
 * MusicDisplay component renders the HTML output of the Apple Music widget.
 * Inline anchor tags and iframes are used to output the widget in the case
 * that the user disables the plugin the content will be retained.
 */
const MusicDisplay = ({
  attributes: {
    appIconStyle,
    embedType,
    height,
    iframeSrc,
    item,
    textLockUpStyle,
    width,
  },
  className,
}) => {
  let URL = getNestedObject(item, ['attributes', 'url']);
  let iframeURL = iframeSrc;
  // default inline styles.
  let inline = {
    display: 'inline-block',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    boxShadow: 'none',
    border: 'none',
  };

  let style = '';

  // Text Lockup style.
  if ('text-lockup' === embedType) {
    style = textLockUpStyle;
  // App Icon style
  } else if ('app-icon' === embedType) {
    style = appIconStyle;
  }
  // concatenate the inline styles.
  inline = Object.assign(inline, getIconStyle(embedType, style));

  // Set the affiliate token if applicable.
  if (affiliateToken) {
    iframeURL = iframeSrc ? iframeSrc.concat(`&=${affiliateToken}`) : '';
    URL = URL ? URL.concat(`?at=${affiliateToken}`) : '';
  }

  const placeHolder = ! URL && ! iframeSrc ? (
    <p className={styles.placeHolder}>
      {__('Get badges, links, and widgets for Apple Music.', 'apple-music')}
    </p>
  ) : '';

  return (
    <div className={className}>
      {
        'preview-player' === embedType &&
        <PreviewPlayer
          height={height}
          iframeSrc={iframeURL}
          width={width}
        />
      }
      {
        (['badge', 'text-lockup', 'app-icon'].includes(embedType) && URL) &&
        <a style={inline} href={URL}>
          To be replaced with screen reader text
        </a>
      }
      {placeHolder}
    </div>
  );
};

MusicDisplay.propTypes = {
  attributes: PropTypes.shape({
    embedType: PropTypes.string,
    height: PropTypes.string,
    iframeSrc: PropTypes.string,
    item: PropTypes.shape({
      attributes: PropTypes.any,
      id: PropTypes.string,
      type: PropTypes.string,
    }),
    musicID: PropTypes.string,
    musicType: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  className: PropTypes.string.isRequired,
};

export default MusicDisplay;
