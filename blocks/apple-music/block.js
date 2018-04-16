import React from 'react';
import musicTypes from './musicTypes';
import fetch from './fetch';

// Internationalization
const { __ } = window.wp.i18n;
// Extend component
const { Component } = window.wp.element;

const { InspectorControls } = window.wp.blocks;

const {
  PanelBody,
  PanelRow,
  TextControl,
  SelectControl,
} = window.wp.components;

class AppleMusicBlock extends Component {
  /**
   * Component constructor
   * @param  {object} props This component's props.
   */
  constructor(props) {
    super(props);
    this.setMusicType = this.setMusicType.bind(this);
    this.searchTerm = this.searchTerm.bind(this);
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
    const { attributes, setAttributes } = this.props;
    setAttributes({ query });
    fetch(attributes.query, attributes.musicType)
      .then((data) => {
        console.log(data.results);
      });
  }

  render() {
    const {
      attributes,
      isSelected,
      className,
    } = this.props;

    // Get the current selected musicType object
    const typeObject = musicTypes.find((type) => (
      type.value === attributes.musicType
    ));

    return (
      <div>
        { isSelected &&
          <InspectorControls key="inspector">
            <PanelBody title={__('Apple Music Settings', 'apple-music')}>
              <TextControl
                label={`Search ${typeObject.label}`}
                value={attributes.query}
                onChange={this.searchTerm}
              />
              <PanelRow>
                <SelectControl
                  label={__('Music Type', 'apple-music')}
                  value={attributes.musicType}
                  options={musicTypes.map(({ value, label }) => (
                    { value, label }
                  ))}
                  onChange={this.setMusicType}
                />
              </PanelRow>
            </PanelBody>
          </InspectorControls>
        }
        {
          isSelected &&
            <div className="edit-apple-music">
              <TextControl
                label={`Search ${typeObject.label}`}
                value={attributes.query}
                onChange={this.searchTerm}
              />
            </div>
        }
        <div className={className}>
          <div className="display-music">
            {`Display: ${attributes.query}`}
          </div>
        </div>
      </div>
    );
  }
}

export default AppleMusicBlock;
