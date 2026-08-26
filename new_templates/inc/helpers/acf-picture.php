<?php

/**
 * Renders a responsive picture element with desktop and mobile images.
 *
 * @param array  $desktop_image  Array with desktop image data (from ACF), including 'ID' and 'alt'.
 * @param array  $mobile_image   Array with mobile image data (from ACF), including 'ID' and 'alt'.
 * @param string $breakpoint     Breakpoint for the mobile image in CSS units (e.g., '768px').
 * @param string $custom_class   Custom CSS class for the <img> element.
 *
 * <?php acf_picture($desktop_image, $mobile_image, '768px', 'hero-home__img'); ?>
 */
function acf_picture($desktop_image, $mobile_image, $breakpoint = '768px', $custom_class = 'img')
{
?>
  <picture class="<?php echo esc_attr($custom_class) . '_w'; ?>">
    <?php if (!empty($mobile_image['ID'])): ?>

      <source
        srcset="<?php echo esc_url(wp_get_attachment_image_url($mobile_image['ID'], 'medium')); ?>"
        media="(max-width: <?php echo esc_attr($breakpoint); ?>)">
    <?php endif; ?>

    <?php if (!empty($desktop_image['ID'])): ?>

      <img
        src="<?php echo esc_url(wp_get_attachment_image_url($desktop_image['ID'], 'full')); ?>"
        srcset="<?php echo esc_attr(wp_get_attachment_image_srcset($desktop_image['ID'], 'full')); ?>"

        alt="<?php echo esc_attr($desktop_image['alt'] ?? ''); ?>"
        class="<?php echo esc_attr($custom_class); ?>">
    <?php endif; ?>
  </picture>
<?php
}
