import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memize';
import { stringify } from 'querystring';

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
    const { height, embedURL, width } = this.props;
    // concatenate the URL params to the embedURL.
    wpEmbedAPI(embedURL)
      .then(
        (obj) => {
          if (this.unmounting) {
            return;
          }
          const { html } = obj;
          if (html) {
            this.setState({ html });
          }
        },
        /**
         * Fallback for instances where the WP API returns a 404 for the embed handler.
         */
        () => {
          this.setState({
            /* eslint-disable max-len */
            html: `<iframe frameborder="0" allow="autoplay; encrypted-media" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="padding:0;width:${width};height:${height};max-width:100%;border:none;overflow:hidden;background:transparent;" src="${embedURL}"></iframe>`,
            /* eslint-enable max-len */
          });
        }
      );
  }

  render() {
    // if there is no embedURL return null.
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
  embedURL: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default PreviewPlayer;
