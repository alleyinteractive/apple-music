<?php

/**
 * Main handler for the Apple Music embed tool.
 *
 * @package Apple_Music
 */

namespace Apple_Music;

class Main {
	use Util\Singleton;

	/**
	 * Set up the singleton.
	 */
	public function setup() {

		new \Apple_Music\API;
		//new \Apple_Music\Settings;
		new \Apple_Music\Media_Modal;
		new \Apple_Music\Shortcode;

	}
	
	

}
