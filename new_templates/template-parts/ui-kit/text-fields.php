<section class="ui-kit-inputs | section">
  <h1 class="heading-1">
    Text Fields
  </h1>

  <div class="mt-16">
    <form action="" class="display-flex column g-16">
      <div class="row">
        <div class="col-6 display-flex column g-16">
          <label class="text-field">
            <span class="text-field__label">Name</span>
            <input class="text-field__input" type="text" name="name" placeholder="Name..." />
          </label>

          <label class="text-field text-field--error">
            <span class="text-field__label">Email</span>
            <input class="text-field__input" type="email" name="email" placeholder="Email..." />
          </label>
        </div>

        <div class="col-6">
          <label class="text-field | height-full">
            <span class="text-field__label">Textarea</span>
            <textarea class="text-field__textarea | height-full" placeholder="Textarea..."></textarea>
          </label>
        </div>
      </div>

      <div class="mt-16">
        <input type="submit" value="Submit" class="button button--accent | display-inline-block"></input>
      </div>
    </form>
  </div>
</section>
