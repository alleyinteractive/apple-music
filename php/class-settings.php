<?php

/**
 * Main handler for the Apple Music embed tool.
 *
 * @package Apple_Music
 */

namespace Apple_Music;

class Settings {
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

		add_action( 'admin_menu', [ $this, 'options_page' ] );
		add_action( 'admin_init', [ $this, 'settings_init' ] );
	}


	function settings_init() {

		register_setting( 'apple_music', 'apple_music_options' );

		add_settings_section(
			'apple_music_settings',
			esc_html__( 'Settings', 'apple-music' ),
			[ $this, 'section' ],
			'apple_music'
		);

		// register a new field in the "wporg_section_developers" section, inside the "wporg" page
		add_settings_field(
			'wporg_field_pill', // as of WP 4.6 this value is used only internally
			// use $args' label_for to populate the id inside the callback
			esc_html__( 'Apple Music Token', 'apple-music' ),
			[ $this, 'add_token_field' ],
			'apple_music',
			'apple_music_settings',
			[
				'label_for' => 'wporg_field_pill',
				'class'     => 'wporg_row',
			]
		);

		add_settings_field(
			'wporg_field_pillg', // as of WP 4.6 this value is used only internally
			// use $args' label_for to populate the id inside the callback
			esc_html__( 'Apple Music Storefront', 'apple-music' ),
			[ $this, 'add_storefront_field' ],
			'apple_music',
			'apple_music_settings',
			[
				'label_for' => 'storefront',
			]
		);
	}



// developers section cb

// section callbacks can accept an $args parameter, which is an array.
// $args have the following keys defined: title, id, callback.
// the values are defined at the add_settings_section() function.
	function section( $args ) {
		?>
		<p id="<?php echo esc_attr( $args['id'] ); ?>"><?php esc_html_e( 'Follow the white rabbit.', 'apple-music' ); ?></p>
		<?php
	}

// field callbacks can accept an $args parameter, which is an array.
// $args is defined at the add_settings_field() function.
// wordpress has magic interaction with the following keys: label_for, class.
// the "label_for" key value is used for the "for" attribute of the <label>.
// the "class" key value is used for the "class" attribute of the <tr> containing the field.
// you can add custom key value pairs to be used inside your callbacks.
	function add_token_field( $args ) {
		// get the value of the setting we've registered with register_setting()
		$options = get_option( 'apple_music_options' );

		$token = ! empty( $options['token'] ) ? $options['token'] . '!' : 'v';
		// output the field
		?>
		<input type="text" name="apple_music_options[token]" value="<?php echo esc_html( $token ); ?>"/>


		<!--
		<select id="<?php echo esc_attr( $args['label_for'] ); ?>"
		        data-custom="<?php echo esc_attr( $args['wporg_custom_data'] ); ?>"
		        name="apple_music_options[<?php echo esc_attr( $args['label_for'] ); ?>]"
		>
			<option value="red" <?php echo isset( $options[ $args['label_for'] ] ) ? ( selected( $options[ $args['label_for'] ], 'red', false ) ) : ( '' ); ?>>
				<?php //esc_html_e( 'red pill', 'wporg' ); ?>
			</option>
			<option value="blue" <?php echo isset( $options[ $args['label_for'] ] ) ? ( selected( $options[ $args['label_for'] ], 'blue', false ) ) : ( '' ); ?>>
				<?php //esc_html_e( 'blue pill', 'wporg' ); ?>
			</option>
		</select>-->
		<p class="description">
			<?php esc_html_e( 'You take the blue pill and the story ends. You wake in your bed and you believe whatever you want to believe.', 'wporg' ); ?>
		</p>

		<?php
	}


	function add_storefront_field( $args ) {
		// get the value of the setting we've registered with register_setting()
		$options = get_option( 'apple_music_options' );

		$storefront = ! empty( $options['storefront'] ) ? $options['storefront'] : 'us';

		?>


		<select id="<?php echo esc_attr( $args['label_for'] ); ?>" name="apple_music_options[<?php echo esc_attr( $args['label_for'] ); ?>]">

			<?php foreach ( [ '1', '2', '3' ] as $sf ) : ?>
				<option value="<?php echo $sf; ?>" <?php selected( $storefront, $sf ); ?>>
					<?php esc_html_e( $sf, 'apple-music' ); ?>
				</option>
			<?php endforeach; ?>

		</select>
		<p class="description">
			<?php esc_html_e( '', 'apple-music' ); ?>
		</p>

		<?php
	}


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
	 * top level menu:
	 * callback functions
	 */
	function options_page_html() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		// add error/update messages

		// check if the user have submitted the settings
		// wordpress will add the "settings-updated" $_GET parameter to the url
		if ( isset( $_GET['settings-updated'] ) ) {
			// add settings saved message with the class of "updated"
			add_settings_error( 'wporg_messages', 'wporg_message', __( 'Settings Saved', 'wporg' ), 'updated' );
		}

		// show error/update messages
		settings_errors( 'wporg_messages' );
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
