<?php

namespace Apple_Music;
/**
 * Apple music Gutenburg block class.
 */
class Block {
	/**
	 * Block Construct
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_block_assets' ] );
	}

	/**
	 * Enqueue block editor only JavaScript and CSS
	 */
	public function enqueue_block_editor_assets() {
		wp_enqueue_script(
			'apple-music-block',
			PLUGIN_DIR_URL . 'assets/js/blocks.bundle.min.js',
			[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
			APPLE_MUSIC_VERSION
		);
		// get the Apple Music settings to pass to the blocks script.
		$settings   = get_option( 'apple_music_options' );
		$storefront = ! empty( $settings['storefront'] ) ? sanitize_text_field( $settings['storefront'] ) : 'us';

		wp_localize_script(
			'apple-music-block',
			'appleMusicBlock',
			[
				'storefront' => $storefront,
			]
		);
	}

	/**
	 * Enqueue front end and editor JavaScript and CSS
	 */
	public function enqueue_block_assets() {
		wp_enqueue_style(
			'apple-music-block',
			PLUGIN_DIR_URL . 'assets/css/block.css',
			[ 'wp-blocks' ],
			APPLE_MUSIC_VERSION
		);
	}
}
