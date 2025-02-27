(function() {
	
	var selector = '[data-form="generic"]';
	
	var elements = document.querySelectorAll(selector);
	
	var bouncerInstance;
	
	var allowSubmit = true;
	
	var formRowErrorClass = 'm-form__row--error';
	
	if (!elements.length) return;
	
	var settings = {
		disableSubmit: true,
		messageAfterField: false,
		fieldClass: 'is-error',
		errorClass: 'm-error-message',
		customValidations: {
			isGenericRequired: function(field) {
				
				return field.hasAttribute('data-form-required') && field.value === '';
		
			}
		},
		messages: {
			isGenericRequired: function(field, settings) {
				
				var message = (field.hasAttribute('data-form-required') && field.getAttribute('data-form-required') !== '') ? field.getAttribute('data-form-required') : 'Please fill out this field.';
				return message;
				
			},
			missingValue: {
				email: 'Please enter a valid email address'
			}
		}
	};
	
	bouncerInstance = new Bouncer(selector, settings);
	
	document.addEventListener('bouncerShowError', function (event) {
	
		var field = event.target;
		var formRow = field.closest('.m-form__row');
		if (formRow) formRow.classList.add(formRowErrorClass);
		
	}, false);
	
	document.addEventListener('bouncerRemoveError', function (event) {
	
		var field = event.target;
		var formRow = field.closest('.m-form__row');
		if (formRow) formRow.classList.remove(formRowErrorClass);
		
	}, false);
	
	document.addEventListener('click', function (e) {
	
		var clickedElement = e.target;
		var isFormButtonElement = clickedElement.matches('[data-form-button]');
		if (isFormButtonElement) handleClick(clickedElement);
		
	});
	
	function handleClick(element) {
		
		var form = element.closest('[data-form]');
		if (!form) return;
		
		hideMessages(form);
		
		var errors = bouncerInstance.validateAll(form);
		
		if (
			errors.length ||
			!allowSubmit
		) {
			
			return;
			
		}
		
		allowSubmit = false;
		showLoading(form);
		
		var formObject = serializeAsObject(form);
		formObject.action = 'site_form';
		
		var data = new FormData();
		for (var name in formObject) { data.append(name, formObject[name]); }
		
		fetch('/wp-admin/admin-ajax.php', {
			method: 'POST',
			credentials: 'same-origin',
			body: data
		}).then(function (response) {
		
			if (response.ok) {
		
				return response.json();
		
			} else {
		
				throw new Error(response);
				allowSubmit = true;
				hideLoading(element);
		
			}
		
		}).then(function (response) {
			
			if (response.success) {
				
				clearForm(form);
				showSuccessMessage(form, response.success_message);
				
			} else {
				
				showErrorMessage(form);
				
			}
		
			allowSubmit = true;
			hideLoading(form);
		
		});
		
	}
	
	function hideMessages(element) {
		
		var existingMessage = element.querySelector('[data-form-message]');
		if (existingMessage) existingMessage.remove();
		
	}
	
	function showLoading(element) {
		
		var button = element.querySelector('button[type="submit"]');
		if (button) button.classList.add('m-button--loading');
		
	}
	
	function hideLoading(element) {
		
		var button = element.querySelector('button[type="submit"]');
		if (button) button.classList.remove('m-button--loading');
		
	}
	
	function serializeAsObject(element) {
		
		var serialized = {
			'action': ''
		};
		
		var elements = element.querySelectorAll('input, select, textarea');
		
		var typesToIgnore = [
			'file',
			'reset',
			'submit',
			'button'
		];
		
		for (var i = 0; i < elements.length; i++) {
			(function (i) {
				
				var field = elements[i];
				
				if (
					field.name &&
					!field.disabled &&
					typesToIgnore.indexOf(field.type) <= 0
				) {
				
					if (field.type === 'select-multiple') {
					
						for (var j = 0; j < field.options.length; j++) {
					
							if (!field.options[j].selected) continue;
							serialized[field.name] = field.options[j].value;
								
						}
					
					} else if (
						(field.type !== 'checkbox' && field.type !== 'radio') ||
						field.checked
					) {
					
						serialized[field.name] = field.value;
					
					}
					
				}
			
			}).call(this, i);
		}
		
		return serialized;
		
	}
	
	function showSuccessMessage(element, message) {
		
		element.insertAdjacentHTML('beforeend', '<div class="m-success-message m-success-message--standalone" data-form-message><div class="m-success-message__inner"><span role="status">' + message + '</span></div></div>');
		
	}
	
	function showErrorMessage(element) {
		
		element.insertAdjacentHTML('beforeend', '<div class="m-error-message m-error-message--standalone" data-form-message><div class="m-error-message__inner"><span role="status">Sorry!  Something went wrong</span></div></div>');
		
	}
	
	function clearForm(element) {
		
		var elements = element.querySelectorAll('input, textarea');
		
		for (var i = 0; i < elements.length; i++) {
			(function (i) {
		
				if (elements[i].getAttribute('type') === 'hidden') {
			
					// do nothing, we don't want to clear nonce etc
			
				} else if (elements[i].getAttribute('type') === 'checkbox') {
			
					elements[i].checked = false;
			
				} else {
			
					elements[i].value = '';
			
				}
				
			}).call(this, i);
		}
		
		var turnstileElement = element.querySelector('.cf-turnstile');
		if (!turnstileElement) return;
		turnstile.reset(turnstileElement);
		
	}
	
})();