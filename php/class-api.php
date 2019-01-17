<?php
/**
 * Class to handle Apple Music API interactions.
 *
 * @package Connect_to_Apple_Music
 */

namespace Apple_Music;

class API {

	/**
	 * @var string $base_url Base Apple Music API endpoint URL.
	 */
	protected $base_url = 'https://union.staging.organicfruitapps.com/wp/v1';

	/**
	 * @var string $storefront Apple Music Storefront to query.
	 */
	protected $storefront;

	/**
	 * @var string $token Pre-signed API Token.
	 */
	protected $token;

	/**
	 * API constructor.
	 */
	public function __construct() {
		$this->storefront = Settings::get_storefront();
	}

	/**
	 * Search for a requested term.
	 *
	 * @param $term
	 * @param $types
	 * @param $page
	 *
	 * @return mixed|null
	 */
	public function search( $term, $types, $page ) {

		$url = sprintf(
			'%s/%s/%s/%s',
			$this->base_url,
			'catalog',
			$this->storefront,
			'search'
		);

		$limit  = 25;
		$offset = ( ( $page > 1 ? -- $page : $page ) * 25 );

		return $this->send_request( 'GET', esc_url( $url ), compact( 'term', 'types', 'limit', 'offset' ) );
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

			$url = sprintf(
				 '%s/%s',
				$this->base_url,
				'storefronts'
			);

			$storefronts = $this->send_request( 'GET', esc_url( $url ) );

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
	protected function send_request( $method, $url, $params = [] ) {

		$url_safe = esc_url_raw( add_query_arg( $params, $url ) );

		if ( 'GET' === $method && function_exists( 'wpcom_vip_file_get_contents' ) ) {
			$response = wpcom_vip_file_get_contents( $url_safe, 8, 15 * MINUTE_IN_SECONDS );
		} else {
			$transient_key = md5( $url_safe );
			$response      = get_transient( $transient_key );
			if ( false === $response ) {
				$response = wp_safe_remote_request(
					$url_safe,
					[
						'method'  => $method,
						'timeout' => 8,
					]
				);
				if ( ! empty( $response ) && ! is_wp_error( $response ) ) {
					$response = wp_remote_retrieve_body( $response );
					set_transient( $transient_key, $response, 15 * MINUTE_IN_SECONDS );
				}
			}
		}

		if ( empty( $response ) || is_wp_error( $response ) ) {
			return $response;
		}

		$response = json_decode( $response );

		if ( ! empty( $response->results ) ) {
			return $response->results;
		}

		return $response;
	}
}
