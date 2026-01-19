---
inject: true
to: inc/blocks/register-blocks.php
before: "// HYGEN:ADD_BLOCK"
---
  acf_register_block_type([
    'name'            => '<%= slug %>',
    'title'           => __('<%= title %>', 'ldn'),
    'category'        => 'ldn',
    'icon'            => '<%= icon %>',
    'supports'        => [
      'anchor' => true,
      'align'  => true,
    ],
    'render_template' => get_template_directory() . '/blocks/<%= slug %>/<%= slug %>.php',
  ]);

