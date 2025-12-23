<?php
/**
 * Component: hero-banner
 */

$component_id = $component_id ?? '';
$classes      = $classes ?? [];
$data         = $data ?? [];
?>

<section
  class="hero-banner <?php echo implode(' ', $classes); ?>"
  <?php echo $component_id ? 'id="' . esc_attr($component_id) . '"' : ''; ?>
  data-component="hero-banner"
>
  <div class="container">
    <!-- TODO: build component markup -->
  </div>
</section>
