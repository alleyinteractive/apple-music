<?php

namespace Apple_Music;

function search( $id, $tab ) {
	?>
	<script type="text/html" id="tmpl-<?php echo esc_attr( $id ); ?>">

		<form action="#" class="apple-music-toolbar-container clearfix">
			<label for="apple-music-search"><?php esc_html_e( 'Search', 'apple-music' ); ?></label>
			<input
				type="text"
				name="<?php echo esc_attr( $tab ); ?>"
				value="{{ data.params.<?php echo esc_attr( $tab ); ?> }}"
				class="apple-music-input-text apple-music-input-search"
				size="40"
				id="apple-music-search"
				placeholder="<?php printf( esc_attr__( 'Enter a %s', 'apple-music' ), $tab ); ?>"
			>
			<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'apple-music' ) ?>">
			<div class="spinner"></div>
		</form>

	</script>
	<?php
}

function item( $id, $tab ) {
	?>
	<script type="text/html" id="tmpl-<?php echo esc_attr( $id ); ?>">
		<div id="apple-music-item-<?php echo esc_attr( $tab ); ?>-{{ data.id }}" class="apple-music-item-area" data-id="{{ data.id }}">
			<div class="apple-music-item-container clearfix">
				<div class="apple-music-thumb">
					<img src="{{ data.thumbnail }}" alt="">
				</div>
				<div class="apple-music-item-main">
					<div class="apple-music-item-content">
						{{{ data.content }}}
					</div>

				</div>
			</div>
		</div>
		<a href="#" id="apple-music-check-{{ data.id }}" data-id="{{ data.id }}" class="check" title="<?php esc_attr_e( 'Deselect', 'apple-music' ); ?>">
			<div class="media-modal-icon"></div>
		</a>
	</script>
	<?php
}

function sidebar( $id, $tab ) {
	?>
	<script type="text/html" id="tmpl-<?php echo esc_attr( $id ); ?>">
		<h3><?php _e( 'Test' ); ?></h3>
	</script>
	<?php
}
