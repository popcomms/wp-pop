<?php

  class Site_Gutenberg {
    
    private $block_index = 0;
    private $block_template_prefix;
    private $blocks;
    private $post_types_with_limited_blocks = [
      'site_ebook'
    ];
  
    function __construct()	{
      
      $this->block_template_prefix = get_template_directory() . '/_blocks/';
      $this->blocks = $this->get_blocks();
      
      add_filter('block_categories_all', array($this, 'set_block_categories'), 10, 2);
      add_filter('allowed_block_types_all', array($this, 'allowed_block_types'));
      //add_action('enqueue_block_editor_assets', array($this, 'include_css'));
      add_filter('render_block', array($this, 'wrap_blocks'), 10, 2);
      remove_theme_support('core-block-patterns');
      add_action('init', array($this, 'register_blocks'), 5);
  
    }
    
    private function get_blocks() {
      
      $directories = array_filter(glob($this->block_template_prefix . '*'), 'is_dir');
      
      $output = [];
      foreach($directories as $directory) { $output[] = str_replace($this->block_template_prefix, '', $directory); }
      return $output;
      
    }
        
    public function set_block_index($index) {
      
      $this->block_index = $index;
      
    }
    
    public function get_block_index() { 
      
      return $this->block_index;
      
    }
    
    public function get_post_types_with_limited_blocks() {
      
      return $this->post_types_with_limited_blocks;
      
    }
    
    public function get_limited_blocks() {
      
      return $this->limited_blocks;
      
    }
    
    public function set_block_categories($categories, $post) {
      
      array_unshift($categories, array(
        'slug'	=> 'general',
        'title' => 'General'
      ));
      
      return $categories;
      
    }
  
    public function allowed_block_types($allowed_blocks) {
      
      global $post;
      
      $blocks = $this->blocks;
      
      if (
        isset($post) &&
        isset($post->post_type)
      ) {
        
        if (
          in_array($post->post_type, $this->get_post_types_with_limited_blocks())
        ) {
          
          $limited_blocks = [
            'core/title'
          ];
          
          foreach($blocks as $block) { $limited_blocks[] = 'acf/' . $block; }
          return $limited_blocks;
          
        }
        
      }
      
      return $allowed_blocks;
  
    }
  
    public function register_blocks() {
      
      $blocks = $this->blocks;
      
      foreach($blocks as $block) {
        
        register_block_type(
          $this->block_template_prefix . $block,
          array(
            'render_callback' => array($this, 'render_callback'),
          )
        ); 
        
      }
  
    }
  
    public function render_callback($block, $content = '', $is_preview = false) {
  
      $context = Timber::context();
      
      $context['block'] = $block;
      $context['fields'] = get_fields();
      $context['is_preview'] = $is_preview;
      $context['block_name'] = str_replace('acf/', '', $block['name']);
      $context['auto_classes'] = '';
      
      $block_index = $this->get_block_index();
      $context['block_index'] = $block_index;
      $block_index++;
      $this->set_block_index($block_index);
      
      $context = $this->add_to_block_context($context, $block_index);
  
      Timber::render('partial/_block.twig', $context);
  
    }
    
    public function add_to_block_context($context, $block_index) {
      
      global $post, $wp_query;
      if (is_object($post)) { $context['post_id'] = $post->ID; }
      
      $post_content = isset($context['post']->post_content) ? $context['post']->post_content : '';
      
      if (is_archive()) {
        
        $post_type = isset($post->post_type) && !empty($post->post_type) ? $post->post_type : get_query_var('post_type');
        $page_id = get_option('page_for_' . $post_type);
        $post_content = get_post_field('post_content', $page_id);
        
      }
      
      $context['auto_classes'] = '';
      
      if (in_array($context['block_name'], ['video-banner'])) { $context['auto_classes'] .= ' m-section--flush'; }
      if (isset($context['fields']['style'])) { $context['auto_classes'] .= ' m-section--style-' . $context['fields']['style']; }
        
      return $context;
      
    }
  
    public static function include_css() {
      
      $gutenberg_css = get_stylesheet_directory_uri() . '/frontend/dist/css/gutenberg.min.css';
      wp_enqueue_style('acf-gutenberg-styles', $gutenberg_css);
  
    }
  
    public static function wrap_blocks($block_content, $block) {
  
      if (!empty(trim($block_content))) { return $block_content; }
  
    }
    
    public static function get_block_by_name_and_id($block_name, $id) {
    
      $content = get_post_field('post_content', $id);
      $blocks = parse_blocks($content);
    
      if (!is_array($blocks) || empty($blocks)) { return false; }
      
      foreach ($blocks as $block) {
        
        if ($block['blockName'] === $block_name) { return $block; }
        
      }
      
      return false;
        
    }
  
  }
  
  new Site_Gutenberg();
