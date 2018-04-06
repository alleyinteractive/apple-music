<?php

defined( 'ABSPATH' ) || exit;

add_action( 'enqueue_block_editor_assets', 'enqueue_block_editor_assets' );

function enqueue_block_editor_assets() {
	wp_enqueue_script(
		'apple-music-block',
		PLUGIN_DIR_URL . 'js/block.js',
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'underscore' ),
		APPLE_MUSIC_VERSION
	);
}

add_action( 'enqueue_block_assets', 'enqueue_block_assets' );

function enqueue_block_assets() {
	wp_enqueue_style(
		'apple-music-block',
		PLUGIN_DIR_URL . 'css/block.css',
		array( 'wp-blocks' ),
		APPLE_MUSIC_VERSION
	);
}
