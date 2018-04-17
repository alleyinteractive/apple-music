import React from 'react';
import {
  searchCatalog,
  getResponseData,
  getItems,
} from '../api';

const { Component } = window.wp.element;

/**
 * Component for displaying search results in Apple Music block.
 */
class DisplayResults extends Component {
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

  // Component Render method.
  render() {
    const {
      className,
    } = this.props;

    const items = getItems(this.state.data);

    const results = items.map((x) => (
      x.attributes.name ? <h3>{x.attributes.name}</h3> : null
    ));

    return (
      <div className={className}>
        {results}
      </div>
    );
  }
}

export default DisplayResults;
