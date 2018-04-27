import React from 'react';
import PropTypes from 'prop-types';
import PreviewPlayer from 'Components/previewPlayer';
import { getNestedObject } from 'Utils';

const { RawHTML } = window.wp.element;

const MusicDisplay = ({
  attributes: {
    embedType,
    height,
    iframeSrc,
    item,
    width,
  },
  className,
}) => {
  const URL = getNestedObject(item, ['attributes', 'url']);
  const badge = `<a href=${URL} style="display:inline-block;overflow:hidden;background:url(https://tools.applemusic.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;width:157px;height:45px;"></a>`;

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
        'badge' === embedType &&
        <div>
          <RawHTML>
            {badge}
          </RawHTML>
        </div>
      }
      {
        'text-lockup' === embedType &&
        <div>
          {'THIS IS WHERE THE TEXT LOCKUP WILL GO'}
        </div>
      }
      {
        'app-icon' === embedType &&
        <div>
          {'THIS IS WHERE THE APP ICON WILL GO'}
        </div>
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
