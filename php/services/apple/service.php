<?php
/*
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

*/

defined( 'ABSPATH' ) or die();

class MEXP_Apple_Service extends MEXP_Service {

	public $credentials = null;
	public $response_meta = array();

	public function __construct() {

		require_once dirname( __FILE__ ) . '/template.php';

		# Go!
		$this->set_template( new MEXP_Apple_Template );

	}

	public function load() {


		add_filter( 'mexp_tabs', array( $this, 'tabs' ), 10, 1 );

		add_filter( 'mexp_labels', array( $this, 'labels' ), 10, 1 );

	}


	public function request( array $request ) {
		$params = $request['params'];

		$s        = new Apple_Music\API();
		$response = $s->search( reset( $params ), key( $params ) );

		return $this->response( $response );

	}


	public function get_max_id( $next ) {

		parse_str( ltrim( $next, '?' ), $vars );

		if ( isset( $vars['max_id'] ) ) {
			return $vars['max_id'];
		} else {
			return null;
		}

	}

	public function response( $r ) {

		/*		if ( ! isset( $r->statuses ) or empty( $r->statuses ) ) {
					return false;
				}*/

		$response = new MEXP_Response;
		reset( $r );
		$type = key( $r );


		/*		if ( isset( $r->search_metadata->next_results ) ) {
					$response->add_meta( 'max_id', self::get_max_id( $r->search_metadata->next_results ) );
				}

				if ( isset( $this->response_meta ) ) {
					$response->add_meta( $this->response_meta );
				}*/



		foreach ( $r->$type->data as $thing ) {

			$item = new MEXP_Response_Item;

			$shortcode = '[apple-music format=' . rtrim( $type, 's' ) . ' id=' . $thing->id . ']';

			$item->set_id( $thing->id );
			$item->set_url( $shortcode );

			$attributes = $thing->attributes;

			switch ( $type ) {

				case 'artists':
					$item->set_content( $attributes->name );
					break;

				case 'songs':
				case 'albums':
					$item->set_content( $attributes->artistName . ' ' . $attributes->name );
					$thumbnail = str_replace( [ '{w}', '{h}' ], [ 140, 140 ], $attributes->artwork->url );
					$item->set_thumbnail( $thumbnail );
					break;

			}

			$response->add_item( $item );

		}


		return $response;

	}


	public function thumbnail_html() {
		/*							<div class="image album">
						<img onerror="this.style.display='none';" src="https://is5-ssl.mzstatic.com/image/thumb/Features/v4/57/9a/d2/579ad2e5-e9eb-630a-dafd-1704e0fbe9cc/mza_1011095246346662165.jpg/236x236bb.jpg" alt="236x236bb" width="118" height="118">
						</div>
						  <div class="title"> <div class="name">Thriller</div>  </div>
																				  <div class="artistName"> Michael Jackson </div>*/
	}

	public function tabs( array $tabs ) {
		$tabs['apple'] = array(
			'artists'      => array(
				'text'       => _x( 'Artists', 'Tab title', 'mexp' ),
				'defaultTab' => true
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


	public function labels( array $labels ) {
		$labels['apple'] = array(
			'title'     => __( 'Insert Apple Music', 'mexp' ),
			# @TODO the 'insert' button text gets reset when selecting items. find out why.
			'insert'    => __( 'Insert Apple Music', 'mexp' ),
			'noresults' => __( 'No  Apple Music matched your search query', 'mexp' ),
			'gmaps_url' => set_url_scheme( 'https://maps.google.com/maps/api/js', 'https' ),
			'loadmore'  => __( 'Load more muaic', 'mexp' ),
		);

		return $labels;
	}

}

add_filter( 'mexp_services', 'mexp_service_apple' );

function mexp_service_apple( array $services ) {
	$services['apple'] = new MEXP_Apple_Service;

	return $services;
}
