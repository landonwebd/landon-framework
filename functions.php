<?php
/**
 * Theme setup and global functions
 */

// Register ACF Blocks
require_once get_template_directory() . '/inc/blocks/register-blocks.php';
require_once get_template_directory() . '/inc/blocks/editor.php';


if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

if ( ! function_exists( 'ldn_theme_setup' ) ) {
  function ldn_theme_setup() {
    // Let WordPress manage the document title.
    add_theme_support( 'title-tag' );

    // Featured images.
    add_theme_support( 'post-thumbnails' );

    // Align Wide support
    add_theme_support( 'align-wide' );

    // HTML5 markup.
    add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ] );

    // Menus.
    register_nav_menus( [
      'primary' => __( 'Primary Menu', 'ldn' ),
    ] );
  }
}
add_action( 'after_setup_theme', 'ldn_theme_setup' );

function ldn_theme_assets() {
  $theme_version = wp_get_theme()->get('Version');

  wp_enqueue_style('app',get_template_directory_uri() . '/dist/app.css',[],$theme_version);

  wp_enqueue_script('app',get_template_directory_uri() . '/dist/app.js',[],$theme_version,true);
}
add_action( 'wp_enqueue_scripts', 'ldn_theme_assets' );