<section class="duplex duplex-1 section">
    <div class="container">
        <h2>Duplex 1</h2>
        <p>Below is a duplex block with a video and content. The video is a modal popup. There are few variables: so markup should handle all of them.</p>
    </div>
</section>


<?php 

/**
 * PHP variable for this section so we can use our functions to render the content and media
 */

$content = '<h2>Content is on the left</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>';
$label = 'the label';
$contentCol = 'col-lg-5';
$mediaCol = 'col-lg-7';
$contentPosition = 'left';
$contentSize = 'equal';
$mediaType = 'image';
$image = array(
    'url' => 'https://placehold.co/600x400',
    'alt' => 'Placeholder Image',
);

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
?>

<section class="duplex duplex-1 section">
    <div class="duplex__container | container ">

        <div class="row duplex__row">

            <?php if ($content) : ?>

                <div class="<?php echo $contentCol;?> duplex__content-wrapper<?php echo ' ' . $contentPosition;?>">

                    <?php render_content_wysiwig($label, $content, '');?>

                    <?php if ($buttonPrimary || $buttonSecondary) : ?>

                        <?php render_buttons_block($buttonPrimary, $buttonSecondary, '');?>

                    <?php endif; ?>

                </div>

            <?php endif; ?>

            <?php if ($image || $video ) : ?>

                <div class="<?php echo $mediaCol;?> duplex__media-wrapper">

                    <?php if($image && $mediaType == 'image') : ?>
                        <img <?php acf_image_attrs($image) ?> >
                    <?php elseif ($mediaType == 'image'): ?>
                        <img <?php img_src('/placeholder-icon.svg'); ?> alt="placeholder">
                    <?php elseif ($mediaType == 'video'): ?>
                        <video src="<?php echo $video;?>"<?php if ($controls) : echo ' controls'; endif; if ($autoplay) : echo ' autoplay muted playsinline'; endif; if ($poster) :?> poster="<?php echo esc_url($poster);?>" <?php endif; ?>></video>
                    <?php endif; ?>
                    
                </div>

            <?php endif; ?>

        </div>

    </div>
</section>

<?php 

/**
 * PHP variable for this section so we can use our functions to render the content and media
 */

$content = '<h2>Content is on the right</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>';
$label = 'the label';
$contentCol = 'col-lg-5';
$mediaCol = 'col-lg-7';
$contentPosition = 'right';
$contentSize = 'equal';
$mediaType = 'image';
$image = array(
    'url' => 'https://placehold.co/600x400',
    'alt' => 'Placeholder Image',
);

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
?>

<section class="duplex duplex-1 section">
    <div class="duplex__container | container ">

        <div class="row duplex__row">

            <?php if ($content) : ?>

                <div class="<?php echo $contentCol;?> duplex__content-wrapper<?php echo ' ' . $contentPosition;?>">

                    <?php render_content_wysiwig($label, $content, '');?>

                    <?php if ($buttonPrimary || $buttonSecondary) : ?>

                        <?php render_buttons_block($buttonPrimary, $buttonSecondary, '');?>

                    <?php endif; ?>

                </div>

            <?php endif; ?>

            <?php if ($image || $video ) : ?>

                <div class="<?php echo $mediaCol;?> duplex__media-wrapper">

                    <?php if($image && $mediaType == 'image') : ?>
                        <img <?php acf_image_attrs($image) ?> >
                    <?php elseif ($mediaType == 'image'): ?>
                        <img <?php img_src('/placeholder-icon.svg'); ?> alt="placeholder">
                    <?php elseif ($mediaType == 'video'): ?>
                        <video src="<?php echo $video;?>"<?php if ($controls) : echo ' controls'; endif; if ($autoplay) : echo ' autoplay muted playsinline'; endif; if ($poster) :?> poster="<?php echo esc_url($poster);?>" <?php endif; ?>></video>
                    <?php endif; ?>
                    
                </div>

            <?php endif; ?>

        </div>

    </div>
</section>

<?php 

/**
 * PHP variable for this section so we can use our functions to render the content and media
 */

$content = '<h2>Content is on the left</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>';
$label = 'the label';
$contentCol = 'col-lg-5';
$mediaCol = 'col-lg-7';
$contentPosition = 'left';
$contentSize = 'equal';
$mediaType = 'video';
$poster = 'https://placehold.co/600x400';
$video = 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
$controls = false;
$autoplay = true;
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
?>

<section class="duplex duplex-1 section">
    <div class="duplex__container | container ">

        <div class="row duplex__row">

            <?php if ($content) : ?>

                <div class="<?php echo $contentCol;?> duplex__content-wrapper<?php echo ' ' . $contentPosition;?>">

                    <?php render_content_wysiwig($label, $content, '');?>

                    <?php if ($buttonPrimary || $buttonSecondary) : ?>

                        <?php render_buttons_block($buttonPrimary, $buttonSecondary, '');?>

                    <?php endif; ?>

                </div>

            <?php endif; ?>

            <?php if ($image || $video ) : ?>

                <div class="<?php echo $mediaCol;?> duplex__media-wrapper">

                    <?php if($image && $mediaType == 'image') : ?>
                        <img <?php acf_image_attrs($image) ?> >
                    <?php elseif ($mediaType == 'image'): ?>
                        <img <?php img_src('/placeholder-icon.svg'); ?> alt="placeholder">
                    <?php elseif ($mediaType == 'video'): ?>
                        <video src="<?php echo $video;?>"<?php if ($controls) : echo ' controls'; endif; if ($autoplay) : echo ' autoplay muted playsinline'; endif; if ($poster) :?> poster="<?php echo esc_url($poster);?>" <?php endif; ?>></video>
                    <?php endif; ?>
                    
                </div>

            <?php endif; ?>

        </div>

    </div>
</section>

<?php 

/**
 * PHP variable for this section so we can use our functions to render the content and media
 */

$content = '<h2>Content is on the left</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>';
$label = 'the label';
$contentCol = 'col-lg-5';
$mediaCol = 'col-lg-7';
$contentPosition = 'right';
$contentSize = 'equal';
$mediaType = 'video';
$poster = 'https://placehold.co/600x400?text=This is Video';
$video = 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
$controls = true;
$autoplay = false;

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
?>

<section class="duplex duplex-1 section">
    <div class="duplex__container | container ">

        <div class="row duplex__row">

            <?php if ($content) : ?>

                <div class="<?php echo $contentCol;?> duplex__content-wrapper<?php echo ' ' . $contentPosition;?>">

                    <?php render_content_wysiwig($label, $content, '');?>

                    <?php if ($buttonPrimary || $buttonSecondary) : ?>

                        <?php render_buttons_block($buttonPrimary, $buttonSecondary, '');?>

                    <?php endif; ?>

                </div>

            <?php endif; ?>

            <?php if ($image || $video ) : ?>

                <div class="<?php echo $mediaCol;?> duplex__media-wrapper">

                    <?php if($image && $mediaType == 'image') : ?>
                        <img <?php acf_image_attrs($image) ?> >
                    <?php elseif ($mediaType == 'image'): ?>
                        <img <?php img_src('/placeholder-icon.svg'); ?> alt="placeholder">
                    <?php elseif ($mediaType == 'video'): ?>
                        <video src="<?php echo $video;?>"<?php if ($controls) : echo ' controls'; endif; if ($autoplay) : echo ' autoplay muted playsinline'; endif; if ($poster) :?> poster="<?php echo esc_url($poster);?>" <?php endif; ?>></video>
                    <?php endif; ?>
                    
                </div>

            <?php endif; ?>

        </div>

    </div>
</section>