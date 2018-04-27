<?php

add_filter( 'apple_music_types', 'apple_music_types' );

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

function apple_music_types() {
	$types = [
		'artists'      => [
			'tab_text'       => __( 'Artists', 'apple-music' ),
			'tab_name'       => 'artists',
			'tab_default'    => true,
			'singular'       => 'artist',
			'default_format' => 'badge',
		],
		'songs'        => [
			'tab_text'       => __( 'Songs', 'apple-music' ),
			'tab_name'       => 'songs',
			'singular'       => 'song',
			'default_height' => '110px',
			'default_width'  => '100%',
			'default_format' => 'player',
		],
		'albums'       => [
			'tab_text'       => __( 'Albums', 'apple-music' ),
			'tab_name'       => 'albums',
			'singular'       => 'album',
			'default_height' => '500px',
			'default_width'  => '100%',
			'default_format' => 'player',
		],
		'playlists'    => [
			'tab_text'       => __( 'Playlists', 'apple-music' ),
			'tab_name'       => 'playlists',
			'singular'       => 'playlist',
			'default_height' => '500px',
			'default_width'  => '100%',
			'default_format' => 'player',
		],
		'activities'   => [
			'tab_text'       => __( 'Activities', 'apple-music' ),
			'tab_name'       => 'activities',
			'singular'       => 'activity',
			'default_format' => 'badge',
		],
		'curators'     => [
			'tab_text'       => __( 'Curators', 'apple-music' ),
			'tab_name'       => 'curators',
			'singular'       => 'curator',
			'default_format' => 'badge',
		],
		'stations'     => [
			'tab_text'       => __( 'Radio', 'apple-music' ),
			'tab_name'       => 'stations',
			'singular'       => 'station',
			'default_format' => 'badge',
		],
		'music-videos' => [
			'tab_text'       => __( 'Music Videos', 'apple-music' ),
			'tab_name'       => 'videos',
			'singular'       => 'music-video',
			'default_format' => 'badge',
		],
	];

	return $types;
}
