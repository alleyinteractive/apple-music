<?php

class Apple_Music {

	public $items = array();
	public $meta = array(
		'count'  => null,
		'max_id' => null,
		'min_id' => null,
	);

	public $id = null;
	public $url = null;
	public $thumbnail = null;
	public $content = null;


	public function __construct() {

		add_action( 'wp_enqueue_media', array( $this, 'action_enqueue_media' ) );
		add_action( 'print_media_templates', array( $this, 'action_print_media_templates' ) );
		add_action( 'wp_ajax_mexp_request', array( $this, 'ajax_request' ) );


	}


	/**
	 * Load the Backbone templates for each of our registered services.
	 *
	 * @action print_media_templates
	 * @return null
	 */
	public function action_print_media_templates() {

		//foreach ( $this->get_services() as $service_id => $service ) {

		//$service  = $this->service;

//$template = new MEXP_Apple_Template;

		// apply filters for tabs
		//$tabs = apply_filters( 'mexp_tabs', array() );
		$tabs = $this->tabs();


		foreach ( array( 'search', 'item' ) as $t ) {

			foreach ( $tabs as $tab_id => $tab ) {

				$id = sprintf( 'mexp-%s-%s-%s',
					esc_attr( 'apple-music' ),
					esc_attr( $t ),
					esc_attr( $tab_id )
				);

				//$template->before_template( $id, $tab_id );
				call_user_func( array( $this, $t ), $id, $tab_id );


			}

		}


		//	}

	}

	public function tabs() {
		$tabs = array(
			'artists'      => array(
				'text'       => _x( 'Artists', 'Tab title', 'apple-music' ),
				'defaultTab' => true,
			),
			'songs'        => array(
				'text' => _x( 'Songs', 'Tab title', 'apple-music' ),
			),
			'albums'       => array(
				'text' => _x( 'Albums', 'Tab title', 'apple-music' ),
			),
			'playlists'    => array(
				'text' => _x( 'Playlists', 'Tab title', 'apple-music' ),
			),
			'connect'      => array(
				'text' => _x( 'Connect', 'Tab title', 'apple-music' ),
			),
			'curators'     => array(
				'text' => _x( 'Curators', 'Tab title', 'apple-music' ),
			),
			'radio'        => array(
				'text' => _x( 'Radio', 'Tab title', 'apple-music' ),
			),
			'music-videos' => array(
				'text' => _x( 'Music Videos', 'Tab title', 'apple-music' ),
			),
		);

		return $tabs;
	}



	/**
	 * Process an AJAX request and output the resulting JSON.
	 *
	 * @action wp_ajax_mexp_request
	 * @return null
	 */
	public function ajax_request() {

		if ( ! isset( $_POST['_nonce'] ) or ! wp_verify_nonce( $_POST['_nonce'], 'mexp_request' ) ) {
			die( '-1' );
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


		//$response = $service->request( $request );
		///
		$params = $request['params'];

		$s        = new Apple_Music\API();
		$response = $s->search( reset( $params ), key( $params ), $request['page'] );

		$response = $this->response( $response );
		////

		if ( is_wp_error( $response ) ) {
			do_action( 'mexp_ajax_request_error', $response );
			wp_send_json_error( array(
				'error_code'    => $response->get_error_code(),
				'error_message' => $response->get_error_message()
			) );

			//} else if ( is_a( $response, 'MEXP_Response' ) ) {
		} else {
			//do_action( 'mexp_ajax_request_success', $response );
			wp_send_json_success( $this->output() );

		} /*else {
			do_action( 'mexp_ajax_request_success', false ); // ?????
			wp_send_json_success( false );

		}*/

	}

		public function labels() {
		$labels = array(
			'title'     => __( 'Insert Apple Musica', 'mexp' ),
			# @TODO the 'insert' button text gets reset when selecting items. find out why.
			'insert'    => __( 'Insert Apple Musicb', 'mexp' ),
			'noresults' => __( 'No matched your search query', 'mexp' ),
			'loadmore'  => __( 'Load more music', 'mexp' ),
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

		$mexp = array(
			'_nonce'    => wp_create_nonce( 'mexp_request' ),
			'labels'    => $this->labels(),
			'tabs'    => $this->tabs(),
		);

		//foreach ( $this->get_services() as $service_id => $service ) {
		//$service->load();
//$service  = $this->service;
		//$tabs = apply_filters( 'mexp_tabs', array() );
		$tabs   = $this->tabs();
		//$labels = $this->labels();

/*		$mexp['services']['apple-music'] = array(
			'id'     => 'apple-music',
			//'labels' => $labels,
			'tabs'   => $tabs,
		);*/
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

	public function response( $r ) {

		reset( $r );
		$type = key( $r );

		if ( ! empty( $r->$type->next ) ) {
			$load_more = true;
			$this->add_meta( 'load-more', true );
		}
if ( ! empty($r->$type->data)) {
	foreach ( $r->$type->data as $thing ) {

		$item = [ ];

		$shortcode = '[apple-music format=' . rtrim( $type, 's' ) . ' id=' . $thing->id . ']';

		$item['id']  = $thing->id;
		$item['url'] = $shortcode;

		$attributes = $thing->attributes;

		switch ( $type ) {

			case 'artists':
				$item['content'] = $attributes->name;
				break;

			case 'songs':
			case 'albums':
				$item['content']   = $attributes->artistName . ' ' . $attributes->name;
				$thumbnail         = str_replace( [ '{w}', '{h}' ], [ 140, 140 ], $attributes->artwork->url );
				$item['thumbnail'] = esc_url_raw( $thumbnail );
				break;

		}

		//$response->add_item( $item );
		$this->items[] = $item;

	}
}

		//return $response;

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

	public function search( $id, $tab ) {

		?>
		<script type="text/html" id="tmpl-<?php echo esc_attr( $id ); ?>">

			<form action="#" class="mexp-toolbar-container clearfix">
				<input
					type="text"
					name="<?php echo esc_attr( $tab ); ?>"
					value="{{ data.params.<?php echo esc_attr( $tab ); ?> }}"
					class="mexp-input-text mexp-input-search"
					size="40"
					placeholder="<?php esc_attr_e( 'Enter a ' . $tab, 'apple-music' ); ?>"
				>
				<input class="button button-large" type="submit" value="<?php esc_attr_e( 'Search', 'apple-music' ) ?>">
				<div class="spinner"></div>
			</form>

		</script>
		<?php
	}

	public function item( $id, $tab ) {
		?>
		<script type="text/html" id="tmpl-<?php echo esc_attr( $id ); ?>">
			<div id="mexp-item-twitter-<?php echo esc_attr( $tab ); ?>-{{ data.id }}" class="mexp-item-area" data-id="{{ data.id }}">
				<div class="mexp-item-container clearfix">
					<div class="mexp-item-thumb">
						<img src="{{ data.thumbnail }}">
					</div>
					<div class="mexp-item-main">
						<div class="mexp-item-content">
							{{{ data.content }}}
						</div>

					</div>
				</div>
			</div>
			<a href="#" id="mexp-check-{{ data.id }}" data-id="{{ data.id }}" class="check" title="<?php esc_attr_e( 'Deselect', 'apple-music' ); ?>">
				<div class="media-modal-icon"></div>
			</a>
		</script>
		<?php
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
			'items' => array()
		);

		foreach ( $this->items as $item ) {
			//$output['items'][] = $this->item_output();
			$output['items'][] = $item;
		}

		return $output;

	}

}
