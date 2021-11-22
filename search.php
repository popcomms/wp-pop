<?php
/**
 * Search results page
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$templates = array( 'search.twig', 'archive.twig', 'index.twig' );

$context          = Timber::context();
$context['title'] = get_search_query();
$text_search = get_search_query();
$context['s'] = $text_search;

$args = array(
  'post_type'        => array('post', 'case-studies'),
  'posts_per_page'   => 8,
  's'                => $text_search,
  'post_status'      => 'publish',
  'paged'            => $paged
);
$context['posts'] = new Timber\PostQuery($args);

$cat_args = array(
  'hide_empty' => true,
	'orderby'    => 'name',
	'order'      => 'ASC'
);
$context['categories'] = get_categories($cat_args);

Timber::render( $templates, $context );
