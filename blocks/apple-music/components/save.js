import React from 'react';
import PropTypes from 'prop-types';
import PreviewPlayer from './previewPlayer';

const AppleMusicDisplay = ({
  attributes: {
    embedType,
    height,
    iframeSrc,
    width,
  },
  className,
}) => (
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
        {'THIS IS WHERE THE BADGE WILL GO'}
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

AppleMusicDisplay.propTypes = {
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
};

export default AppleMusicDisplay;
