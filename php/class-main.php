<?php

/**
 * Main handler for the Apple Music embed tool.
 *
 * @package Apple_Music
 */

namespace Apple_Music;

class Main {
	use Util\Singleton;

	/**
	 * @var string $base_url Base Apple Music API endpoint URL.
	 */
	protected $base_url = 'https://api.music.apple.com/v1';

	/**
	 * @var string $storefront Apple Music Storefront to query.
	 */
	protected $storefront;

	/**
	 * @var string $token Pre-signed API Token.
	 */
	protected $token;

	/**
	 * Set up the singleton.
	 */
	public function setup() {
		$this->storefront = apply_filters( 'apple_music_storefront', 'us' );

				$settings         = new Settings();
		$token = $settings->get_token();

		//$this->token = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldSWDQ2U1A5TjQifQ.eyJpc3MiOiJBSEtFSzNUMzZQIiwiaWF0IjoxNTE2NjYxOTY2LCJleHAiOjE1MzIzODMxNjZ9.9cCIFu1fq0wJV49HwbVdpreVQ2KQf14Yz0PRD3IjFGfayFXipsv8maSfAZLPuRNLFyhZWY8V2FB7uVBdYQOMNw';

		//$result = $this->search( 'Kanye' );
		
		//$result = $this->get_storefronts();
		
		//print_r( $result );
		//die( 'hi' );

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
