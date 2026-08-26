<?php

/**
 * We use Yoast breadcrubms if nothing else is specified
 * Yoast SEO plugin should be active
 * Enable breadcrubms and other settings like separator - wp-admin/admin.php?page=wpseo_page_settings#/breadcrumbs
 */

if ( function_exists('yoast_breadcrumb') && !is_front_page()) : ?>

  <div class="breadcrumbs">
        <div class="container">
            <?php yoast_breadcrumb(); ?>
        </div>
  </div>

<?php endif; ?>