<?php

add_filter( 'apple_music_media_modal_tabs', 'apple_music_media_modal_tabs' );

function apple_music_media_modal_tabs() {
	$tabs = [
		'artists'     => [
			'text'       => __( 'Artists', 'apple-music' ),
			'defaultTab' => true,
		],
		'songs'       => [
			'text' => __( 'Songs', 'apple-music' ),
		],
		'albums'      => [
			'text' => __( 'Albums', 'apple-music' ),
		],
		'playlists'   => [
			'text' => __( 'Playlists', 'apple-music' ),
		],
		'activities'  => [
			'text' => __( 'Activities', 'apple-music' ),
		],
		'curators'    => [
			'text' => __( 'Curators', 'apple-music' ),
		],
		'stations'    => [
			'text' => __( 'Radio', 'apple-music' ),
		],
		'musicVideos' => [
			'text' => __( 'Music Videos', 'apple-music' ),
			'type' => 'music-videos',
		],
	];

	return $tabs;
}
