<?php

	class Site_Forms {
		
		private $excluded_keys = ['nonce', 'form_id', 'action', 'form_field_99', 'cf-turnstile-response'];
	
		function __construct()	{
			
			add_action('wp_ajax_nopriv_site_form', array($this, 'ajax_generic_form'));
			add_action('wp_ajax_site_form', array($this, 'ajax_generic_form'));
	
		}
		
		public static function get_fields($post) {
		
			$fields = get_fields($post->ID);
			$fields['custom']['button_text'] = isset($fields['button_text']) && !empty($fields['button_text']) ? $fields['button_text'] : 'Submit';
			
			return $fields;
			
		}
		
		public function ajax_generic_form() {
			
			if (!isset($_POST)) { die(); }
		
			$response = array(
				'success' => false,
				'reason' => ''
			);
			
			$post_data = array_map('sanitize_text_field', $_POST);
	
			$nonce = isset($post_data['nonce']) ? $post_data['nonce'] : false;
			$form_id = isset($post_data['form_id']) ? $post_data['form_id'] : false;
			$honeypot = isset($post_data['form_field_99']) ? $post_data['form_field_99'] : false;
			$turnstile = isset($post_data['cf-turnstile-response']) ? $post_data['cf-turnstile-response'] : false;
				
			if ($honeypot) {
				
				$response['reason'] = 'Honeypot populated';
				wp_send_json($response);
				
			}
			
			if (!$nonce || !$form_id) {
				
				$response['reason'] = 'Missing key fields';
				wp_send_json($response);
				
			}
			
			$turnstile_valid = Site_Helpers::verify_turnstile_token($turnstile);
				
			if (!$turnstile_valid) {
				
				$response['reason'] = 'Turnstile issue';
				wp_send_json($response);
				
			}
			
			// if (!wp_verify_nonce($nonce, 'site_form_nonce')) {
			// 
			// 	$response['reason'] = 'Nonce failure';
			// 	wp_send_json($response);
			// 
			// }
			
			$form_fields = get_fields($form_id);
			$rows = $form_fields['rows'];
				
			$error = false;
			
			foreach ($rows as $row) {
				
				$field_name = 'form_field_' . sanitize_title($row['label']);
				if (isset($row['required']) && $row['required'] && empty($post_data[$field_name])) { $error = true; }
				
			}
			
			if ($error) {
				
				$response['reason'] = 'Errors';
				wp_send_json($response);
				
			}
			
			$success_message = isset($form_fields['success_message']) ? $form_fields['success_message'] : 'Your message has been sent';
				
			$email_sent = $this->send_email($form_fields, $post_data);
			
			if (!$email_sent) {
				
				$response['reason'] = 'Send failure';
				wp_send_json($response);
				
			}
			
			$response['success_message'] =  $success_message;
			$response['success'] = true;
			wp_send_json($response);
		
		}
		
		public function get_label($key) {
			
			$name = str_replace('form_field_', '', $key);
			$name = str_replace('-', ' ', $name);
			
			return ucfirst($name);
			
		}
		
		public function send_email($form_fields, $post_data) {
			
			$email_subject = $form_fields['email_subject'];
			$excluded_keys = $this->excluded_keys;
			
			$rows = array(
				array(
					'type' => 'title',
					'content' => $email_subject
				)
			);
			
			foreach ($post_data as $key => $value) {
				
				if (!in_array($key, $excluded_keys)) {
					
					$label_name = $this->get_label($key);
					
					$rows[] = array(
						'type' => 'paragraph',
						'content' => $label_name . ':<br />' . $value
					);
					
				}
				
			}
			
			$result = Site_Emails::send_email(array(
				'subject' => $email_subject,
				'rows' => $rows,
				'to' => $form_fields['email_recipients']
			));
			
			return $result;
			
		}
	
	}
	
	new Site_Forms();
