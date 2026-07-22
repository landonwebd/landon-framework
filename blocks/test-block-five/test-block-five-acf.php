<?php
if ( ! defined('ABSPATH') ) exit;

add_action('acf/init', function () {
  if ( ! function_exists('acf_add_local_field_group') ) return;

  acf_add_local_field_group([
    'key' => 'group_ldn_block_test_block_five',
    'title' => 'Block – Test Block Five',
    'location' => [
      [
        [
          'param' => 'block',
          'operator' => '==',
          'value' => 'acf/test-block-five',
        ],
      ],
    ],
    'fields' => [
              [
          'key' => 'field_ldn_test_block_five_image',
          'label' => 'Image',
          'name' => 'image',
          'type' => 'image',
          'return_format' => 'array',
          'preview_size' => 'medium',
          'library' => 'all',
          'required' => 0,
        ],
          ],
  ]);
});
