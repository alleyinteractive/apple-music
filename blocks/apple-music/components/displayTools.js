import React from 'react';
import PropTypes from 'prop-types';
import { storefront } from '../settings';

const { Component } = window.wp.element;

/**
 * Component for displaying search results in Apple Music block.
 */
class DisplayTools extends Component {
  /**
   * Component constructor
   * @param {object} props This component's props.
   */
  constructor(props) {
    super(props);
    this.state = {
      height: '500px',
      width: '100%',
    };
  }

  // Component Render method.
  render() {
    const {
      item,
    } = this.props;

    const { height, width } = this.state;
    // TODO USE EMBED.
    const iframe = (<iframe
      src={`https://tools.applemusic.com/embed/v1/${item.type}/${item.id}?country=${storefront}`}
      height={height}
      width={width}
      frameBorder="0"
      title="Unique Title Prop"
    />);

    return (
      <div>
        {iframe}
        {'Display Tools Here'}
      </div>
    );
  }
}

DisplayTools.propTypes = {
  item: PropTypes.shape({
    attributes: PropTypes.any,
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default DisplayTools;
