<?php echo '<!-- LOADED CUSTOM HEADER FILE: ' . __FILE__ . ' -->'; ?>

<?php

$logo = get_field('site-logo', 'option');
$button = get_field('cta-button', 'option');
$email = get_field('email', 'option');
$phone = get_field('phone', 'option');

?>

<header class="header js-header" id="header-custom"> <!-- you can add class .js-header to make header fixed -->

	<div class="header__bot">
		<div class="section_in">
			<div class="header__row">
				<?php if ($logo) { ?>
					<a class="header__logo" href="<?php echo home_url() ?>">
						<img <?php acf_image_attrs($logo) ?> width="83" height="40"/>
					</a>
				<?php }; ?>
				
				<?php wp_nav_menu([
					'theme_location' => 'header-menu',
					'container' => 'nav',
					'menu_class' => 'header__menu_list',
					'container_class' => 'header__menu',
				]) ?>


				<!-- Menu Burger Button -->
				<button class="header__menu_trigger js-header-menu-trigger" type="button" aria-label="Toggle menu">
					<span></span>
				</button>
				<!-- Menu Burger Button End -->

			</div>
		</div>
	</div>
</header>

<!-- Mobile Menu Start -->
<div class="mobile_menu js-mobile-menu">
	<div class="mobile__in">
		<div class="mobile_menu__row">
			<div class="mobile_menu__heading">
				<?php if ($logo) { ?>
					<a class="mobile_menu__logo" href="<?php echo home_url() ?>">
						<img <?php acf_image_attrs($logo) ?> />
					</a>
				<?php }; ?>

				<button class="header__menu_trigger header__menu_trigger--mobile js-header-menu-trigger" type="button" aria-label="Toggle menu">
					<span></span>
				</button>

			</div>
			<?php wp_nav_menu([
				'theme_location' => 'main_navigation',
				'container' => 'nav',
				'menu_class' => 'mobile_menu__list',
				'container_class' => 'mobile_menu__wrapper',
			]) ?>

			<?php if ($button) { ?>
				<a class="mobile-menu__button button button--primary" <?php acf_link_attrs($button) ?>>
					<?php echo $button['title'] ?>
				</a>
			<?php }; ?>
			<div class="mobile-menu__social_w">
				<?php get_template_part('template-parts/social-media-list') ?>
			</div>
		</div>
	</div>
</div>
<!-- Mobile End -->