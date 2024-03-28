<?php

  class Site_Shared {
  
    function __construct()	{
  
      add_action('init', array($this, 'add_options_page'));
      add_action('admin_menu', array($this, 'add_menu_page'), 9);
      add_action('admin_menu', array($this, 'remove_duplicate_admin_menu'), 100);
      add_action('init', array($this, 'create_logo_collections'));
      add_action('init', array($this, 'create_callouts'));
  
    }
  
    public static function add_options_page() {
  
      if (!function_exists('acf_add_options_page')) return;
  
      acf_add_options_page(array(
        'page_title' 	=> 'Shared',
        'menu_title'	=> 'Shared',
        'menu_slug' 	=> 'shared',
        'capability'	=> 'edit_posts',
        'redirect'		=> false,
        'icon_url' => 'dashicons-image-filter'
      ));
  
    }
  
    public static function add_menu_page() {
  
      $page_title = 'Shared';
      $menu_title = 'Shared';
      $menu_slug = 'shared';
      $capability = 'edit_posts';
      $icon = 'dashicons-image-filter';
      $position = 8;
  
      add_menu_page($page_title, $menu_title, $capability, $menu_slug, '', $icon, $position);
  
    }
  
    public function remove_duplicate_admin_menu() {
  
      global $menu;
  
      foreach ($menu as $key => $values) {
  
        if ($values[2] == 'shared') {
  
          unset($menu[$key]);
          break;
  
        }
  
      }
  
    }
    
    public function create_logo_collections() {
      
      register_post_type('site_logo_collection', array(
        'labels' => array(
          'name' => 'Logo collections',
          'singular_name' => 'Logo collection',
          'add_new' => 'Add logo collection',
          'add_new_item' => 'Add logo collection',
          'edit_item' => 'Edit logo collection'
        ),
        'public' => false,
        'show_in_nav_menus' => true,
        'show_in_menu' => 'shared',
        'show_ui' => true,
        'has_archive' => false,
        'publicaly_queryable' => true,
        'query_var' => false,
        'menu_icon' => 'dashicons-feedback'
      ));
    
    }
    
    public function create_callouts() {
      
      register_post_type('site_callout', array(
        'labels' => array(
          'name' => 'Callouts',
          'singular_name' => 'Callouts',
          'add_new' => 'Add callout',
          'add_new_item' => 'Add callout',
          'edit_item' => 'Edit callout'
        ),
        'public' => false,
        'show_in_nav_menus' => true,
        'show_in_menu' => 'shared',
        'show_ui' => true,
        'has_archive' => false,
        'publicaly_queryable' => true,
        'query_var' => false,
        'menu_icon' => 'dashicons-feedback'
      ));
    
    }
  
  }
  
  new Site_Shared();
