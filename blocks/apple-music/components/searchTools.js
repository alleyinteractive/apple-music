import React from 'react';
import PropTypes from 'prop-types';
import musicTypes from '../config/musicTypes';

const {
  TextControl,
  SelectControl,
} = window.wp.components;

// Internationalization
const { __ } = window.wp.i18n;

/**
 * Component for displaying search results in Apple Music block.
 */
const SearchTools = ({
  query,
  musicType,
  updateSearchTerm,
  setMusicType,
}) => {
  // Get the current selected musicType object
  const typeObject = musicTypes.find((type) => (
    type.value === musicType
  ));

  return (
    <div className="apple-music-search-tools">
      <TextControl
        label={`Search ${typeObject.label}`}
        value={query}
        onChange={updateSearchTerm}
      />
      <SelectControl
        label={__('Music Type', 'apple-music')}
        value={musicType}
        options={musicTypes.map(({ value, label }) => (
          { value, label }
        ))}
        onChange={setMusicType}
      />
    </div>
  );
};

SearchTools.propTypes = {
  query: PropTypes.string.isRequired,
  musicType: PropTypes.string.isRequired,
  updateSearchTerm: PropTypes.func.isRequired,
  setMusicType: PropTypes.func.isRequired,
};

export default SearchTools;
