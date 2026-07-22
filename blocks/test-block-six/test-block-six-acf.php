<?php
if ( ! defined('ABSPATH') ) exit;

add_action('acf/init', function () {
  if ( ! function_exists('acf_add_local_field_group') ) return;

  acf_add_local_field_group([
    'key' => 'group_ldn_block_test_block_six',
    'title' => 'Block – Test Block Six',
    'location' => [
      [
        [
          'param' => 'block',
          'operator' => '==',
          'value' => 'acf/test-block-six',
        ],
      ],
    ],
    'fields' => [
              [
          'key' => 'field_ldn_test_block_six_content',
          'label' => 'Content',
          'name' => 'content',
          'type' => 'wysiwyg',
          'tabs' => 'all',
          'toolbar' => 'full',
          'media_upload' => 1,
          'required' => 0,
        ],
          ],
  ]);
});
