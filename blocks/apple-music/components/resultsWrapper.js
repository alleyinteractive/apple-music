import React from 'react';
import PropTypes from 'prop-types';
import AppleMusicItem from './item';
import {
  searchCatalog,
  getResponseData,
  getItems,
} from '../api';

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
    const { term, type } = this.props;
    if (prevState.data === this.state.data) {
      this.getResponse(type, term);
    }
  }

  /**
   * Get response from API.
   */
  getResponse(type, term) {
    searchCatalog(term, type)
      .then((data) => {
        const result = getResponseData(data, type);
        if (result) {
          this.setState({
            data: result,
          });
        }
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
        <AppleMusicItem
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
  className: PropTypes.string,
  term: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ResultsWrapper;
