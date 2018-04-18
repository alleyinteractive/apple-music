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
  attributes: {
    query,
    musicType,
  },
  updateSearch,
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
        onChange={(term) => updateSearch(term, 'query')}
      />
      <SelectControl
        label={__('Music Type', 'apple-music')}
        value={musicType}
        options={musicTypes.map(({ value, label }) => (
          { value, label }
        ))}
        onChange={(type) => updateSearch(type, 'musicType')}
      />
    </div>
  );
};

SearchTools.propTypes = {
  attributes: PropTypes.shape({
    query: PropTypes.string,
    musicType: PropTypes.string,
  }).isRequired,
  updateSearch: PropTypes.func.isRequired,
};

export default SearchTools;
