<?php

function my_acf_block_render_callback( $block, $content = '', $is_preview = false ) {
	$context = Timber::context();

	// Store block values.
	$context['block'] = $block;

	// Store field values.
	$context['fields'] = get_fields();

	// Store $is_preview value.
	$context['is_preview'] = $is_preview;
	$slug = str_replace('acf/', '', $block['name']);

	// Render the block.
	Timber::render( 'block/' . $slug . '.twig', $context );
}

// ACF INIT

function my_acf_init() {

	// check function exists
	if ( ! function_exists( 'acf_register_block' ) ) {
			return;
	}

	// Register Blocks

	acf_register_block(array(
		'name'				=> 'page-hero',
		'title'				=> __('Page Hero'),
		'description'		=> __('A custom hero block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'cover-image',
		'keywords'			=> array( 'hero' ),
	));

	acf_register_block(array(
		'name'				=> 'page-video-hero',
		'title'				=> __('Page Video Hero'),
		'description'		=> __('A custom video-hero block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'cover-image',
		'keywords'			=> array( 'hero' ),
	));

	// acf_register_block(array(
	// 	'name'				=> 'post-banner',
	// 	'title'				=> __('Post Banner'),
	// 	'description'		=> __('A custom banner block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'cover-image',
	// 	'keywords'			=> array( 'banner' ),
	// ));

	// Pop Container
	acf_register_block(array(
		'name'				=> 'container',
		'title'				=> __('Container'),
		'description'		=> __('A custom container block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'align-full-width',
		'keywords'			=> array( 'container' ),
	));

	// Sub Container
	// acf_register_block(array(
	// 	'name'				=> 'section',
	// 	'title'				=> __('section'),
	// 	'description'		=> __('A custom section block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'admin-comments',
	// 	'keywords'			=> array( 'section' ),
	// ));

	// acf_register_block(array(
	// 	'name'				=> 'text-block',
	// 	'title'				=> __('Textblock'),
	// 	'description'		=> __('A custom textblock block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'admin-comments',
	// 	'keywords'			=> array( 'text' ),
	// ));
	// acf_register_block(array(
	// 	'name'				=> 'two-col-text',
	// 	'title'				=> __('Two Column Text'),
	// 	'description'		=> __('A custom two-col-text block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'admin-comments',
	// 	'keywords'			=> array( 'text' ),
	// ));
	// acf_register_block(array(
	// 	'name'				=> 'raised-text',
	// 	'title'				=> __('Raised Text'),
	// 	'description'		=> __('A custom raised-text block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'admin-comments',
	// 	'keywords'			=> array( 'text' ),
	// ));
	// acf_register_block(array(
	// 	'name'				=> 'full-width-image',
	// 	'title'				=> __('Image'),
	// 	'description'		=> __('A custom image block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'admin-comments',
	// 	'keywords'			=> array( 'image' ),
	// ));
	// acf_register_block(array(
	// 	'name'				=> 'testimonial',
	// 	'title'				=> __('Testimonial'),
	// 	'description'		=> __('A custom testimonial block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'admin-comments',
	// 	'keywords'			=> array( 'testimonial' ),
	// ));
	// acf_register_block(array(
	// 	'name'				=> 'downloads',
	// 	'title'				=> __('Downloads'),
	// 	'description'		=> __('A custom downloads block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'admin-comments',
	// 	'keywords'			=> array( 'downloads' ),
	// ));
	// acf_register_block(array(
	// 	'name'				=> 'square-grid',
	// 	'title'				=> __('Square Grid'),
	// 	'description'		=> __('A custom square grid block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'admin-comments',
	// 	'keywords'			=> array( 'square-grid' ),
	// ));
	// acf_register_block(array(
	// 	'name'				=> 'problems-list',
	// 	'title'				=> __('Problems List'),
	// 	'description'		=> __('A custom problems list block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'admin-comments',
	// 	'keywords'			=> array( 'problems-list' ),
	// ));
	// acf_register_block(array(
	// 	'name'				=> 'contact-cta',
	// 	'title'				=> __('Contact CTA'),
	// 	'description'		=> __('A custom contact cta block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'admin-comments',
	// 	'keywords'			=> array( 'contact-cta' ),
	// ));
	// acf_register_block(array(
	// 	'name'				=> 'custom/portfolio',
	// 	'title'				=> __('Portfolio'),
	// 	'description'		=> __('A custom portfolio block.'),
	// 	'render_callback'	=> 'my_acf_block_render_callback',
	// 	'category'			=> 'layout',
	// 	'icon'				=> 'admin-comments',
	// 	'keywords'			=> array( 'portfolio' ),
	// ));
}

add_action('acf/init', 'my_acf_init');
