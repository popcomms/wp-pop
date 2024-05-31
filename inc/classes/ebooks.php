<?php

  class Site_Ebooks {
    
    function __construct()	{
      
      add_action('init', array($this, 'add_ebooks')); 
    
    }
    
    public function add_ebooks() {
      
      register_post_type('site_ebook', array(
        'labels' => array(
          'name' => 'Ebooks',
          'singular_name' => 'Ebook',
          'add_new' => 'Add Ebook',
          'add_new_item' => 'Add Ebook',
          'edit_item' => 'Edit Ebook'
        ),
        'public' => true,
        'publicly_queryable' => true,
        'label' => 'Ebooks',
        'has_archive' => 'ebooks',
        'show_ui' => true,
        'exclude_from_search' => true,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'ebooks', 'with_front' => false),
        'menu_icon' => 'dashicons-book'
      ));
    
    }
    
  }
  
  new Site_Ebooks();
