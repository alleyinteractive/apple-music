import React from 'react';
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';
// import PreviewPlayer from 'Components/previewPlayer';
import {
  getNestedObject,
  iframeURL,
} from 'Utils';
import { affiliateToken } from '../../settings';

// CSS
import styles from './musicDisplay.css';

/**
 * MusicDisplay component renders the HTML output of the Apple Music widget.
 * This is the output passed to the save method in registerBlockType.
 */
const MusicDisplay = ({
  attributes: {
    embedType,
    height,
    iframeSrc,
    imageAttributes,
    item,
    width,
  },
  className,
}) => {
  let URL = getNestedObject(item, ['attributes', 'url']);
  const embedURL = iframeURL(iframeSrc, width, height);

  // Set the affiliate token if applicable.
  if (affiliateToken) {
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
        `\n${embedURL}\n` // URL needs to be on its own line.
      }
      {
        (['badge', 'text-lockup', 'app-icon'].includes(embedType) && URL) &&
        <a href={URL}>
          <img
            src={imageAttributes.src}
            height={imageAttributes.height}
            width={imageAttributes.width}
            alt={sprintf(
              __('Listen to "%s" on Apple Music.', 'apple-music'),
              getNestedObject(item, ['attributes', 'name'])
            )}
          />
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
