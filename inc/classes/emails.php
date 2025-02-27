<?php

	class Site_Emails {
	
		function __construct()	{
	
		}
		
		public static function compile_email_template($data) {
			
			$email_data['rows'] = $rows;
			$email_data['subject'] = $subject;
			$email_data['preview'] = $preview;
			
			$html = Timber::compile('emails/generic.twig', $email_data);
			
			return $html;
			
		}
	
		public static function send_email($data) {
			
			$subject = isset($data['subject']) ? $data['subject'] : '';
			$preview = isset($data['preview']) ? $data['preview'] : '';
			$rows = isset($data['rows']) ? $data['rows'] : array();
			$to = isset($data['to']) ? $data['to'] : '';
				
			if (empty($subject)) {
				
				Site_Helpers::error_log('Tried to send an email with an empty subject.');
				return;
					
			}
			
			if (!count($rows)) {
				
				Site_Helpers::error_log('Tried to send an email with empty content.');
				return;
					
			}
			
			if (empty($to)) {
				
				Site_Helpers::error_log('Tried to send an email with an empty to field.');
				return;
					
			}
	
			$data['rows'] = $rows;
			$data['subject'] = $subject;
			$data['preview'] = $preview;
			
			$html = Timber::compile('emails/generic.twig', $data);
	
			$headers = array('Content-Type: text/html; charset=UTF-8');
	
			return wp_mail($to, $subject, $html, $headers);
	
		}
	
	}
	
	new Site_Emails();
