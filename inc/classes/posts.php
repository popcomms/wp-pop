<?php

  class Site_Posts {
  
    function __construct()	{
      
      add_action('pre_get_posts', array($this, 'set_post_settings'));
  
    }
    
    public function set_post_settings($query) {
    
      if (
        !is_admin() &&
        is_home() &&
        $query->is_main_query()
      ) {
        
        $query->set('tax_query', [
          [
            'taxonomy' => 'post_format',
            'field' => 'slug',
            'terms' => [
              'post-format-video',
              'post-format-aside',
              'post-format-image',
              'post-format-video',
              'post-format-quote',
              'post-format-link',
              'post-format-gallery',
              'post-format-audio'
            ],
            'operator' => 'NOT IN'
          ]
        ]);
    
      }
      
      return $query;
    
    }
    
    public static function get_tags($post_format = '') {
      
      $filtered_tags = [];
      
      $all_tags = get_tags([
        'orderby' => 'count',
        'order' => 'DESC',
        'number' => 20,
        'hide_empty' => 1
      ]);
      
      $additional_tax_query = ($post_format === '') ? [
        'taxonomy' => 'post_format',
        'field' => 'slug',
        'terms' => [
          'post-format-video',
          'post-format-aside',
          'post-format-image',
          'post-format-video',
          'post-format-quote',
          'post-format-link',
          'post-format-gallery',
          'post-format-audio'
        ],
        'operator' => 'NOT IN'
      ] : [
        'taxonomy' => 'post_format',
        'field' => 'slug',
        'terms' => [$post_format],
        'operator' => 'IN'
      ];
      
      foreach($all_tags as $tag) {
        
        $post = get_posts([
          'numberposts' => 1,
          'post_type' => 'post',
          'post_status' => 'publish',
          'tax_query' => [
            'relation' => 'AND',
            [
              'taxonomy' => 'post_tag',
              'field' => 'term_id',
              'terms' => $tag->term_id,
              'operator' => 'IN'
            ],
            $additional_tax_query
          ]
        ]);
        
        if (count($post)) { $filtered_tags[] = $tag; }
        
      }
      
      return $filtered_tags;
      
    }
    
    public static function get_categories($post_format = '') {
      
      $filtered_categories = [];
      
      $all_categories = get_categories([
        'orderby' => 'name',
        'order' => 'ASC',
        'hide_empty' => 1
      ]);
      
      $additional_tax_query = ($post_format === '') ? [
        'taxonomy' => 'post_format',
        'field' => 'slug',
        'terms' => [
          'post-format-video',
          'post-format-aside',
          'post-format-image',
          'post-format-video',
          'post-format-quote',
          'post-format-link',
          'post-format-gallery',
          'post-format-audio'
        ],
        'operator' => 'NOT IN'
      ] : [
        'taxonomy' => 'post_format',
        'field' => 'slug',
        'terms' => [$post_format],
        'operator' => 'IN'
      ];
      
      foreach($all_categories as $category) {
        
        $post = get_posts([
          'numberposts' => 1,
          'post_type' => 'post',
          'post_status' => 'publish',
          'tax_query' => [
            'relation' => 'AND',
            [
              'taxonomy' => 'category',
              'field' => 'term_id',
              'terms' => $category->term_id,
              'operator' => 'IN'
            ],
            $additional_tax_query
          ]
        ]);
        
        if (count($post)) { $filtered_categories[] = $category; }
        
      }
      
      return $filtered_categories;
      
    }
    
  }
  
  new Site_Posts();
