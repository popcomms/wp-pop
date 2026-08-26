<?php

/*
==============================
    Add Styles And Scripts
==============================
*/


function codelibry_enqueue()
{

	$DEVELOPMENT = true; // change to false if PRODUCTION

	$ABSOLUTE_DIST = get_template_directory() . '/dist'; // Absolute path to the dist folder
	$DIST = get_template_directory_uri() . '/dist'; // Dir to the dist theme folder
	$LIB = get_template_directory_uri() . '/lib'; // Dir to the lib theme folder

	if ($DEVELOPMENT) {

		$style_version = filemtime("{$ABSOLUTE_DIST}/css/app.css");
		$custom_version = filemtime("{$ABSOLUTE_DIST}/js/app.js");
	} else {
		$style_version = '1.0.0';
		$vendor_version = '1.0.0';
		$custom_version = '1.0.0';
	}


	/* Styles */
if ( is_page_template('template-homepage.php')  ) {
	/* Styles */
	wp_enqueue_style('critical', "{$DIST}/css/critical.css", array(), $style_version, 'all');
	wp_enqueue_style('modules', "{$DIST}/css/modules/modules.css", array(), $style_version, 'all');
	wp_enqueue_style('main-app', "{$DIST}/css/app.css", array(), $style_version, 'all');
}


	/* JavaScript */

	// Lottie Player: https://lottiefiles.github.io/lottie-player/usage.html
	//wp_enqueue_script( 'lottie-player', "{$LIB}/lottie-player.js", array(), '1.0.0', true );

	// Our Custom JavaScript (should depend on libaries above)
	wp_enqueue_script('main', "{$DIST}/js/app.js", array(), $custom_version, true);


	/* Passing PHP variables to JavaScript */

	wp_localize_script(
		'main',
		'codelibry',
		array(
			'ajax_url' => admin_url('admin-ajax.php'),
			'ajax_nonce' => wp_create_nonce("secure_nonce_name"),
			'theme_name' => get_template(),
			'site_url' => get_site_url(),
			'theme_url' => get_template_directory_uri()
		)
	);
}

add_action('wp_enqueue_scripts', 'codelibry_enqueue');
