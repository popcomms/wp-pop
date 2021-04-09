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
		$context['menu']  = new Timber\Menu();
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

// Add google font
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

// ACF INIT
add_action('acf/init', 'my_acf_init');

function my_acf_init() {
	
	// check function exists
	if ( ! function_exists( 'acf_register_block' ) ) {
			return;
	}
	// register blocks
	acf_register_block(array(
		'name'				=> 'banner',
		'title'				=> __('Banner'),
		'description'		=> __('A custom banner block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'banner' ),
	));
	acf_register_block(array(
		'name'				=> 'main-banner',
		'title'				=> __('Main Banner'),
		'description'		=> __('A custom banner block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'main-banner' ),
	));
	acf_register_block(array(
		'name'				=> 'textblock',
		'title'				=> __('Textblock'),
		'description'		=> __('A custom textblock block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'text' ),
	));
	acf_register_block(array(
		'name'				=> 'raised-text',
		'title'				=> __('Raised Text'),
		'description'		=> __('A custom raised-text block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'text' ),
	));
	acf_register_block(array(
		'name'				=> 'testimonial',
		'title'				=> __('Testimonial'),
		'description'		=> __('A custom testimonial block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'testimonial' ),
	));
	acf_register_block(array(
		'name'				=> 'downloads',
		'title'				=> __('Downloads'),
		'description'		=> __('A custom downloads block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'downloads' ),
	));
	acf_register_block(array(
		'name'				=> 'squaregrid',
		'title'				=> __('Square Grid'),
		'description'		=> __('A custom squaregrid block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'squaregrid' ),
	));
	acf_register_block(array(
		'name'				=> 'problemslist',
		'title'				=> __('Problems List'),
		'description'		=> __('A custom problemslist block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'problemslist' ),
	));
	acf_register_block(array(
		'name'				=> 'contactcta',
		'title'				=> __('Contact CTA'),
		'description'		=> __('A custom contactcta block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'contactcta' ),
	));
	acf_register_block(array(
		'name'				=> 'portfolio',
		'title'				=> __('Portfolio'),
		'description'		=> __('A custom portfolio block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'portfolio' ),
	));

	// Pop Container
	acf_register_block(array(
		'name'				=> 'pop-container',
		'title'				=> __('Pop Container'),
		'description'		=> __('A custom popcontainer block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'popcontainer' ),
	));
	// Sub Container
	acf_register_block(array(
		'name'				=> 'sub-container',
		'title'				=> __('Sub Container'),
		'description'		=> __('A custom subcontainer block.'),
		'render_callback'	=> 'my_acf_block_render_callback',
		'category'			=> 'layout',
		'icon'				=> 'admin-comments',
		'keywords'			=> array( 'subcontainer' ),
	));
}

function myprefix_enqueue_scripts() {
	wp_enqueue_script( 'site', get_template_directory_uri() . '/static/site.js', array(), true );
}
add_action( 'wp_enqueue_scripts', 'myprefix_enqueue_scripts' );

new StarterSite();
