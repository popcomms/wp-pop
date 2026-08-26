<?php

function render_buttons_block($link1 = false, $link2 = false, $mod = '')
{

	if ($link1 || $link2) {



?>
		<div class="buttons-block <?php echo esc_html($mod); ?> js-fade-item" data-fade-direction="up">

			<?php if ($link1):
				$link_url = $link1['url'];
				$link_title = $link1['title'];
				$link_target = $link1['target'] ? $link1['target'] : '_self';
			?>
				<a class="button button--primary" href="<?php echo esc_url($link_url); ?>" target="<?php echo esc_attr($link_target); ?>"><?php echo esc_html($link_title); ?></a>
			<?php endif; ?>

			<?php if ($link2):
				$link_url = $link2['url'];
				$link_title = $link2['title'];
				$link_target = $link2['target'] ? $link2['target'] : '_self';
			?>
				<a class="button button--secondary" href="<?php echo esc_url($link_url); ?>" target="<?php echo esc_attr($link_target); ?>" style="margin-left: 0.5rem;"><?php echo esc_html($link_title); ?></a>
			<?php endif; ?>
		</div>

<?php

	}
}

?>