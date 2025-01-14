<?php

  $field_prefix = 'field_site_block_ebooks_';
  
  acf_add_local_field_group(array(
    'key' => 'group_site_block_ebooks',
    'title' => 'Ebooks (Block)',
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
        'message' => '<strong>EBOOKS</strong>',
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
        'key' => $field_prefix . 'ebooks',
        'label' => 'Ebooks',
        'name' => 'items',
        'aria-label' => '',
        'type' => 'post_object',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'post_type' => array(
          0 => 'site_ebook',
        ),
        'post_status' => array(
          0 => 'publish',
        ),
        'taxonomy' => '',
        'return_format' => 'object',
        'multiple' => 1,
        'allow_null' => 1,
        'bidirectional' => 0,
        'ui' => 1,
        'bidirectional_target' => array(),
      ),
      array(
        'key' => $field_prefix . 'style_fields',
        'label' => 'Style fields',
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
          0 => 'group_site_style_fields',
        ),
        'display' => 'seamless',
        'layout' => 'block',
        'prefix_label' => 0,
        'prefix_name' => 0,
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'block',
          'operator' => '==',
          'value' => 'acf/ebooks',
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
