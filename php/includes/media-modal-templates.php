<?php

namespace Apple_Music;

function search() {
	?>
	<script type="text/html" id="tmpl-apple-music-search">

		<form action="#" class="apple-music-toolbar-container clearfix">
			<label for="apple-music-search"><?php esc_html_e( 'Search', 'connect-to-apple-music' ); ?></label>
			<!-- Input name below should come from the data -->
			<input
				type="text"
				name="{{ data.id }}"
				value=""
				class="apple-music-input-text apple-music-input-search"
				size="40"
				id="apple-music-search"
				placeholder="<?php echo esc_attr__( 'Search Apple Music', 'connect-to-apple-music' ); ?>"
			>
			<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'connect-to-apple-music' ); ?>">
			<div class="spinner"></div>
		</form>

	</script>
	<?php
}

function item() {
	?>
	<!-- Is data.tab available? -->
	<script type="text/html" id="tmpl-apple-music-item">
		<div id="apple-music-item-{{ data.tab }}-{{ data.id }}" class="apple-music-item-area" data-id="{{ data.id }}">
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
		<a href="#" id="apple-music-check-{{ data.id }}" data-id="{{ data.id }}" class="check" title="<?php esc_attr_e( 'Deselect', 'connect-to-apple-music' ); ?>">
			<div class="media-modal-icon"></div>
		</a>
	</script>
	<?php
}

/**
 * Apple Music media modal sidebar.
 *
 * @return HTML for sidebar media modal sidebar form.
 */
function sidebar() {
	?>
	<script type="text/html" id="tmpl-apple-music-sidebar">
		<h3 class="apple-music-selection">{{ data.content }}</h3>
		<p>{{ data.description }}</p>

		<form action="#" class="apple-music-select-format">
			<p class="apple-music-form-description"><?php esc_html_e( 'Choose embed style below.', 'connect-to-apple-music' ); ?></p>
			<!-- Player should only be an option for songs, albums and playlists -->
			<# if (data.shouldDisplayPlayer) { #>
			<p>
				<input type="radio" name="format" value="player" id="player">
				<label for="player">
					<span class="dashicons dashicons-controls-play"></span>
					<?php esc_html_e( 'Preview Player', 'connect-to-apple-music' ); ?>
				</label>
			</p>
			<# } #>
			<p>
				<input type="radio" name="format" value="badge" id="badge">
				<label for="badge">
					<img src="<?php echo esc_url( CTAM_PLUGIN_DIR_URL . 'src/images/badge.svg' ); ?>" alt="<?php esc_attr_e( 'Apple Music badge icon', 'connect-to-apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="text-lockup-standard-black" id="text-lockup-standard-black">
				<label for="text-lockup-standard-black">
					<img src="<?php echo esc_url( CTAM_PLUGIN_DIR_URL . 'src/images/standard-black.svg' ); ?>" alt="<?php esc_attr_e( 'Apple Music standard black text lockup icon', 'connect-to-apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="text-lockup-standard-white" id="text-lockup-standard-white">
				<label for="text-lockup-standard-white">
					<img src="<?php echo esc_url( CTAM_PLUGIN_DIR_URL . 'src/images/standard-white.svg' ); ?>" alt="<?php esc_attr_e( 'Apple Music standard white text lockup icon', 'connect-to-apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="text-lockup-mono-white" id="text-lockup-mono-white">
				<label for="text-lockup-mono-white">
					<img src="<?php echo esc_url( CTAM_PLUGIN_DIR_URL . 'src/images/mono-white.svg' ); ?>" alt="<?php esc_attr_e( 'Apple Music mono white text lockup icon', 'connect-to-apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="text-lockup-mono-black" id="text-lockup-mono-black">
				<label for="text-lockup-mono-black">
					<img src="<?php echo esc_url( CTAM_PLUGIN_DIR_URL . 'src/images/mono-black.svg' ); ?>" alt="<?php esc_attr_e( 'Apple Music mono black text lockup icon', 'connect-to-apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="app-icon" id="app-icon">
				<label for="app-icon">
					<img src="<?php echo esc_url( CTAM_PLUGIN_DIR_URL . 'src/images/app-icon-standard.svg' ); ?>" alt="<?php esc_attr_e( 'Apple Music app icon', 'connect-to-apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="app-icon-black" id="app-icon-black">
				<label for="app-icon-black">
					<img src="<?php echo esc_url( CTAM_PLUGIN_DIR_URL . 'src/images/app-icon-black.svg' ); ?>" alt="<?php esc_attr_e( 'Apple Music black app icon', 'connect-to-apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="app-icon-white" id="app-icon-white">
				<label for="app-icon-white">
					<img src="<?php echo esc_url( CTAM_PLUGIN_DIR_URL . 'src/images/app-icon-white.svg' ); ?>" alt="<?php esc_attr_e( 'Apple Music white app icon', 'connect-to-apple-music' ); ?>"/>
				</label>
			</p>
			<p>
				<input type="radio" name="format" value="link" id="link">
				<label for="link"><?php esc_html_e( 'Direct link', 'connect-to-apple-music' ); ?></label>
			</p>
		</form>
	</script>
	<?php
}
