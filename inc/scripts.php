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
    'three',
    'https://threejs.org/build/three.js',
    array(),
    true
  );
  wp_enqueue_script(
    'OrbitControls',
    get_template_directory_uri() . '/static/js/three/OrbitControls.js',
    array(),
    true
  );
  wp_enqueue_script(
    'CopyShader',
    get_template_directory_uri() . '/static/js/three/CopyShader.js',
    array(),
    true
  );
  wp_enqueue_script(
    'EffectComposer',
    get_template_directory_uri() . '/static/js/three/EffectComposer.js',
    array(),
    true
  );
  wp_enqueue_script(
    'RenderPass',
    get_template_directory_uri() . '/static/js/three/RenderPass.js',
    array(),
    true
  );
  wp_enqueue_script(
    'ShaderPass',
    get_template_directory_uri() . '/static/js/three/ShaderPass.js',
    array(),
    true
  );
  wp_enqueue_script(
    'SMAAPass',
    get_template_directory_uri() . '/static/js/three/SMAAPass.js',
    array(),
    true
  );
  wp_enqueue_script(
    'CSS2DRenderer',
    get_template_directory_uri() . '/static/js/three/CSS2DRenderer.js',
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
    'main',
    get_template_directory_uri().'/static/main.js?v=0.9',
    array('gsap',
    'scrollTrigger',
    'vue'),
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
