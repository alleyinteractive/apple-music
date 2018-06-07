<?php
/**
 * Class to handle Apple Music shortcodes.
 *
 * @package Apple_Music
 */

namespace Apple_Music;

class Shortcode {

	/**
	 * Shortcode constructor.
	 */
	public function __construct() {
		add_shortcode( 'apple-music', [ $this, 'shortcode' ] );
	}

	/**
	 * Build out the shortcode.
	 *
	 * @param array $atts
	 * @param null $content
	 * @param string $tag
	 *
	 * @return bool|string
	 */
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

		$formats = [
			'player'                     => [],
			'link'                       => [],
			'badge'                      => [
				'background'    => 'https://tools.applemusic.com/assets/shared/badges/en-us/music-lrg.svg',
				'default_color' => '', // Not used
				'dimensions'    => 'width:157px;height:45px;',
			],
			'text-lockup-standard-black' => [
				'background'    => 'https://tools.applemusic.com/assets/shared/text-lockups/en-us/',
				'default_color' => 'standard-black.svg',
				'dimensions'    => 'width:140px;height:30px;',
			],
			'text-lockup-standard-white' => [
				'background'    => 'https://tools.applemusic.com/assets/shared/text-lockups/en-us/',
				'default_color' => 'standard-white.svg',
				'dimensions'    => 'width:140px;height:30px;',
			],
			'text-lockup-mono-white'     => [
				'background'    => 'https://tools.applemusic.com/assets/shared/text-lockups/en-us/',
				'default_color' => 'mono-white.svg',
				'dimensions'    => 'width:140px;height:30px;',
			],
			'text-lockup-mono-black'     => [
				'background'    => 'https://tools.applemusic.com/assets/shared/text-lockups/en-us/',
				'default_color' => 'mono-black.svg',
				'dimensions'    => 'width:140px;height:30px;',
			],
			'app-icon'                   => [
				'background'    => 'https://tools.applemusic.com/embed/v1/app-icon.svg',
				'default_color' => '',
				'dimensions'    => 'width:40px;height:40px;',
			],
			'app-icon-black'             => [
				'background'    => 'https://tools.applemusic.com/embed/v1/app-icon.svg?hex=',
				'default_color' => '000000',
				'dimensions'    => 'width:40px;height:40px;',
			],
			'app-icon-white'             => [
				'background'    => 'https://tools.applemusic.com/embed/v1/app-icon.svg?hex=',
				'default_color' => 'FFFFFF',
				'dimensions'    => 'width:40px;height:40px;',
			],
		];

		$types        = apply_filters( 'apple_music_types', [] );
		$player_types = apple_music_get_player_types();

		// Do we have everything we need?
		if ( empty( $shortcode_atts['id'] ) || empty( $shortcode_atts['type'] ) || ! array_key_exists( $shortcode_atts['type'], $types ) || ( ! array_key_exists( $shortcode_atts['type'], $player_types ) && 'player' === $shortcode_atts['format'] ) ) {
			return false;
		}

		$settings = new Settings();

		// Get storefront.
		$storefront = $settings->get_storefront();

		// Get affiliate token, if applicable.
		$affiliate_token = $settings->get_affiliate_token();

		// If necessary, set a default format.
		$format = array_key_exists( $shortcode_atts['format'], $formats ) ? $shortcode_atts['format'] : $types[ $shortcode_atts['type'] ]['default_format'];

		// Embeds only (album, song, playlist).
		if ( array_key_exists( $shortcode_atts['type'], $player_types ) && 'player' === $format ) {
			$url = sprintf( '%1$s/%2$s/%3$s/%4$s%5$s',
				'https://embed.music.apple.com', // 1
				$storefront, // 2
				$player_types[ $shortcode_atts['type'] ]['singular'], // 3
				$shortcode_atts['id'], // 4
				! empty( $affiliate_token ) ? '?at=' . $affiliate_token : '' // 5
			);

			$output = sprintf( '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="%2$s" width="%1$s" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="padding:0;width:%1$s;height:%2$s;max-width:100%%;border:none;overflow:hidden;background:transparent;" src="%3$s"></iframe>',
				$player_types[ $shortcode_atts['type'] ]['default_width'], // 1
				$player_types[ $shortcode_atts['type'] ]['default_height'], // 2
				esc_url( $url ) // 3
			);

		} else {

			$url = sprintf( '%1$s/%2$s/%3$s/%4$s/%5$s%6$s',
				'https://geo.itunes.apple.com', // 1
				$storefront, // 2
				sanitize_text_field( $types[ $shortcode_atts['type'] ]['singular'] ), // 3
				sanitize_title( $shortcode_atts['name'] ), // 4
				sanitize_text_field( $shortcode_atts['id'] ), // 5
				! empty( $affiliate_token ) ? '?at=' . $affiliate_token : '' // 6
			);

			// If we just want a link, we're done here.
			if ( 'link' === $format ) {
				$output = sprintf( '<a href="%1$s">%1$s</a>',
					esc_url( $url ) // 1
				);

				return $output;
			}

			// Assemble the badge/text lockup/app icon.
			$output = sprintf( '<a href="%1$s" style="display:inline-block;box-shadow:none;overflow:hidden;background:url(%2$s%3$s) no-repeat;%4$s"></a>',
				esc_url( $url ), // 1
				esc_url( $formats[ $format ]['background'] ), // 2
				esc_attr( empty( $shortcode_atts['color'] ) ? $formats[ $format ]['default_color'] : $shortcode_atts['color'] ), // 3
				esc_attr( $formats[ $format ]['dimensions'] ) // 4
			);
		}

		return $output;
	}
}
