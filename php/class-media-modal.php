<?php

namespace Apple_Music;

class Media_Modal {

	public $items = array();
	public $meta = array(
		'count'  => null,
		'max_id' => null,
		'min_id' => null,
	);

	public $id = null;
	public $content = null;

	public function __construct() {
		add_action( 'wp_enqueue_media', array( $this, 'action_enqueue_media' ) );
		add_action( 'print_media_templates', array( $this, 'action_print_media_templates' ) );
		add_action( 'wp_ajax_apple_music_request', array( $this, 'ajax_request' ) );

	}

	/**
	 * Load the Backbone templates for each of our registered services.
	 *
	 * @action print_media_templates
	 * @return null
	 */
	public function action_print_media_templates() {

		$tabs = $this->tabs();

		foreach ( array( 'search', 'item' ) as $t ) {
			foreach ( $tabs as $tab_id => $tab ) {
				$id = sprintf( 'apple-music-%s-%s',
					sanitize_html_class( $t ),
					sanitize_html_class( $tab_id )
				);
				call_user_func( 'Apple_Music\\' . $t, $id, $tab_id );
			}
		}
		sidebar();

	}

	public function tabs() {
		return apply_filters( 'apple_music_media_modal_tabs', [] );
	}

	/**
	 * Process an AJAX request and output the resulting JSON.
	 *
	 * @action wp_ajax_apple_music_request
	 */
	public function ajax_request() {

		if ( ! isset( $_POST['_nonce'] ) || ! wp_verify_nonce( $_POST['_nonce'], 'apple_music_request' ) ) {
			wp_die( '-1' );
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
		$params             = $request['params'];

		// Temporary hack!
		// Need to fix hyphens in js.
		$types = key( $params );
		if ( 'videos' === key( $params ) ) {
			$types = 'music-videos';
		}

		$api      = new API();
		$response = $api->search( reset( $params ), $types, $request['page'] );

		if ( is_wp_error( $response ) ) {
			wp_send_json_error( array(
				'error_code'    => $response->get_error_code(),
				'error_message' => $response->get_error_message(),
			) );

		} else {
			$this->response( $response );
			wp_send_json_success( $this->output() );
		}

	}

	public function labels() {
		$labels = array(
			'title'     => __( 'Insert Apple Music', 'apple-music' ),
			'insert'    => __( 'Insert Apple Music', 'apple-music' ),
			'noresults' => __( 'No match for your search query', 'apple-music' ),
			'loadmore'  => __( 'Load more music', 'apple-music' ),
		);

		return $labels;
	}

	/**
	 * Enqueue and localise the JS and CSS we need for the media manager.
	 *
	 * @action enqueue_media
	 * @return null
	 */
	public function action_enqueue_media() {

		wp_enqueue_script(
			'apple-music',
			PLUGIN_DIR_URL . 'js/apple-music.js',
			array( 'jquery', 'media-views' ),
			APPLE_MUSIC_VERSION
		);

		wp_localize_script(
			'apple-music',
			'appleMusic',
			array(
				'_nonce' => wp_create_nonce( 'apple_music_request' ),
				'labels' => $this->labels(),
				'tabs'   => $this->tabs(),
			)
		);

		wp_enqueue_style(
			'apple-music',
			PLUGIN_DIR_URL . 'css/apple-music.css',
			array(),
			APPLE_MUSIC_VERSION
		);

	}

	public function response( $response ) {

		reset( $response );
		$type = key( $response );

		if ( ! empty( $response->$type->next ) ) {
			$load_more = true;
			$this->add_meta( 'load-more', true );
		}
		if ( ! empty( $response->$type->data ) ) {
			foreach ( $response->$type->data as $thing ) {

				$item      = [];
				$item['id']  = $thing->id;
				$attributes = $thing->attributes;
				$shortcode = '[apple-music type="' . $type . '" id="' . $thing->id . '" name="' . str_replace( [ '[', ']' ], [ '&#091;', '&#093;' ], $attributes->name ) . '" ]';
				$item['shortcode'] = $shortcode;

				switch ( $type ) {

					case 'artists':
						$item['content'] = $attributes->name;
						$item['thumbnail'] = esc_url_raw( PLUGIN_DIR_URL . 'assets/apple.png' );
						break;

					case 'songs':
					case 'albums':
					case 'playlists':
					case 'activities':
					case 'music-videos':
						$item['content']   = $attributes->artistName . ' ' . $attributes->name;
						$thumbnail         = str_replace( [ '{w}', '{h}' ], [ 140, 140 ], $attributes->artwork->url );
						$item['thumbnail'] = esc_url_raw( $thumbnail );
						$item['description'] = $attributes->editorialNotes->short;
						break;

					case 'stations':
						case 'curators':
						$item['content']   = $attributes->name;
						$thumbnail         = str_replace( [ '{w}', '{h}', '{c}' ], [ 140, 140, 'bb' ], $attributes->artwork->url );
						$item['thumbnail'] = esc_url_raw( $thumbnail );
						break;

				}
				$this->items[] = $item;
			}
		}
	}

	/**
	 * Add a meta value to the response. Accepts a key/value pair or an associative array.
	 *
	 * @param string|array $key The meta key, or an associative array of meta keys/values.
	 * @param mixed $value The meta value.
	 *
	 * @return null
	 */
	public function add_meta( $key, $value = null ) {

		if ( is_array( $key ) ) {
			foreach ( $key as $k => $v ) {
				$this->meta[ $k ] = $v;
			}
		} else {
			$this->meta[ $key ] = $value;
		}
	}



	public function output() {

		if ( empty( $this->items ) ) {
			return false;
		}

		if ( is_null( $this->meta['count'] ) ) {
			$this->meta['count'] = count( $this->items );
		}
		if ( is_null( $this->meta['min_id'] ) ) {
			$this->meta['min_id'] = reset( $this->items )->id;
		}

		$output = array(
			'meta'  => $this->meta,
			'items' => array(),
		);

		foreach ( $this->items as $item ) {
			$output['items'][] = $item;
		}

		return $output;
	}
}
