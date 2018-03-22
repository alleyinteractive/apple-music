<?php

/**
 * Settings for the Apple Music embed tool.
 *
 * @package Apple_Music
 */

namespace Apple_Music;

class Settings {

	/**
	 * Set up the singleton.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'options_page' ] );
		add_action( 'admin_init', [ $this, 'register_settings' ] );
	}


	/**
	 * Register our settings.
	 */
	function register_settings() {

		register_setting( 'apple_music', 'apple_music_options' );

		add_settings_section(
			'apple_music_settings',
			esc_html__( 'Settings', 'apple-music' ),
			[ $this, 'section' ],
			'apple_music'
		);

		add_settings_field(
			'apple_music_token',
			esc_html__( 'Apple Music Token', 'apple-music' ),
			[ $this, 'add_token_field' ],
			'apple_music',
			'apple_music_settings',
			[
				'label_for' => 'token',
			]
		);

		add_settings_field(
			'apple_music_storefront',
			esc_html__( 'Apple Music Storefront', 'apple-music' ),
			[ $this, 'add_storefront_field' ],
			'apple_music',
			'apple_music_settings',
			[
				'label_for' => 'storefront',
			]
		);
	}

	/**
	 * Section description.
	 *
	 * @param $args
	 */
	function section( $args ) {
		?>
		<p id="<?php echo esc_attr( $args['id'] ); ?>"><?php esc_html_e( 'Section description placeholder', 'apple-music' ); ?></p>
		<?php
	}

	/**
	 * Helper to get token.
	 *
	 * @return string
	 */
	function get_token() {
		$options = get_option( 'apple_music_options' );
		$token   = ! empty( $options['token'] ) ? $options['token'] : '';

		return $token;
	}

	/**
	 * Helper to get storefront.
	 *
	 * @return string
	 */
	function get_storefront() {
		$options    = get_option( 'apple_music_options' );
		$storefront = ! empty( $options['storefront'] ) ? $options['storefront'] : '';

		return $storefront;
	}

	/**
	 * Token field.
	 *
	 * @param $args
	 */
	function add_token_field( $args ) {
		?>
		<input type="text" name="apple_music_options[token]" value="<?php echo esc_attr( $this->get_token() ); ?>" class="large-text"/>

		<p class="description">
			<?php esc_html_e( 'Field description placeholder', 'apple-music' ); ?>
		</p>

		<?php
	}

	/**
	 * Storefront field.
	 *
	 * @param $args
	 */
	function add_storefront_field( $args ) {
		$options     = get_option( 'apple_music_options' );
		$storefront  = ! empty( $options['storefront'] ) ? $options['storefront'] : 'us';
		$api         = new API();
		$storefronts = $api->get_storefronts();
		?>
		<select id="<?php echo esc_attr( $args['label_for'] ); ?>" name="apple_music_options[<?php echo esc_attr( $args['label_for'] ); ?>]">
			<?php foreach ( $storefronts->data as $sf ) : ?>
				<option value="<?php echo esc_attr( $sf->id ); ?>" <?php selected( $storefront, $sf->id ); ?>>
					<?php esc_html_e( $sf->attributes->name ); ?>
				</option>
			<?php endforeach; ?>
		</select>
		<p class="description">
			<?php esc_html_e( 'Field description placeholder', 'apple-music' ); ?>
		</p>
		<?php
	}

	/**
	 * Add settings to admin menu.
	 */
	function options_page() {
		add_options_page(
			esc_html__( 'Apple Music', 'apple-music' ),
			esc_html__( 'Apple Music', 'apple-music' ),
			'manage_options',
			'apple-music',
			[ $this, 'options_page_html' ]
		);
	}

	/**
	 * Body of settings page.
	 */
	function options_page_html() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		?>

		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<form action="options.php" method="post">
				<?php
				settings_fields( 'apple_music' );
				do_settings_sections( 'apple_music' );
				submit_button( 'Save Settings' );
				?>
			</form>
		</div>
		<?php
	}

}
