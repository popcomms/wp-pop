<?php

/**
 * Generates HTML markup for an image with specified source and alt text.
 * If alt text is not provided, falls back to site description or empty string.
 *
 * @param string $image_name name of image from folder image in assets
 * @param string|null $alt Alternative text for the image (optional)
 * @return string HTML image tag
 */

// Example function call:
// echo render_placeholder('header-image.jpg', 'Website header banner');

function render_placeholder($image_name, $alt = null)
{
	// If alt text is not provided, try to get site description
	$alt_text = $alt ?? (get_bloginfo('description') ?: '');

	// Generate HTML image tag with escaped attributes
	$html = '<img src="' . get_img_src($image_name) . '" alt="' . esc_attr($alt_text) . '">';

	return $html;
}
