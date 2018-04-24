import React from 'react';
import PropTypes from 'prop-types';
import embedTypes from '../../config/embedTypes';
import PreviewPlayer from '../previewPlayer';
import {
  showEmbed,
  getItemArtworkURL,
  getNestedObject,
} from '../../utils';

import styles from './displayTools.css';

const {
  TextControl,
  Button,
  ExternalLink,
} = window.wp.components;

// Internationalization
const { __ } = window.wp.i18n;

/**
 * Component for displaying search results in Apple Music block.
 */
const DisplayTools = ({
  attributes: {
    iframeSrc,
    item,
    height,
    musicType,
    width,
  },
  inPanel,
  onChange,
}) => {
  const directLink = getNestedObject(item, ['attributes', 'url']);
  const imageSrc = getItemArtworkURL(item, '200', '200');
  const name = getNestedObject(item, ['attributes', 'name']);
  const artistName = getNestedObject(item, ['attributes', 'artistName']);

  const artwork = ! showEmbed(musicType) ? (
    <div>
      {
        imageSrc &&
        <div className="image">
          <img src={imageSrc} alt={name} />
        </div>
      }
      {
        name &&
        <div className="right-side">
          <div className="name">
            {getNestedObject(item, ['attributes', 'name'])}
          </div>
        </div>
      }
    </div>
  ) : null;

  // conditional classes for edit styles.
  const formClass = ! inPanel ? styles.dimensionsForm : '';
  const textInput = ! inPanel ? styles.dimensions : '';

  return (
    <div>
      {
        showEmbed(musicType) &&
        <div className={styles.details}>
          {
            ! inPanel &&
            <div>
              <h1 className={styles.name}>{name}</h1>
              {
                artistName &&
                  <div className={styles.secondary}>{artistName}</div>
              }
            </div>
          }
          <div className={formClass}>
            <TextControl
              className={textInput}
              label={__('Height', 'apple-music')}
              value={height}
              onChange={(value) => onChange(value, 'height')}
              placeholder={height}
            />
            <TextControl
              className={textInput}
              label={__('Width', 'apple-music')}
              value={width}
              onChange={(value) => onChange(value, 'width')}
              placeholder={width}
            />
          </div>
        </div>
      }
      { // Show the Preview player in the main content area.
        (! inPanel && showEmbed(musicType)) &&
        <PreviewPlayer
          height={height}
          iframeSrc={iframeSrc}
          width={width}
        />
      }
      {! inPanel && artwork}
      {
        embedTypes.map(({ value, label }) => {
          // If the musicType doesn't support embeds don't show preview player.
          if ('preview-player' === value && ! showEmbed(musicType)) {
            return null;
          }
          return (
            <Button
              key={value}
              onClick={() => onChange(value, 'embedType')}
            >
              {label}
            </Button>
          );
        })
      }
      {
        ! inPanel &&
        <div>
          {__('Direct Link: ', 'apple-music')}
          <ExternalLink href={directLink}>
            {directLink}
          </ExternalLink>
        </div>
      }
    </div>
  );
};

DisplayTools.defaultProps = {
  inPanel: true,
};

DisplayTools.propTypes = {
  attributes: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    iframeSrc: PropTypes.string,
    item: PropTypes.shape({
      attributes: PropTypes.any,
      id: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  inPanel: PropTypes.bool,
};

export default DisplayTools;
