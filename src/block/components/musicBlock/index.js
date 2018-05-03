import React from 'react';
import PropTypes from 'prop-types';
import DisplayTools from 'Components/displayTools';
import ResultsWrapper from 'Components/resultsWrapper';
import SearchTools from 'Components/searchTools';
import MusicDisplay from 'Components/musicDisplay';
import BackToSearch from 'Components/backToSearch';
import { iframeURL } from 'API';
import {
  getObjKeyValue,
  getTypeObject,
  showEmbed,
} from 'Utils';

// CSS
import styles from './musicBlock.css';

// Internationalization
const { __ } = window.wp.i18n;
// Extend component
const { Component } = window.wp.element;

const { InspectorControls } = window.wp.blocks;
const { PanelBody } = window.wp.components;

class MusicBlock extends Component {
  /**
   * Component constructor
   * @param {object} props This component's props.
   */
  constructor(props) {
    super(props);
    this.state = {
      isMusicSet: this.isMusicSet(),
    };
    this.setMusicSelection = this.setMusicSelection.bind(this);
    this.updateAttributes = this.updateAttributes.bind(this);
    this.isMusicSet = this.isMusicSet.bind(this);
  }

  /**
   * Update the musicID attribute and add the musicItem object to state.
   * @param {object} item The selected item.
   */
  setMusicSelection(item) {
    const {
      attributes: {
        embedType,
        musicType,
      },
      setAttributes,
    } = this.props;
    const musicID = getObjKeyValue(item, 'id'); // get the music ID.

    const type = getTypeObject(musicType);
    const initialHeight = getObjKeyValue(type, 'embedHeight');

    this.setState({
      isMusicSet: true,
    });

    // If this music type does not have an embeddable iframe set the embed type default
    const updateEmbedTyped = (! showEmbed(musicType) &&
      'preview-player' === embedType) ?
      'badge' : embedType;

    setAttributes({
      embedType: updateEmbedTyped,
      item,
      musicID,
      iframeSrc: iframeURL(musicType, musicID),
      height: initialHeight,
    });
  }

  /**
   * Update the attributes callback.
   * @param {string} value the value to set the attribute.
   * @param {string} key the key of the attribute, which attribute to set.
   */
  updateAttributes(value, key) {
    const { attributes, setAttributes } = this.props;
    // update input fields by direct reference to avoid persistant first character.
    if (['height', 'width', 'query'].includes(key)) {
      setAttributes({
        height: 'height' === key ? value : attributes.height,
        query: 'query' === key ? value : attributes.query,
        width: 'width' === key ? value : attributes.width,
      });
    } else {
      // Clone the attributes object.
      const attrsClone = Object.assign({}, attributes);
      // Assign new value to cloned attribute key.
      attrsClone[key] = value || attributes[key];
      // Set the attributes using the cloned object.
      setAttributes(attrsClone);
    }
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
    });
    setAttributes({
      appIconStyle: 'standard',
      embedType: attributes.embedType,
      item: {},
      iframeSrc: '',
      musicID: 0,
      textLockUpStyle: 'standard-black',
    });
  }

  /**
   * Check if an item has been selected.
   */
  isMusicSet() {
    const { attributes } = this.props;
    if (attributes.musicID) {
      return true;
    }
    return false;
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
            <PanelBody title={__('Apple Music Settings', 'apple-music')}>
              {
                ! this.state.isMusicSet &&
                <SearchTools
                  attributes={attributes}
                  updateSearch={this.updateAttributes}
                />
              }
              {
                this.state.isMusicSet &&
                <div>
                  <BackToSearch onClick={() => this.resetSearch()} />
                  <DisplayTools
                    attributes={attributes}
                    onChange={this.updateAttributes}
                  />
                </div>
              }
            </PanelBody>
          </InspectorControls>
        }
        {
          isSelected &&
            <div className={styles.musicTools}>
              {
                ! this.state.isMusicSet &&
                <div>
                  <h3 className={styles.introText}>
                    {__(
                      'Get badges, links, and widgets for Apple Music.',
                      'apple-music'
                    )}
                  </h3>
                  <SearchTools
                    attributes={attributes}
                    updateSearch={this.updateAttributes}
                    inPanel={false}
                  />
                </div>
              }
              {
                this.state.isMusicSet &&
                <div>
                  <BackToSearch
                    onClick={() => this.resetSearch()}
                    inPanel={false}
                  />
                  <DisplayTools
                    attributes={attributes}
                    onChange={this.updateAttributes}
                    inPanel={false}
                  />
                </div>
              }
              {
                ! this.state.isMusicSet &&
                <ResultsWrapper
                  className={styles.itemWrapper}
                  attributes={attributes}
                  onSelect={this.setMusicSelection}
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
    iframeSrc: PropTypes.string,
    item: PropTypes.shape({
      attributes: PropTypes.any,
      id: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  className: PropTypes.string.isRequired,
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
};

export default MusicBlock;
