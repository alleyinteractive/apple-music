<?php

/**
 * Main handler for the Apple Music embed tool.
 *
 * @package Apple_Music
 */

namespace Apple_Music;

class Media_Modal {
	use Util\Singleton;
	
	/**
	 * Set up the singleton.
	 */
	public function setup() {

		require_once PATH . '/php/class-mexp-service.php';
		require_once PATH . '/php/class-plugin.php';
		require_once PATH . '/php/class-template.php';
		require_once PATH . '/php/class-response.php';
		require_once PATH . '/php/class-media-explorer.php';


		foreach ( glob( dirname( __FILE__ ) . '/services/*/service.php' ) as $service ) {
			include $service;
			
		}

		\Media_Explorer::init( __FILE__ );
	}


	/**
	 * Search for a requested term.
	 *
	 * @param string $term
	 *
	 * @return object|null
	 */
	public function search( $term ) {

		$url = sprintf( '%s/%s/%s/%s',
			$this->base_url,
			'catalog',
			$this->storefront,
			'search'
		);

		return $this->send_request( 'GET', $url, compact( 'term' ) );
	}

	public function get_storefronts() {
		$transient   = 'apple-music-storefronts';
		$storefronts = get_transient( $transient );
		if ( false === $storefronts ) {

			$url = sprintf( '%s/%s',
				$this->base_url,
				'storefronts'
			);

			$storefronts = $this->send_request( 'GET', $url );

			if ( ! empty( $storefronts ) ) {
				set_transient( $transient, $storefronts, DAY_IN_SECONDS );
			}
		}

		return $storefronts;
	}

	/**
	 * Send an API request.
	 *
	 * @param string $method GET or POST
	 * @param string $endpoint
	 * @param array $params
	 *
	 * @return object|null
	 */
	protected function send_requestx( $method, $endpoint, $params = array() ) {


		if ( empty( $this->token ) ) {
			return null;
		}

		// Build the request URL
		$url = sprintf( '%s/%s/%s',
			$this->base_url,
			$this->storefront,
			$endpoint
		);

		https://api.music.apple.com/v1/storefronts

		$url_safe = esc_url_raw( add_query_arg( $params, $url ) );

		if ( 'GET' === $method && function_exists( 'wpcom_vip_file_get_contents' ) ) {
			$response = wpcom_vip_file_get_contents(
				$url_safe,
				5, // request timeout in seconds
				900, // cache timeout in seconds
				array(
					'http_api_args' => array(
						'headers' => array(
							'Authorization' => "Bearer {$this->token}",
						)
					)
				) );
		} else {
			$response = wp_safe_remote_request(
				$url_safe,
				array(
					'method'  => $method,
					'headers' => array(
						'Authorization' => "Bearer {$this->token}",
					)
				)
			);

			if ( ! empty( $response ) && ! is_wp_error( $response ) ) {
				$response = wp_remote_retrieve_body( $response );

				return $response;
			}
		}

		if ( empty( $response ) || is_wp_error( $response ) ) {
			return null;
		}

		// Return the results of the API request

		$response = json_decode( $response );


		if ( ! empty( $response->results ) ) {
			return $response->results;
		}

		return $response;
	}


	//protected function send_request( $method, $endpoint, $params = array() ) {

	protected function send_request( $method, $url, $params = array() ) {

		/*		if ( $require_token && empty( $this->token ) ) {
					return null;
				}

				// Build the request URL
			if ( $send_token ) {
				$url = sprintf( '%s/%s/%s',
					$this->base_url,
					$this->storefront,
					$endpoint
				);
			} else {
				$url = sprintf( '%s/%s',
					$this->base_url,
					$endpoint
				);
			}*/


		$url_safe = esc_url_raw( add_query_arg( $params, $url ) );

		if ( 'GET' === $method && function_exists( 'wpcom_vip_file_get_contents' ) ) {
			$response = wpcom_vip_file_get_contents(
				$url_safe,
				5, // request timeout in seconds
				900, // cache timeout in seconds
				array(
					'http_api_args' => array(
						'headers' => array(
							'Authorization' => "Bearer {$this->token}",
						)
					)
				) );
		} else {
			$response = wp_safe_remote_request(
				$url_safe,
				array(
					'method'  => $method,
					'headers' => array(
						'Authorization' => "Bearer {$this->token}",
					)
				)
			);


			if ( ! empty( $response ) && ! is_wp_error( $response ) ) {
				$response = wp_remote_retrieve_body( $response );


				//return $response; // ??
			}
		}

		if ( empty( $response ) || is_wp_error( $response ) ) {
			return null;
		}

		// Return the results of the API request

		$response = json_decode( $response ); // wont work for errors


		if ( ! empty( $response->results ) ) {
			return $response->results;
		}

		return $response;
	}


}
