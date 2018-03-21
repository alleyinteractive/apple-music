<?php

/**
 * Main handler for the Apple Music embed tool.
 *
 * @package Apple_Music
 */

namespace Apple_Music;

class API {
	//use Util\Singleton; // need this for instance


	/**
	 * @var string $base_url Base Apple Music API endpoint URL.
	 */
	protected $base_url = 'https://api.music.apple.com/v1';

	/**
	 * @var string $storefront Apple Music Storefront to query.
	 */
	protected $storefront = 'us';

	/**
	 * @var string $token Pre-signed API Token.
	 */
	protected $token;


	public static function instance() {
	new API();

}
	/**
	 * Set up the singleton.
	 */
	public function __construct() {
		$settings         = new Settings();
		$this->token      = $settings->get_token();
		$this->storefront = $settings->get_storefront();

	}

	/**
	 * Search for a requested term.
	 *
	 * @param string $term
	 *
	 * @return object|null
	 */
	public function search( $term ) {
	//	$settings         = new Settings();
//die($this->storefront . '!' . $settings->get_storefront());
		$url = sprintf( '%s/%s/%s/%s',
			$this->base_url,
			'catalog',
			$this->storefront,
			'search'
		);

		return $this->send_request( 'GET', $url, compact( 'term' ) );
	}

	/**
	 * Fetch and cache storefronts.
	 *
	 * @return mixed|null
	 */
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
	 * Make API request.
	 *
	 * @param $method
	 * @param $url
	 * @param array $params
	 *
	 * @return mixed|null
	 */
	protected function send_request( $method, $url, $params = [ ] ) {

		$url_safe = esc_url_raw( add_query_arg( $params, $url ) );

		if ( 'GET' === $method && function_exists( 'wpcom_vip_file_get_contents' ) ) {
			$response = wpcom_vip_file_get_contents(
				$url_safe,
				5, // request timeout in seconds
				900, // cache timeout in seconds
				[
					'http_api_args' => [
						'headers' => [
							'Authorization' => "Bearer {$this->token}",
						],
					],
				] );
		} else {
			$response = wp_safe_remote_request(
				$url_safe,
				[
					'method'  => $method,
					'headers' => [
						'Authorization' => "Bearer {$this->token}",
					]
				]
			);

			if ( ! empty( $response ) && ! is_wp_error( $response ) ) {
				$response = wp_remote_retrieve_body( $response );
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


