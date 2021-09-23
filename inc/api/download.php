<?php
/**
 * Sends the Downloads Email
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest, * or null if none.
 */
function prefix_get_private_data_permissions_check() {
  return true;
}

function sendDownload(WP_REST_Request $request) {

  $data = $request->get_json_params();

  $name  = $data['name'];
  $email = $data['email'];
  $title = $data['title'];
  $url   = $data['url'];
  $image = $data['image'];

  $find = array('{{ name }}', '{{ title }}', '{{ url }}', '{{ image }}');
  $replace = array($name, $title, $url, $image);
  require_once(get_template_directory() . '/inc/emails/download.php');

  $to = $email;
  $subject = 'Your requested download from POP';
  $body = str_replace($find, $replace, $html);
  $headers = array('Content-Type: text/html; charset=UTF-8');

  wp_mail( $to, $subject, $body, $headers );
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'pop/v1', '/download-fulfilment', array(
    'methods' => 'POST',
    'callback' => 'sendDownload',
    'permission_callback' => 'prefix_get_private_data_permissions_check',
  ) );
});
