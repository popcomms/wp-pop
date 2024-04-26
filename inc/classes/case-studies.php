<?php

  class Site_Case_Studies {
    
    function __construct()	{
      
      add_action('pre_get_posts', array($this, 'set_post_settings'));
    
    }
    
    public function set_post_settings($query) {
    
      if (
        !is_admin() &&
        $query->is_main_query() &&
        is_post_type_archive('case-studies')
      ) {
        
        $category = isset($_GET['cs_category']) ? sanitize_text_field($_GET['cs_category']) : '';
        
        if (!empty($category)) {
          
          $query->set('tax_query', [
            [
              'taxonomy' => 'category',
              'terms' => $category,
              'field' => 'ID',
              'include_children' => false,
              'operator' => 'IN'
            ]
          ]);
          
          return $query;
          
        }
        
        $tag = isset($_GET['cs_tag']) ? sanitize_text_field($_GET['cs_tag']) : '';
        
        if (!empty($tag)) {
          
          $query->set('tax_query', [
            [
              'taxonomy' => 'post_tag',
              'terms' => $tag,
              'field' => 'ID',
              'include_children' => false,
              'operator' => 'IN'
            ]
          ]);
          
          return $query;
          
        }
    
      }
      
      return $query;
    
    }
    
    public static function get_tags() {
      
      $filtered_tags = [];
      
      $all_tags = get_tags([
        'orderby' => 'count',
        'order' => 'DESC',
        'number' => 20,
        'hide_empty' => 1
      ]);
      
      foreach($all_tags as $tag) {
        
        $post = get_posts([
          'numberposts' => 1,
          'post_type' => 'case-studies',
          'post_status' => 'publish',
          'tax_query' => [
            'relation' => 'AND',
            [
              'taxonomy' => 'post_tag',
              'field' => 'term_id',
              'terms' => $tag->term_id,
              'operator' => 'IN'
            ]
          ]
        ]);
        
        if (count($post)) { $filtered_tags[] = $tag; }
        
      }
      
      return $filtered_tags;
      
    }
    
    public static function get_categories() {
      
      $filtered_categories = [];
      
      $all_categories = get_categories([
        'orderby' => 'name',
        'order' => 'ASC',
        'hide_empty' => 1
      ]);
      
      foreach($all_categories as $category) {
        
        $post = get_posts([
          'numberposts' => 1,
          'post_type' => 'case-studies',
          'post_status' => 'publish',
          'tax_query' => [
            'relation' => 'AND',
            [
              'taxonomy' => 'category',
              'field' => 'term_id',
              'terms' => $category->term_id,
              'operator' => 'IN'
            ]
          ]
        ]);
        
        if (count($post)) { $filtered_categories[] = $category; }
        
      }
      
      return $filtered_categories;
      
    }
    
  }
  
  new Site_Case_Studies();
