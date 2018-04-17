import React from 'react';
import musicTypes from '../musicTypes';
import ResultsWrapper from './resultsWrapper';

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
   * @param {object} props This component's props.
   */
  constructor(props) {
    super(props);
    this.setMusicType = this.setMusicType.bind(this);
    this.searchTerm = this.searchTerm.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
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
   * Update the selected item to embed.
   * @param {object} item The selected item.
   */
  updateSelected(item) {
    const { setAttributes } = this.props;
    setAttributes({ selected: item });
  }

  // Component Render method.
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
              <ResultsWrapper
                className={className}
                type={attributes.musicType}
                term={attributes.query}
                onSelect={this.updateSelected}
              />
            </div>
        }
        <div>
          {'Apple Music Front End Placeholder'}
        </div>
      </div>
    );
  } // end render method.
}

export default AppleMusicBlock;
