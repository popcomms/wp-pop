<?php

/*
 * Theme Functions
 */


/*
=====================
  Header nav menu
=====================
*/
function filter_walker_nav_menu_start_el($item_output, $item, $depth, $args)
{
	if ((in_array('menu-item-has-children', $item->classes))) {
		return '<div class="menu-item__parent">' . $item_output . '</div>';
	}

	return $item_output;
}

add_filter('walker_nav_menu_start_el', 'filter_walker_nav_menu_start_el', 10, 4);


/*
======================
 Move Yoast to bottom
======================
*/
function yoasttobottom()
{
	return 'low';
}

add_filter('wpseo_metabox_prio', 'yoasttobottom');


/*
=================================================================
 Remove Gutenberg Block Library CSS from loading on the frontend
=================================================================
*/
function smartwp_remove_wp_block_library_css()
{
	wp_dequeue_style('wp-block-library');
	wp_dequeue_style('wp-block-library-theme');
}

add_action('wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css');

/**
 * =================================================================
 * Check if WooCommerce is activated
 * =================================================================
 */
if (! function_exists('is_woocommerce_activated')) {
	function is_woocommerce_activated()
	{
		if (class_exists('woocommerce')) {
			return true;
		} else {
			return false;
		}
	}
}

/**
 * =================================================================
 * Remove gutenberg for pages
 * =================================================================
 */
function disable_gutenberg_for_pages($use_block_editor, $post)
{
	// Включаем Гутенберг только для типа записи 'news'
	// if ($post->post_type === 'news') {
	//   return true; // Включаем Гутенберг
	// }
	return false; // Отключаем Гутенберг для всех остальных типов
}
add_filter('use_block_editor_for_post', 'disable_gutenberg_for_pages', 10, 2);

/**
 * =================================================================
 * Breadcrumb Icon
 * =================================================================
 */

//  function custom_yoast_breadcrumb_separator($separator)
//  {
// 	 $icon = '<svg width="100%" height="100%" viewBox="0 0 4 6" fill="none" xmlns="http://www.w3.org/2000/svg">
//  <path d="M0.730129 0C0.598466 0 0.491491 0.0368078 0.442865 0.0570896C0.338882 0.0999068 0 0.275683 0 0.722634V5.27778C0 5.72474 0.338882 5.90051 0.442865 5.94333C0.546849 5.98615 0.910417 6.10258 1.22461 5.78708L4 3.00021L1.22536 0.213335C1.05854 0.0458219 0.878249 0 0.730129 0Z" fill="white"/>
//  </svg>';
// 	 return '<span class="hero__crumbs_separator">' . $icon . '</span>';
//  }
//  add_filter('wpseo_breadcrumb_separator', 'custom_yoast_breadcrumb_separator');

/**
 * =================================================================
 *  hide post button from admin bar
 * =================================================================
 */

// function hide_post_type_from_admin()
// {

// 	remove_menu_page('edit.php');

// 	function hide_post_type_from_admin_bar($wp_admin_bar)
// 	{
// 		$wp_admin_bar->remove_node('new-post');
// 	}
// 	add_action('admin_bar_menu', 'hide_post_type_from_admin_bar', 999);
// }
// add_action('admin_menu', 'hide_post_type_from_admin');

/**
 * =================================================================
 *  remove <br> and <p> from cf7 form
 * =================================================================
 */

add_filter('wpcf7_form_elements', 'wpcf7_remove_p_and_br_tags');

function wpcf7_remove_p_and_br_tags($content)
{
	$content = str_replace('<br />', '', $content);
	$content = preg_replace('/<p[^>]*?>(.*?)<\/p>/is', '$1', $content);
	return $content;
}

/**
 * =================================================================
 *  remove emoji
 * =================================================================
 */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');
