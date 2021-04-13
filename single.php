<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$timber_post     = Timber::get_post();
$context         = Timber::context();
$context['post'] = $timber_post;
$all_acf = get_field_objects($context["post"]->ID);
if (!empty($all_acf["post_options"])) {
	$context["content"] = $all_acf["post_options"]["value"];
}
$context["banner"] = $all_acf["banner"]["value"];


if ( post_password_required( $timber_post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $timber_post->ID . '.twig', 'single-' . $timber_post->post_type . '.twig', 'single-' . $timber_post->slug . '.twig', 'single.twig' ), $context );
}
