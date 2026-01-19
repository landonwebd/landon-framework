---
to: <%= outDir %>/<%= name %>-acf.php
---
<?php
if ( ! defined('ABSPATH') ) exit;

add_action('acf/init', function () {
  if ( ! function_exists('acf_add_local_field_group') ) return;

  acf_add_local_field_group([
    'key' => 'group_ldn_block_<%= snake %>',
    'title' => 'Block – <%= title %>',
    'location' => [
      [
        [
          'param' => 'block',
          'operator' => '==',
          'value' => 'acf/<%= slug %>',
        ],
      ],
    ],
    'fields' => [
      [
      ],
    ],
  ]);
});
