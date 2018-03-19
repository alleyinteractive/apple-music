<?php

/**
 * Main handler for the Apple Music embed tool.
 *
 * @package Apple_Music
 */

namespace Apple_Music;

class Shortcode {
	use Util\Singleton;


	public function setup() {
		add_shortcode( 'apple-music', [ $this, 'shortcode' ] );


	}


	public static function shortcode( $atts = [ ], $content = null, $tag = '' ) {
		// normalize attribute keys, lowercase
		$atts = array_change_key_case( (array) $atts, CASE_LOWER );

		//<iframe src="https://tools.applemusic.com/embed/v1/album/1147170341?country=us" height="500px" width="100%" frameborder="0"></iframe>
		// override default attributes with user attributes
		$shortcode_atts = shortcode_atts( [
			'format' => '', // naming?
			'name'   => '', // naming?
			'id'     => false
		], $atts, $tag );

		$embeddable_formats = [
			'song',
			'album',
			'playlist',
		];

		$linkable_formats = [
			'artist',
			'station',
			'music-video',
		];

		$link_attributes = [
			'badge'       => [
				'background' => 'https://tools.applemusic.com/assets/shared/badges/en-us/music-lrg.svg',
				'dimensions' => 'width:157px;height:45px;',
			],
			'text-lockup' => [
				'background' => 'https://tools.applemusic.com/assets/shared/text-lockups/en-us/standard-black.svg', // varies
				'dimensions' => 'width:140px;height:30px;',
			],
			'app-icon'    => [
				'background' => 'https://tools.applemusic.com/embed/v1/app-icon.svg?hex=000000', // varies
				'dimensions' => 'width:40px;height:40px;',
			],
		];

		if ( empty( $shortcode_atts['id'] ) || empty( $shortcode_atts['format'] ) || ! in_array( $shortcode_atts['format'], array_merge( $embeddable_formats, $linkable_formats ), true ) ) {
			return;
		}


		$settings   = new Settings();
		$storefront = $settings->get_storefront();

		// Embeds only (album, song, playlist)
		if ( in_array( $shortcode_atts['format'], $embeddable_formats, true ) ) {
			
			$url = sprintf( '%1$s/%2$s/%3$s?country=%4$s',
				'https://tools.applemusic.com/embed/v1',
				$shortcode_atts['format'],
				$shortcode_atts['id'],
				$storefront
			);

			$output = '<iframe src="' . esc_url( $url ) . '" height="500px" width="100%%" frameborder="0"></iframe>';

		}

		if ( in_array( $shortcode_atts['format'], $linkable_formats, true ) ) {

			$url = sprintf( '%1$s/%2$s/%3$s/%4$s/%5$s?%6$s',
				'https://geo.itunes.apple.com', // 1
				$storefront, // 2
				sanitize_text_field( $shortcode_atts['format'] ), // 3
				sanitize_text_field( $shortcode_atts['name'] ), // 4
				sanitize_text_field( $shortcode_atts['id'] ), // 5
				'mt=5&app=music' // 6
			);

			$output = sprintf( '<a href="%1$s" style="display:inline-block;overflow:hidden;background:url(%2$s) no-repeat;%3$s"></a>',
				esc_url( $url ), // 1
				esc_url( $link_attributes['app-icon']['background'] ), // 2
				esc_attr( $link_attributes['app-icon']['dimensions'] ) // 3

			);
		}

		return $output;
	}

}

