<?php
if ( ! defined('ABSPATH') ) exit;

add_action('acf/init', function () {
  if ( ! function_exists('acf_add_local_field_group') ) return;

  acf_add_local_field_group([
    'key' => 'group_ldn_block_test_block_seven',
    'title' => 'Block – Test Block Seven',
    'location' => [
      [
        [
          'param' => 'block',
          'operator' => '==',
          'value' => 'acf/test-block-seven',
        ],
      ],
    ],
    'fields' => [
              [
          'key' => 'field_ldn_test_block_seven_heading',
          'label' => 'Heading',
          'name' => 'heading',
          'type' => 'text',
          'required' => 0,
        ],
          ],
  ]);
});
