<?php
// Get typography settings from theme.json
$theme_json = json_decode(file_get_contents(get_stylesheet_directory() . '/theme.json'), true);
$font_sizes = isset($theme_json['settings']['typography']['fontSizes']) ? $theme_json['settings']['typography']['fontSizes'] : [];
$font_families = isset($theme_json['settings']['typography']['fontFamilies']) ? $theme_json['settings']['typography']['fontFamilies'] : [];
?>


<section class="ui_typography section">
	<div class="container">

		<h2 class="heading-2 ui_title">
			02 Typography
		</h2>

		<div class="ui_typography__row">

			<div class="ui_typography__col">

				<h3 class="heading-3 ui_sub_title">
					Font Families
				</h3>

					<div class="ui_typography__font">
					<?php foreach ($font_families as $item) : 
							$font = $item['fontFamily'];
							$weights = $item['fontWeights'];
						?>
							<div class="ui_typography__font_item">
								<div class="ui_typography__font_block" style="font-family: <?php echo $font; ?>">Aa</div>
								<div class="ui_typography__font_name" style="font-family: <?php echo $font; ?>">Font name: <?php echo $font; ?></div>
								<?php if ($weights) { ?>

									<div class="ui_typography__font_weights" style="font-family: <?php echo $font; ?>">
										<div class="ui_typography__font_weights_item">Weights:</div>
										<?php foreach ($weights as $weight) : ?>
											<div class="ui_typography__font_weights_item"><?php echo $weight; ?>,</div>
										<?php endforeach; ?>
									</div>
								<?php }; ?>
							</div>

							<?php endforeach; ?>
					</div>

			</div>
			<div class="ui_typography__col">
				<h3 class="heading-2 ui_sub_title">
					Headings
				</h3>

				<div class="ui_typography__headings">
					<h1 class="heading-1">H1 - This is hero text</h1>
					<h2 class="heading-2">H2 - This is a large heading</h2>
					<h3 class="heading-3">H3 - This is a standard heading</h3>
					<h4 class="heading-4">H4 - This is a medium heading</h4>
					<h5 class="heading-5">H5 - This is a medium heading</h5>
					<h6 class="heading-6">H6 - This is a small heading</h6>
				</div>

			</div>
		</div>

		<h3 class="heading-3 ui_sub_title">
			Paragraphs / semi bold/ Links
		</h3>
		<div class="ui_typography__content">
			<p><strong>Lorem ipsum</strong> odor amet, consectetuer adipiscing elit. Nec mi integer natoque faucibus turpis aptent class nulla. Laoreet sem sed dolor ut nascetur quisque turpis. Massa blandit efficitur aenean platea erat turpis praesent tellus. Habitasse donec habitasse; semper himenaeos lobortis metus. Efficitur nibh tincidunt volutpat mollis ultricies amet feugiat ultrices. Placerat integer euismod fusce egestas posuere.</p>
			<p><i>Lorem ipsum odor</i> amet, consectetuer adipiscing elit. Nec mi integer natoque faucibus turpis aptent class nulla. Laoreet sem sed dolor ut nascetur quisque turpis. Massa blandit efficitur aenean platea erat turpis praesent tellus. Habitasse donec habitasse; semper himenaeos lobortis metus. Efficitur nibh tincidunt volutpat mollis ultricies amet feugiat ultrices. Placerat integer euismod fusce egestas posuere.</p>
			<p> <a href="#">Lorem ipsum odor amet</a>, consectetuer adipiscing elit. Nec mi integer natoque faucibus turpis aptent class nulla. Laoreet sem sed dolor ut nascetur quisque turpis. Massa blandit efficitur aenean platea erat turpis praesent tellus. Habitasse donec habitasse; semper himenaeos lobortis metus. Efficitur nibh tincidunt volutpat mollis ultricies amet feugiat ultrices. Placerat integer euismod fusce egestas posuere.</p>
			<h4>List</h4>
			<h6>This is an example of a bulleted list:</h6>
			<ul>
				<li>Lorem ipsum</li>
				<li>Lorem ipsum</li>
				<li>Lorem ipsum</li>
				<li>Lorem ipsum</li>
			</ul>
			<h6>This is an example of a numbered list:</h6>
			<ol>
				<li>Lorem ipsum</li>
				<li>Lorem ipsum</li>
				<li>Lorem ipsum</li>
				<li>Lorem ipsum</li>
			</ol>
			<h4>Blockquotes</h4>
			<blockquote>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua”</blockquote>
		</div>
	</div>
</section>