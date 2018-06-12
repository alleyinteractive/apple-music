import React from 'react';
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';
import {
  getNestedObject,
  iframeURL,
} from 'Utils';
import { affiliateToken } from '../../settings';
import { appleMusicIcon } from '../../icons';

const { Fragment } = wp.element;
const { Placeholder } = wp.components;

/**
 * MusicDisplay component renders the HTML output of the Apple Music widget.
 * This is the output passed to the save method in registerBlockType.
 */
const MusicDisplay = ({
  attributes: {
    embedType,
    height,
    embedURL,
    imageAttributes,
    item,
    width,
  },
  className,
}) => {
  let URL = getNestedObject(item, ['attributes', 'url']);
  const embedURLString = iframeURL(embedURL, width, height);

  // Set the affiliate token if applicable.
  if (affiliateToken) {
    URL = URL ? URL.concat(`?at=${affiliateToken}`) : '';
  }

  return (
    <div className={className}>
      {
        ('preview-player' === embedType && embedURLString) &&
        <Fragment>
          {`\n${embedURLString}\n`}
        </Fragment>
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
      {
        ! URL && ! embedURLString &&
        <Placeholder
          icon={appleMusicIcon}
          className="apple-music-placeholder"
        >
          {__('Get badges, links, and widgets for Apple Music.', 'apple-music')}
        </Placeholder>
      }
    </div>
  );
};

MusicDisplay.propTypes = {
  attributes: PropTypes.shape({
    embedType: PropTypes.string,
    height: PropTypes.string,
    embedURL: PropTypes.string,
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
