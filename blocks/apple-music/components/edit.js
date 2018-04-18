import React from 'react';
import DisplayTools from './displayTools';
import ResultsWrapper from './resultsWrapper';
import SearchTools from './searchTools';
import { iframeURL } from '../api';
import {
  getObjKeyValue,
  getTypeObject,
} from '../utils';

// Internationalization
const { __ } = window.wp.i18n;
// Extend component
const { Component } = window.wp.element;
const { Button } = window.wp.components;

const { InspectorControls } = window.wp.blocks;
const { PanelBody } = window.wp.components;

class AppleMusicBlock extends Component {
  /**
   * Component constructor
   * @param {object} props This component's props.
   */
  constructor(props) {
    super(props);
    this.state = {
      musicItem: {},
      isMusicSet: false,
    };
    this.setMusicType = this.setMusicType.bind(this);
    this.searchTerm = this.searchTerm.bind(this);
    this.setMusicID = this.setMusicID.bind(this);
    this.updateAttributes = this.updateAttributes.bind(this);
  }

  /**
   * Update the musicID attribute and add the musicItem object to state.
   * @param {object} item The selected item.
   */
  setMusicID(item) {
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
      musicItem: item,
      isMusicSet: true,
    });

    setAttributes({
      musicID,
      iframeSrc: iframeURL(musicType, musicID),
      height: initialHeight,
    });
  }

  /**
   * On Select assign the musicType attribute.
   * @param {string} musicType The music type.
   */
  setMusicType(musicType) {
    const { setAttributes } = this.props;
    setAttributes({ musicType });
  }

  /**
   * Get the search query and update the block.
   * @param  {string} query The query from the search field.
   */
  searchTerm(query) {
    const { setAttributes } = this.props;
    setAttributes({ query });
  }

  /**
   * Update the attributes callback.
   * @param {string} value the value to set the attribute.
   * @param {string} key the key of the attribute, which attribute to set.
   */
  updateAttributes(value, key) {
    const { attributes, setAttributes } = this.props;

    setAttributes({
      width: 'width' === key ? value : attributes.width,
      height: 'height' === key ? value : attributes.height,
      embedType: 'embedType' === key ? value : attributes.embedType,
    });
  }

  /**
   * Reset the search and clear selection.
   */
  resetSearch() {
    this.setState({
      musicItem: {},
      isMusicSet: false,
    });
  }

  // Component Render method.
  render() {
    const {
      attributes: {
        height,
        iframeSrc,
        musicType,
        query,
        width,
      },
      isSelected,
      className,
    } = this.props;

    return (
      <div>
        { isSelected &&
          <InspectorControls key="inspector">
            <PanelBody title={__('Apple Music Settings', 'apple-music')}>
              <SearchTools
                query={query}
                musicType={musicType}
                updateSearchTerm={this.searchTerm}
                setMusicType={this.setMusicType}
              />
              {
                this.state.isMusicSet &&
                <DisplayTools
                  item={this.state.musicItem}
                  width={width}
                  height={height}
                  onChange={this.updateAttributes}
                  iframeURL={iframeSrc}
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
                <SearchTools
                  query={query}
                  musicType={musicType}
                  updateSearchTerm={this.searchTerm}
                  setMusicType={this.setMusicType}
                />
              }
              {
                this.state.isMusicSet &&
                <div>
                  <Button
                    className="back-to-search"
                    onClick={() => this.resetSearch()}
                  >
                    {__('Back to Seach', 'apple-music')}
                  </Button>
                  <DisplayTools
                    item={this.state.musicItem}
                    width={width}
                    height={height}
                    onChange={this.updateAttributes}
                    inPanel={false}
                    iframeURL={iframeSrc}
                  />
                </div>
              }
              {
                ! this.state.isMusicSet &&
                <ResultsWrapper
                  className={className}
                  type={musicType}
                  term={query}
                  onSelect={this.setMusicID}
                />
              }
            </div>
        }
        {
          ! isSelected &&
          <div>
            {'Apple Music Front End Placeholder'}
          </div>
        }
      </div>
    );
  } // end render method.
}

export default AppleMusicBlock;
