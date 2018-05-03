import React from 'react';
import PropTypes from 'prop-types';
import MusicItem from 'Components/musicItem';
import {
  searchCatalog,
  getItems,
} from 'API';
import { getNestedObject } from 'Utils';

import styles from './resultsWrapper.css';

const { sprintf, __ } = window.wp.i18n;
const { Component } = window.wp.element;
const { Button } = window.wp.components;

/**
 * Component for displaying search results in Apple Music block.
 */
class ResultsWrapper extends Component {
  /**
   * Component constructor
   * @param {object} props This component's props.
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      limit: 8,
      buttonText: __('View More', 'apple-music'),
    };
    this.getResponse = this.getResponse.bind(this);
  }

  /**
   * Call the API when the component updates.
   *
   * @param {object} prevProps The previous prop state.
   * @param {object} prevState The previous State.
   */
  componentDidUpdate(prevProps, prevState) {
    const { attributes: { query, musicType } } = this.props;
    if (prevState.data === this.state.data) {
      this.getResponse(musicType, query);
    }
  }

  /**
   * Get the music items response from the API.
   * @returns {promise} resolves to set the state with an array items.
   */
  getResponse(type, term) {
    searchCatalog(term, type, this.state.limit)
      .then((data) => {
        const result = getNestedObject(data, ['results', type]);
        this.setState({
          data: result || [],
        });
      });
  }

  /**
   * Update the selected item.
   * @param {object} item The item attributes object.
   */
  selectItem(item) {
    const { onSelect } = this.props;
    this.setState({
      data: [],
    });
    // Pass the item to the parent.
    onSelect(item);
  }

  /**
   * Toggle the amount of items returned.
   */
  toggleView() {
    if (24 === this.state.limit) {
      this.setState({
        limit: 8,
        buttonText: __('View More', 'apple-music'),
      });
    } else {
      this.setState({
        limit: 24,
        buttonText: __('View Less', 'apple-music'),
      });
    }
  }

  // Component Render method.
  render() {
    const {
      className,
      attributes: { musicType },
    } = this.props;

    const results = getItems(this.state.data)
      .map((item) => (
        <MusicItem
          item={item}
          onClick={() => this.selectItem(item)}
        />
      ));

    /**
     * Capitalize the first letter of a string.
     * @param {string} string
     * @returns {string} the string with the first character capitalized.
     */
    function ucFirst(string) {
      return `${string
        .charAt(0).toUpperCase()}${string.slice(1)}`;
    }

    return (
      <div>
        {
          0 !== this.state.data.length &&
          <div className={styles.resultsBubbleHeader}>
            <h3>{ucFirst(musicType)}</h3>
            <div>
              <span className={styles.viewLabel}>
                {sprintf(__('1 - %s of 24', 'apple-music'), this.state.limit)}
              </span>
              <Button
                className={styles.viewControl}
                onClick={() => this.toggleView()}
              >
                {this.state.buttonText}
              </Button>
            </div>
          </div>
        }
        <div className={className}>
          {results}
        </div>
      </div>
    );
  }
}

ResultsWrapper.defaultProps = {
  className: '',
};

ResultsWrapper.propTypes = {
  attributes: PropTypes.shape({
    query: PropTypes.string,
    musicType: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default ResultsWrapper;
