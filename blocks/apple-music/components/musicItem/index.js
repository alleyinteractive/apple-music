import React from 'react';
import PropTypes from 'prop-types';
import {
  getItemArtworkURL,
  getNestedObject,
} from '../../utils';

const {
  Button,
} = window.wp.components;

// Internationalization
const { __ } = window.wp.i18n;

const MusicItem = ({
  item,
  onClick,
}) => {
  // return nothing if there is no item.
  if (! item) {
    return null;
  }

  const name = getNestedObject(item, ['attributes', 'name']);
  const imageSrc = getItemArtworkURL(item);

  return (
    <Button
      onClick={() => onClick(item)}
    >
      <div className="apple-music-item">
        {
          imageSrc &&
          <div className="apple-music-item-artwork">
            <img src={imageSrc} alt={__('Meaningful Text', 'apple-music')} />
          </div>
        }
        { // the name of the music item.
          name &&
          <div className="title">
            <div className="name">{name}</div>
          </div>
        }
      </div>
    </Button>
  );
};

MusicItem.propTypes = {
  item: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MusicItem;
