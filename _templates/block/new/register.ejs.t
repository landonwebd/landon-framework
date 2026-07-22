---
inject: true
to: inc/blocks/register-blocks.php
before: "// HYGEN:ADD_BLOCK"
---
  // HYGEN:BLOCK:START <%= slug %>
  acf_register_block_type([
    'name'            => '<%= slug %>',
    'title'           => __('<%= title %>', 'ldn'),
    'category'        => 'ldn',
    'icon'            => '<%= icon %>',
    'supports' => [
      'anchor' => <%= supportsAnchor ? 'true' : 'false' %>,
      'align'  => <%= alignment === 'all'
        ? 'true'
        : alignment === 'wide-full'
          ? "[ 'wide', 'full' ]"
          : 'false' %>,
    <% if (usesInnerBlocks) { -%>
      'jsx'    => true,
    <% } -%>
    ],
    'render_template' => get_template_directory() . '/blocks/<%= slug %>/<%= slug %>.php',
  ]);
  // HYGEN:BLOCK:END <%= slug %>
