<?php

/**
 * Main handler for the Apple Music embed tool.
 *
 * @package Apple_Music
 */

namespace Apple_Music;

class Apple_Music {
	//use Util\Singleton;

	/**
	 * Set up the singleton.
	 */
	/*	public function setup() {
	
			new \Apple_Music\API;
			//new \Apple_Music\Settings;
			new \Apple_Music\Media_Modal;
			new \Apple_Music\Shortcode;
	
		}*/


	public function __construct() {

		//add_action( 'init', [ $this, 'action_init' ] );
		add_action( 'wp_enqueue_media', [ $this, 'action_enqueue_media' ] );
		add_action( 'print_media_templates', [ $this, 'action_print_media_templates' ] );
		add_action( 'wp_ajax_mexp_request', [ $this, 'ajax_request' ] );

	}

	public function action_enqueue_media() {

		$mexp = array(
			'_nonce'    => wp_create_nonce( 'mexp_request' ), // ??????????
			'labels'    => array(
				'insert'   => __( 'Insert into post', 'mexp' ),
				'loadmore' => __( 'Load more', 'mexp' ),
			),
			'admin_url' => untrailingslashit( admin_url() ),
		);

		//foreach ( $this->get_services() as $service_id => $service ) {
		//$service->load();

		//$tabs   = apply_filters( 'mexp_tabs', array() );
		//$labels = apply_filters( 'mexp_labels', array() );

		$mexp['services']['apple-music'] = array( // ????????
			'id'     => 'apple-music',
			'labels' => $this->labels(),
			'tabs'   => $this->tabs(),
		);
		//}


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
	 * Load the Backbone templates for each of our registered services.
	 *
	 * @action print_media_templates
	 * @return null
	 */
	public function action_print_media_templates() {

		//foreach ( $this->get_services() as $service_id => $service ) {

		/*		if ( ! $template = $service->get_template() ) {
					continue;
				}*/

		$service  = new \MEXP_Apple_Service();
		$template = $service->get_template();
		$tabs     = $this->tabs();

		foreach ( array( 'search', 'item' ) as $t ) {

			foreach ( $tabs as $tab_id => $tab ) {

				$id = sprintf( 'mexp-%s-%s-%s',
					esc_attr( 'apple-music' ),
					esc_attr( $t ),
					esc_attr( $tab_id )
				);
//die($tab_id);
				//$template->before_template( $id, $tab_id );
				call_user_func( array( $template, $t ), $id, $tab_id );

			}
		}
	}

	/**
	 * Process an AJAX request and output the resulting JSON.
	 *
	 * @action wp_ajax_mexp_request
	 * @return null
	 */
	public function ajax_request() {

		/*		if ( ! isset( $_POST['_nonce'] ) or ! wp_verify_nonce( $_POST['_nonce'], 'mexp_request' ) ) {
					die( '-1' );
				}*/

		$service = new \MEXP_Apple_Service;

		if ( is_wp_error( $service ) ) {
			do_action( 'mexp_ajax_request_error', $service );
			wp_send_json_error( array(
				'error_code'    => $service->get_error_code(),
				'error_message' => $service->get_error_message()
			) );
		}

		$request = wp_parse_args( stripslashes_deep( $_POST ), array(
			'params' => array(),
			'tab'    => null,
			'min_id' => null,
			'max_id' => null,
			'page'   => 1,
		) );


		$request['page']    = absint( $request['page'] );
		$request['user_id'] = absint( get_current_user_id() );
		$request            = apply_filters( 'mexp_ajax_request_args', $request, $service );

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


}
