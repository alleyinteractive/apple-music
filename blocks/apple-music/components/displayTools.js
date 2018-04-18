import React from 'react';
import PropTypes from 'prop-types';
import embedTypes from '../config/embedTypes';

const {
  TextControl,
  Button,
  SandBox,
} = window.wp.components;

// Internationalization
const { __ } = window.wp.i18n;

/**
 * Component for displaying search results in Apple Music block.
 */
const DisplayTools = ({
  iframeURL,
  inPanel,
  item,
  height,
  width,
  onChange,
}) => {
  // Setup the iframe for display
  const iframeHTML = `<iframe
    src="${iframeURL}"
    height="${height}"
    width="${width}"
    frameborder="0"></iframe>`;
  console.log(item);

  return (
    <div>
      {
        ! inPanel &&
        <div>
          <h1>{item.attributes.name}</h1>
          {
            Object.prototype.hasOwnProperty
              .call(item.attributes, 'artistName') &&
              <div className="secondary">{item.attributes.artistName}</div>
          }
        </div>
      }
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
      {
        ! inPanel && iframeURL &&
        <div>
          <SandBox html={iframeHTML} />
        </div>
      }
      {
        embedTypes.map(({ value, label }) => (
          <Button
            onClick={() => onChange(value, 'embedType')}
          >
            {__(label, 'apple-music')}
          </Button>
        ))
      }
    </div>
  );
};

DisplayTools.defaultProps = {
  inPanel: true,
};

DisplayTools.propTypes = {
  item: PropTypes.shape({
    attributes: PropTypes.any,
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inPanel: PropTypes.bool,
  iframeURL: PropTypes.string.isRequired,
};

export default DisplayTools;
