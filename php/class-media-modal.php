<?php

/**
 * Media modal handler for the Apple Music embed tool.
 *
 * @package Apple_Music
 */

namespace Apple_Music;

class Media_Modal {
	use Util\Singleton;

	/**
	 * Set up the singleton.
	 */
	public function setup() {

		require_once PATH . '/php/class-mexp-service.php';
		require_once PATH . '/php/class-plugin.php';
		require_once PATH . '/php/class-template.php';
		require_once PATH . '/php/class-response.php';
		require_once PATH . '/php/class-media-explorer.php';

		foreach ( glob( dirname( __FILE__ ) . '/services/*/service.php' ) as $service ) {
			include $service;

		}

		\Media_Explorer::init( __FILE__ );

		add_action( 'media_buttons', [ $this, 'media_button' ] );
	}


	public function media_button( $editor_id ) {
		echo '<a href="#" class="button insert-media add_media">Add Apple Music</a>';
	}

}
