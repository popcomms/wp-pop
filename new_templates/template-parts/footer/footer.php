<?php

/*$menus = [
	[
		'title' => __('About', 'theme-menu'),
		'menu' => wp_nav_menu([
			'theme_location' => 'main_navigation',
			'container' => 'nav',
			'menu_class' => 'footer__menu_list',
			'container_class' => 'footer__menu',
		])
	],
	[
		'menu' => wp_nav_menu([
			'theme_location' => 'main_navigation',
			'container' => 'nav',
			'menu_class' => 'footer__menu_list',
			'container_class' => 'footer__menu',
		])
	],

];*/

$info_title = get_field('footer_info_title', 'option');
$info_descr = get_field('footer_company_info', 'option');
$location = get_field('location', 'option');
$location_link = get_field('location_link', 'option');
$phone = get_field('footer_phone', 'option');
$copyright = get_field('copyright', 'option');
$logo = get_field('footer_logo', 'option');

$app_store = get_field('app_store_link', 'option');
$google_play = get_field('google_play_link', 'option');
?>

<footer class="footer" id="footer">
	<div class="footer__top">
		<div class="section_in">
			<div class="row">
				<div class="col-lg-4">
					<div class="footer__col">
						<div class="footer__menu_w">
							<div class="footer__descr article-block">
								<?php echo $info_descr ?>
							</div>
							<div class="footer__sub-title">
								<?php echo $info_title ?>
							</div>
							<div class="footer__contacts">
								<?php if ($phone): ?>
									<div class="footer__contacts-phone">
										<span class="icon"></span><a href="tel:<?php echo $phone ?>"><?php echo $phone ?></a>
									</div>
								<?php endif; ?>
								<?php if ($location): ?>
									<div class="footer__contacts-location">
										<?php if ($location_link) { ?>
											<span class="icon"></span><a href="tel:<?php echo $location_link ?>"><?php echo $location ?></a>
										<?php } else { ?>
											<span class="icon"></span><?php echo $location ?>
										<?php } ?>
									</div>
								<?php endif; ?>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="footer__row">
						<?php //if ($menus[0]) { ?>
							<div class="footer__col">
								<div class="footer__menu_w">
									<h5 class="footer__title">
										<?php //echo $menus[0]['title'] ?>
										<?php echo 'Quick Links' ;?>
									</h5> 
									<?php
									$menu_id = 83; // Replace with your actual menu ID
									$menu_items = wp_get_nav_menu_items( $menu_id );

									if ( $menu_items ) {
										echo '<ul class="footer__menu_list">';
										foreach ( $menu_items as $item ) {
											echo '<li class="menu-item"><a href="'.$item->url.'">' . $item->title . '</a></li>';
										}
										echo '</ul>';
									} else {
										echo 'No menu items found for the given ID.';
									}
									?>
								</div>
							</div>
						<?php // }; ?>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="footer__row">
						<?php //if ($menus[0]) { ?>
							<div class="footer__col">
								<div class="footer__menu_w">
									<h5 class="footer__title">
										<?php //echo $menus[0]['title'] ?>
										<?php echo 'Useful Links' ;?>
									</h5> 
									<?php
									$menu_id = 79; // Replace with your actual menu ID
									$menu_items = wp_get_nav_menu_items( $menu_id );

									if ( $menu_items ) {
										echo '<ul class="footer__menu_list">';
										foreach ( $menu_items as $item ) {
											echo '<li class="menu-item"><a href="'.$item->url.'">' . $item->title . '</a></li>';
										}
										echo '</ul>';
									} else {
										echo 'No menu items found for the given ID.';
									}
									?>
								</div>
							</div>
						<?php //}; ?>
					</div>
				</div>
				
			</div>
		</div>
	</div>
	<div class="footer__bottom">
		<div class="section_in">
			<div class="footer__bottom_inner">
				<?php if ($copyright): ?>
					<div class="footer__bottom_copyright">
						<p><?php echo $copyright ?></p>
					</div>
				<?php endif; ?>
				<div class="footer-menu__social_w">
					<?php get_template_part('template-parts/social-media-list') ?>
				</div>
			</div>
			<div class="footer__bottom_inner">
				<?php if ($logo) { ?>
					<a class="footer__logo" href="<?php echo home_url() ?>">
						<img <?php acf_image_attrs($logo) ?> />
					</a>
				<?php }; ?>
				<div class="footer__bottom_app">
					<?php if ($app_store): ?>
						<div class="footer__bottom_app-store">
							<a href="<?php echo $app_store ?>" target="_blank"><?php echo get_inline_svg('app-store' . '.svg'); ?></a>
						</div>
					<?php endif; ?>
					<?php if ($google_play): ?>
						<div class="footer__bottom_google-play">
							<a href="<?php echo $google_play ?>" target="_blank"><?php echo get_inline_svg('google-play' . '.svg'); ?></a>
						</div>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
</footer>



<?php the_field('footer_scripts', 'option') ?>