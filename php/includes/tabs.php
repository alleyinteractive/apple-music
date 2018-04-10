<?php

add_filter( 'apple_music_media_modal_tabs', 'apple_music_media_modal_tabs' );

function apple_music_media_modal_tabs() {
	$tabs = array(
		'artists'    => array(
			'text'       => __( 'Artists', 'apple-music' ),
			'defaultTab' => true,
		),
		'songs'      => array(
			'text' => __( 'Songs', 'apple-music' ),
		),
		'albums'     => array(
			'text' => __( 'Albums', 'apple-music' ),
		),
		'playlists'  => array(
			'text' => __( 'Playlists', 'apple-music' ),
		),
		'activities' => array(
			'text' => __( 'Activities', 'apple-music' ),
		),
		'curators'   => array(
			'text' => __( 'Curators', 'apple-music' ),
		),
		'stations'   => array(
			'text' => __( 'Radio', 'apple-music' ),
		),
		'music-videos'     => array(
			'text' => __( 'Music Videos', 'apple-music' ),
		),
	);

	return $tabs;
}
