<?php
if ( ! defined('ABSPATH') ) exit;

// Load local field groups for blocks
require_once get_template_directory() . '/blocks/hero/hero-acf.php';

add_action('acf/init', function () {

  if ( ! function_exists('acf_register_block_type') ) return;

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

  acf_register_block_type([
    'name'            => 'rich-text',
    'title'           => __('Rich Text', 'ldn'),
    'category'        => 'ldn',
    'icon'            => 'text',
    'supports'        => [
      'anchor' => true,
      'align'  => true,
    ],
    'render_template' => get_template_directory() . '/blocks/rich-text/rich-text.php',
  ]);

  acf_register_block_type([
    'name'            => 'cheese',
    'title'           => __('Cheese', 'ldn'),
    'category'        => 'ldn',
    'icon'            => 'editor-paragraph',
    'supports'        => [
      'anchor' => true,
      'align'  => true,
    ],
    'render_template' => get_template_directory() . '/blocks/cheese/cheese.php',
  ]);


  // HYGEN:ADD_BLOCK
});
