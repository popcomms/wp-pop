<?php
function render_slider_nav($icon, $mod = '')
{
	if ($icon) {
?>
		<div class="slider_nav <?php echo esc_html($mod); ?> js-fade-item" data-fade-direction="up">
			<button type="button" class="slider_nav__btn slider_nav__btn--prev_mod js-default-nav-prev" aria-label="Previous slide">
				<?php echo get_inline_svg($icon); ?>
			</button>
			<button type="button" class="slider_nav__btn slider_nav__btn--next_mod js-default-nav-next" aria-label="Next slide">
				<?php echo get_inline_svg($icon); ?>
			</button>
		</div>
<?php
	}
}
?>