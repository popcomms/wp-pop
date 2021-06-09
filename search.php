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
$context['title'] = 'Search results for ' . get_search_query();
$text_search = get_search_query();

$args = array(
  'post_type'        => array('post'),
  'posts_per_page'   => 8,
  's'                => $text_search,
  'post_status'      => 'publish',
  'paged'            => $paged
);

$context['posts'] = new Timber\PostQuery($args);
// $context['posts'] = new Timber\PostQuery();

Timber::render( $templates, $context );
