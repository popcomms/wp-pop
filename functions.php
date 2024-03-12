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
// Enqueue Scripts
get_template_part('inc/scripts');

// WP Admin / Editor
get_template_part('inc/admin');

// ACF
get_template_part('inc/acf');

// Custom Post Types
get_template_part('inc/post-types');

// Custom Taxonomies
get_template_part('inc/taxonomies');

// Helper Functions
get_template_part('inc/helpers');

// API
get_template_part('inc/api/download');

// Custom oEmbed
add_action( 'pop_embed', 'pop_embed' );

function pop_embed( $shortcode ) {

  // Provider

  preg_match('/src="(.+?)"/', $shortcode, $matches);
  $src = $matches[1];

  $vendor = null;

  if (strpos($src, 'youtube.com') || strpos($src, 'youtu.be')) {
    $vendor = 'youtube';
  }
  if (strpos($src, 'vimeo.com')) {
    $vendor = 'vimeo';
  }

  // High Res Thumbnails

  $thumbnail = '';

  if ($vendor === 'youtube') {
    preg_match('/\/embed\/([a-zA-Z0-9_-]+)/', $src, $matches);
    $id = $matches[1];
    $thumbnail = 'https://i.ytimg.com/vi/' . $id . '/maxresdefault.jpg';
  }

  if ($vendor === 'vimeo') {
    $embed = 'http://vimeo.com/api/oembed.json?url=' . $src;
    $data = json_decode(file_get_contents($embed));
    if ($data) {
      preg_match('/.*-(\w+)$/', $data->thumbnail_url, $matches);
      $thumbnail = str_replace($matches[1], 'd_1113x577', $data->thumbnail_url);
    }
  }

  // Create DOM element

  $response = '<div
    class="lazyframe w-full"
    data-vendor="' . $vendor . '"
    data-src="' . $src . '"
    data-thumbnail="'. $thumbnail .'"
    data-ratio="16:9"
    ></div>';

  // Return LazyFrame element for

  if (in_array($vendor, ['vimeo', 'youtube'], true)) {
    echo $response;
  } else {
    $updates = ' loop="on" autoplay="on" muted="on"]';
    echo str_replace(']', $updates , $shortcode);
  }

}

new StarterSite();

// ACF Field Groups

require_once('acf-field-groups/_all.php');

// Classes

require_once('inc/classes/helpers.php');
require_once('inc/classes/global-settings.php');
require_once('inc/classes/navigation.php');
require_once('inc/classes/shared.php');
require_once('inc/classes/admin.php');
