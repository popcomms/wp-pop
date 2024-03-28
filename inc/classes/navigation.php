<?php
  
  class Site_Navigation {
  
    function __construct()	{
  
      add_filter('timber/context', array($this, 'add_to_timber_context'));
  
    }
    
    private function get_active_state_based_on_link($link) {
      
      $active = false;
      
      if (is_404()) { return $active; }
      
      if (!empty($link)) {
      
        if (rtrim(get_site_url(), '/') === rtrim($link, '/')) {
      
          if (is_front_page()) { $active = true; }
      
        } else {
      
          if (strpos(Site_Helpers::return_page_url(true), $link) !== false) { $active = true; }
      
        }
      
      }
      
      return $active;
      
    }
  
    private function get_navigation($name) {
    
      $output = false;
    
      $items = get_field($name, 'option');
    
      if ($items && count($items)) {
    
        $output = array();
    
        foreach ($items as $item) {
          
          $item_data = [
            'link' => $item['link'] ? $item['link'] : '',
            'text' => $item['text'],
            'external' => $item['acf_fc_layout'] == 'external',
            'active' => false,
            'class' => '',
            'children' => []
          ];
          
          $clean_link = !empty($item_data['link']) ? Site_Helpers::strip_query_string_from_url($item_data['link']) : '';
          $children = [];
    
          if ($item['acf_fc_layout'] == 'internal') {
    
            if ($item['secondary_navigation'] == 'automatic') {
    
              $page_id = url_to_postid($clean_link);
    
              if ($page_id) {
    
                $children = get_pages(array(
                  'child_of' => $page_id,
                  'depth' => 1,
                  'order' => 'ASC',
                  'orderby' => 'title',
                  'post_status' => 'publish',
                  'number' => 20
                ));
    
              } else {
    
                $post_types = get_post_types(
                  array(
                    'public'   => true,
                    '_builtin' => true
                  )
                );
    
                $post_types_custom = get_post_types(
                  array(
                    'public'   => true,
                    '_builtin' => false
                  )
                );
    
                $post_types = array_merge($post_types, $post_types_custom);
    
                foreach ($post_types as $post_type) {
                  
                  $clean_post_type_archive_link = Site_Helpers::strip_query_string_from_url(get_post_type_archive_link($post_type));
    
                  if ($clean_post_type_archive_link == $clean_link) {
                    
                    $children = get_posts(array(
                      'post_type' => $post_type,
                      'post_status' => 'publish',
                      'order' => 'ASC',
                      'orderby' => 'title',
                      'posts_per_page' => 20
                    ));
    
                  }
    
                }
    
              }
    
              if (count($children)) {
    
                foreach($children as $child) {
                  
                  array_push($item_data['children'], [
                    'link' => get_permalink($child->ID),
                    'text' => $child->post_title
                  ]);
    
                }
    
              }
    
            } else if ($item['secondary_navigation'] == 'custom') {
    
              foreach($item['secondary_navigation_items'] as $secondary_nav_item) {
    
                array_push($item_data['children'], [
                  'link' => $secondary_nav_item['link'],
                  'text' => $secondary_nav_item['text'],
                  'external' => $secondary_nav_item['acf_fc_layout'] == 'external'
                ]);
    
              }
    
            }
    
          }
          
          $item_data['active'] = $this->get_active_state_based_on_link($clean_link);
    
          array_push($output, $item_data);
    
        }
    
      }
      
      return $output;
    
    }
  
    public function add_to_timber_context($context) {
  
      $context['navigation'] = array(
        'footer' => $this->get_navigation('footer_navigation_items')
      );
  
      return $context;
  
    }
  
  
  }
  
  new Site_Navigation();
