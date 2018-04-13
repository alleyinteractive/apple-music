<?php

namespace Apple_Music;

class Block {

	public function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'apple_music_enqueue_block_editor_assets' ] );
		add_action( 'enqueue_block_assets', [ $this, 'apple_music_enqueue_block_assets' ] );

	}

	function apple_music_enqueue_block_editor_assets() {
		wp_enqueue_script(
			'apple-music-block',
			PLUGIN_DIR_URL . 'assets/js/blocks.bundle.min.js',
			[ 'wp-blocks', 'wp-i18n', 'wp-element', 'underscore' ],
			APPLE_MUSIC_VERSION
		);
	}


	function apple_music_enqueue_block_assets() {
		wp_enqueue_style(
			'apple-music-block',
			PLUGIN_DIR_URL . 'assets/css/block.css',
			[ 'wp-blocks' ],
			APPLE_MUSIC_VERSION
		);
	}
}
