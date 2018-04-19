import React from 'react';
import PropTypes from 'prop-types';
import { getItemArtworkURL } from '../utils';

const {
  Button,
} = window.wp.components;

// Internationalization
const { __ } = window.wp.i18n;

const AppleMusicItem = ({
  item,
  onClick,
}) => {
  // return nothing if there is no item.
  if (! item) {
    return null;
  }
  // Title
  const name = item.attributes.name ? (
    <div className="title">
      <div className="name">{item.attributes.name}</div>
    </div>) : null;

  // Artwork
  let artwork = null;
  const imageSrc = getItemArtworkURL(item);
  if (imageSrc) {
    artwork = imageSrc ? (
      <div className="apple-music-item-artwork">
        <img src={imageSrc} alt={__('Meaningful Text', 'apple-music')} />
      </div>) :
      null;
  }

  return (
    <Button
      onClick={() => onClick(item)}
    >
      <div className="apple-music-item">
        {artwork}
        {name}
      </div>
    </Button>
  );
};

AppleMusicItem.propTypes = {
  item: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AppleMusicItem;
