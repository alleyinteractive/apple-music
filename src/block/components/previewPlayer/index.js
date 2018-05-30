import React from 'react';
import PropTypes from 'prop-types';

const { RawHTML } = wp.element;

// Internationalization
const { __ } = wp.i18n;

/**
 * The Preview Player component displays the iframe for embedding on
 * the front end and in the edit view.
 * Uses the Gutenberg RawHTML component.
 */
const PreviewPlayer = ({
  height,
  iframeSrc,
  title,
  width,
}) => {
  // if there is no iframeSrc return null.
  if (! iframeSrc) {
    return null;
  }
  // Setup the iframe for display
  const iframeHTML = `<iframe
    src="${iframeSrc}"
    height="${height}"
    width="${width}"
    title="${title}"
    frameborder="0"></iframe>`;

  return (
    <div className="apple-music-embed-wrapper">
      <RawHTML>
        {iframeHTML}
      </RawHTML>
    </div>
  );
};

PreviewPlayer.defaultProps = {
  title: __('Apple Music Preview Player', 'apple-music'),
};

PreviewPlayer.propTypes = {
  height: PropTypes.string.isRequired,
  iframeSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  width: PropTypes.string.isRequired,
};

export default PreviewPlayer;
