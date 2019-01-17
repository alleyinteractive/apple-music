<?php

/**
 * Class to handle Connect to Apple Music Gutenberg blocks.
 *
 * @package Connect_to_Apple_Music
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
			CTAM_PLUGIN_DIR_URL . 'dist/js/block.bundle.min.js',
			[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api' ],
			APPLE_MUSIC_VERSION,
			true
		);

		// Get storefront.
		$storefront = Settings::get_storefront();

		wp_localize_script(
			'apple-music-block',
			'appleMusicBlock',
			[
				'storefront'     => ! empty( $storefront ) ? sanitize_text_field( $storefront ) : 'us',
				'affiliateToken' => Settings::get_affiliate_token(),
			]
		);
	}

	/**
	 * Enqueues assets for front and back end.
	 */
	public function enqueue_block_assets() {
		wp_enqueue_style(
			'apple-music-styles',
			CTAM_PLUGIN_DIR_URL . 'dist/css/block.min.css',
			'',
			APPLE_MUSIC_VERSION
		);
	}
}
