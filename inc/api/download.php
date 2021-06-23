<?php
/**
 * Sends the Downloads Email
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function sendDownload( $data ) {

  $name = $data['name'];
  $email = $data['email'];
  $title = $data['assetTitle'];
  $url = $data['assetURL'];

  $find = array('{{ name }}', '{{ title }}', '{{ url }}');
  $replace = array($name, $title, $url);
  $html = file_get_contents(require_once('inc/emails/download.html'));

  $to = $email;
  $subject = 'Your requested download from POP';
  $body = str_replace($find, $replace, $html);
  $headers = array('Content-Type: text/html; charset=UTF-8');

  wp_mail( $to, $subject, $body, $headers );

}
