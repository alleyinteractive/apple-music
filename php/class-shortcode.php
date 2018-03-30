<?php

namespace Apple_Music;

class Shortcode {

	public function __construct() {
		add_shortcode( 'apple-music', [ $this, 'shortcode' ] );

	}

	public static function shortcode( $atts = [ ], $content = null, $tag = '' ) {

		$atts = array_change_key_case( (array) $atts, CASE_LOWER );

		$shortcode_atts = shortcode_atts( [
			'format' => '',
			'name'   => '',
			'id'     => false,
			'height' => 0,
			'width'  => 0,
		], $atts, $tag );

		$embeddable_formats = [
			'songs'     => [
				'format' => 'song',
				'default_height' => '110px',
				'default_width'  => '100%',
			],
			'albums'    => [
				'format' => 'album',
				'default_height' => '500px',
				'default_width'  => '100%',
			],
			'playlists' => [
				'format' => 'playlist',
				'default_height' => '500px',
				'default_width'  => '100%',
			],
			'activities' => [
				'format'         => 'playlist',
				'default_height' => '500px',
				'default_width'  => '100%',
			],
		];

		$linkable_formats = [
			'artist'      => [],
			'station'     => [],
			'music-video' => [],
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

		if ( empty( $shortcode_atts['id'] ) || empty( $shortcode_atts['format'] ) || ! array_key_exists( $shortcode_atts['format'], array_merge( $embeddable_formats, $linkable_formats ) ) ) {
			return;
		}


		$settings   = new Settings();
		$storefront = $settings->get_storefront();

		// Embeds only (album, song, playlist)
		if ( array_key_exists( $shortcode_atts['format'], $embeddable_formats ) ) {

			$url = sprintf( '%1$s/%2$s/%3$s?country=%4$s',
				'https://tools.applemusic.com/embed/v1',
				$embeddable_formats[ $shortcode_atts['format'] ]['format'],
				$shortcode_atts['id'],
				$storefront
			);

			$output = sprintf( '<iframe src="%1$s" height="%2$s" width="%3$s" frameborder="0"></iframe>',
				esc_url( $url ), // 1
				$embeddable_formats[ $shortcode_atts['format'] ]['default_height'], // 2 also check incoming atts
				$embeddable_formats[ $shortcode_atts['format'] ]['default_width'] // 3
			);

		}

		if ( array_key_exists( $shortcode_atts['format'], $linkable_formats ) ) {

			$url = sprintf( '%1$s/%2$s/%3$s/%4$s/%5$s?%6$s',
				'https://geo.itunes.apple.com', // 1
				$storefront, // 2
				sanitize_text_field( $shortcode_atts['format'] ), // 3
				sanitize_text_field( $shortcode_atts['name'] ), // 4
				sanitize_text_field( $shortcode_atts['id'] ), // 5
				'mt=5&app=music' // 6 ??
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
