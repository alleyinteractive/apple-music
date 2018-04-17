import React from 'react';
import {
  searchCatalog,
  getResponseData,
  getItems,
} from '../api';

const {
  Button,
  Spinner,
} = window.wp.components;

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
      selected: '',
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

  selectItem(item) {
    this.setState({
      data: [],
      selected: item,
    });
  }

  // Component Render method.
  render() {
    const {
      className,
    } = this.props;

    const items = getItems(this.state.data);
    console.log(items);

    const results = items.map((x) => {
      // Title
      const name = x.attributes.name ? (
        <div className="title">
          <div className="name">{x.attributes.name}</div>
        </div>) : null;

      // Artwork
      let artwork = null;
      if (x.attributes.artwork && x.attributes.artwork.url) {
        const imageSrc = x.attributes.artwork.url
          .replace('{w}', '118').replace('{h}', '118');

        artwork = imageSrc ? (
          <div className="apple-music-item-artwork">
            <Spinner />
            <img src={imageSrc} alt="meaningful text" />
          </div>) :
          null;
      }

      return (
        <Button
          onClick={() => this.selectItem(x.attributes.name)}
        >
          <div className="apple-music-item">
            {artwork}
            {name}
          </div>
        </Button>
      );
    });

    return (
      <div className={className}>
        {results}
        {this.state.selected}
      </div>
    );
  }
}

export default DisplayResults;
