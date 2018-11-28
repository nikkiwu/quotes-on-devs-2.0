<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */
get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
        <section class="quote-submission-wrapper">

            <header>
                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
            </header><!-- page header -->

            <?php if (is_user_logged_in() && current_user_can('edit_posts')): ?>

                <form name="quoteForm" id="quote-submission-form">

                    <div class="quote-author">
                        <label for="quote-author">Author of Quote</label>
                        <input type="text" name="quote_author" id="quote-author">
                    </div><!-- .quote-author -->

                    <div class="quote-content">
                        <label for="quote-content">Quote</label>
                        <textarea name="quote_content" id="quote-content" cols="20" rows="3"></textarea>
                    </div><!-- .quote-content -->

                    <div class="quote-source">
                        <label for="quote-source">Where did you find this quote? (e.g website)</label>
                        <input type="text" name="quote_source" id="quote-source">
                    </div><!-- .quote-source -->

                    <div class="quote-source-url">
                        <label for="quote-source-url">Provide the URL of the quote source, if available</label>
                        <input type="url" name="quote_source_url" id="quote-source-url">
                    </div><!-- .quote-source-url -->

                    <input id="submit" type="submit" value="Submit Quote">

                </form><!-- #quote-submission-form -->

                <p class="submit-success-message" style="display:none;"></p>

            <?php else: ?>
                <p>Sorry, you must be logged in to submit a quote.</p>
                <p>
                    <?php echo sprintf('<a href="%1s">%2s</a>', esc_url(wp_login_url()), 'Click here to login'); ?>
                </p>

            <?php endif; ?>

        </section><!-- .quote-submission-wrapper -->
    </main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>
