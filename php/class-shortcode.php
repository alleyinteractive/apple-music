<?php

namespace Apple_Music;

class Shortcode {

	public function __construct() {
		add_shortcode( 'apple-music', [ $this, 'shortcode' ] );

	}

	public static function shortcode( $atts = [], $content = null, $tag = '' ) {

		$atts = array_change_key_case( (array) $atts, CASE_LOWER );

		$shortcode_atts = shortcode_atts( [
			'type'   => '',
			'name'   => '',
			'id'     => false,
			'height' => null,
			'width'  => null,
			'format' => null,
			'color'  => null,
		], $atts, $tag );

		$embeddable_types = [
			'songs'     => [
				'singular'       => 'song',
				'default_height' => '110px',
				'default_width'  => '100%',
				'default_format' => 'player',
			],
			'albums'    => [
				'singular'       => 'album',
				'default_height' => '500px',
				'default_width'  => '100%',
				'default_format' => 'player',
			],
			'playlists' => [
				'singular'       => 'playlist',
				'default_height' => '500px',
				'default_width'  => '100%',
				'default_format' => 'player',
			],
		];

		$linkable_types = [
			'artists'      => [
				'singular'       => 'artist',
				'default_format' => 'badge',
			],
			'stations'     => [
				'singular'       => 'station',
				'default_format' => 'badge',
			],
			'music-videos' => [
				'singular'       => 'music-video',
				'default_format' => 'badge',
			],
			'activities'   => [
				'singular'       => 'activity',
				'default_format' => 'badge',
			],
			'curators'     => [
				'singular'       => 'curator',
				'default_format' => 'badge',
			],
		];

		// Create a convenient array of all types.
		$all_types = array_merge( $embeddable_types, $linkable_types );

		$formats = [
			'player'      => [],
			'link'        => [],
			'badge'       => [
				'background'    => 'https://tools.applemusic.com/assets/shared/badges/en-us/music-lrg.svg',
				'default_color' => '', // Not used
				'dimensions'    => 'width:157px;height:45px;',
			],
			'text-lockup' => [
				'background'    => 'https://tools.applemusic.com/assets/shared/text-lockups/en-us/',
				'default_color' => 'standard-black.svg',
				'dimensions'    => 'width:140px;height:30px;',
			],
			'app-icon'    => [
				'background'    => 'https://tools.applemusic.com/embed/v1/app-icon.svg?hex=',
				'default_color' => '000000',
				'dimensions'    => 'width:40px;height:40px;',
			],
		];

		// Do we have everything we need?
		if ( empty( $shortcode_atts['id'] ) || empty( $shortcode_atts['type'] ) || ! array_key_exists( $shortcode_atts['type'], $all_types ) || ( array_key_exists( $shortcode_atts['type'], $linkable_types ) && 'player' === $shortcode_atts['format'] ) ) {
			return false;
		}

		// Get storefront.
		$settings   = new Settings();
		$storefront = $settings->get_storefront();

		// If necessary, set a default format.
		$format = array_key_exists( $shortcode_atts['format'], $formats ) ? $shortcode_atts['format'] : $all_types[ $shortcode_atts['type'] ]['default_format'];

		// Embeds only (album, song, playlist).
		if ( array_key_exists( $shortcode_atts['type'], $embeddable_types ) && 'player' === $format ) {

			$url = sprintf( '%1$s/%2$s/%3$s?country=%4$s',
				'https://tools.applemusic.com/embed/v1',
				$embeddable_types[ $shortcode_atts['type'] ]['singular'],
				$shortcode_atts['id'],
				$storefront
			);

			$output = sprintf( '<iframe src="%1$s" height="%2$s" width="%3$s" frameborder="0"></iframe>',
				esc_url( $url ), // 1
				$embeddable_types[ $shortcode_atts['type'] ]['default_height'], // 2
				$embeddable_types[ $shortcode_atts['type'] ]['default_width'] // 3
			);

		} else {

			$url = sprintf( '%1$s/%2$s/%3$s/%4$s/%5$s',
				'https://geo.itunes.apple.com', // 1
				$storefront, // 2
				sanitize_text_field( $all_types[ $shortcode_atts['type'] ]['singular'] ), // 3
				sanitize_title( $shortcode_atts['name'] ), // 4
				sanitize_text_field( $shortcode_atts['id'] ) // 5
			);

			// If we just want a link, we're done here.
			if ( 'link' === $format ) {
				$output = sprintf( '<a href="%1$s">%1$s</a>',
					esc_url( $url ) // 1
				);

				return $output;
			}

			// Assemble the badge/text lockup/app icon.
			$output = sprintf( '<a href="%1$s" style="display:inline-block;overflow:hidden;background:url(%2$s%3$s) no-repeat;%4$s"></a>',
				esc_url( $url ), // 1
				esc_url( $formats[ $format ]['background'] ), // 2
				esc_attr( empty( $shortcode_atts['color'] ) ? $formats[ $format ]['default_color'] : $shortcode_atts['color'] ), // 3
				esc_attr( $formats[ $format ]['dimensions'] ) // 4
			);
		}

		return $output;
	}
}
