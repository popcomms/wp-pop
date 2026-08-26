<?php

$list = get_field('ui-color-list');

// Get all colors from theme.json
$theme_json = json_decode(file_get_contents(get_stylesheet_directory() . '/theme.json'), true);
$palette_colors = isset($theme_json['settings']['color']['palette']) ? $theme_json['settings']['color']['palette'] : [];

// Or get the CSS variable
//$primary_color_var = 'var(--wp--preset--color--primary)';

?>

<section class="ui_colors section">
	<div class="container">

		<h2 class="heading-2 ui_title">
			Colors
		</h2>

		<div class="ui_colors__list">
			
			<?php foreach ($palette_colors as $color) : ?>
				<div class="ui_colors__item">
					<div class="ui_colors__block" style="background: <?php echo esc_attr($color['color']); ?>"></div>
					<div class="ui_colors__descr"><?php echo esc_attr($color['color']); ?></div>
					<div class="ui_colors__descr">var(--wp--preset--color--<?php echo esc_attr($color['slug']); ?>)</div>
					<?php if (isset($color['name'])) : ?>
						<div class="ui_colors__descr"><?php echo esc_html($color['name']); ?></div>
					<?php endif; ?>
				</div>
			<?php endforeach; ?>

		</div>

	</div>
</section>