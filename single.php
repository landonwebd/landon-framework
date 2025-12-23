<?php get_header(); ?>

<main id="site-content" class="site-main">
  <?php while ( have_posts() ) : the_post(); ?>
    <article <?php post_class(); ?>>
      <h1><?php the_title(); ?></h1>
      <div class="meta">
        <span><?php echo get_the_date(); ?></span>
      </div>
      <div class="content">
        <?php the_content(); ?>
      </div>
    </article>
  <?php endwhile; ?>
</main>

<?php get_footer(); ?>
