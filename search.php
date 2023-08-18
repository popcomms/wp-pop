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

Timber::render( $templates, $context );
