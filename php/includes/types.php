<?php

add_filter( 'apple_music_types', 'apple_music_types' );

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

function apple_music_get_player_types() {
	$types        = apply_filters( 'apple_music_types', [] );
	$player_types = array_filter( $types, function ( $type ) {
		return 'player' === $type['default_format'];
	} );

	return $player_types;
}

/**
 * A simple helper for working with types array.
 *
 * @param string $field Name of field to search.
 * @param string $value Value to search for,
 *
 * @return bool|int|string Key of element.
 */
function apple_music_search_types( $field, $value ) {
	$types = apply_filters( 'apple_music_types', [ ] );
	foreach ( $types as $key => $type ) {
		if ( $type[ $field ] === $value ) {
			return $key;
		}
	}

	return false;
}
