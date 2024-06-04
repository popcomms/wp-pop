<?php

  $field_prefix = 'field_site_heading_fields_';
  
  acf_add_local_field_group(array(
    'key' => 'group_site_heading_fields',
    'title' => 'Heading Fields',
    'fields' => array(
      array(
        'key' => $field_prefix . 'heading_primary',
        'label' => 'Heading primary',
        'name' => 'heading_primary',
        'type' => 'text',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '50',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'maxlength' => '',
      ),
      array(
        'key' => $field_prefix . 'heading_primary_tag',
        'label' => 'Heading primary tag',
        'name' => 'heading_primary_tag',
        'type' => 'select',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '50',
          'class' => '',
          'id' => '',
        ),
        'choices' => array(
          'h1' => 'h1',
          'h2' => 'h2',
          'h3' => 'h3',
          'h4' => 'h4',
          'h5' => 'h5',
          'h6' => 'h6',
          'p' => 'p',
        ),
        'default_value' => 'h2',
        'allow_null' => 0,
        'multiple' => 0,
        'ui' => 0,
        'return_format' => 'value',
        'ajax' => 0,
        'placeholder' => '',
      ),
      array(
        'key' => $field_prefix . 'heading_secondary',
        'label' => 'Heading secondary',
        'name' => 'heading_secondary',
        'type' => 'text',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '50',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'maxlength' => '',
      ),
      array(
        'key' => $field_prefix . 'heading_secondary_tag',
        'label' => 'Heading secondary tag',
        'name' => 'heading_secondary_tag',
        'type' => 'select',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '50',
          'class' => '',
          'id' => '',
        ),
        'choices' => array(
          'h1' => 'h1',
          'h2' => 'h2',
          'h3' => 'h3',
          'h4' => 'h4',
          'h5' => 'h5',
          'h6' => 'h6',
          'p' => 'p',
        ),
        'default_value' => 'h3',
        'allow_null' => 0,
        'multiple' => 0,
        'ui' => 0,
        'return_format' => 'value',
        'ajax' => 0,
        'placeholder' => '',
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'post_type',
          'operator' => '!=',
          'value' => 'page',
        ),
      ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'field',
    'hide_on_screen' => '',
    'active' => false,
    'description' => '',
    'show_in_rest' => 0,
  ));