<?php

add_filter( 'apple_music_types', 'apple_music_types' );

function apple_music_types() {
	$types = [
		'artists'      => [
			'tab_text'            => __( 'Artists', 'connect-to-apple-music' ),
			'tab_name'            => 'artists',
			'tab_default'         => true,
			'itunes_url_fragment' => 'artist',
			'default_format'      => 'badge',
		],
		'songs'        => [
			'tab_text'            => __( 'Songs', 'connect-to-apple-music' ),
			'tab_name'            => 'songs',
			'music_url_fragment'  => 'song',
			'itunes_url_fragment' => 'album',
			'default_height'      => '150px',
			'default_width'       => '100%',
			'default_format'      => 'player',
		],
		'albums'       => [
			'tab_text'            => __( 'Albums', 'connect-to-apple-music' ),
			'tab_name'            => 'albums',
			'music_url_fragment'  => 'album',
			'itunes_url_fragment' => 'album',
			'default_height'      => '450px',
			'default_width'       => '100%',
			'default_format'      => 'player',
		],
		'playlists'    => [
			'tab_text'            => __( 'Playlists', 'connect-to-apple-music' ),
			'tab_name'            => 'playlists',
			'music_url_fragment'  => 'playlist',
			'itunes_url_fragment' => 'playlist',
			'default_height'      => '450px',
			'default_width'       => '100%',
			'default_format'      => 'player',
		],
		'activities'   => [
			'tab_text'            => __( 'Activities', 'connect-to-apple-music' ),
			'tab_name'            => 'activities',
			'itunes_url_fragment' => 'activity',
			'default_format'      => 'badge',
		],
		'curators'     => [
			'tab_text'            => __( 'Curators', 'connect-to-apple-music' ),
			'tab_name'            => 'curators',
			'itunes_url_fragment' => 'curator',
			'default_format'      => 'badge',
		],
		'stations'     => [
			'tab_text'            => __( 'Radio', 'connect-to-apple-music' ),
			'tab_name'            => 'stations',
			'music_url_fragment'  => 'station',
			'itunes_url_fragment' => 'station',
			'default_format'      => 'badge',
		],
		'music-videos' => [
			'tab_text'            => __( 'Music Videos', 'connect-to-apple-music' ),
			'tab_name'            => 'videos',
			'itunes_url_fragment' => 'music-video',
			'default_format'      => 'badge',
		],
	];

	return $types;
}

function apple_music_get_player_types() {
	$types        = apply_filters( 'apple_music_types', [] );
	$player_types = array_filter(
		 $types,
		function ( $type ) {
			return 'player' === $type['default_format'];
		}
		);

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
	$types = apply_filters( 'apple_music_types', [] );
	foreach ( $types as $key => $type ) {
		if ( $type[ $field ] === $value ) {
			return $key;
		}
	}

	return false;
}
