import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreviewPlayer from 'Components/previewPlayer';
import EmbedSlider from 'Components/embedSlider';
import {
  showEmbed,
  setEmbedDimensions,
} from 'Utils';
import { __ } from '@wordpress/i18n';
import styles from './displayTools.css';

const {
  TextControl,
  ExternalLink,
} = wp.components;

const { Fragment } = wp.element;

/**
 * Component for displaying search results in Apple Music block.
 */
class DisplayTools extends Component {
  renderDetails() {
    const {
      imageSrc,
      genreNames,
      notesDesc,
    } = this.props.displayProps;

    const { name } = this.props.attributes;

    return (
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
              {name}
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
    );
  }

  render() {
    const {
      attributes,
      displayProps,
      inPanel,
      setAttributes,
    } = this.props;

    const {
      appIconStyle,
      baseEmbedURL,
      embedType,
      height,
      embedURL,
      musicType,
      name,
      textLockUpStyle,
      width,
      link,
    } = attributes;

    const { artistName } = displayProps;
    // The details information for music without preview player embed.
    const details = ! showEmbed(musicType) ? this.renderDetails() : null;

    // conditional classes for edit styles.
    const formClass = ! inPanel ? styles.dimensionsForm : '';
    const textInput = ! inPanel ? styles.dimensions : '';

    return (
      <Fragment>
        {
          showEmbed(musicType) &&
          <div className={styles.details}>
            {
              ! inPanel &&
              <Fragment>
                <h1 className={styles.name}>{name}</h1>
                {
                  artistName &&
                    <div className={styles.secondary}>{artistName}</div>
                }
              </Fragment>
            }
            <div className={formClass}>
              <TextControl
                className={textInput}
                label={__('Height', 'connect-to-apple-music')}
                value={height}
                onChange={(value) => setAttributes({
                  height: value,
                  embedURL: setEmbedDimensions(baseEmbedURL, width, value),
                })}
                placeholder={height}
              />
              <TextControl
                className={textInput}
                label={__('Width', 'connect-to-apple-music')}
                value={width}
                onChange={(value) => setAttributes({
                  width: value,
                  embedURL: setEmbedDimensions(baseEmbedURL, value, height),
                })}
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
            <b>{__('Direct Link: ', 'connect-to-apple-music')}</b>
            <ExternalLink href={link}>
              {link}
            </ExternalLink>
          </div>
        }
      </Fragment>
    );
  }
}

DisplayTools.defaultProps = {
  inPanel: true,
};

DisplayTools.propTypes = {
  attributes: PropTypes.shape({
    appIconStyle: PropTypes.string,
    embedType: PropTypes.string,
    height: PropTypes.string,
    embedURL: PropTypes.string,
    musicType: PropTypes.string,
    name: PropTypes.string,
    textLockUpStyle: PropTypes.string,
    width: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  displayProps: PropTypes.shape({
    imageSrc: PropTypes.string,
    artistName: PropTypes.string,
    genreNames: PropTypes.array,
    notesDesc: PropTypes.string,
  }).isRequired,
  setAttributes: PropTypes.func.isRequired,
  inPanel: PropTypes.bool,
};

export default DisplayTools;
