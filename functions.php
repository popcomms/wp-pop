<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types() {

	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {

	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['foo']   = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::context();';
		$context['menu']  = new Timber\Menu('top-nav');
		$context['site']  = $this;
		return $context;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
	}

	/** This Would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}

}

// Prevent default WP JPEG compressions

add_filter('jpeg_quality', function($arg) { return 100; });
add_filter('wp_editor_set_quality', function($arg) { return 100; } );

// Add Google font

function wpb_add_google_fonts() {
	wp_enqueue_style( 'wpb-google-fonts', 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap', false );
}

add_action( 'wp_enqueue_scripts', 'wpb_add_google_fonts' );


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

// COLOR SWATCHES FOR WYSIWYG

function custom_wysiwyg_colors($init) {

	$custom_colours = '
		"F8F7EE", "Pop White",
		"2D2D2D", "Pop Black",
		"DFDFDF", "Pop Gray",
		"8E8E8E", "Pop Gray Mid",
		"3C3B3B", "Pop Gray Dark",
		"212363", "Pop Navy",
		"64FFE3", "Pop Green",
		"E8FDF5", "Pop Pale Green",
		"FF0088", "Pop Pink",
		"CDF2F4", "Pop Pale Pink",
		"3A3EAB", "Pop Blue",
		"FFFF99", "Pop Yellow"
	';

	// build colour grid default+custom colors
	$init['textcolor_map'] = '['.$custom_colours.']';

	// change the number of rows in the grid if the number of colors changes
	// 8 swatches per row
	$init['textcolor_rows'] = 2;

	return $init;
}
add_filter('tiny_mce_before_init', 'custom_wysiwyg_colors');

// ADD POP COLORS GUTENBURG COLOR PALETTE

// Adds support for editor color palette.
add_theme_support( 'editor-color-palette', array(
	array(
		'name' => __('pop-white'),
		'slug' => 'pop-white',
		'color' => '#F8F7EE'
	),
	array(
		'name' => __('pop-black'),
		'slug' => 'pop-black',
		'color' => '#2D2D2D'
	),
	array(
		'name' => __('pop-black-dark'),
		'slug' => 'pop-black-dark',
		'color' => '#272727'
	),
	array(
		'name' => __('pop-gray'),
		'slug' => 'pop-gray',
		'color' => '#DFDFDF'
	),
	array(
		'name' => __('pop-mid-gray'),
		'slug' => 'pop-mid-gray',
		'color' => "#8E8E8E"
	),
	array(
		'name' => __('pop-dark-gray'),
		'slug' => 'pop-dark-gray',
		'color' => "#3C3B3B"
	),
	array(
		'name' => __('pop-navy'),
		'slug' => 'pop-navy',
		'color' => '#212363'
	),
	array(
		'name' => __('pop-green'),
		'slug' => 'pop-green',
		'color' => '#64FFE3'
	),
	array(
		'name' => __('pop-green-pale'),
		'slug' => 'pop-green-pale',
		'color' => '#E8FDF5'
	),
	array(
		'name' => __('pop-pink'),
		'slug' => 'pop-pink',
		'color' => '#FF0088'
	),
	array(
		'name' => __('pop-pink-pale'),
		'slug' => 'pop-pink-pale',
		'color' => '#CDF2F4'
	),
	array(
		'name' => __('pop-blue'),
		'slug' => 'pop-blue',
		'color' => '#3A3EAB'
	),
	array(
		'name' => __('pop-yellow'),
		'slug' => 'pop-yellow',
		'color' => '#FFFF99'
	)
) );

// ACF INIT
add_action('acf/init', 'my_acf_init');

function my_acf_init() {

	// check function exists
	if ( ! function_exists( 'acf_register_block' ) ) {
			return;
	}
	// register blocks
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

// Register Custom Post Types

function custom_case_study_post_type() {
	register_post_type('case-studies',
			array(
					'labels'      => array(
							'name'          => __('Case Studies'),
							'singular_name' => __('Case Study'),
					),
					'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
					'public' => true,
					'has_archive' => true,
					'show_in_rest' => true,
					'taxonomies'  => array( 'category' )
			)
	);
}
add_action('init', 'custom_case_study_post_type');


function custom_portfolio_post_type() {
	register_post_type('portfolio',
    array(
      'labels'       => array(
        'name'          => __('Portfolio'),
        'singular_name' => __('Portfolio Item'),
      ),
      'supports'     => array('title', 'editor', 'thumbnail', 'excerpt'),
      'taxonomies'   => array('client'),
      'public'       => true,
      'has_archive'  => true,
      'show_in_rest' => true
    )
	);
}
add_action('init', 'custom_portfolio_post_type');

// Client Taxonomy

function custom_client_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Clients', 'Taxonomy General Name', 'wp-pop' ),
		'singular_name'              => _x( 'Client', 'Taxonomy Singular Name', 'wp-pop' ),
		'menu_name'                  => __( 'Clients', 'wp-pop' ),
		'all_items'                  => __( 'All Clients', 'wp-pop' ),
		'parent_item'                => __( 'Parent Client', 'wp-pop' ),
		'parent_item_colon'          => __( 'Parent Client:', 'wp-pop' ),
		'new_item_name'              => __( 'New Client Name', 'wp-pop' ),
		'add_new_item'               => __( 'Add New Client', 'wp-pop' ),
		'edit_item'                  => __( 'Edit Client', 'wp-pop' ),
		'update_item'                => __( 'Update Client', 'wp-pop' ),
		'view_item'                  => __( 'View Client', 'wp-pop' ),
		'separate_items_with_commas' => __( 'Separate Clients with commas', 'wp-pop' ),
		'add_or_remove_items'        => __( 'Add or remove Clients', 'wp-pop' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'wp-pop' ),
		'popular_items'              => __( 'Popular Clients', 'wp-pop' ),
		'search_items'               => __( 'Search Clients', 'wp-pop' ),
		'not_found'                  => __( 'Not Found', 'wp-pop' ),
		'no_terms'                   => __( 'No Clients', 'wp-pop' ),
		'items_list'                 => __( 'Clients list', 'wp-pop' ),
		'items_list_navigation'      => __( 'Clients list navigation', 'wp-pop' ),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => false,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => false,
	);
	register_taxonomy( 'client', array( 'case-studies' ), $args );

}
add_action( 'init', 'custom_client_taxonomy', 0 );

// Return $count Random icons

function get_random_icons($count=1, $theme='original') {
  $collection = [];
  $path = get_template_directory_uri().'/static/icons/pop/'.$theme.'/' ;
  for ($i=0; $i < $count; $i++) {
    $target = rand(1,47);
    $value = $path . str_pad((string)$target, 2, '0', STR_PAD_LEFT) . '.svg';
    array_push($collection, $value);
  }
  return $collection;
}

function get_random_colour () {
  $colours = [
    // 'green',
    'pink',
    'blue',
    // 'yellow',
    'purple'
  ];
  $i = rand(0, count($colours) - 1);
  return $colours[$i];
}

function case_study_title ($title, $client, $category) {
  return str_replace($client, $client.'. '.$category, $title);
}


function pop_enqueue_scripts() {
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
    'main',
    get_template_directory_uri().'/static/main.js?v=0.1',
    array('gsap', 'scrollTrigger', 'vue'),
    true
  );
}
add_action( 'wp_enqueue_scripts', 'pop_enqueue_scripts' );

new StarterSite();
