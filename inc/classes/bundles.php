<?php

	class Site_Bundles {
	
		function __construct()	{
	
			add_action('template_redirect', array($this, 'load_javascript_bundles'));
			add_filter('script_loader_tag', array($this, 'defer_scripts'), 10, 3);
	
		}
	
		public function load_javascript_bundles() {
			
			global $wp_query;
			$js_path = '/frontend/dist/js/';
			
			$js_urls = [
				'form' => Site_Helpers::cachebust($js_path . 'form.min.js', true)
			];
			
			if (has_block('acf/form')) {
				
				wp_enqueue_script('site-form-script', $js_urls['form'], array(), null, true);
			
			}
	
		}
	
		public function defer_scripts($tag, $handle, $src) {
	
			$defer = array(
				'site-form-script'
			);
	
			if (in_array($handle, $defer)) { return '<script src="' . $src . '" defer></script>'; }
	
			return $tag;
	
		}
	
	}
	
	new Site_Bundles();