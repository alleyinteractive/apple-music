import React from 'react';
import PropTypes from 'prop-types';
import embedTypes from '../config/embedTypes';
// import { getTypeObject } from '../utils';

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
  attributes: {
    iframeSrc,
    height,
    width,
  },
  inPanel,
  item,
  onChange,
}) => {
  // Setup the iframe for display
  const iframeHTML = `<iframe
    src="${iframeSrc}"
    height="${height}"
    width="${width}"
    frameborder="0"></iframe>`;

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
        ! inPanel && iframeSrc &&
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
  attributes: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    iframeSrc: PropTypes.string,
  }).isRequired,
  item: PropTypes.shape({
    attributes: PropTypes.any,
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  inPanel: PropTypes.bool,
};

export default DisplayTools;
