<?php
namespace Apple_Music;

/**
 * Server-side rendering of the `core/latest-posts` block.
 *
 * @package gutenberg
 */

/**
 * Renders the `core/latest-posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function render_block_core_apple_music( $attributes ) {

	?>
	<div class="wp-block-apple-music-demo">
		<?php echo esc_html( $attributes['music'] ); ?>
	</div>
	<?php

	return $block_content;
}

/**
 * Registers the `core/latest-posts` block on server.
 */
function register_block_core_apple_music() {
	register_block_type( 'apple-music/demo', [
		'attributes' => [
			'music' => [
				'type' => 'string',
			],
			'musicType' => [
				'type'    => 'string',
				'default' => 'artists',
			],
		],
		'render_callback' => 'render_block_core_apple_music',
	] );
}
if ( function_exists( 'register_block_type' ) ) {
	add_action( 'init', 'register_block_core_apple_music' );
}
