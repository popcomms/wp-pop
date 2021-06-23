<?php

// Prevent default WP JPEG compressions

add_filter('jpeg_quality', function($arg) { return 100; });
add_filter('wp_editor_set_quality', function($arg) { return 100; } );

// COLOR SWATCHES FOR WYSIWYG

function custom_wysiwyg_colors($init) {

	$custom_colours = '
		"F8F7EE", "Pop White",
		"2D2D2D", "Pop Black",
		"DFDFDF", "Pop Gray",
		"8E8E8E", "Pop Gray Mid",
		"3C3B3B", "Pop Gray Dark",
		"212363", "Pop Navy",
		"64FFE3", "Pop Green",
		"E8FDF5", "Pop Pale Green",
		"FF0088", "Pop Pink",
		"CDF2F4", "Pop Pale Pink",
		"3A3EAB", "Pop Blue",
		"FFFF99", "Pop Yellow"
	';

	// build colour grid default+custom colors
	$init['textcolor_map'] = '['.$custom_colours.']';

	// change the number of rows in the grid if the number of colors changes
	// 8 swatches per row
	$init['textcolor_rows'] = 2;

	return $init;
}
add_filter('tiny_mce_before_init', 'custom_wysiwyg_colors');

// ADD POP COLORS GUTENBURG COLOR PALETTE

// Adds support for editor color palette.
add_theme_support( 'editor-color-palette', array(
	array(
		'name' => __('pop-white'),
		'slug' => 'pop-white',
		'color' => '#F8F7EE'
	),
	array(
		'name' => __('pop-black'),
		'slug' => 'pop-black',
		'color' => '#2D2D2D'
	),
	array(
		'name' => __('pop-black-dark'),
		'slug' => 'pop-black-dark',
		'color' => '#272727'
	),
	array(
		'name' => __('pop-gray'),
		'slug' => 'pop-gray',
		'color' => '#DFDFDF'
	),
	array(
		'name' => __('pop-mid-gray'),
		'slug' => 'pop-mid-gray',
		'color' => "#8E8E8E"
	),
	array(
		'name' => __('pop-dark-gray'),
		'slug' => 'pop-dark-gray',
		'color' => "#3C3B3B"
	),
	array(
		'name' => __('pop-navy'),
		'slug' => 'pop-navy',
		'color' => '#212363'
	),
	array(
		'name' => __('pop-green'),
		'slug' => 'pop-green',
		'color' => '#64FFE3'
	),
	array(
		'name' => __('pop-green-pale'),
		'slug' => 'pop-green-pale',
		'color' => '#E8FDF5'
	),
	array(
		'name' => __('pop-pink'),
		'slug' => 'pop-pink',
		'color' => '#FF0088'
	),
	array(
		'name' => __('pop-pink-pale'),
		'slug' => 'pop-pink-pale',
		'color' => '#CDF2F4'
	),
	array(
		'name' => __('pop-blue'),
		'slug' => 'pop-blue',
		'color' => '#3A3EAB'
	),
	array(
		'name' => __('pop-yellow'),
		'slug' => 'pop-yellow',
		'color' => '#FFFF99'
	)
));
