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
    'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
    array(),
    true
  );
  wp_enqueue_script(
    'lazyframe-js',
    get_template_directory_uri().'/static/js/lazyframe.min.js',
    array(),
    '2.27',
    true
  );
	wp_enqueue_script(
    'main',
    get_template_directory_uri().'/static/main.js',
    array('gsap','scrollTrigger','vue', 'lazyframe-js'),
    '0.11',
    true
  );


  // CSS
  wp_enqueue_style(
    'lazyframe',
    get_template_directory_uri().'/static/css/lazyframe.min.css',
    array(),
    '2.2.8',
    'all'
  );
  wp_enqueue_style(
    'main',
    get_template_directory_uri().'/style.css',
    array(),
    '1.44',
    'all'
  );
  wp_enqueue_style(
    'wpb-google-fonts',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap',
    false
  );
}
add_action( 'wp_enqueue_scripts', 'pop_enqueue_scripts' );
