<?php

  $field_prefix = 'field_site_style_fields_';
  
  acf_add_local_field_group(array(
    'key' => 'group_site_style_fields',
    'title' => 'Style Fields',
    'fields' => array(
      array(
        'key' => $field_prefix . 'style',
        'label' => 'Style',
        'name' => 'style',
        'type' => 'select',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'choices' => array(
          'light' => 'Light',
          'dark' => 'Dark',
        ),
        'default_value' => '',
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