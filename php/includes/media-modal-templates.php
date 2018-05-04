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
				placeholder="<?php echo esc_attr__( 'Search Apple Music', 'apple-music' ); ?>"
			>
			<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'apple-music' ); ?>">
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

/**
 * Undocumented function
 *
 * @return void
 */
function sidebar() {
	?>
	<script type="text/html" id="tmpl-apple-music-sidebar">
		<h3 class="apple-music-selection">{{ data.content }}</h3>
		<p>{{ data.description }}</p>

		<form action="#" class="apple-music-select-format">
			<p class="apple-music-form-description"><?php esc_html_e( 'Choose Embed style below.', 'apple-music' ); ?></p>
			<p>
				<input type="radio" name="format" value="player" id="player">
				<label for="player">
					<span class="dashicons dashicons-controls-play"></span>
					<?php esc_html_e( 'Preview Player', 'apple-music' ); ?>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="badge" id="badge">
				<label for="badge">
					<img src="<?php echo esc_url( PLUGIN_DIR_URL . 'src/images/badge.svg' ); ?>" alt="<?php esc_html_e( 'Apple Music badge icon', 'apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="text-lockup-standard-black" id="text-lockup-standard-black">
				<label for="text-lockup-standard-black">
					<img src="<?php echo esc_url( PLUGIN_DIR_URL . 'src/images/standard-black.svg' ); ?>" alt="<?php esc_html_e( 'Apple Music standard black text lockup icon', 'apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="text-lockup-standard-white" id="text-lockup-standard-white">
				<label for="text-lockup-standard-white">
					<img src="<?php echo esc_url( PLUGIN_DIR_URL . 'src/images/standard-white.svg' ); ?>" alt="<?php esc_html_e( 'Apple Music standard white text lockup icon', 'apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="text-lockup-mono-white" id="text-lockup-mono-white">
				<label for="text-lockup-mono-white">
					<img src="<?php echo esc_url( PLUGIN_DIR_URL . 'src/images/mono-white.svg' ); ?>" alt="<?php esc_html_e( 'Apple Music mono white text lockup icon', 'apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="text-lockup-mono-black" id="text-lockup-mono-black">
				<label for="text-lockup-mono-black">
					<img src="<?php echo esc_url( PLUGIN_DIR_URL . 'src/images/mono-black.svg' ); ?>" alt="<?php esc_html_e( 'Apple Music mono black text lockup icon', 'apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="app-icon" id="app-icon">
				<label for="app-icon">
					<img src="<?php echo esc_url( PLUGIN_DIR_URL . 'src/images/app-icon-standard.svg' ); ?>" alt="<?php esc_html_e( 'Apple Music app icon', 'apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="app-icon-black" id="app-icon-black">
				<label for="app-icon-black">
					<img src="<?php echo esc_url( PLUGIN_DIR_URL . 'src/images/app-icon-black.svg' ); ?>" alt="<?php esc_html_e( 'Apple Music black app icon', 'apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="app-icon-white" id="app-icon-white">
				<label for="app-icon-white">
					<img src="<?php echo esc_url( PLUGIN_DIR_URL . 'src/images/app-icon-white.svg' ); ?>" alt="<?php esc_html_e( 'Apple Music white app icon', 'apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="link" id="link">
				<label for="link"><?php esc_html_e( 'Direct Link', 'apple-music' ); ?></label>
			</p>
		</form>
	</script>
	<?php
}
