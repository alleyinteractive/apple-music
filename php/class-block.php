<?php

/**
 * Class to handle Apple Music Gutenberg blocks.
 *
 * @package Apple_Music
 */
namespace Apple_Music;

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
			PLUGIN_DIR_URL . 'dist/js/block.bundle.min.js',
			[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
			APPLE_MUSIC_VERSION
		);
		// get the Apple Music settings to pass to the blocks script.
		$settings = new Settings();
		// Get storefront.
		$storefront = $settings->get_storefront();

		wp_localize_script(
			'apple-music-block',
			'appleMusicBlock',
			[
				'storefront'     => ! empty( $storefront ) ? sanitize_text_field( $storefront ) : 'us',
				'affiliateToken' => $settings->get_affiliate_token(),
			]
		);
	}

	/**
	 * Enqueues assets for front and back end.
	 */
	public function enqueue_block_assets() {
		wp_enqueue_style(
			'apple-music-styles',
			PLUGIN_DIR_URL . 'dist/css/block.min.css',
			'',
			APPLE_MUSIC_VERSION
		);
	}
}
