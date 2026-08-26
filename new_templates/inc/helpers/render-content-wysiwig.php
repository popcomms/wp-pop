<?php

function render_content_wysiwig($label = false, $content = false, $mod = '')
{

    if ($content) { ?>

        <?php if ($label) { ?>

            <div class="label sub-title" style="margin-bottom: 0.5rem;">
                <?php echo esc_html($label); ?>
            </div>

        <?php } ;?>

        <div class="content-block">

            <?php echo $content; ?>

        </div>


    <?php

    }
}

?>