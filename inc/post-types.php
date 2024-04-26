<?php


add_post_type_support( 'page', 'excerpt' );

// Case Studies

function custom_case_study_post_type() {
	register_post_type('case-studies',
			array(
					'labels' => array(
            'name'          => __('Case Studies'),
            'singular_name' => __('Case Study'),
					),
					'supports'     => array('title', 'editor', 'thumbnail', 'excerpt'),
					'public'       => true,
					'has_archive' => 'case-studies',
					'show_in_rest' => true,
					'taxonomies'   => array( 'category', 'post_tag' )
			)
	);
}
add_action('init', 'custom_case_study_post_type');

// Portfolio

// function custom_portfolio_post_type() {
// 	register_post_type('portfolio',
//     array(
//       'labels'       => array(
//         'name'          => __('Portfolio'),
//         'singular_name' => __('Portfolio Item'),
//       ),
//       'supports'     => array('title', 'editor', 'thumbnail', 'excerpt'),
//       'taxonomies'   => array('client'),
//       'public'       => true,
//       'has_archive'  => true,
//       'show_in_rest' => true
//     )
// 	);
// }
// add_action('init', 'custom_portfolio_post_type');
