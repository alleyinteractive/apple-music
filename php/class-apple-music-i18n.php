<?php
/**
 * Class to define Connect to Apple Music internationalization functionality.
 *
 * @package Connect_to_Apple_Music
 */

namespace Apple_Music;

/**
 * Class Apple_Music_I18n
 * @package Connect_to_Apple_Music
 */
class Apple_Music_I18n {
	/**
	 * Load the plugin text domain for translation.
	 */
	public function load_plugin_textdomain() {
		load_plugin_textdomain(
			'connect-to-apple-music',
			false,
			CTAM_PLUGIN_DIR_URL . '/lang'
		);
	}
}
