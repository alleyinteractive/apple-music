import React from 'react';
import PropTypes from 'prop-types';
import DisplayTools from '../displayTools';
import ResultsWrapper from '../resultsWrapper';
import SearchTools from '../searchTools';
import MusicDisplay from '../musicDisplay';
import { iframeURL } from '../../api';
import {
  getObjKeyValue,
  getTypeObject,
} from '../../utils';

// Internationalization
const { __ } = window.wp.i18n;
// Extend component
const { Component } = window.wp.element;
const { IconButton } = window.wp.components;

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

    setAttributes({
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
    // TODO: this could be less repetitive.
    setAttributes({
      width: 'width' === key ? value : attributes.width,
      height: 'height' === key ? value : attributes.height,
      embedType: 'embedType' === key ? value : attributes.embedType,
      query: 'query' === key ? value : attributes.query,
      musicType: 'musicType' === key ? value : attributes.musicType,
    });
  }

  /**
   * Reset the search and clear selection.
   */
  resetSearch() {
    const { setAttributes } = this.props;
    this.setState({
      isMusicSet: false,
    });
    setAttributes({
      item: {},
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
      isSelected,
      className,
    } = this.props;

    return (
      <div>
        { isSelected &&
          <InspectorControls key="inspector">
            <PanelBody title={__('Apple Music Settings', 'apple-music')}>
              <SearchTools
                attributes={attributes}
                updateSearch={this.updateAttributes}
              />
              {
                this.state.isMusicSet &&
                <DisplayTools
                  attributes={attributes}
                  onChange={this.updateAttributes}
                />
              }
            </PanelBody>
          </InspectorControls>
        }
        {
          isSelected &&
            <div className="edit-apple-music">
              {
                ! this.state.isMusicSet &&
                <div>
                  {__(
                    'Get badges, links, and widgets for Apple Music.',
                    'apple-music'
                  )}
                  <SearchTools
                    attributes={attributes}
                    updateSearch={this.updateAttributes}
                  />
                </div>
              }
              {
                this.state.isMusicSet &&
                <div>
                  <IconButton
                    icon="arrow-left-alt2"
                    className="back-to-search"
                    onClick={() => this.resetSearch()}
                  >
                    {__('Back to Seach', 'apple-music')}
                  </IconButton>
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
                  className={className}
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
  setAttributes: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default MusicBlock;
