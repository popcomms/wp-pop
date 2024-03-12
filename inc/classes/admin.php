<?php

  class Site_Admin {
  
    function __construct()	{
      
      add_action('admin_head', array($this, 'custom_admin_css'));
  
    }
    
    public function custom_admin_css() {
      
      $css_main_path = '/admin/css/main.css';
      $css_main_url = get_template_directory_uri() . $css_main_path . '?v=' . filemtime(get_template_directory() . $css_main_path);
      echo '<link rel="stylesheet" href="' . $css_main_url . '" />';
    
    }
  
  }
  
  new Site_Admin();
