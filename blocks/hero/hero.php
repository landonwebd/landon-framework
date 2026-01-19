<?php
/**
 * ACF Block Template: Hero
 *
 * Available variables:
 * - $block (array): block settings and attributes
 * - $content (string): inner content (if using InnerBlocks)
 * - $is_preview (bool): true during editor preview
 * - $post_id (int|string): current post ID
 */

$anchor = !empty($block['anchor']) ? $block['anchor'] : '';
$classes = ['ldn-hero'];

if (!empty($block['className'])) $classes[] = $block['className'];
if (!empty($block['align'])) $classes[] = 'align' . $block['align'];

$heading = get_field('heading') ?: '';
$subheading = get_field('subheading') ?: '';
$image = get_field('image'); // ACF image field (array) if return format = array
?>

<section class="<?php echo esc_attr(implode(' ', $classes)); ?>" <?php echo $anchor ? 'id="'.esc_attr($anchor).'"' : ''; ?>>
  <div class="container">
    <?php if ($heading): ?>
      <h1><?php echo esc_html($heading); ?></h1>
    <?php endif; ?>

    <?php if ($subheading): ?>
      <p><?php echo esc_html($subheading); ?></p>
    <?php endif; ?>

    <?php if (!empty($image['ID'])): ?>
      <?php echo wp_get_attachment_image($image['ID'], 'full'); ?>
    <?php endif; ?>
  </div>
</section>
