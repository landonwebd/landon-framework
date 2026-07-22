<?php
/**
 * ACF Block Template: Test Block Four
 *
 * Available variables:
 * - $block (array)
 * - $is_preview (bool)
 * - $post_id (int|string)
 */

$anchor = ! empty( $block['anchor'] ) ? $block['anchor'] : '';

$classes = [ 'block-test-block-four' ];

if ( ! empty( $block['className'] ) ) {
  $classes[] = $block['className'];
}

if ( ! empty( $block['align'] ) ) {
  $classes[] = 'align' . $block['align'];
}

$attr_id = $anchor ? 'id="' . esc_attr( $anchor ) . '"' : '';
$attr_class = 'class="' . esc_attr( implode( ' ', $classes ) ) . '"';
$attr_block = 'data-block="test-block-four"';
?>

<section <?php echo $attr_id; ?> <?php echo $attr_class; ?> <?php echo $attr_block; ?>>
  <?php if ( $is_preview ) : ?>
    <div style="padding:1rem; border:1px dashed #ccc;">
      <strong>Test Block Four</strong> block
    </div>
  <?php endif; ?>

  <!-- Block markup goes here -->

  
</section>
