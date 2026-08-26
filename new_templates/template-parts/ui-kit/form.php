<section class="section">
	<div class="container">

		<?php if ( function_exists( 'wpcf7_contact_form' ) ) : ?>

			<h2 class="heading-2">
				Contact form 7
			</h2>


			<p>- please ensure you have all required fields in the form:
					- checkbox
					- dropdown
					- submit button
					- name field
					- email field
					- phone field
					- message field</p>

	
			<?php echo do_shortcode('[contact-form-7 id="4bcb12a" title="Contact form 1"]'); ?>
			
			<?php else : ?>


				<h2 class="heading-2">
					Default form
				</h2>

				<p>- please ensure you have all required fields in the form:
					- checkbox
					- dropdown
					- submit button
					- name field
					- email field
					- phone field
					- message field</p>

				<form action="" class="">
					<div class="row">
						<div class="col col-4 col-md-8 col-lg-4">
							<div class="form_row">
								<div class="form_input">
									<div class="form_input__field">
										<label class="form_input__label" for="ui_name">Name</label>
										<input class="form_input__element" type="text" id="ui_name" placeholder="Name">
									</div>
								</div>
							</div>
						</div>
						<div class="col col-4 col-md-8 col-lg-4">
							<div class="form_row">
								<div class="form_input">
									<div class="form_input__field">
										<label class="form_input__label" for="ui_mail">Email</label>
										<input class="form_input__element" type="mail" id="ui_mail" placeholder="Email">
									</div>
								</div>
							</div>
						</div>
						<div class="col col-4 col-md-8 col-lg-4">
							<div class="form_row">
								<div class="form_input">
									<div class="form_input__field">
										<label class="form_input__label" for="ui_pass">Password</label>
										<input class="form_input__element" type="password" id="ui_pass" placeholder="Password">
									</div>
								</div>
							</div>
						</div>

						<div class="col col-6 col-md-8 col-lg-4">
							<div class="form_textarea">
								<label class="form_textarea__label" for="textarea_1">Default textarea</label>
								<div class="form_textarea__field">
									<textarea class="form_textarea__element" placeholder="Placeholder"></textarea>
								</div>
							</div>
						</div>

						<div class="col col-6 col-md-8 col-lg-4">
							<div class="form_select">
								<label class="form_select__label" for="select_1">Default select 1</label>
								<div class="form_select__field">
									<select class="form_select__element">
										<option value='{"title":"item"}'>item</option>
										<option value='{"title":"value"}'>value</option>
										<option value='{"title":"hello"}'>hello</option>
									</select>
								</div>
							</div>
						</div>

						<div class="col col-6 col-md-8 col-lg-4">
							<div class="form_checkbox">
								<label class="form_checkbox__block">
									<input class="form_checkbox__element" checked type="checkbox"><span class="form_checkbox__label">checkbox label 1</span>
								</label>
							</div>
							<div class="form_checkbox">
								<label class="form_checkbox__block">
									<input class="form_checkbox__element" type="checkbox"><span class="form_checkbox__label">checkbox label 2</span>
								</label>
							</div>
						</div>

						<div class="col col-6 col-md-8 col-lg-4">
							<div class="form_row">
								<div class="form_radio">
									<label class="form_radio__block">
										<input class="form_radio__element" type="radio" checked name="radio_1"><span class="form_radio__label">radio label 1</span>
									</label>
								</div>

								<div class="form_radio">
									<label class="form_radio__block">
										<input class="form_radio__element" type="radio" name="radio_1"><span class="form_radio__label">radio label 2</span>
									</label>
								</div>

								<div class="form_radio">
									<label class="form_radio__block">
										<input class="form_radio__element" type="radio" name="radio_1"><span class="form_radio__label">radio label 3</span>
									</label>
								</div>
							</div>
						</div>

					</div>
				</form>

				<div class="wpcf7">
					<form class="invalid">
						<div class="wpcf7-response-output" aria-hidden="true">One or more fields have an error. Please check and try again.</div>
					</form>
				</div>

				<div class="wpcf7">
					<form class="failed">
						<div class="wpcf7-response-output" aria-hidden="true">One or more fields have an error. Please check and try again.</div>
					</form>
				</div>

				<div class="wpcf7">
					<form class="sent">
						<div class="wpcf7-response-output" aria-hidden="true">Your message has been sent. Thank you.</div>
					</form>
				</div>


		<?php endif; ?>

	</div>
</section>