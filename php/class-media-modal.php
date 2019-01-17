<?php
/**
 * Class to handle Connect to Apple Music media modal.
 *
 * @package Connect_to_Apple_Music
 */

namespace Apple_Music;

class Media_Modal {

	public $items = [];
	public $meta  = [ 'count' => null ];

	/**
	 * Media_Modal constructor.
	 */
	public function __construct() {
		add_action( 'wp_enqueue_media', [ $this, 'action_enqueue_media' ] );
		add_action( 'media_buttons', [ $this, 'add_button' ] );
		add_action( 'print_media_templates', [ $this, 'action_print_media_templates' ] );
		add_action( 'wp_ajax_apple_music_request', [ $this, 'ajax_request' ] );

	}

	/**
	 * Load the Backbone templates.
	 *
	 * @action print_media_templates
	 * @return null
	 */
	public function action_print_media_templates() {

		item();
		search();
		sidebar();

	}

	/**
	 * Get our tabs.
	 *
	 * @return mixed
	 */
	public function get_tabs() {
		$tabs = apply_filters( 'apple_music_types', [] );
		return wp_list_pluck( $tabs, 'tab_text', 'tab_name' );
	}

	/**
	 * Add dedicated media modal button.
	 */
	public function add_button() {
		echo '<a href="#" class="button apple-music-button">' . esc_html__( 'Apple Music', 'connect-to-apple-music' ) . '</a>';
	}

	/**
	 * Process an AJAX request and output the resulting JSON.
	 *
	 * @action wp_ajax_apple_music_request
	 */
	public function ajax_request() {

		if ( ! isset( $_POST['_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_nonce'] ) ), 'apple_music_request' ) ) {
			wp_die( '-1' );
		}

		$request = wp_parse_args(
			 stripslashes_deep( $_POST ),
			[
				'params' => [],
				'tab'    => null,
				'page'   => 1,
			]
			);

		$request['page'] = absint( $request['page'] );
		$params          = $request['params'];
		$type_name       = apple_music_search_types( 'tab_name', $request['tab'] );
		$api             = new API();
		$response        = $api->search( reset( $params ), $type_name, $request['page'] );

		if ( is_wp_error( $response ) ) {
			wp_send_json_error(
				 [
					 'error_code'    => $response->get_error_code(),
					 'error_message' => $response->get_error_message(),
				 ]
				);

		} else {
			$this->process_response( $response );
			wp_send_json_success( $this->output() );
		}

	}

	/**
	 * Get media modal labels.
	 *
	 * @return array
	 */
	public function get_labels() {
		$labels = [
			'title'     => __( 'Insert Apple Music', 'connect-to-apple-music' ),
			'insert'    => __( 'Insert Apple Music', 'connect-to-apple-music' ),
			'noresults' => __( 'No match for your search query', 'connect-to-apple-music' ),
			'loadmore'  => __( 'Load more music', 'connect-to-apple-music' ),
		];

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
			'apple-music-media-modal',
			CTAM_PLUGIN_DIR_URL . 'dist/js/mediaModal.bundle.min.js',
			[ 'jquery', 'media-views' ],
			APPLE_MUSIC_VERSION
		);

		wp_localize_script(
			'apple-music-media-modal',
			'appleMusic',
			[
				'_nonce' => wp_create_nonce( 'apple_music_request' ),
				'labels' => $this->get_labels(),
				'tabs'   => $this->get_tabs(),
			]
		);

		wp_enqueue_style(
			'apple-music-media-modal',
			CTAM_PLUGIN_DIR_URL . 'dist/css/mediaModal.min.css',
			[],
			APPLE_MUSIC_VERSION
		);

	}

	public function process_response( $response ) {

		reset( $response );
		$type = key( $response );

		$this->add_meta( 'loadMore', ! empty( $response->$type->next ) );

		if ( ! empty( $response->$type->data ) ) {
			foreach ( $response->$type->data as $thing ) {

				$item              = [];
				$item['id']        = $thing->id;
				$attributes        = $thing->attributes;
				$shortcode = sprintf(
					'[apple-music type="%1$s" id="%2$s" name="%3$s"]',
					$this->shortcode_cleaner( $type ), // 1
					$this->shortcode_cleaner( $thing->id ), // 2
					$this->shortcode_cleaner( $attributes->name ) // 3
				);

				$item['shortcode'] = $shortcode;

				switch ( $type ) {

					case 'artists':
						$item['content']   = esc_html( $attributes->name );
						$item['thumbnail'] = esc_url_raw( CTAM_PLUGIN_DIR_URL . 'src/images/apple.png' );
						break;

					case 'songs':
					case 'albums':
					case 'playlists':
					case 'activities':
					case 'music-videos':
						// @codingStandardsIgnoreLine snake_case is returned by API.
						$item['content']   = esc_html( $attributes->artistName . ' ' . $attributes->name );
						$thumbnail         = str_replace( [ '{w}', '{h}' ], [ 140, 140 ], $attributes->artwork->url );
						$item['thumbnail'] = esc_url_raw( $thumbnail );
						// @codingStandardsIgnoreLine snake_case is returned by API.
						$item['description'] = esc_html( $attributes->editorialNotes->short );
						break;

					case 'stations':
					case 'curators':
						$item['content']   = esc_html( $attributes->name );
						$thumbnail         = str_replace( [ '{w}', '{h}', '{c}' ], [ 140, 140, 'bb' ], $attributes->artwork->url );
						$item['thumbnail'] = esc_url_raw( $thumbnail );
						break;

				}
				$this->items[] = $item;
			}
		}
	}

	public function shortcode_cleaner( $string ) {
		return str_replace( [ '[', ']' ], [ '&#091;', '&#093;' ], $string );
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

	/**
	 * Collect data to send to media modal.
	 *
	 * @return array|bool
	 */
	public function output() {

		if ( empty( $this->items ) ) {
			return false;
		}

		if ( is_null( $this->meta['count'] ) ) {
			$this->meta['count'] = count( $this->items );
		}

		$output = [
			'meta'  => $this->meta,
			'items' => [],
		];

		foreach ( $this->items as $item ) {
			$output['items'][] = $item;
		}

		return $output;
	}
}
