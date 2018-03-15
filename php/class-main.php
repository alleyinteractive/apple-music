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
	protected $base_url = 'https://api.music.apple.com/v1/catalog';

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

		$this->token = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldSWDQ2U1A5TjQifQ.eyJpc3MiOiJBSEtFSzNUMzZQIiwiaWF0IjoxNTE2NjYxOTY2LCJleHAiOjE1MzIzODMxNjZ9.9cCIFu1fq0wJV49HwbVdpreVQ2KQf14Yz0PRD3IjFGfayFXipsv8maSfAZLPuRNLFyhZWY8V2FB7uVBdYQOMNw';




	}



	/**
	 * Search for a requested term.
	 *
	 * @param string $term
	 *
	 * @return object|null
	 */
	public function search( $term ) {
		return $this->send_request( 'GET', 'search', compact( 'term' ) );
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
	protected function send_request( $method, $endpoint, $params = array() ) {
		if ( empty( $this->token ) ) {
			return null;
		}

		// Build the request URL
		$url = sprintf( '%s/%s/%s',
			$this->base_url,
			$this->storefront,
			$endpoint
		);

		$url_safe = esc_url_raw( add_query_arg( $params, $url ) );

		if ( 'GET' === $method && function_exists( 'wpcom_vip_file_get_contents' ) ) {
			$response = wpcom_vip_file_get_contents(
				$url_safe,
				5, // request timeout in seconds
				900, // cache timeout in seconds
				array(
					'http_api_args' => array(
						'headers' => array(
							'Authorization' => "Bearer: {$this->token}",
						)
					)
				) );
		} else {
			$response = wp_safe_remote_request(
				$url_safe,
				array(
					'method'  => $method,
					'headers' => array(
						'Authorization' => "Bearer: {$this->token}",
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
}
