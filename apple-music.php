<?php

/*
	Plugin Name: Apple Music
	Plugin URI: https://github.com/alleyinteractive/apple-music
	Description: Search Apple Music and embed content in your site.
	Version: 0.0.1
	Author: Alley Interactive
	Author URI: http://www.alleyinteractive.com/
*/
/*  This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/


namespace Apple_Music;

define( __NAMESPACE__ . '\PATH', __DIR__ );

require_once PATH . '/php/autoload.php';

add_action( 'after_setup_theme', [ __NAMESPACE__ . '\Main', 'instance' ] );
add_action( 'after_setup_theme', [ __NAMESPACE__ . '\Settings', 'instance' ] );
add_action( 'after_setup_theme', [ __NAMESPACE__ . '\Shortcode', 'instance' ] );
add_action( 'after_setup_theme', [ __NAMESPACE__ . '\Media_Modal', 'instance' ] );

