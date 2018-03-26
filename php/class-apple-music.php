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

class Media_Explorer {

	/**
	 * Array of Service objects.
	 */
	public $services = array();

	/**
	 * Class constructor. Set up some actions and filters.
	 *
	 * @return null
	 */
	protected function __construct( $file ) {

		add_action( 'wp_enqueue_media',      array( $this, 'action_enqueue_media' ) );
		add_action( 'print_media_templates', array( $this, 'action_print_media_templates' ) );


		add_action( 'wp_ajax_mexp_request',   array( $this, 'ajax_request' ) );

		$this->service  = new \MEXP_Apple_Service();
		
	}


	/**
	 * Load the Backbone templates for each of our registered services.
	 *
	 * @action print_media_templates
	 * @return null
	 */
	public function action_print_media_templates() {

		//foreach ( $this->get_services() as $service_id => $service ) {

		$service  = $this->service;



			// apply filters for tabs
			//$tabs = apply_filters( 'mexp_tabs', array() );
			$tabs     = $this->tabs();

			# @TODO this list of templates should be somewhere else. where?
			foreach ( array( 'search', 'item' ) as $t ) {

				foreach ( $tabs as $tab_id => $tab ) {

					$id = sprintf( 'mexp-%s-%s-%s',
						esc_attr( 'apple-music' ),
						esc_attr( $t ),
						esc_attr( $tab_id )
					);

					//$template->before_template( $id, $tab_id );
					call_user_func( array( $service->get_template(), $t ), $id, $tab_id );


				}

			}



	//	}

	}

	public function tabs() {
		$tabs = array(
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

		public function labels() {
		$labels = array(
			'title'     => __( 'Insert Apple Music', 'mexp' ),
			# @TODO the 'insert' button text gets reset when selecting items. find out why.
			'insert'    => __( 'Insert Apple Music', 'mexp' ),
			'noresults' => __( 'No  Apple Music matched your search query', 'mexp' ),
			'loadmore'  => __( 'Load more music', 'mexp' ),
		);

		return $labels;
	}

	/**
	 * Process an AJAX request and output the resulting JSON.
	 *
	 * @action wp_ajax_mexp_request
	 * @return null
	 */
	public function ajax_request() {

		if ( !isset( $_POST['_nonce'] ) or !wp_verify_nonce( $_POST['_nonce'], 'mexp_request' ) )
			die( '-1' );

		//$service = $this->get_service( stripslashes( $_POST['service'] ) );
		$service = new \MEXP_Apple_Service;

		if ( is_wp_error( $service ) ) {
			do_action( 'mexp_ajax_request_error', $service );
			wp_send_json_error( array(
				'error_code'    => $service->get_error_code(),
				'error_message' => $service->get_error_message()
			) );
		}

		$request = wp_parse_args( stripslashes_deep( $_POST ), array(
			'params'  => array(),
			'tab'     => null,
			'min_id'  => null,
			'max_id'  => null,
			'page'    => 1,
		) );


		$request['page'] = absint( $request['page'] );
		$request['user_id'] = absint( get_current_user_id() );
		$request = apply_filters( 'mexp_ajax_request_args', $request, $service );

		$response = $service->request( $request );

		if ( is_wp_error( $response ) ) {
			do_action( 'mexp_ajax_request_error', $response );
			wp_send_json_error( array(
				'error_code'    => $response->get_error_code(),
				'error_message' => $response->get_error_message()
			) );

		} else if ( is_a( $response, 'MEXP_Response' ) ) {
			do_action( 'mexp_ajax_request_success', $response );
			wp_send_json_success( $response->output() );

		} else {
			do_action( 'mexp_ajax_request_success', false );
			wp_send_json_success( false );

		}

	}

	/**
	 * Enqueue and localise the JS and CSS we need for the media manager.
	 *
	 * @action enqueue_media
	 * @return null
	 */
	public function action_enqueue_media() {

		$mexp = array(
			'_nonce'    => wp_create_nonce( 'mexp_request' ),
			'labels'    => array(
				'insert'   => __( 'Insert into post', 'mexp' ),
				'loadmore' => __( 'Load more', 'mexp' ),
			),
			'admin_url' => untrailingslashit( admin_url() ),
		);

		//foreach ( $this->get_services() as $service_id => $service ) {
			//$service->load();
$service  = $this->service;
			//$tabs = apply_filters( 'mexp_tabs', array() );
			$tabs = $this->tabs();
			$labels = $this->labels();

			$mexp['services']['apple-music'] = array(
				'id'     => 'apple-music',
				'labels' => $labels,
				'tabs'   => $tabs,
			);
		//}

		// this action enqueues all the statics for each service
		do_action( 'mexp_enqueue' );

		wp_enqueue_script(
			'apple-music',
			PLUGIN_DIR_URL . 'js/apple-music.js',
			array( 'jquery', 'media-views' ),
			APPLE_MUSIC_VERSION
		);

		wp_localize_script(
			'apple-music',
			'mexp',
			$mexp
		);

		wp_enqueue_style(
			'apple-music',
			PLUGIN_DIR_URL . 'css/apple-music.css',
			array( /*'wp-admin'*/ ),
			APPLE_MUSIC_VERSION
		);

	}





	/**
	 * Singleton instantiator.
	 *
	 * @param string $file The plugin file (usually __FILE__) (optional)
	 * @return Media_Explorer
	 */
	public static function init( $file = null ) {

		static $instance = null;

		if ( !$instance )
			$instance = new Media_Explorer( $file );

		return $instance;

	}

}
