Hey, this is a readme file for the UI kit.

1. Colors
To start with color please open theme.json and add new color to the palette.
Just use the example of other colors.

{
	"version": 1,
	"settings": {
		"color": {
			"background": false,
			"link": true,
			"text": true,
			"palette": [
				{
					"slug": "primary",
					"color": "#1e73be",
					"name": "Primary"
				},
				{
					"slug": "secondary",
					"color": "#222222",
					"name": "Secondary"
				},
				{
					"slug": "accent",
					"color": "#e65f78",
					"name": "Accent"
				}
			]
		}
	}
}

2. Typography

To add new font, please open theme.json and add new font to the font-families array.
Just use the example of other fonts.

Classes for typography are in src/scss/ui/typography.scss

3. Buttons

Default are button primary, secondary, primary outline and secondary outline + default text button.
You can remove outlines if necessary
Classes for buttons are in src/scss/ui/buttons.scss

4. Forms

Default are form input, form textarea, form select, form checkbox and form radio.
Classes for forms are in src/scss/ui/forms.scss

In most cases we use CF7 forms, so you can use default form with classes:
.wpcf7
.wpcf7-response-output
.wpcf7-form
.wpcf7-form-control
.wpcf7-form-control-wrap

Please install Contact Form 7 plugin to see the form on the UI KIT page

