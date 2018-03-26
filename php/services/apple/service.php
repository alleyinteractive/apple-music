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

class MEXP_Apple_Service {
public $template = null;
	public $credentials = null;
	public $response_meta = array();

	public function __construct() {

		require_once dirname( __FILE__ ) . '/template.php';

		# Go!
		//$this->set_template( new MEXP_Apple_Template );
		$this->template = new MEXP_Apple_Template;

	}

	public function load() {




		//add_filter( 'mexp_labels', array( $this, 'labels' ), 10, 1 );

	}


	public function request( array $request ) {

		
		$params = $request['params'];

		$s        = new Apple_Music\API();
		$response = $s->search( reset( $params ), key( $params ), $request['page'] );

		return $this->response( $response );

	}

	public function get_template() {

		return $this->template;

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

		if ( ! empty( $r->$type->next ) ) {
			$load_more = true;
			$response->add_meta( 'load-more', true );
		}

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



	public function labels( array $labels ) {
		$labels['apple-music'] = array(
			'title'     => __( 'Insert Apple Music', 'mexp' ),
			# @TODO the 'insert' button text gets reset when selecting items. find out why.
			'insert'    => __( 'Insert Apple Music', 'mexp' ),
			'noresults' => __( 'No  Apple Music matched your search query', 'mexp' ),
			'loadmore'  => __( 'Load more music', 'mexp' ),
		);

		return $labels;
	}

}

add_filter( 'mexp_services', 'mexp_service_apple' );

function mexp_service_apple( array $services ) {
	$services['apple-music'] = new MEXP_Apple_Service;

	return $services;
}
