<?php

function pop_enqueue_scripts() {

  // JS

	wp_enqueue_script(
    'gsap',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js',
    array(),
    true
  );
	wp_enqueue_script(
    'scrollTrigger',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/ScrollTrigger.min.js',
    array(),
    true
  );
	wp_enqueue_script(
    'vue',
    'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js', // change to vue.min.js for production
    null,
    null,
    true
  );
  wp_enqueue_script(
    'contrast-js',
    get_template_directory_uri().'/static/js/contrast.min.js',
    null,
    null,
    true
  );
	wp_enqueue_script(
    'main',
    get_template_directory_uri().'/static/main.js?v=0.2',
    array('gsap', 'scrollTrigger', 'vue', 'contrast-js'),
    true
  );

  // CSS

  wp_enqueue_style(
    'wpb-google-fonts',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap',
    false
  );
}
add_action( 'wp_enqueue_scripts', 'pop_enqueue_scripts' );
