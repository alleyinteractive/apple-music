import React from 'react';
import PropTypes from 'prop-types';
import styles from './backToSearch.css';

const {
  Button,
  Dashicon,
} = wp.components;

// Internationalization
const { __ } = wp.i18n;

/**
 * The back to search button.
 */
const BackToSearch = ({
  inPanel,
  onClick,
}) => (
  <div className={styles.backToSearchWrapper}>
    <Button
      className={inPanel ? styles.backToSearchPanel : styles.backToSearch}
      onClick={() => onClick()}
      isLarge={inPanel}
    >
      <Dashicon icon="arrow-left-alt2" />
      {__('Back to Search', 'apple-music')}
    </Button>
  </div>
);

BackToSearch.defaultProps = {
  inPanel: true,
};

BackToSearch.propTypes = {
  inPanel: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default BackToSearch;
