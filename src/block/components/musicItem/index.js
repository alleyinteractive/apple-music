import React from 'react';
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';
import {
  getItemArtworkURL,
  getNestedObject,
} from 'Utils';
import placeholder from 'Images/apple.png';

// Css
import styles from './musicItem.css';

const {
  Button,
} = wp.components;

const MusicItem = ({
  item,
  onClick,
}) => {
  // return nothing if there is no item.
  if (! item) {
    return null;
  }

  const name = getNestedObject(item, ['attributes', 'name']);
  const artistName = getNestedObject(item, ['attributes', 'artistName']);
  const imageSrc = getItemArtworkURL(item) || placeholder;

  return (
    <Button
      onClick={() => onClick(item)}
    >
      <div className={styles.musicItem}>
        {
          imageSrc &&
          <div className={styles.artwork}>
            <img
              src={imageSrc}
              alt={sprintf(__('Album art: %s', 'connect-to-apple-music'), name)}
              className={styles.artworkImage}
            />
          </div>
        }
        { // the name of the music item.
          name &&
          <div className={styles.title}>
            <div className={styles.name}>{name}</div>
            <div className={styles.artistName}>{artistName}</div>
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
