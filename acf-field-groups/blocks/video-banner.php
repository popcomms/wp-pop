<?php

  $field_prefix = 'field_site_block_video_banner_';
  
  acf_add_local_field_group(array(
    'key' => 'group_site_block_video_banner',
    'title' => 'Video banner (Block)',
    'fields' => array(
      array(
        'key' => $field_prefix . 'message',
        'label' => '',
        'name' => '',
        'type' => 'message',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'message' => '<strong>VIDEO BANNER</strong>',
        'new_lines' => 'wpautop',
        'esc_html' => 0,
      ),
      array(
        'key' => $field_prefix . 'heading_fields',
        'label' => 'Heading fields',
        'name' => '',
        'type' => 'clone',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'clone' => array(
          0 => 'group_site_heading_fields',
        ),
        'display' => 'seamless',
        'layout' => 'block',
        'prefix_label' => 0,
        'prefix_name' => 0,
      ),
      array(
        'key' => $field_prefix . 'button',
        'label' => 'Button',
        'name' => 'button',
        'type' => 'link',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'return_format' => 'array',
      ),
      array(
        'key' => $field_prefix . 'video',
        'label' => 'Video',
        'name' => 'video',
        'type' => 'post_object',
        'instructions' => 'Videos are managed <a href="/wp-admin/edit.php?post_type=site_video" target="_blank">here</a>',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'post_type' => array(
          0 => 'site_video',
        ),
        'taxonomy' => '',
        'allow_null' => 0,
        'multiple' => 0,
        'return_format' => 'object',
        'ui' => 1,
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'block',
          'operator' => '==',
          'value' => 'acf/video-banner',
        ),
      ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'field',
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
    'show_in_rest' => 0,
  ));
