<?php

/*
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

*/

class MEXP_Apple_Template {

	public function item( $id, $tab ) {
		?>
		<script type="text/html" id="tmpl-<?php echo esc_attr( $id ); ?>">
		<div id="mexp-item-twitter-<?php echo esc_attr( $tab ); ?>-{{ data.id }}" class="mexp-item-area" data-id="{{ data.id }}">
			<div class="mexp-item-container clearfix">
				<div class="mexp-item-thumb">
					<img src="{{ data.thumbnail }}">
				</div>
				<div class="mexp-item-main">
					<div class="mexp-item-content">
						{{{ data.content }}}
					</div>

				</div>
			</div>
		</div>
		<a href="#" id="mexp-check-{{ data.id }}" data-id="{{ data.id }}" class="check" title="<?php esc_attr_e( 'Deselect', 'apple-music' ); ?>">
			<div class="media-modal-icon"></div>
		</a>
		</script>
		<?php
	}

	public function thumbnail( $id ) {
		?>
		<?php
	}
	


	public function search( $id, $tab ) {
	
	?>
	<script type="text/html" id="tmpl-<?php echo esc_attr( $id ); ?>">
	<?php

		switch ( $tab ) {

			case 'songs':

				?>
				<form action="#" class="mexp-toolbar-container clearfix">
					<input
						type="text"
						name="songs"
						value="{{ data.params.by_user }}"
						class="mexp-input-text mexp-input-search"
						size="40"
						placeholder="<?php esc_attr_e( 'Enter a song', 'apple-music' ); ?>"
					>
					<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'apple-music' ) ?>">
					<div class="spinner"></div>
				</form>
				<?php

				break;

			case 'albums':

				?>
				<form action="#" class="mexp-toolbar-container clearfix">
					<input
						type="text"
						name="albums"
						value="{{ data.params.to_user }}"
						class="mexp-input-text mexp-input-search"
						size="40"
						placeholder="<?php esc_attr_e( 'Enter an album', 'apple-music' ); ?>"
					>
					<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'apple-music' ) ?>">
					<div class="spinner"></div>
				</form>
				<?php

				break;

			case 'playlists':

				?>
				<form action="#" class="mexp-toolbar-container clearfix">
					<input
						type="text"
						name="playlists"
						value="{{ data.params.to_user }}"
						class="mexp-input-text mexp-input-search"
						size="40"
						placeholder="<?php esc_attr_e( 'Enter a playlist', 'apple-music' ); ?>"
					>
					<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'apple-music' ) ?>">
					<div class="spinner"></div>
				</form>
				<?php

				break;

			case 'connect':

				?>
				<form action="#" class="mexp-toolbar-container clearfix">
					<input
						type="text"
						name="connect"
						value="{{ data.params.to_user }}"
						class="mexp-input-text mexp-input-search"
						size="40"
						placeholder="<?php esc_attr_e( 'Enter a connection', 'apple-music' ); ?>"
					>
					<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'apple-music' ) ?>">
					<div class="spinner"></div>
				</form>
				<?php

				break;

			case 'curators':

				?>
				<form action="#" class="mexp-toolbar-container clearfix">
					<input
						type="text"
						name="curators"
						value="{{ data.params.to_user }}"
						class="mexp-input-text mexp-input-search"
						size="40"
						placeholder="<?php esc_attr_e( 'Enter a curator', 'apple-music' ); ?>"
					>
					<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'apple-music' ) ?>">
					<div class="spinner"></div>
				</form>
				<?php

				break;

			case 'radio':

				?>
				<form action="#" class="mexp-toolbar-container clearfix">
					<input
						type="text"
						name="radio"
						value="{{ data.params.to_user }}"
						class="mexp-input-text mexp-input-search"
						size="40"
						placeholder="<?php esc_attr_e( 'Enter a station', 'apple-music' ); ?>"
					>
					<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'apple-music' ) ?>">
					<div class="spinner"></div>
				</form>
				<?php

				break;

			case 'music-videos':

				?>
				<form action="#" class="mexp-toolbar-container clearfix">
					<input
						type="text"
						name="albums"
						value="{{ data.params.to_user }}"
						class="mexp-input-text mexp-input-search"
						size="40"
						placeholder="<?php esc_attr_e( 'Enter a', 'apple-music' ); ?>"
					>
					<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'apple-music' ) ?>">
					<div class="spinner"></div>
				</form>
				<?php

				break;

			case 'artists':
			default:

				?>
				<form action="#" class="mexp-toolbar-container clearfix">
					<input
						type="text"
						name="artists"
						value="{{ data.params.hashtag }}"
						class="mexp-input-text mexp-input-search"
						size="40"
						placeholder="<?php esc_attr_e( 'Enter an artist', 'apple-music' ); ?>"
					>
					<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'apple-music' ) ?>">
					<div class="spinner"></div>
				</form>
				<?php

				break;

		}
?>
		</script>
<?php
	}

}
