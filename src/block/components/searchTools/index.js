import React from 'react';
import PropTypes from 'prop-types';
import musicTypes from 'Config/musicTypes';
import styles from './searchTools.css';

const {
  TextControl,
  SelectControl,
} = wp.components;

// Internationalization
const { __, sprintf } = wp.i18n;

/**
 * Component for displaying search results in Apple Music block.
 */
const SearchTools = ({
  attributes: {
    query,
    musicType,
  },
  setAttributes,
  inPanel,
}) => {
  // Get the current selected musicType object
  const typeObject = musicTypes.find((type) => (
    type.value === musicType
  ));

  // apply appropriate classname for context
  const className = inPanel ? 'search-tools-panel' : styles.searchTools;

  return (
    <div className={className}>
      <TextControl
        value={query}
        placeHolder={sprintf(__('Search %s', 'apple-music'), typeObject.label)}
        className={styles.search}
        onChange={(term) => setAttributes({ query: term })}
      />
      <SelectControl
        label={__('Music Type', 'apple-music')}
        value={musicType}
        options={musicTypes.map(({ value, label }) => (
          { value, label }
        ))}
        className={styles.select}
        onChange={(type) => setAttributes({ musicType: type })}
      />
    </div>
  );
};

SearchTools.defaultProps = {
  inPanel: true,
};

SearchTools.propTypes = {
  attributes: PropTypes.shape({
    query: PropTypes.string,
    musicType: PropTypes.string,
  }).isRequired,
  setAttributes: PropTypes.func.isRequired,
  inPanel: PropTypes.bool,
};

export default SearchTools;
