<?php

/**
 * Enhanced Responsive Image Helper Function
 *
 * @param string $image_id the id of the image (from ACF or similar)
 * @param string $image_size the size of the thumbnail image or custom image size
 * @param string $mobile_image_size the size for mobile devices
 * @param string $max_width the max width this image will be shown to build the sizes attribute
 * @param string $mobile_breakpoint the breakpoint for mobile devices (default: 768px)
 */

/**
 * <?php if ($image) { ?>
 *	<img <?php
 *			echo awesome_acf_responsive_image(
 *					$image['ID'],
 *					'call-to-action',      // Desktop size (1920x625)
 *					'hero-travel-guide-mobile', // Mobile size (768x1000)
 *					1100,
 *					555
 *			);
 * ?> alt="<?php echo esc_attr($image['alt']); ?>">
 * <?php }; ?>
 */

function awesome_acf_responsive_image($image_id, $image_size, $mobile_image_size = '', $max_width = '', $mobile_breakpoint = '768px')
{
	// check the image ID is not blank
	if ($image_id != '') {
		// Debug: Check available sizes
		$available_sizes = wp_get_attachment_metadata($image_id);
		error_log('Available sizes: ' . print_r($available_sizes['sizes'], true));

		// set the default src image size
		$image_src = wp_get_attachment_image_url($image_id, $image_size);

		// Create custom srcset with both mobile and desktop sizes
		$mobile_src = wp_get_attachment_image_url($image_id, $mobile_image_size);
		$desktop_src = wp_get_attachment_image_url($image_id, $image_size);

		// Debug: Check URLs
		error_log('Mobile src: ' . $mobile_src);
		error_log('Desktop src: ' . $desktop_src);

		// Get dimensions for both sizes
		$mobile_dimensions = wp_get_attachment_image_src($image_id, $mobile_image_size);
		$desktop_dimensions = wp_get_attachment_image_src($image_id, $image_size);

		// Build custom srcset
		$srcset = '';
		if ($mobile_src && $mobile_dimensions) {
			$srcset .= $mobile_src . ' ' . $mobile_dimensions[1] . 'w, ';
		}
		if ($desktop_src && $desktop_dimensions) {
			$srcset .= $desktop_src . ' ' . $desktop_dimensions[1] . 'w';
		}

		// Generate sizes attribute
		if ($mobile_image_size) {
			$sizes = $max_width
				? "(max-width: {$mobile_breakpoint}px) 768px, (max-width: {$max_width}px) 100vw, {$max_width}px"
				: "(max-width: {$mobile_breakpoint}px) 768px, 100vw";
		} else {
			$sizes = $max_width ? "(max-width: {$max_width}px) 100vw, {$max_width}px" : "100vw";
		}

		// generate the markup for the responsive image
		echo 'src="' . $image_src . '" srcset="' . $srcset . '" sizes="' . $sizes . '"';
	}
}
