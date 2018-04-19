import React from 'react';
import PropTypes from 'prop-types';
import embedTypes from '../config/embedTypes';
import {
  showEmbed,
  getItemArtworkURL,
  getNestedObject,
} from '../utils';

const {
  TextControl,
  Button,
  SandBox,
  ExternalLink,
} = window.wp.components;

// Internationalization
const { __ } = window.wp.i18n;

/**
 * Component for displaying search results in Apple Music block.
 */
const DisplayTools = ({
  attributes: {
    iframeSrc,
    item,
    height,
    musicType,
    width,
  },
  inPanel,
  onChange,
}) => {
  // Setup the iframe for display
  const iframeHTML = `<iframe
    src="${iframeSrc}"
    height="${height}"
    width="${width}"
    frameborder="0"></iframe>`;

  const embed = showEmbed(musicType) ? (
    <div>
      <SandBox html={iframeHTML} />
    </div>
  ) : null;

  const directLink = getNestedObject(item, ['attributes', 'url']);
  const imageSrc = getItemArtworkURL(item, '200', '200');
  const name = getNestedObject(item, ['attributes', 'name']);

  const artwork = ! showEmbed(musicType) ? (
    <div>
      {
        imageSrc &&
        <div className="image">
          <img src={imageSrc} alt={__(name, 'apple-music')} />
        </div>
      }
      {
        name &&
        <div className="right-side">
          <div className="name">
            {getNestedObject(item, ['attributes', 'name'])}
          </div>
        </div>
      }
    </div>
  ) : null;

  const artistName = getNestedObject(item, ['attributes', 'artistName']);

  return (
    <div>
      {
        showEmbed(musicType) &&
        <div>
          <h1>{name}</h1>
          <div>
            {
              artistName &&
                <div className="secondary">{artistName}</div>
            }
          </div>
          <TextControl
            label={__('Height', 'apple-music')}
            value={height}
            onChange={(value) => onChange(value, 'height')}
            placeholder={height}
          />
          <TextControl
            label={__('Width', 'apple-music')}
            value={width}
            onChange={(value) => onChange(value, 'width')}
            placeholder={width}
          />
        </div>
      }
      {! inPanel && embed}
      {! inPanel && artwork}
      {
        embedTypes.map(({ value, label }) => {
          // If the musicType doesn't support embeds don't show preview player.
          if ('preview-player' === value && ! showEmbed(musicType)) {
            return null;
          }
          return (
            <Button
              key={value}
              onClick={() => onChange(value, 'embedType')}
            >
              {__(label, 'apple-music')}
            </Button>
          );
        })
      }
      {
        ! inPanel &&
        <div>
          {__('Direct Link: ', 'apple-music')}
          <ExternalLink href={directLink}>
            {directLink}
          </ExternalLink>
        </div>
      }
    </div>
  );
};

DisplayTools.defaultProps = {
  inPanel: true,
};

DisplayTools.propTypes = {
  attributes: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    iframeSrc: PropTypes.string,
    item: PropTypes.shape({
      attributes: PropTypes.any,
      id: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  inPanel: PropTypes.bool,
};

export default DisplayTools;
