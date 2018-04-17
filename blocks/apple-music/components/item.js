import React from 'react';
import PropTypes from 'prop-types';

const {
  Button,
} = window.wp.components;

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
  if (item.attributes.artwork && item.attributes.artwork.url) {
    const imageSrc = item.attributes.artwork.url
      .replace('{w}', '118').replace('{h}', '118');

    artwork = imageSrc ? (
      <div className="apple-music-item-artwork">
        <img src={imageSrc} alt="meaningful text" />
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
