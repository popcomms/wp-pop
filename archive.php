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

$categories = get_categories( array(
	'orderby'    => 'name',
	'order'      => 'ASC',
	'hide_empty' => '1'
) );
$context['categories'] = $categories;

$tags = get_tags( array(
	'orderby'    => 'count',
	'order'      => 'DESC',
  'number'     => 20,
	'hide_empty' => '1'
) );
$context['tags'] = $tags;

$args = array(
  'post_type'   => array('post', 'case-studies'),
  'post_status' => 'publish',
  'category'    => get_query_var('cat')
);

$context['posts'] = new Timber\PostQuery($args);

Timber::render( $templates, $context );
