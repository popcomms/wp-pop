<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context = Timber::context();
$context['posts'] = new Timber\PostQuery();

$timber_post = new Timber\Post();
$context['post'] = $timber_post;

$context['categories'] = Site_Posts::get_categories();
$context['tags'] = Site_Posts::get_tags();
$context['post_format'] = '';
$context['banner_images'] = [
  'small' => get_field('archives_post_banner_image_small', 'option'),
  'large' => get_field('archives_post_banner_image_large', 'option')
];

$templates = array('index.twig');
if (is_home()) { array_unshift( $templates, 'front-page.twig', 'home.twig'); }
Timber::render($templates, $context);
