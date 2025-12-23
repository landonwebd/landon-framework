---
to: components/<%= name %>/<%= name %>.php
---
<?php
/**
 * Component: <%= name %>
 */

$component_id = $component_id ?? '';
$classes      = $classes ?? [];
$data         = $data ?? [];
?>

<section class="<%= name %> <?php echo implode(' ', $classes); ?>" <?php echo $component_id ? 'id="' . esc_attr($component_id) . '"' : ''; ?> data-component="<%= name %>">
  <div class="container">
    <!-- TODO: build component markup -->
  </div>
</section>
