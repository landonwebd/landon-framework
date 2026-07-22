<?php
if ( ! defined('ABSPATH') ) exit;

add_action('acf/init', function () {
  if ( ! function_exists('acf_add_local_field_group') ) return;

  acf_add_local_field_group([
    'key' => 'group_ldn_block_test_block_two',
    'title' => 'Block – Test Block Two',
    'location' => [
      [
        [
          'param' => 'block',
          'operator' => '==',
          'value' => 'acf/test-block-two',
        ],
      ],
    ],
    'fields' => [
      [
      ],
    ],
  ]);
});
