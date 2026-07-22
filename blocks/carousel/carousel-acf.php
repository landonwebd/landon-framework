<?php
if ( ! defined('ABSPATH') ) exit;

add_action('acf/init', function () {
  if ( ! function_exists('acf_add_local_field_group') ) return;

  acf_add_local_field_group([
    'key' => 'group_ldn_block_carousel',
    'title' => 'Block – Carousel',
    'location' => [
      [
        [
          'param' => 'block',
          'operator' => '==',
          'value' => 'acf/carousel',
        ],
      ],
    ],
    'fields' => [
      [
      ],
    ],
  ]);
});
