<?php

  class Site_Helpers {
    
    public static function return_page_url($strip_query_string = false, $encode_url = false) {
  
      $url = @($_SERVER['HTTPS'] != 'on') ? 'http://' . $_SERVER['SERVER_NAME'] : 'https://' . $_SERVER['SERVER_NAME'];
      $url .= $_SERVER['REQUEST_URI'];
  
      if ($strip_query_string) {
  
        $sections = explode('?', $url);
        $url = $sections[0];
  
      }
      
      if ($encode_url) { $url = urlencode($url); }
  
      return $url;
  
    }
    
    public static function strip_query_string_from_url($url) {
      
      $sections = explode('?', $url);
      return rtrim($sections[0], '/') . '/';
      
    }
  
    public static function error_log($data) {
  
      error_log(print_r($data, TRUE));
  
    }
    
    public static function parse_iframe_video($iframe) {
      
      $output = [
        'type' => '',
        'id' => '',
        'url' => '',
        'link' => '',
        'platform_name' => ''
      ];
    
      preg_match('/src="(.+?)"/', $iframe, $matches);
      $video_src = $matches[1];
    
      $parse = parse_url($video_src);
    
      $video_type = '';
      $video_id = '';
    
      if ($parse['host'] == 'youtu.be') {
    
        $video_type = 'youtube';
        $video_id = ltrim($parse['path'], '/');
    
      }
    
      if (
        $parse['host'] == 'youtube.com' ||
        $parse['host'] == 'www.youtube.com'
      ) {
    
        $video_type = 'youtube';
        parse_str($parse['query'], $result);
    
        if (isset($result['v'])) { $video_id = $result['v']; }
        if (!empty($feature)) { $video_id = end(explode('v=', $parse['query'])); }
    
        if (strpos($parse['path'], 'embed') == 1) {
    
          $video_id = explode('/', $parse['path']);
          $video_id = end($video_id);
    
        }
    
      }
    
      if (
        $parse['host'] == 'vimeo.com' ||
        $parse['host'] == 'www.vimeo.com' ||
        $parse['host'] == 'player.vimeo.com'
      ) {
    
        $video_type = 'vimeo';
        $video_id = ltrim($parse['path'], '/');
        $video_id = preg_replace('/\D/', '', $video_id);
    
      }
    
      if (!empty($video_type)) {
        
        $output['type'] = $video_type;
        $output['id'] = $video_id;
    
        if ($video_type == 'vimeo') {
          
          $output['url'] = '//player.vimeo.com/video/' . $video_id . '?autoplay=0';
          $output['link'] = 'https://vimeo.com/' . $video_id;
          $output['platform_name'] = 'Vimeo';
          return $output;
    
        } else if ($video_type == 'youtube') {
          
          $output['url'] = '//www.youtube-nocookie.com/embed/' . $video_id . '?autoplay=0&rel=0&showinfo=0';
          $output['link'] = 'https://www.youtube.com/watch?v=' . $video_id;
          $output['platform_name'] = 'YouTube';
          return $output;
    
        }
    
      }
      
      return $output;
    
    }
  
  }
  
  new Site_Helpers();
