<?php
/**
 * Class to handle Connect to Apple Music admin settings.
 *
 * @package Connect_to_Apple_Music
 */

namespace Apple_Music;

/**
 * Class Settings
 * @package Connect_to_Apple_Music
 */
class Settings {

	/**
	 * Settings constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'options_page' ] );
		add_action( 'admin_init', [ $this, 'register_settings' ] );
	}

	/**
	 * Register our settings.
	 */
	public function register_settings() {

		register_setting( 'apple_music', 'apple_music_options' );

		add_settings_section(
			'apple_music_settings',
			esc_html__( 'Settings', 'connect-to-apple-music' ),
			[ $this, 'section' ],
			'apple_music'
		);

		add_settings_field(
			'apple_music_storefront',
			esc_html__( 'Apple Music Storefront', 'connect-to-apple-music' ),
			[ $this, 'add_storefront_field' ],
			'apple_music',
			'apple_music_settings',
			[
				'label_for' => 'storefront',
			]
		);

		add_settings_field(
			'apple_music_affiliate_token',
			esc_html__( 'Apple Music Affiliate Token', 'connect-to-apple-music' ),
			[ $this, 'add_affiliate_token_field' ],
			'apple_music',
			'apple_music_settings',
			[
				'label_for' => 'affiliate_token',
			]
		);
	}

	/**
	 * Section description.
	 *
	 * @param $args
	 */
	public function section( $args ) {
		?>
		<p id="<?php echo esc_attr( $args['id'] ); ?>"><?php esc_html_e( 'Configure your Connect to Apple Music plugin here.', 'connect-to-apple-music' ); ?></p>
		<?php
	}

	/**
	 * Helper to get affiliate token.
	 *
	 * @return string The affiliate token.
	 */
	public static function get_affiliate_token() {
		$options = get_option( 'apple_music_options' );
		$token   = ! empty( $options['affiliate_token'] ) ? $options['affiliate_token'] : '';

		return $token;
	}

	/**
	 * Apply the affiliate token to a URL.
	 *
	 * @param string  $url the URL to apply the affiliate token to.
	 * @return string the URL with the affiliate token
	 */
	public static function apply_affiliate_token( $url ) {
		$affiliate_token = self::get_affiliate_token();
		// Identify as Apple Music origin by appending this query var.
		// This applies to all URLs regardless of affiliate token presence.
		$query_vars = [ 'app' => 'music' ];

		if ( ! empty( $affiliate_token ) ) {
			$query_vars['at'] = $affiliate_token;
		}

		return add_query_arg( $query_vars, $url );
	}

	/**
	 * Helper to get storefront.
	 *
	 * @return string
	 */
	public static function get_storefront() {
		$options    = get_option( 'apple_music_options' );
		$storefront = ! empty( $options['storefront'] ) ? $options['storefront'] : 'us';

		return $storefront;
	}

	/**
	 * Storefront field.
	 *
	 * @param $args
	 */
	public function add_storefront_field( $args ) {
		$options     = get_option( 'apple_music_options' );
		$storefront  = ! empty( $options['storefront'] ) ? $options['storefront'] : 'us';
		$api         = new API();
		$storefronts = $api->get_storefronts();
		?>
		<select id="<?php echo esc_attr( $args['label_for'] ); ?>" name="apple_music_options[<?php echo esc_attr( $args['label_for'] ); ?>]">
			<?php foreach ( $storefronts->data as $sf ) : ?>
				<option value="<?php echo esc_attr( $sf->id ); ?>" <?php selected( $storefront, $sf->id ); ?>>
					<?php echo esc_html( $sf->attributes->name ); ?>
				</option>
			<?php endforeach; ?>
		</select>
		<p class="description">
			<?php esc_html_e( 'Choose your region here.', 'connect-to-apple-music' ); ?>
		</p>
		<?php
	}

	/**
	 * Affiliate token field.
	 *
	 */
	public function add_affiliate_token_field() {
		?>
		<input type="text" name="apple_music_options[affiliate_token]" value="<?php echo esc_attr( $this->get_affiliate_token() ); ?>" class="large-text"/>

		<p class="description">
			<?php esc_html_e( 'If you have one, you can add your Affiliate Token here.', 'connect-to-apple-music' ); ?>
		</p>

		<?php
	}

	/**
	 * Add settings to admin menu.
	 */
	public function options_page() {
		add_options_page(
			esc_html__( 'Apple Music', 'connect-to-apple-music' ),
			esc_html__( 'Apple Music', 'connect-to-apple-music' ),
			'manage_options',
			'apple-music',
			[ $this, 'options_page_html' ]
		);
	}

	/**
	 * Body of settings page.
	 */
	public function options_page_html() {

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
