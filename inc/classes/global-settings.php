<?php

  class Site_Global_Settings {
  
    function __construct()	{
      
      add_action('init', array($this, 'add_options_page'));
      add_action('admin_menu', array($this, 'add_menu_page'), 9);
      add_action('admin_menu', array($this, 'remove_duplicate_admin_menu'), 100);
  
    }
  
    public function add_options_page() {
  
      if (!function_exists('acf_add_options_page')) return;
  
      acf_add_options_page(array(
        'page_title' => 'Global settings',
        'menu_title' => 'Global settings',
        'menu_slug' => 'global-settings',
        'capability' => 'edit_posts',
        'redirect' => false
      ));
  
    }
    
    public function add_menu_page() {
    
      $page_title = 'Global settings';
      $menu_title = 'Global settings';
      $menu_slug = 'global-settings';
      $capability = 'edit_posts';
      $icon = 'dashicons-image-filter';
      $position = 8;
    
      add_menu_page($page_title, $menu_title, $capability, $menu_slug, '', $icon, $position);
    
    }
    
    public function remove_duplicate_admin_menu() {
    
      global $menu;
    
      foreach ($menu as $key => $values) {
    
        if ($values[2] == 'global-settings') {
    
          unset($menu[$key]);
          break;
    
        }
    
      }
    
    }
  
  }
  
  new Site_Global_Settings();
