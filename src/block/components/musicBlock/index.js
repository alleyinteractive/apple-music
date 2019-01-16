import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import DisplayTools from 'Components/displayTools';
import ResultsWrapper from 'Components/resultsWrapper';
import SearchTools from 'Components/searchTools';
import MusicDisplay from 'Components/musicDisplay';
import BackToSearch from 'Components/backToSearch';
import { setEmbedURL } from 'API';
import {
  getItemArtworkURL,
  getObjKeyValue,
  getNestedObject,
  getTypeObject,
  showEmbed,
  setEmbedDimensions,
} from 'Utils';
import placeholder from 'Images/apple.png';

// CSS
import styles from './musicBlock.css';

// Extend component
const { Component, Fragment } = wp.element;

const { InspectorControls } = wp.editor;
const { PanelBody } = wp.components;

class MusicBlock extends Component {
  /**
   * Component constructor
   * @param {object} props This component's props.
   */
  constructor(props) {
    super(props);
    this.state = {
      isMusicSet: this.isMusicSet(),
      displayProps: {
        imageSrc: placeholder,
        artistName: '',
        genreNames: [],
        notesDesc: '',
      },
    };
    this.setMusicSelection = this.setMusicSelection.bind(this);
    this.isMusicSet = this.isMusicSet.bind(this);
  }

  /**
   * Update the ID attribute and add the musicItem object to state.
   * @param {object} item The selected item.
   */
  setMusicSelection(item) {
    const {
      attributes: {
        embedType,
        musicType,
        width,
      },
      setAttributes,
    } = this.props;
    const ID = getObjKeyValue(item, 'id'); // get the music ID.

    const initialHeight = getObjKeyValue(
      getTypeObject(musicType),
      'embedHeight'
    );

    this.setState({
      isMusicSet: true,
      displayProps: {
        imageSrc: getItemArtworkURL(item, '200', '200') || placeholder,
        artistName: getNestedObject(item, ['attributes', 'artistName']),
        genreNames: getNestedObject(item, ['attributes', 'genreNames']),
        notesDesc: getNestedObject(
          item,
          ['attributes', 'editorialNotes', 'short']
        ),
      },
    });

    // If this music type does not have an embeddable iframe set the embed type default
    const updateEmbedTyped = (! showEmbed(musicType) &&
      'preview-player' === embedType) ?
      'badge' : embedType;

    const baseEmbedURL = setEmbedURL(musicType, ID);

    setAttributes({
      embedType: updateEmbedTyped,
      item,
      ID,
      baseEmbedURL,
      embedURL: setEmbedDimensions(
        baseEmbedURL,
        width,
        initialHeight
      ),
      name: getNestedObject(item, ['attributes', 'name']),
      height: initialHeight,
      link: getNestedObject(item, ['attributes', 'url']),
    });
  }

  /**
   * Reset the search and clear selection.
   */
  resetSearch() {
    const {
      setAttributes,
      attributes,
    } = this.props;
    this.setState({
      isMusicSet: false,
      displayProps: {
        imageSrc: placeholder,
        artistName: '',
        genreNames: [],
        notesDesc: '',
      },
    });
    setAttributes({
      appIconStyle: 'standard',
      embedType: attributes.embedType,
      embedURL: '',
      ID: false,
      textLockUpStyle: 'standard-black',
      name: '',
      link: '',
    });
  }

  /**
   * Check if an item has been selected.
   */
  isMusicSet() {
    const { attributes } = this.props;
    const { ID } = attributes;
    if (false === ID || 'undefined' === typeof ID) {
      return false;
    }
    return true;
  }

  // Component Render method.
  render() {
    const {
      attributes,
      className,
      isSelected,
    } = this.props;

    return (
      <div className={className}>
        { isSelected &&
          <InspectorControls key="inspector">
            <PanelBody title={__(
              'Apple Music Settings',
              'connect-to-apple-music'
            )}
            >
              {
                ! this.state.isMusicSet &&
                <SearchTools
                  attributes={attributes}
                  setAttributes={this.props.setAttributes}
                />
              }
              {
                this.state.isMusicSet &&
                <Fragment>
                  <BackToSearch onClick={() => this.resetSearch()} />
                  <DisplayTools
                    attributes={attributes}
                    setAttributes={this.props.setAttributes}
                    displayProps={this.state.displayProps}
                  />
                </Fragment>
              }
            </PanelBody>
          </InspectorControls>
        }
        {
          isSelected &&
            <div className={styles.musicTools}>
              {
                ! this.state.isMusicSet &&
                <Fragment>
                  <h3 className={styles.introText}>
                    {__(
                      'Get badges, links, and widgets for Apple Music.',
                      'connect-to-apple-music'
                    )}
                  </h3>
                  <SearchTools
                    attributes={attributes}
                    setAttributes={this.props.setAttributes}
                    inPanel={false}
                  />
                </Fragment>
              }
              {
                this.state.isMusicSet &&
                <Fragment>
                  <BackToSearch
                    onClick={() => this.resetSearch()}
                    inPanel={false}
                  />
                  <DisplayTools
                    attributes={attributes}
                    setAttributes={this.props.setAttributes}
                    displayProps={this.state.displayProps}
                    inPanel={false}
                  />
                </Fragment>
              }
              {
                ! this.state.isMusicSet &&
                <ResultsWrapper
                  attributes={attributes}
                  onSelect={this.setMusicSelection}
                  displayProps={this.state.displayProps}
                />
              }
            </div>
        }
        {
          ! isSelected &&
          <MusicDisplay attributes={attributes} />
        }
      </div>
    );
  } // end render method.
}

MusicBlock.propTypes = {
  attributes: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    embedURL: PropTypes.string,
  }).isRequired,
  className: PropTypes.string.isRequired,
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
};

export default MusicBlock;
