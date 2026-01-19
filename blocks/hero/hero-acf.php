<?php
if ( ! defined('ABSPATH') ) exit;

/**
 * Register ACF fields for the Hero block in code.
 */
add_action('acf/init', function () {

  // If ACF isn't active, bail safely.
  if ( ! function_exists('acf_add_local_field_group') ) return;

  acf_add_local_field_group([
    'key' => 'group_ldn_block_hero',
    'title' => 'Block – Hero',
    'fields' => [
      [
        'key' => 'field_ldn_hero_heading',
        'label' => 'Heading',
        'name' => 'heading',
        'type' => 'text',
        'required' => 0,
      ],
      [
        'key' => 'field_ldn_hero_subheading',
        'label' => 'Subheading',
        'name' => 'subheading',
        'type' => 'textarea',
        'rows' => 3,
        'new_lines' => '', // or 'br' / 'wpautop'
        'required' => 0,
      ],
      [
        'key' => 'field_ldn_hero_image',
        'label' => 'Image',
        'name' => 'image',
        'type' => 'image',
        'return_format' => 'array', // 'id' is also fine
        'preview_size' => 'medium',
        'library' => 'all',
        'required' => 0,
      ],
    ],
    'location' => [
      [
        [
          'param' => 'block',
          'operator' => '==',
          'value' => 'acf/hero',
        ],
      ],
    ],
    'menu_order' => 0,
    'position' => 'side',        // 'normal' or 'side'
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
  ]);

});
