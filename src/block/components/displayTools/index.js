import React from 'react';
import PropTypes from 'prop-types';
import PreviewPlayer from 'Components/previewPlayer';
import EmbedSlider from 'Components/embedSlider';
import {
  showEmbed,
  getItemArtworkURL,
  getNestedObject,
} from 'Utils';
import placeholder from 'Images/apple.png';
import { __ } from '@wordpress/i18n';
import styles from './displayTools.css';

const {
  TextControl,
  ExternalLink,
} = wp.components;

/**
 * Component for displaying search results in Apple Music block.
 */
const DisplayTools = ({
  attributes: {
    appIconStyle,
    embedType,
    height,
    embedURL,
    item,
    musicType,
    textLockUpStyle,
    width,
  },
  inPanel,
  setAttributes,
}) => {
  const directLink = getNestedObject(item, ['attributes', 'url']);
  const imageSrc = getItemArtworkURL(item, '200', '200') || placeholder;
  const name = getNestedObject(item, ['attributes', 'name']);
  const artistName = getNestedObject(item, ['attributes', 'artistName']);
  const genreNames = getNestedObject(item, ['attributes', 'genreNames']);
  const notesDesc = getNestedObject(
    item,
    ['attributes', 'editorialNotes', 'short']
  );
  // The details information for music without preview player embed.
  const details = ! showEmbed(musicType) ? (
    <div className={styles.detailWrapper}>
      {
        imageSrc &&
        <div className={styles.image}>
          <img src={imageSrc} alt={name} />
        </div>
      }
      <div className={styles.rightAside}>
        {
          name &&
          <div className={styles.sidePrimary}>
            {getNestedObject(item, ['attributes', 'name'])}
          </div>
        }
        {
          (genreNames || notesDesc) &&
          <div className={styles.sideSecondary}>
            {genreNames && genreNames.shift()}
            {notesDesc && notesDesc}
          </div>
        }
      </div>
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
              onChange={(value) => setAttributes({ height: value })}
              placeholder={height}
            />
            <TextControl
              className={textInput}
              label={__('Width', 'apple-music')}
              value={width}
              onChange={(value) => setAttributes({ width: value })}
              placeholder={width}
            />
          </div>
        </div>
      }
      { // Show the Preview player in the main content area.
        (! inPanel && showEmbed(musicType)) &&
        <PreviewPlayer
          height={height}
          embedURL={embedURL}
          width={width}
        />
      }
      {! inPanel && details}
      <EmbedSlider
        appIconStyle={appIconStyle}
        embedType={embedType}
        inPanel={inPanel}
        musicType={musicType}
        setAttributes={setAttributes}
        textLockUpStyle={textLockUpStyle}
      />
      {
        ! inPanel &&
        <div className={styles.directLink}>
          <b>{__('Direct Link: ', 'apple-music')}</b>
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
    embedURL: PropTypes.string,
    item: PropTypes.shape({
      attributes: PropTypes.any,
      id: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  setAttributes: PropTypes.func.isRequired,
  inPanel: PropTypes.bool,
};

export default DisplayTools;
