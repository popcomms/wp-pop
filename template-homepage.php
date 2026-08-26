<?php
/**
 * Template Name: Flexible Content
 */

/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/templates/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::context();

$timber_post     = new Timber\Post();
$context['post'] = $timber_post;

$context['header_template'] = 'partial/nav-new.twig'; // your custom header file
$context['footer_template'] = 'footer-new.twig'; // your custom footer file

// 3. Render the Twig template
Timber::render( 'my-custom-page.twig', $context );
?>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const playButton = document.getElementById('play-video');
  const btnWrap = document.querySelector('.btnWrap');
  const video = document.getElementById('video');

  playButton.addEventListener('click', function(ev) {

   if (btnWrap) btnWrap.classList.add('fade-out');

   if (video) {
      let src = video.src;

      if (src.includes('autoplay=0')) {
        src = src.replace('autoplay=0', 'autoplay=1');
      } else if (!src.includes('autoplay=1')) {
        const separator = src.includes('?') ? '&' : '?';
        src += `${separator}autoplay=1`;
      }
      video.src = src;
    }

    ev.preventDefault();
  });
});

</script>


