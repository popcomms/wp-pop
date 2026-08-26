<style>
    .content-block__section {
        background-position: center;
    }   
</style>

<?php 

/**
 * 
 */

$text_color = 'dark';
$add_inner_box = false;
$background_image = array(
    'url' => 'https://placehold.co/1920x1080',
    'alt' => 'Placeholder Image',
);

$content = '<h2>Content Block 1</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>';
$label = 'the label';
$contentCol = 'col-12';
$contentWidth = 'col-12 col-lg-10';
$textAlign = 'text-right';

if ($textAlign == 'text-right') :

    if ($contentWidth === 'col-12 col-lg-10') : 
        $contentCol = 'col-12 col-lg-10 offset-lg-2';
    elseif ($contentWidth === 'col-12 col-lg-8') : 
        $contentCol = 'col-12 col-lg-8 offset-lg-4';
    elseif ($contentWidth === 'col-12 col-lg-6') : 
        $contentCol = 'col-12 col-lg-6 offset-lg-6';
    else : 
        $contentCol = 'col-12';
    endif; 

elseif($textAlign == 'text-center') :

    if ($contentWidth === 'col-12 col-lg-10') : 
        $contentCol = 'col-12 col-lg-10 offset-lg-1';
    elseif ($contentWidth === 'col-12 col-lg-8') : 
        $contentCol = 'col-12 col-lg-10 offset-lg-2';
    elseif ($contentWidth === 'col-12 col-lg-6') : 
        $contentCol = 'col-12 col-lg-6 offset-lg-3';
    else : 
        $contentCol = 'col-12';
    endif; 

else : 

    $contentCol = $contentWidth;

endif; 

$buttonPrimary = array(
    'title' => 'Button Primary',
    'url' => '#',
    'target' => '_self',
    'rel' => 'noopener noreferrer',
    'class' => 'button button--primary',
);

$buttonSecondary = array(
    'title' => 'Button Secondary',
    'url' => '#',
    'target' => '_self',
    'rel' => 'noopener noreferrer',
    'class' => 'button button--secondary',
);

$inner_box_class = $add_inner_box ? "project-inner-box" : "";
?>




<section class="content-block__section  <?php echo $text_color;?> | section" id="content-block-<?php echo get_row_index();?>" <?php if ($add_inner_box === false) : ?>
                        style="background-image: url(<?php echo $background_image['url'];?>)" <?php endif; ?>>

    <div class="content-block__container | container">

        <div class="row content-block__row<?php echo ' ' . $textAlign;?>">

            <?php if ($content) : ?>

                <div class="<?php echo $contentCol;?> content-block__content-wrapper">

                    <div class="<?php echo $inner_box_class;?>" <?php if ($background_image && $add_inner_box) : ?>
                        style="background-image: url(<?php echo $background_image['url'];?>)"
                    <?php endif; ?>>

                    <?php render_content_wysiwig($label, $content);?>

                    <?php if ($buttonPrimary || $buttonSecondary) : ?>

                        <?php render_buttons_block($buttonPrimary, $buttonSecondary, '');?>

                    <?php endif; ?>

                    </div>

                </div>

            <?php endif; ?>

        </div>

    </div>
</section>