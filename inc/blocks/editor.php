<?php
// Add a custom block category in the Gutenberg inserter.
add_filter('block_categories_all', function ($categories, $post) {
  // Put it FIRST so it's obvious in the inserter UI.
  array_unshift($categories, [
    'slug'  => 'ldn',
    'title' => __('Landon Framework', 'ldn'),
    'icon'  => null,
  ]);

  return $categories;
}, 10, 2);

add_filter('allowed_block_types_all', function ($allowed_blocks, $editor_context) {

  // Failsafe: if we don't have context, don't restrict.
  if (empty($editor_context->post)) {
    return $allowed_blocks;
  }

  // Your ACF blocks
  $ldn_blocks = [
    // HYGEN:BLOCK:EDITOR hero
    'acf/hero',
    // HYGEN:BLOCK:EDITOR carousel
    'acf/carousel',
    // HYGEN:BLOCK:EDITOR testimonials
    'acf/testimonials',
    // HYGEN:BLOCK:EDITOR test-block
    'acf/test-block',
    // HYGEN:BLOCK:EDITOR test-block-two
    'acf/test-block-two',
    // HYGEN:BLOCK:EDITOR test-block-four
    'acf/test-block-four',
    // HYGEN:BLOCK:EDITOR test-block-five
    'acf/test-block-five',
    // HYGEN:BLOCK:EDITOR test-block-six
    'acf/test-block-six',
    // HYGEN:BLOCK:EDITOR test-block-seven
    'acf/test-block-seven',

    // HYGEN:ADD_BLOCK
  ];

  // Core blocks that are commonly depended on by the editor + RichText behavior
  $core_required = [
  ];

  // Optional “layout helpers” (keep/remove as you like)
  $core_optional = [

  ];

  return array_values(array_unique(array_merge(
    $ldn_blocks,
    $core_required,
    $core_optional
  )));

}, 10, 2);
