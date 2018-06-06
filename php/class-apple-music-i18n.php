<?php
/**
 * Class to define Apple Music internationalization functionality.
 *
 * @package Apple_Music
 */
namespace Apple_Music;

class Apple_Music_i18n {
	/**
	 * Load the plugin text domain for translation.
	 */
	public function load_plugin_textdomain() {
		load_plugin_textdomain(
			'apple-music',
			false,
			PLUGIN_DIR_URL . '/lang'
		);
	}
}