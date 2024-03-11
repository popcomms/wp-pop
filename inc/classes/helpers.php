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
  
  }
  
  new Site_Helpers();
