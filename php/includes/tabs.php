<?php

function tabs() {
	$tabs = array(
		'artists'      => array(
			'text'       => _x( 'Artists', 'Tab title', 'mexp' ),
			'defaultTab' => true,
		),
		'songs'        => array(
			'text' => _x( 'Songs', 'Tab title', 'mexp' ),
		),
		'albums'       => array(
			'text' => _x( 'Albums', 'Tab title', 'mexp' ),
		),
		'playlists'    => array(
			'text' => _x( 'Playlists', 'Tab title', 'mexp' ),
		),
		'connect'      => array(
			'text' => _x( 'Connect', 'Tab title', 'mexp' ),
		),
		'curators'     => array(
			'text' => _x( 'Curators', 'Tab title', 'mexp' ),
		),
		'radio'        => array(
			'text' => _x( 'Radio', 'Tab title', 'mexp' ),
		),
		'music-videos' => array(
			'text' => _x( 'Music Videos', 'Tab title', 'mexp' ),
		),
	);

	return $tabs;
}
