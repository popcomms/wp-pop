  <?php
  
  $field_prefix = 'field_site_settings_';
  
  acf_add_local_field_group(array(
    'key' => 'group_site_settings',
    'title' => 'Settings',
    'fields' => array(
      array(
        'key' => $field_prefix . 'footer_nav_tab',
        'label' => 'Footer nav',
        'name' => '',
        'type' => 'tab',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'placement' => 'top',
        'endpoint' => 0,
      ),
      array(
        'key' => $field_prefix . 'emphasise_items_other_than_the_first',
        'label' => 'Emphasise items other than the first',
        'name' => 'emphasise_items_other_than_the_first',
        'type' => 'true_false',
        'instructions' => 'Set to yes to emphasise items other than the first by adjusting spacing and font sizes.',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'message' => '',
        'default_value' => 0,
        'ui' => 1,
        'ui_on_text' => '',
        'ui_off_text' => '',
      ),
      array(
        'key' => $field_prefix . 'footer',
        'label' => '',
        'name' => 'footer',
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
          0 => 'group_site_navigation',
        ),
        'display' => 'seamless',
        'layout' => 'block',
        'prefix_label' => 0,
        'prefix_name' => 1,
      ),
      array(
        'key' => $field_prefix . 'general_tab',
        'label' => 'General',
        'name' => '',
        'type' => 'tab',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'placement' => 'top',
        'endpoint' => 0,
      ),
      array(
        'key' =>  $field_prefix . 'address',
        'label' => 'Address',
        'name' => 'address',
        'type' => 'textarea',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
        'maxlength' => '',
        'rows' => 5,
        'new_lines' => 'br',
      ),
      array(
        'key' => $field_prefix . 'email_address',
        'label' => 'Email address',
        'name' => 'email_address',
        'type' => 'email',
        'instructions' => '',
        'required' => 1,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => ''
      ),
      array(
        'key' => $field_prefix . 'telephone_number',
        'label' => 'Telephone number',
        'name' => 'telephone_number',
        'type' => 'text',
        'instructions' => '',
        'required' => 1,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => ''
      ),
      array(
        'key' => $field_prefix . 'telephone_number_for_links',
        'label' => 'Telephone number (for links)',
        'name' => 'telephone_number_for_links',
        'type' => 'text',
        'instructions' => 'Enter the telephone number in a suitable format for HTML anchor elements.',
        'required' => 1,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => ''
      ),
      array(
        'key' => $field_prefix . 'linkedin_link',
        'label' => 'LinkedIn link',
        'name' => 'linkedin_link',
        'type' => 'url',
        'instructions' => '',
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
        'key' => $field_prefix . 'youtube_link',
        'label' => 'YouTube link',
        'name' => 'youtube_link',
        'type' => 'url',
        'instructions' => '',
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
        'key' => $field_prefix . 'instagram_link',
        'label' => 'Instgram link',
        'name' => 'instagram_link',
        'type' => 'url',
        'instructions' => '',
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
        'key' => $field_prefix . 'partners_and_awards',
        'label' => 'Partners and awards',
        'name' => 'partners_and_awards',
        'type' => 'repeater',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'collapsed' => '',
        'min' => 0,
        'max' => 0,
        'layout' => 'block',
        'button_label' => '',
        'sub_fields' => array(
          array(
            'key' => $field_prefix . 'partners_and_awards_text',
            'label' => 'Accesible text',
            'name' => 'text',
            'type' => 'text',
            'instructions' => '',
            'required' => 1,
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
            'key' => $field_prefix . 'partners_and_awards_width',
            'label' => 'Width',
            'name' => 'width',
            'type' => 'select',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
              'width' => '50',
              'class' => '',
              'id' => '',
            ),
            'choices' => array(
              'full' => 'Full',
              'half' => 'Half',
            ),
            'default_value' => 'full',
            'allow_null' => 0,
            'multiple' => 0,
            'ui' => 0,
            'return_format' => 'value',
            'ajax' => 0,
            'placeholder' => '',
          ),
          array(
            'key' => $field_prefix . 'partners_and_awards_link',
            'label' => 'Link',
            'name' => 'link',
            'type' => 'url',
            'instructions' => '',
            'required' => 0,
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
            'key' => $field_prefix . 'partners_and_awards_white_image',
            'label' => 'White image',
            'name' => 'white_image',
            'type' => 'image',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
              'width' => '50',
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
          array(
            'key' => $field_prefix . 'partners_and_awards_black_image',
            'label' => 'Black image',
            'name' => 'black_image',
            'type' => 'image',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
              'width' => '50',
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
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'options_page',
          'operator' => '==',
          'value' => 'global-settings',
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