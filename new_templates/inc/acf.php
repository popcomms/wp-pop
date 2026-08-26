<?php

// ACF Settings


/*
==================
 ACF options page
==================
*/
if (function_exists('acf_add_options_page')) {
	acf_add_options_page(array(
		'page_title' => 'Site Settings',
		'menu_title' => 'Site Settings',
		'menu_slug' => 'site-settings',
		'capability' => 'edit_posts',
		'redirect' => false
	));

	// Place, where we add social media links
	acf_add_options_sub_page(array(
		'page_title' => 'Social Media',
		'menu_title' => 'Social media',
		'parent_slug' => 'site-settings',
	));

	// Allow client to add GTM, Analytics and other scripts to the head, body etc.
	acf_add_options_sub_page(array(
		'page_title' => 'Scripts',
		'menu_title' => 'Scripts',
		'parent_slug' => 'site-settings',
	));

	// Allow client to change 404 copy
	acf_add_options_sub_page(array(
		'page_title' => '404 - Error page',
		'menu_title' => '404 - Error page',
		'parent_slug' => 'site-settings',
	));

	// Header Settings
	acf_add_options_sub_page(array(
		'page_title' => 'Header Settings',
		'menu_title' => 'Header Settings',
		'parent_slug' => 'site-settings',
	));

	// Footer Settings
	acf_add_options_sub_page(array(
		'page_title' => 'Footer Settings',
		'menu_title' => 'Footer Settings',
		'parent_slug' => 'site-settings',
	));
}

// ACF Settings
/*
==================
 ACF options page
==================
*/
if (function_exists('acf_add_options_page')) {
	acf_add_options_page(array(
		'page_title' => 'Site Settings',
		'menu_title' => 'Site Settings',
		'menu_slug' => 'site-settings',
		'capability' => 'edit_posts',
		'redirect' => false
	));

	// Place, where we add social media links
	acf_add_options_sub_page(array(
		'page_title' => 'Social Media',
		'menu_title' => 'Social media',
		'parent_slug' => 'site-settings',
	));

	// Allow client to add GTM, Analytics and other scripts to the head, body etc.
	acf_add_options_sub_page(array(
		'page_title' => 'Scripts',
		'menu_title' => 'Scripts',
		'parent_slug' => 'site-settings',
	));

	// Allow client to change 404 copy
	acf_add_options_sub_page(array(
		'page_title' => '404 - Error page',
		'menu_title' => '404 - Error page',
		'parent_slug' => 'site-settings',
	));


	// Temporary disabled because we're hooked into previous settings


	// Allow client to change Header Content
	// acf_add_options_sub_page(array(
	// 	'page_title' => 'Header Settings',
	// 	'menu_title' => 'Header Settings',
	// 	'parent_slug' => 'site-settings',
	// ));

	// Footer Settings
	acf_add_options_sub_page(array(
		'page_title' => 'Footer Settings',
		'menu_title' => 'Footer Settings',
		'parent_slug' => 'site-settings',
	));
}

// // acf extended thumbnail Register multiple thumbnail filters dynamically.
// //  just uncomment this when add acf-extended in project
// $layouts = [
// 	'faq',
// 	'hero-base',
// 	'duplex-1',
// 	'content-block',
// 	'testimonials',
// 	'slider-testimonials'
// ];

// foreach ($layouts as $image) {
// 	add_filter("acfe/flexible/thumbnail/layout={$image}", function ($thumbnail, $field, $layout) use ($image) {
// 		//return get_template_directory_uri() . "/assets/blocks-preview/{$image}.png";
// 		return 'http://sololink.local/wp-content/themes/Avada/assets/blocks-preview/slider-testimonials.png';
// 	}, 10, 3);
// }

// add_filter('acf/fields/flexible_content/layout_title/name=content__page', 'my_acf_fields_flexible_content_layout_title', 10, 4);
// add_filter('acf/fields/flexible_content/layout_title/name=cpt__page', 'my_acf_fields_flexible_content_layout_title', 10, 4);

// function my_acf_fields_flexible_content_layout_title($title, $field, $layout, $i)
// {

// 	$options = get_sub_field('block-options');
// 	$text = $options['block_label'];
// 	if ($text) {
// 		$title = '';
// 	}
// 	$layout_name = $layout['name'];

// 	$image_url = get_template_directory_uri() . "/assets/blocks-preview/{$layout_name}.png";

// 	$title .= '<div>' . $text . '</div>
// 	<div class="thumbnail block-thumbnail-custom"><img src="' . esc_url($image_url) . '" style="max-width: 400px; height: 70px; display: block; object-fit: contain;"/></div>';

// 	return $title;
// }


// add_action('admin_head', 'acf_ex_image_size');

// function acf_ex_image_size()
// {
// 	echo '<style>
//     .acfe-flexible-layout-thumbnail{
//       background-size: contain;
//     }
//   </style>';
// }
// //
// // end acf extended thumbnail
// //