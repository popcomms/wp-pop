<?php
  
  class Site_Wysiwyg {
  
    function __construct()	{
  
      add_filter('acf/fields/wysiwyg/toolbars', array($this, 'custom_wysiwyg_toolbars'));
  
    }
  
    public function custom_wysiwyg_toolbars($toolbars) {
  
      $toolbars['Lightweight'] = array();
      $toolbars['Lightweight'][1] = array('link', 'unlink', 'bold', 'bullist', 'numlist', 'italic', 'removeformat');
      $toolbars['Lightweight'][2] = array('styleselect', 'pastetext', 'undo', 'redo');
      
      $toolbars['Bare'] = array();
      $toolbars['Bare'][1] = array('link', 'unlink', 'bold', 'bullist', 'numlist', 'italic', 'removeformat');
      $toolbars['Bare'][2] = array('pastetext', 'undo', 'redo');
      
      return $toolbars;
  
    }
    
    public static function clean_html($html) {
      
      $html = wp_kses($html, array(
        'a' => array(
          'href' => array(),
          'title' => array(),
          'rel' => array(),
          'target' => array(),
          'aria-label' => array()
        ),
        'p' => array(
          'class' => array()
        ),
        'ul' => array(),
        'ol' => array(),
        'li' => array(),
        'b' => array(),
        'strong' => array(),
        'i' => array(),
        'em' => array(),
        'h2' => array(),
        'h3' => array(),
        'h4' => array(),
        'h5' => array(),
        'h6' => array(),
        'svg' => array(
          'class' => array()
        ),
        'use' => array(
          'xlink:href' => array()
        )
      ));
      
      $current_host = $_SERVER['HTTP_HOST'];
      $processor = new WP_HTML_Tag_Processor($html);
      
      while ($processor->next_tag(['tag_name' => 'a', 'tag_closers' => 'skip'])) {
        
        $href = $processor->get_attribute('href');
        
        $processor->remove_attribute('target');
        $processor->remove_attribute('title');
        
        if (strpos($href, $current_host) === false && substr($href, 0, 1) !== '/') {
          
          $processor->set_attribute('rel', 'noopener nofollow');
          
        }
        
        if (
          strpos($href, '@') !== false &&
          substr($href, 0, 7) !== 'mailto:'
        ) {
          
          $processor->set_attribute('href', 'mailto:' . $href);
          
        }
  
      }
      
      return $processor->get_updated_html();
      
    }
  
  }
  
  new Site_Wysiwyg();
