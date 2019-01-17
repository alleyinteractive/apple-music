<?php
/**
 * This file contains the custom autoloader for the plugin which autoloads
 * classes named as per the WordPress Coding Standards.
 *
 * Any class sharing this namespace can be automatically loaded when used, if it
 * resides in the `lib/` directory. If the class has any sub-namespaces, the
 * class must be within subdirectories of the same names (swapping underscores
 * for dashes and downcasing).
 *
 * @package Connect_to_Apple_Music
 */

namespace Apple_Music;

/**
 * Autoload classes.
 *
 * @param  string $cls Class name.
 */
function autoload( $cls ) {
	$cls = ltrim( $cls, '\\' );
	if ( strpos( $cls, __NAMESPACE__ . '\\' ) !== 0 ) {
		return;
	}

	$cls  = strtolower( str_replace( [ __NAMESPACE__ . '\\', '_' ], [ '', '-' ], $cls ) );
	$dirs = explode( '\\', $cls );
	$cls  = array_pop( $dirs );

	foreach ( [ 'class', 'trait' ] as $type ) {
		$filename = PATH . rtrim( '/php/' . implode( '/', $dirs ), '/' ) . "/{$type}-{$cls}.php";

		if ( file_exists( $filename ) ) {
			require_once( $filename );
		}
	}
}
spl_autoload_register( __NAMESPACE__ . '\autoload' );
