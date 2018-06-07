import React from 'react';
import PropTypes from 'prop-types';
// import { __ } from '@wordpress/i18n';
import memoize from 'memize';
import { stringify } from 'querystring';
import { iframeURL } from 'Utils';

const { Component, RawHTML } = wp.element;

/**
 * Get the wp API embed HTML and provider object
 * Borrowed from the core/embed block.
 *
 * @see https://github.com/WordPress/gutenberg/blob/master/core-blocks/embed/index.js
 *
 * Caches the embed API calls, so if blocks get transformed, or deleted and added again, we don't spam the API.
 */
const wpEmbedAPI = memoize((url) =>
  wp.apiRequest({ path: `/oembed/1.0/proxy?${stringify({ url })}` }));

/**
 * The Preview Player component displays the iframe for embedding on
 * the front end and in the edit view.
 * Uses the Gutenberg RawHTML component.
 */
class PreviewPlayer extends Component {
  /**
   * Component constructor
   * @param {object} props This component's props.
   */
  constructor(props) {
    super(props);
    this.state = {
      html: '',
    };

    this.doServerSideRender = this.doServerSideRender.bind(this);
  }

  componentWillMount() {
    this.doServerSideRender();
  }

  /**
   * Do a server side render of the iframe embed provided by the wpEmbedAPI.
   * This sets the state of the preview with the iframe markup provided by the wp_embed_register_handler
   */
  doServerSideRender(event) {
    if (event) {
      event.preventDefault();
    }
    const { height, iframeSrc, width } = this.props;
    // concatenate the URL params to the iframeSrc.
    const url = iframeURL(iframeSrc, width, height);
    wpEmbedAPI(url).then((obj) => {
      if (this.unmounting) {
        return;
      }
      const { html } = obj;
      if (html) {
        this.setState({ html });
      }
    });
  }

  render() {
    // if there is no iframeSrc return null.
    if ('' === this.state.html) {
      return null;
    }

    // Setup the iframe for display
    return (
      <div className="apple-music-embed-wrapper">
        <RawHTML>
          {this.state.html}
        </RawHTML>
      </div>
    );
  }
}

PreviewPlayer.propTypes = {
  height: PropTypes.string.isRequired,
  iframeSrc: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default PreviewPlayer;
