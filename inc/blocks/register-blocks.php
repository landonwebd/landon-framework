<?php
if ( ! defined('ABSPATH') ) exit;

// Load local field groups for blocks
// HYGEN:BLOCK:REQUIRE hero
require_once get_template_directory() . '/blocks/hero/hero-acf.php';
// HYGEN:BLOCK:REQUIRE carousel
require_once get_template_directory() . '/blocks/carousel/carousel-acf.php';
// HYGEN:BLOCK:REQUIRE testimonials
require_once get_template_directory() . '/blocks/testimonials/testimonials-acf.php';
// HYGEN:BLOCK:REQUIRE test-block
require_once get_template_directory() . '/blocks/test-block/test-block-acf.php';
// HYGEN:BLOCK:REQUIRE test-block-two
require_once get_template_directory() . '/blocks/test-block-two/test-block-two-acf.php';
// HYGEN:BLOCK:REQUIRE test-block-four
require_once get_template_directory() . '/blocks/test-block-four/test-block-four-acf.php';
// HYGEN:BLOCK:REQUIRE test-block-five
require_once get_template_directory() . '/blocks/test-block-five/test-block-five-acf.php';
// HYGEN:BLOCK:REQUIRE test-block-six
require_once get_template_directory() . '/blocks/test-block-six/test-block-six-acf.php';
// HYGEN:BLOCK:REQUIRE test-block-seven
require_once get_template_directory() . '/blocks/test-block-seven/test-block-seven-acf.php';

// HYGEN:REQUIRE_ONCE

add_action('acf/init', function () {

  if ( ! function_exists('acf_register_block_type') ) return;

  // HYGEN:BLOCK:START hero
  acf_register_block_type([
    'name'            => 'hero',
    'title'           => __('Hero', 'ldn'),
    'category'        => 'ldn',
    'icon'            => 'cover-image',
    'supports'        => [
      'anchor' => true,
      'align'  => true,
    ],
    'render_template' => get_template_directory() . '/blocks/hero/hero.php',
  ]);
  // HYGEN:BLOCK:END hero

  // HYGEN:BLOCK:START carousel
  acf_register_block_type([
    'name'            => 'carousel',
    'title'           => __('Carousel', 'ldn'),
    'category'        => 'ldn',
    'icon'            => 'columns',
    'supports'        => [
      'anchor' => true,
      'align'  => true,
    ],
    'render_template' => get_template_directory() . '/blocks/carousel/carousel.php',
  ]);
  // HYGEN:BLOCK:END carousel


  // HYGEN:BLOCK:START testimonials
  acf_register_block_type([
    'name'            => 'testimonials',
    'title'           => __('Testimonials', 'ldn'),
    'category'        => 'ldn',
    'icon'            => 'button',
    'supports'        => [
      'anchor' => true,
      'align'  => true,
    ],
    'render_template' => get_template_directory() . '/blocks/testimonials/testimonials.php',
  ]);
  // HYGEN:BLOCK:END testimonials


  // HYGEN:BLOCK:START test-block
  acf_register_block_type([
    'name'            => 'test-block',
    'title'           => __('Test Block', 'ldn'),
    'category'        => 'ldn',
    'icon'            => 'cover-image',
    'supports' => [
      'anchor' => true,
      'align'  => false,
          'jsx'    => true,
        ],
    'render_template' => get_template_directory() . '/blocks/test-block/test-block.php',
  ]);
  // HYGEN:BLOCK:END test-block


  // HYGEN:BLOCK:START test-block-two
  acf_register_block_type([
    'name'            => 'test-block-two',
    'title'           => __('Test Block Two', 'ldn'),
    'category'        => 'ldn',
    'icon'            => 'cover-image',
    'supports' => [
      'anchor' => true,
      'align'  => false,
          'jsx'    => true,
        ],
    'render_template' => get_template_directory() . '/blocks/test-block-two/test-block-two.php',
  ]);
  // HYGEN:BLOCK:END test-block-two




  // HYGEN:BLOCK:START test-block-four
  acf_register_block_type([
    'name'            => 'test-block-four',
    'title'           => __('Test Block Four', 'ldn'),
    'category'        => 'ldn',
    'icon'            => 'columns',
    'supports' => [
      'anchor' => true,
      'align'  => false,
        ],
    'render_template' => get_template_directory() . '/blocks/test-block-four/test-block-four.php',
  ]);
  // HYGEN:BLOCK:END test-block-four

  // HYGEN:BLOCK:START test-block-five
  acf_register_block_type([
    'name'            => 'test-block-five',
    'title'           => __('Test Block Five', 'ldn'),
    'category'        => 'ldn',
    'icon'            => 'cover-image',
    'supports' => [
      'anchor' => true,
      'align'  => false,
        ],
    'render_template' => get_template_directory() . '/blocks/test-block-five/test-block-five.php',
  ]);
  // HYGEN:BLOCK:END test-block-five
  // HYGEN:BLOCK:START test-block-six
  acf_register_block_type([
    'name'            => 'test-block-six',
    'title'           => __('Test Block Six', 'ldn'),
    'category'        => 'ldn',
    'icon'            => 'format-image',
    'supports' => [
      'anchor' => true,
      'align'  => false,
        ],
    'render_template' => get_template_directory() . '/blocks/test-block-six/test-block-six.php',
  ]);
  // HYGEN:BLOCK:END test-block-six
  // HYGEN:BLOCK:START test-block-seven
  acf_register_block_type([
    'name'            => 'test-block-seven',
    'title'           => __('Test Block Seven', 'ldn'),
    'category'        => 'ldn',
    'icon'            => 'cover-image',
    'supports' => [
      'anchor' => true,
      'align'  => false,
        ],
    'render_template' => get_template_directory() . '/blocks/test-block-seven/test-block-seven.php',
  ]);
  // HYGEN:BLOCK:END test-block-seven

  // HYGEN:ADD_BLOCK
});
