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
      <% if (starterField === 'heading') { -%>
        [
          'key' => 'field_ldn_<%= snake %>_heading',
          'label' => 'Heading',
          'name' => 'heading',
          'type' => 'text',
          'required' => 0,
        ],
      <% } else if (starterField === 'rich-text') { -%>
        [
          'key' => 'field_ldn_<%= snake %>_content',
          'label' => 'Content',
          'name' => 'content',
          'type' => 'wysiwyg',
          'tabs' => 'all',
          'toolbar' => 'full',
          'media_upload' => 1,
          'required' => 0,
        ],
      <% } else if (starterField === 'image') { -%>
        [
          'key' => 'field_ldn_<%= snake %>_image',
          'label' => 'Image',
          'name' => 'image',
          'type' => 'image',
          'return_format' => 'array',
          'preview_size' => 'medium',
          'library' => 'all',
          'required' => 0,
        ],
      <% } else if (starterField === 'repeater') { -%>
        [
          'key' => 'field_ldn_<%= snake %>_items',
          'label' => 'Items',
          'name' => 'items',
          'type' => 'repeater',
          'layout' => 'block',
          'button_label' => 'Add item',
          'sub_fields' => [
            [
              'key' => 'field_ldn_<%= snake %>_items_item',
              'label' => 'Item',
              'name' => 'item',
              'type' => 'text',
              'required' => 0,
            ],
          ],
        ],
      <% } -%>
    ],
  ]);
});
