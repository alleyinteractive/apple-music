import React from 'react';
import PropTypes from 'prop-types';
import { applyAffiliateToken } from 'Utils';
import { __, sprintf } from '@wordpress/i18n';
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
    embedURL,
    imageAttributes,
    name,
    link,
  },
  className,
}) => {
  // Set the affiliate token if applicable.
  const URL = applyAffiliateToken(link);

  return (
    <div className={className}>
      {
        ('preview-player' === embedType && embedURL) &&
        <Fragment>
          {`\n${embedURL}\n`}
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
              __('Listen to "%s" on Apple Music.', 'connect-to-apple-music'),
              name
            )}
          />
        </a>
      }
      {
        ! URL && ! embedURL &&
        <Placeholder
          icon={appleMusicIcon}
          className="apple-music-placeholder"
        >
          {__(
            'Get badges, links, and widgets for Apple Music.',
            'connect-to-apple-music'
          )}
        </Placeholder>
      }
    </div>
  );
};

MusicDisplay.propTypes = {
  attributes: PropTypes.shape({
    embedType: PropTypes.string,
    embedURL: PropTypes.string,
    imageAttributes: PropTypes.object,
    name: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  className: PropTypes.string.isRequired,
};

export default MusicDisplay;
