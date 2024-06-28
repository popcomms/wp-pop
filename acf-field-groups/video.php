<?php

$field_prefix = 'field_site_video_';

acf_add_local_field_group(array(
  'key' => 'group_site_video',
  'title' => 'Content (Video)',
  'fields' => array(
    array(
      'key' => $field_prefix . 'small_source',
      'label' => 'Small source',
      'name' => 'small_source',
      'type' => 'url',
      'instructions' => 'Direct link to .mp4 video.',
      'required' => 1,
      'conditional_logic' => 0,
      'wrapper' => array(
        'width' => '',
        'class' => '',
        'id' => '',
      ),
      'default_value' => '',
      'placeholder' => '',
    ),
    array(
      'key' => $field_prefix . 'large_source',
      'label' => 'Large source',
      'name' => 'large_source',
      'type' => 'url',
      'instructions' => 'Direct link to .mp4 video.',
      'required' => 1,
      'conditional_logic' => 0,
      'wrapper' => array(
        'width' => '',
        'class' => '',
        'id' => '',
      ),
      'default_value' => '',
      'placeholder' => '',
    ),
    array(
      'key' => $field_prefix . 'image',
      'label' => 'Image',
      'name' => 'image',
      'type' => 'image',
      'instructions' => 'The image that will be shown prior to the video playing.  It is best to use the first frame of the video.',
      'required' => 0,
      'conditional_logic' => 0,
      'wrapper' => array(
        'width' => '',
        'class' => '',
        'id' => '',
      ),
      'return_format' => 'array',
      'preview_size' => 'medium',
      'library' => 'all',
      'min_width' => '',
      'min_height' => '',
      'min_size' => '',
      'max_width' => '',
      'max_height' => '',
      'max_size' => '',
      'mime_types' => '',
    ),
  ),
  'location' => array(
    array(
      array(
        'param' => 'post_type',
        'operator' => '==',
        'value' => 'site_video',
      ),
    ),
  ),
  'menu_order' => 0,
  'position' => 'normal',
  'style' => 'seamless',
  'label_placement' => 'top',
  'instruction_placement' => 'label',
  'hide_on_screen' => '',
  'active' => true,
  'description' => '',
  'show_in_rest' => 0,
));