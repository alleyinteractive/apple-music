<?php

/*
	Plugin Name: Apple Music
	Plugin URI: https://github.com/alleyinteractive/apple-music
	Description: Search Apple Music and embed content in your site.
	Version: 0.0.1
	Author: Alley Interactive
	Author URI: http://www.alleyinteractive.com/
*/

namespace Apple_Music;

define( __NAMESPACE__ . '\PATH', __DIR__ );

define( 'PLUGIN_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'APPLE_MUSIC_VERSION', '0.1.0' );

require_once PATH . '/php/autoload.php';
require_once PATH . '/php/includes/includes.php';

add_action( 'after_setup_theme', function () {
	new Media_Modal;
	new Shortcode;
	new Settings;
	new Block;
} );

add_action( 'plugins_loaded', __NAMESPACE__ . '\myplugin_load_textdomain' );
/**
 * Load plugin textdomain.
 *
 * @since 1.0.0
 */
function myplugin_load_textdomain() {
	load_plugin_textdomain( 'apple-music', false, basename( dirname( __FILE__ ) ) . '/languages' );
}
