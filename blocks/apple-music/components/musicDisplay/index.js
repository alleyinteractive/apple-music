import React from 'react';
import PropTypes from 'prop-types';
import PreviewPlayer from 'Components/previewPlayer';
import {
  getNestedObject,
  getIconStyle,
} from 'Utils';

const { RawHTML } = window.wp.element;
/**
 * MusicDisplay component renders the HTML output of the Apple Music widget.
 * Inline anchor tags and iframes are used to output the widget in the case
 * that the user disables the plugin the content will be retained.
 */
const MusicDisplay = ({
  attributes: {
    appIconStyle,
    embedType,
    height,
    iframeSrc,
    item,
    textLockUpStyle,
    width,
  },
  className,
}) => {
  const URL = getNestedObject(item, ['attributes', 'url']);
  // default inline styles.
  let inline = `display:inline-block;background-repeat:no-repeat;
    overflow:hidden;box-shadow:none;border:none;`;
  let style = '';

  // Text Lockup style.
  if ('text-lockup' === embedType) {
    style = textLockUpStyle;
  // App Icon style
  } else if ('app-icon' === embedType) {
    style = appIconStyle;
  }
  // concatenate the inline styles.
  inline = inline.concat(getIconStyle(embedType, style));

  return (
    <div className={className}>
      {
        'preview-player' === embedType &&
        <PreviewPlayer
          height={height}
          iframeSrc={iframeSrc}
          width={width}
        />
      }
      {
        ['badge', 'text-lockup', 'app-icon'].includes(embedType) &&
        <RawHTML>
          {`<a style="${inline}" href=${URL}></a>`}
        </RawHTML>
      }
    </div>
  );
};

MusicDisplay.propTypes = {
  attributes: PropTypes.shape({
    embedType: PropTypes.string,
    height: PropTypes.string,
    iframeSrc: PropTypes.string,
    item: PropTypes.shape({
      attributes: PropTypes.any,
      id: PropTypes.string,
      type: PropTypes.string,
    }),
    musicID: PropTypes.string,
    musicType: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  className: PropTypes.string.isRequired,
};

export default MusicDisplay;
