<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.2
 */

$templates = array('archive.twig');

$context = Timber::context();

$context['title'] = 'Archive';
if ( is_day() ) {
	$context['title'] = get_the_date( 'D M Y' );
  $context['breadcrumb'] = 'Archive';
} elseif ( is_month() ) {
	$context['title'] = get_the_date( 'M Y' );
  $context['breadcrumb'] = 'Archive';
} elseif ( is_year() ) {
	$context['title'] = get_the_date( 'Y' );
  $context['breadcrumb'] = 'Archive';
} elseif ( is_tag() ) {
	$context['title'] = single_tag_title( '', false );
  $context['description'] = tag_description();
  $context['breadcrumb'] = 'Tag';
  array_unshift( $templates, 'archive-' . get_query_var( 'cat' ) . '.twig' );
} elseif ( is_category() ) {
	$context['title'] = single_cat_title( '', false );
  $context['description'] = category_description();
  $context['breadcrumb'] = 'Category';
	array_unshift( $templates, 'archive-' . get_query_var( 'cat' ) . '.twig' );
} elseif ( is_post_type_archive() ) {
	$context['title'] = post_type_archive_title( '', false );
  $context['description'] = get_the_post_type_description();
	array_unshift( $templates, 'archive-' . get_post_type() . '.twig' );
}

$post_format = '';
$post_type = !empty(get_post_type()) ? get_post_type() : get_query_var('post_type');
$case_studies_archive = ($post_type === 'case-studies');
$banner_images = [
  'small' => get_field('archives_' . $post_type . '_banner_image_small', 'option'),
  'large' => get_field('archives_' . $post_type . '_banner_image_large', 'option')
];

global $post, $wp_query;

if (
  isset($wp_query->query['post_format']) &&
  !empty($wp_query->query['post_format'])
) {
  
  $post_format = $wp_query->query['post_format'];
  array_unshift($templates, $post_format . '.twig');
  
  $banner_images = [
    'small' => get_field('archives_' . $post_format . '_banner_image_small', 'option'),
    'large' => get_field('archives_' . $post_format . '_banner_image_large', 'option')
  ];
  
}

$context['categories'] = $case_studies_archive ? Site_Case_Studies::get_categories() : Site_Posts::get_categories($post_format);
$context['tags'] = $case_studies_archive ? Site_Case_Studies::get_tags() : Site_Posts::get_tags($post_format);
$context['post_format'] = $post_format;
$context['current_category'] = is_category() ? get_query_var('cat') : '';
$context['current_tag'] = is_tag() ? get_query_var('tag_id') : '';
$context['case_studies_archive'] = $case_studies_archive;
$context['post_type'] = $post_type;
$context['banner_images'] = $banner_images;

if ($post_type === 'case-studies') {
  
  $context['current_category'] = isset($_GET['cs_category']) ? sanitize_text_field($_GET['cs_category']) : '';
  $context['current_tag'] = isset($_GET['cs_tag']) ? sanitize_text_field($_GET['cs_tag']) : '';
  
}

$context['posts'] = new Timber\PostQuery();

Timber::render($templates, $context);
