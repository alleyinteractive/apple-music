import React from 'react';
import PropTypes from 'prop-types';
import MusicItem from '../musicItem';
import {
  searchCatalog,
  getItems,
} from '../../api';
import { getNestedObject } from '../../utils';

const { Component } = window.wp.element;

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
    searchCatalog(term, type)
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

  // Component Render method.
  render() {
    const {
      className,
    } = this.props;

    const results = getItems(this.state.data)
      .map((item) => (
        <MusicItem
          item={item}
          onClick={() => this.selectItem(item)}
        />
      ));

    return (
      <div className={className}>
        {results}
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
