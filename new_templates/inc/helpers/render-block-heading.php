<?php

/**
 * Function to output the header block.
 *
 * @param array $args Array of arguments.
 */
function render_heading_block($args)
{

	$defaults = [
		'block_name' => 'heading-block',
		'mod'    => '',
		'label'  => '',
		'tag'    => 'h2',
		'title'  => '',
		'descr'  => '',
		'link_1' => false,
		'link_2' => false,
		'animation' => true,
	];

	$data = wp_parse_args($args, $defaults);

	extract($data);
	$animation_init = $animation ? 'js-fade-item' : '';

	if (!empty($label) || !empty($title) || !empty($descr) || !empty($link_1) || !empty($link_2)) {
?>
		<div class="<?php echo $block_name; ?> <?php echo esc_attr($mod); ?>">
			<?php if (!empty($label)) { ?>
				<div class="<?php echo $block_name; ?>__label <?php echo $animation_init; ?>" data-fade-direction="up"><?php echo esc_html($label); ?></div>
			<?php } ?>

			<?php if (!empty($title)) { ?>
				<<?php echo esc_html($tag); ?> class="<?php echo $block_name; ?>__title <?php echo $animation_init; ?>" data-fade-direction="up"><?php echo $title; ?></<?php echo esc_html($tag); ?>>
			<?php } ?>

			<?php if (!empty($descr)) { ?>
				<div class="<?php echo $block_name; ?>__descr article_block <?php echo $animation_init; ?>" data-fade-direction="up"><?php echo $descr; ?></div>
			<?php } ?>

			<?php if (!empty($link_1) || !empty($link_2)) { ?>
				<?php render_buttons_block($link_1, $link_2); ?>
			<?php } ?>
		</div>
<?php
	}
}
?>