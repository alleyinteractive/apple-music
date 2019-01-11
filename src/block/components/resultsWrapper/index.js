import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import MusicItem from 'Components/musicItem';
import {
  baseURL,
  get,
  searchCatalog,
  getItems,
} from 'API';
import { getNestedObject, ucFirst } from 'Utils';

import styles from './resultsWrapper.css';

const { Component, Fragment } = wp.element;
const { Button, Dashicon } = wp.components;

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
      next: '',
      paginated: false,
      offset: 24,
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
    if (prevProps.attributes.query !== query ||
      prevProps.attributes.musicType !== musicType) {
      this.resetPagination();
    }
  }

  /**
   * Get the music items response from the API.
   * @returns {promise} resolves to set the state with an array items.
   */
  getResponse(type, term) {
    const offset = this.state.paginated ? this.state.offset : '';
    searchCatalog(term, type, 24, offset)
      .then((data) => {
        const result = getNestedObject(data, ['results', type]);
        this.setState({
          data: result || [],
          next: getNestedObject(result, ['next']) || '',
        });
      });
  }

  /**
   * Reset the pagination
   */
  resetPagination() {
    this.setState({
      offset: 24,
      paginated: false,
    });
  }

  /**
   * Get the next page.
   */
  paginate() {
    const { attributes: { musicType } } = this.props;

    const { offset, next } = this.state;
    const endpoint = next ? `${baseURL}${next}&limit=24` : '';

    get(endpoint).then((data) => {
      const result = getNestedObject(data, ['results', musicType]);

      this.setState({
        data: result || [],
        next: getNestedObject(result, ['next']) || '',
        paginated: true,
        offset: offset + 24,
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
      paginated: false,
    });
    // Pass the item to the parent.
    onSelect(item);
  }

  // Component Render method.
  render() {
    const {
      attributes: { musicType },
    } = this.props;

    const results = getItems(this.state.data)
      .map((item) => (
        <MusicItem
          key={item.id}
          item={item}
          onClick={() => this.selectItem(item)}
        />
      ));

    return (
      <Fragment>
        {
          0 !== this.state.data.length &&
          <div className={styles.resultsBubbleHeader}>
            <h3>{ucFirst(musicType)}</h3>
            {
              this.state.next &&
                <Button
                  className={styles.viewControl}
                  onClick={() => this.paginate()}
                >
                  {__('Next', 'connect-to-apple-music')}
                  <Dashicon icon="arrow-right-alt2" />
                </Button>
            }
          </div>
        }
        <div className={styles.itemWrapper}>
          {results}
        </div>
      </Fragment>
    );
  }
}

ResultsWrapper.propTypes = {
  attributes: PropTypes.shape({
    query: PropTypes.string,
    musicType: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ResultsWrapper;
