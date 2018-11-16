<?php
/**
 * Register an embed handler for Apple Music iframe embeds. This method removes the restriction
 * on a users capabilities to embed iframes by registering Apple Music as an embed handler.
 *
 * URL is output by Gutenberg block.
 */
namespace Apple_Music;

wp_embed_register_handler(
	'apple-music',
	'/http(?:s)?\:\/\/(?:itunes|embed\.music)\.apple\.com\/([a-z]{2})\/(album|playlist|song|station)\/(?:[^\/]*\/)?(?:id)?(\d+|[a-z]{2}\.[a-z0-9\-]+)(?:\?(width|height)=(\d+)(px|%|)\+(width|height)=(\d+)(px|%|))?(?:\?i=(\d+)$)?/i',
	/**
	 * Callback function which will transform the Apple Music embed into an iframe.
	 *
	 * Example URL: https://embed.music.apple.com/us/song/626205217?width=100%+height=200px
	 * $matches: [
	 *      0 => URL,
	 *      1 => us,
	 *      2 => song,
	 *      3 => 626205217,
	 *      4 => width,
	 *      5 => 100,
	 *      6 => %,
	 *      7 => height,
	 *      8 => 200,
	 *      9 => px,
	 * ];
	 */
	function( $matches, $attr, $url, $rawattr ) {
		if ( empty( $matches ) ) {
			return;
		}

		// default width and height
		$height = '450px';
		$width  = '650px';

		// set the default for the song type.
		if ( 'song' === $matches[2] ) {
			$height = '150px';
		}

		// Get the width and units from the URL parameters
		if ( ! empty( $matches[4] ) ) {
			if ( 'width' === $matches[4] && ! empty( $matches[5] ) ) {
				$unit  = ! empty( $matches[6] ) ? $matches[6] : '';
				$width = $matches[5] . $unit;
			}
		}

		// Get the height and units from the URL parameters
		if ( ! empty( $matches[7] ) ) {
			if ( 'height' === $matches[7] && ! empty( $matches[8] ) ) {
				$unit   = ! empty( $matches[9] ) ? $matches[9] : '';
				$height = $matches[8] . $unit;
			}
		}

		// Source for embed URL
		$src = sprintf(
			'https://embed.music.apple.com/%1$s/%2$s/%3$s',
			$matches[1], // Storefront
			$matches[2], // type
			$matches[3] // ID
		);

		return sprintf(
			'<iframe frameborder="0" allow="autoplay *; encrypted-media *;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="padding:0;width:%1$s;height:%2$s;max-width:100%%;border:none;overflow:hidden;background:transparent;" src="%3$s"></iframe>',
			esc_attr( $width ),
			esc_attr( $height ),
			esc_url( Settings::apply_affiliate_token( $src ) )
		);
	},
	10,
	4
);
