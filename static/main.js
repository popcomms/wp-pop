document.addEventListener("DOMContentLoaded", function() {

  function calcCaptcha () {
    const min = Math.ceil(1)
    const max = Math.floor(10)
    return Math.floor(Math.random() * (max - min) + min)
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // Prevent Enter key from submitting <form>

  const forms = document.querySelectorAll('form')
  forms.forEach(element => {
    element.addEventListener('submit', (event) => {
      console.log('Prevent Form Submission')
      event.preventDefault()
      window.history.back()
    })
  });

  gsap.registerPlugin(ScrollTrigger);

  Vue.component('contact-form', {
    data () {
      return {
        step: 1,
        form: null,
        captcha: {
          a: calcCaptcha(),
          b: calcCaptcha()
        },
        show: false
      }
    },
    computed: {

    },
    methods: {
      validationHighlight (el) {
        if (el === true) {
          return 'bg-pop-white'
        } else {
          return 'bg-pop-pink'
        }
      },
      hide () {
        this.show = false
        document.querySelector('body').style.overflow = 'auto'
        if (this.step === 8) {
          this.step = 0
          this.reset()
        }
      },
      nextStep () {
        const container = this.$refs.contactForm
        const heightContainer = container.clientHeight
        gsap.set(container, {height: heightContainer})

        const current = this.$refs['contactFormStep' + this.step]
        this.hideInput(current)
        this.hideText(current)
        this.hideEye(current)

        const next = this.$refs['contactFormStep' + (this.step + 1)]
        const eye = next.getElementsByClassName('eye-mask')
        const lines = next.getElementsByClassName('lines')
        gsap.set(eye, { scaleY: 0 })
        gsap.set(lines, {opacity: 0})

        if (this.step === 7) {
          const fingers = next.querySelectorAll('.finger')
          const hand = next.querySelectorAll('.hand')
          gsap.set(hand, {translateY: 100 + '%'})
          gsap.set(fingers, {translateY: 100 + '%'})
        }

        setTimeout(() => {
          this.step = this.step + 1
          const next = this.$refs['contactFormStep' + this.step]
          gsap.to(container, {
            duration: 0.5,
            height: 'auto',
            onComplete: () => {
              this.revealInput(next)
              this.revealText(next)
              if (next.getElementsByClassName('eye-mask').length !== 0) {
                this.revealEye(next)
              }
              if (this.step === 8) {
                this.revealFingers(next)
              }
            }
          })
        }, 500)
      },
      validateName (e) {
        if (this.form.name.value.length > 3) {
          this.form.name.valid = true

          if(e.keyCode === 13 && this.form.email.valid === true) {
            this.nextStep()
          }
        } else {
          this.form.name.valid = false
        }
      },
      validateEmail (e) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (re.test(this.form.email.value.toLowerCase())) {
          this.form.email.valid = true

          if(e.keyCode === 13 && this.form.name.valid === true) {
            this.nextStep()
          }
        } else {
          this.form.email.valid = false
        }
      },
      validateCompany (e) {
        if (this.form.company.value.length > 2) {
          this.form.company.valid = true
          if(e.keyCode === 13) {
            this.nextStep()
          }
        }
      },
      validateGDPR (e) {
        if (this.form.gdpr.one && this.form.gdpr.two) {
          this.nextStep()
        }
      },
      validateCaptcha (e) {
        if (this.captcha.a + this.captcha.b === parseInt(this.form.captcha.value)) {
          this.form.captcha.valid = true
          this.nextStep()
          setTimeout(() => {
            this.submit()
          }, 3000)
        } else {
          this.form.captcha.valid = false
        }
      },
      reset () {
        this.form = {
          id: 'contact',
          name: {
            valid: false,
            value: ''
          },
          email: {
            valid: false,
            value: ''
          },
          company: {
            valid: false,
            value: ''
          },
          phone: {
            valid: false,
            value: ''
          },
          message: '',
          newsletter: '',
          captcha: {
            valid: false,
            value: ''
          },
          gdpr: {
            one: false,
            two: false
          }
        }
      },
      submit () {
        const xhr = new XMLHttpRequest();
        const url = 'https://api.hsforms.com/submissions/v3/integration/submit/7620391/e9adc62c-c6d2-41ff-83a2-c777407f2dbe'

        const data = {
          "fields": [
            {
              "name": "email",
              "value": this.form.email.value
            },
            {
              "name": "firstname",
              "value": this.form.firstName.value
            },
            {
              "name": "lastname",
              "value": this.form.lastName.value
            },
            {
              "name": "company",
              "value": this.form.company.value
            },
            {
              "name": "phone",
              "value": this.form.phone.value
            },
            {
              "name": "message",
              "value": this.form.message
            }
          ],
          "context": {
            "hutk": getCookie('hubspotutk'),
            "pageUri": window.location.href,
            "pageName": document.title
          },
          "legalConsentOptions":{
            "consent":{
              "consentToProcess": this.form.gdpr.two,
              "text": "I agree to allow POPcomms to store and process my personal data.",
              "communications":[
                {
                  "value": this.form.gdpr.one,
                  "subscriptionTypeId": 1,
                  "text": "I agree to receive content from POPcomms."
                }
              ]
            }
          }
        }
      },
      revealInput (step) {
        const borders = step.getElementsByClassName('input-border')
        const guides = step.getElementsByClassName('input-guide')
        const inputs = step.querySelectorAll('.input-content')
        const text = step.querySelectorAll('h4')

        this.revealInputAnim(step, inputs, borders, guides, text)
      },
      hideInput (step) {
        const borders = step.getElementsByClassName('input-border')
        const guides = step.getElementsByClassName('input-guide')
        const inputs = step.querySelectorAll('.input-content')
        const text = step.querySelectorAll('h4')

        this.hideInputAnim(step, inputs, borders, guides, text)
      },
      hideText (step) {
        const text = step.getElementsByClassName('form-text')
        gsap.to(text, { duration: 0.5, translateY: -2.25 + 'rem', opacity: 0 })
      },
      revealText (step) {
        const text = step.getElementsByClassName('form-text')
        gsap.fromTo(text, {translateY: +2.25 + 'rem', opacity: 0}, {duration: 0.4, translateY: 0, opacity: 1})
      },
      hideEye (step) {
        const eye = step.getElementsByClassName('eye-mask')
        const lines = step.getElementsByClassName('lines')
        gsap.to(eye, { duration: 0.35, translateY: this.step > 1 ? 40 : 0, scaleY: 0 })
        gsap.to(lines, {duration: 0.35, opacity: 0})

        window.removeEventListener('mousemove', this.moveEye);
      },
      revealEye (step) {
        const eye = step.getElementsByClassName('eye-mask')
        const lines = step.getElementsByClassName('lines')
        gsap.to(eye, { duration: 0.35, scaleY: 1 })
        gsap.to(lines, {duration: 0.35, opacity: 1})
        if(this.step === 7) {
          gsap.to(eye, { duration: 0.35, delay: 1, translateY: 10, scaleY: 0.5 })
        }

        window.addEventListener('mousemove', this.moveEye, false);
      },
      revealFingers (step) {
        const fingers = step.querySelectorAll('.finger')
        const hand = step.querySelectorAll('.hand')
        gsap.to(fingers, { duration: 0.7, translateY: 0 + '%', stagger: 0.1, ease: Elastic.easeOut.config(1, 1) })
        gsap.to(hand, { duration: 0.3, translateY: 0 + '%', delay: 0.25 })
      },
      moveEye (evt) {
        const current = this.$refs['contactFormStep' + this.step]
        const iris = current.querySelector('.iris');
        const pupil = current.querySelector('.pupil');

        // var irisBB = current.querySelector('svg').getBoundingClientRect();
        // var irisTop = irisBB.top + irisBB.height / 2;
        // var irisLeft = irisBB.left + irisBB.width / 2;

        var svg = current.querySelector('.watching-eye').getBoundingClientRect();
        var irisTop = svg.top + svg.height / 2;
        var irisLeft = svg.left + svg.width / 2;

        
        const irisX = ((evt.screenX - irisLeft) / 5) + 247.653;
        const irisY = ((evt.screenY - irisTop) / 3) + 102;
        
        iris.setAttribute('cx', Math.min(400, Math.max(100, irisX)))
        iris.setAttribute('cy', Math.min(200, Math.max(50, irisY)))

        // var pupilBB = pupil.getBoundingClientRect();
        var pupilTop = svg.top + svg.height / 2;
        var pupilLeft = svg.left + svg.width / 2;

        const pupilX = ((evt.screenX - pupilLeft) / 4) + 247.5
        const pupilY = ((evt.screenY - pupilTop) / 2) + 100;

        pupil.setAttribute('cx', Math.min(450, Math.max(50, pupilX)))
        pupil.setAttribute('cy', Math.min(225, Math.max(25, pupilY)))
      },
      hideInputAnim (step, inputs, borders, guides, text) {
        gsap.timeline({})
        .to(borders, {duration: 0.5, width: 0 + '%'})
        .to(text, {duration: 0.5, opacity: 0}, "-0.5")
        .to(inputs, {duration: 0.5, translateY: -100 + '%', opacity: 1,  ease: "power3.in"}, "-=0.5")
        .to(guides, {duration: 0.3, opacity: 0,  ease: "power3.in"}, "-=0.3")
        .set(inputs, {translateY: 100 + '%'})
        .set(step, {pointerEvents: 'none'})
      },
      revealInputAnim (step, inputs, borders, guides, text) {
        gsap.timeline({})
        .to(borders, {duration: 0.5, width: 100 + '%'})
        .to(text, {duration: 0.5, opacity: 1}, "-0.5")
        .to(inputs, {duration: 0.5, translateY: 0 + '%', opacity: 1, ease: "power3.out"}, "-=0.5")
        .to(guides, {duration: 0.3, opacity: 1,  ease: "power3.in"}, "-=0.3")
        .set(step,{ pointerEvents: 'all'}, "-=0.01")
      },
    },
    created () {
      this.reset()
    },
    mounted () {
      window.addEventListener('mousemove', this.moveEye, false);
    }
  })

  Vue.component('download-form', {
    data () {
      return {
        step: 1,
        form: null,
        captcha: {
          a: calcCaptcha(),
          b: calcCaptcha()
        }
      }
    },
    computed: {
      getStepName () {
        return this.stepName[this.step]
      },
      getIntro () {
        if (this.step < 5) {
          return 'Your'
        } else {
          return 'All done!'
        }
      }
    },
    methods: {
      validationHighlight (el) {
        if (el === true) {
          return 'bg-pop-white'
        } else {
          return 'bg-pop-pink'
        }
      },
      nextStep () {
        const current = this.$refs['downloadFormStep' + this.step]
        this.hideInput (current)
        this.hideText(current)

        if (this.step === 6) {
          this.hideEye(current)
        }

        if (this.step === 5) {
          const next = this.$refs['downloadFormStep' + (this.step + 1)]
          const eye = next.getElementsByClassName('eye-mask')
          const lines = next.getElementsByClassName('lines')
          gsap.set(eye, { scaleY: 0 })
          gsap.set(lines, {opacity: 0})
        }

        setTimeout(() => {
          this.step = this.step + 1
          const next = this.$refs['downloadFormStep' + this.step]
          this.revealInput (next)
          this.revealText(next)
          if (this.step === 6) {
            this.revealEye(next)
          }
        }, 1000)
      },
      // prevStep () {
      //   if (this.step > 0 && this.step < 5 && this.downloadTl.paused() === true) {
      //     console.log('prev active')
      //     this.downloadTl.reverse()
      //     this.step -= 1
      //   } else if (this.step === 5 && this.downloadTl.paused() === true) {
      //     this.downloadTl.play('restartPoint')
      //     this.step = 1
      //   }
      // },
      validateFirstName (e) {
        if (this.form.firstName.value.length > 2) {
          this.form.firstName.valid = true
          if(e.keyCode === 13 && this.form.lastName.valid === true) {
            this.nextStep()
          }
        } else {
          this.form.firstName.valid = false
        }
      },
      validateLastName (e) {
        if (this.form.lastName.value.length > 2) {
          this.form.lastName.valid = true
          if(e.keyCode === 13 && this.form.firstName.valid === true) {
            this.nextStep()
          }
        } else {
          this.form.lastName.valid = false
        }
      },
      validateEmail (e) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (re.test(this.form.email.value.toLowerCase())) {
          this.form.email.valid = true
          if(e.keyCode === 13 && this.form.company.valid === true) {
            this.nextStep()
          }
        } else {
          this.form.email.valid = false
        }
      },
      validateCompany(e) {
        if (this.form.company.value.length > 2) {
          this.form.company.valid = true
          if(e.keyCode === 13 && this.form.email.valid === true) {
            this.nextStep()
          }
        } else {
          this.form.company.valid = false
        }
      },
      validateGDPR (e) {
        if (this.form.gdpr.one && this.form.gdpr.two) {
          this.nextStep()
        }
      },
      validateCaptcha (e) {
        if (this.captcha.a + this.captcha.b === parseInt(this.form.captcha.value)) {
          this.form.captcha.valid = true
          this.nextStep()
          this.submit()
        } else {
          this.form.captcha.valid = false
        }
      },
      reset () {
        this.form = {
          id: 'download',
          firstName: {
            value: '',
            valid: false
          },
          lastName: {
            value: '',
            valid: false
          },
          email: {
            value: '',
            valid: false
          },
          company: {
            value: '',
            valid: false
          },
          newsletter: '',
          captcha: {
            valid: false,
            value: ''
          },
          gdpr: {
            one: false,
            two: false
          }
        }
      },
      revealInput(step) {
        const borders = step.getElementsByClassName('input-border')
        const guides = step.getElementsByClassName('input-guide')
        const inputs = step.querySelectorAll('.input-content')

        if (this.downloadTl.reversed()) {
          this.hideInputAnim(step, inputs, borders, guides)
        } else {
          this.revealInputAnim(step, inputs, borders, guides)
        }
      },
      hideInput(step) {
        const borders = step.getElementsByClassName('input-border')
        const guides = step.getElementsByClassName('input-guide')
        const inputs = step.querySelectorAll('.input-content')

        if (this.downloadTl.reversed()) {
          this.revealInputAnim(step, inputs, borders, guides)
        } else {
          this.hideInputAnim(step, inputs, borders, guides)
        }
      },
      hideText (step) {
        const text = step.getElementsByClassName('form-text')
        gsap.to(text, { duration: 0.5, translateY: -2.25 + 'rem', opacity: 0 })
      },
      revealText (step) {
        const text = step.getElementsByClassName('form-text')
        gsap.fromTo(text, {translateY: +2.25 + 'rem', opacity: 0}, {duration: 0.4, translateY: 0, opacity: 1})
      },
      hideEye (step) {
        const eye = step.getElementsByClassName('eye-mask')
        const lines = step.getElementsByClassName('lines')
        gsap.to(eye, { duration: 0.35, translateY: this.step > 1 ? 40 : 0, scaleY: 0 })
        gsap.to(lines, {duration: 0.35, opacity: 0})

        window.removeEventListener('mousemove', this.moveEye);
      },
      revealEye (step) {
        const eye = step.getElementsByClassName('eye-mask')
        const lines = step.getElementsByClassName('lines')
        gsap.to(eye, { duration: 0.35, scaleY: 1 })
        gsap.to(lines, {duration: 0.35, opacity: 1})
        if(this.step === 7) {
          gsap.to(eye, { duration: 0.35, delay: 1, translateY: 10, scaleY: 0.5 })
        }

        window.addEventListener('mousemove', this.moveEye, false);
      },
      moveEye (evt) {
        const current = this.$refs['downloadFormStep' + this.step]
        const iris = current.querySelector('.iris');
        const pupil = current.querySelector('.pupil');

        // var irisBB = current.querySelector('svg').getBoundingClientRect();
        // var irisTop = irisBB.top + irisBB.height / 2;
        // var irisLeft = irisBB.left + irisBB.width / 2;

        var svg = current.querySelector('.watching-eye').getBoundingClientRect();
        var irisTop = svg.top + svg.height / 2;
        var irisLeft = svg.left + svg.width / 2;

        
        const irisX = ((evt.screenX - irisLeft) / 5) + 247.653;
        const irisY = ((evt.screenY - irisTop) / 3) + 102;
        
        iris.setAttribute('cx', Math.min(400, Math.max(100, irisX)))
        iris.setAttribute('cy', Math.min(200, Math.max(50, irisY)))

        // var pupilBB = pupil.getBoundingClientRect();
        var pupilTop = svg.top + svg.height / 2;
        var pupilLeft = svg.left + svg.width / 2;

        const pupilX = ((evt.screenX - pupilLeft) / 4) + 247.5
        const pupilY = ((evt.screenY - pupilTop) / 2) + 100;

        pupil.setAttribute('cx', Math.min(450, Math.max(50, pupilX)))
        pupil.setAttribute('cy', Math.min(225, Math.max(25, pupilY)))
      },
      hideInputAnim (step, inputs, borders, guides) {
        gsap.timeline({
        })
        .to(borders, {duration: 0.5, width: 0 + '%'})
        .to(inputs, {duration: 0.5, translateY: -100 + '%', opacity: 1,  ease: "power3.in"}, "-=0.5")
        .to(guides, {duration: 0.3, opacity: 0,  ease: "power3.in"}, "-=0.3")
        .set(inputs, {translateY: 100 + '%'})
        .set(step, {pointerEvents: 'none'})
      },
      revealInputAnim (step, inputs, borders, guides) {
        gsap.timeline({
        })
        .to(borders, {duration: 0.5, width: 100 + '%'})
        .to(inputs, {duration: 0.5, translateY: 0 + '%', opacity: 1, ease: "power3.out"}, "-=0.5")
        .to(guides, {duration: 0.3, opacity: 1,  ease: "power3.in"}, "-=0.3")
        .set(step,{ pointerEvents: 'all'}, "-=0.01")
      },
      submit () {
        const xhr = new XMLHttpRequest();
        const url = 'https://api.hsforms.com/submissions/v3/integration/submit/7620391/a80eef42-8cb7-432d-ad17-a1cb3d1ee17c'

        const data = {
          "fields": [
            {
              "name": "email",
              "value": this.form.email.value
            },
            {
              "name": "firstname",
              "value": this.form.firstName.value
            },
            {
              "name": "lastname",
              "value": this.form.lastName.value
            },
            {
              "name": "company",
              "value": this.form.company.value
            }
          ],
          "context": {
            "hutk": getCookie('hubspotutk'),
            "pageUri": window.location.href,
            "pageName": document.title
          },
          "legalConsentOptions":{
            "consent":{
              "consentToProcess": this.form.gdpr.two,
              "text": "I agree to allow POPcomms to store and process my personal data.",
              "communications":[
                {
                  "value": this.form.gdpr.one,
                  "subscriptionTypeId": 1,
                  "text": "I agree to receive content from POPcomms."
                }
              ]
            }
          }
        }

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
          if(xhr.readyState == 4 && xhr.status == 200) {
              console.log(xhr.responseText); // Returns a 200 response if the submission is successful.
          } else if (xhr.readyState == 4 && xhr.status == 400){
              console.log(xhr.responseText); // Returns a 400 error the submission is rejected.
          } else if (xhr.readyState == 4 && xhr.status == 403){
              console.log(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.
          } else if (xhr.readyState == 4 && xhr.status == 404){
              console.log(xhr.responseText); //Returns a 404 error if the formGuid isn't found
          }
        }
        xhr.send(JSON.stringify(data))
      }
    },
    created () {
      this.reset()
      console.log(this.form.company)
    },
    mounted () {
      gsap.set(this.$refs.steps, {pointerEvents: 'none'})

      this.downloadTl = gsap.timeline({ paused: true })
      // Show form
      .to(this.$refs.form_bg,{left: 0, duration: 0.4})
      .addLabel('restartPoint')
      .set(this.$refs.steps,{ pointerEvents: 'all' })
      .to([".download-steps", ".download-back"], {opacity: 1,duration: 0.3})
      .fromTo(
        this.$refs.step_1,
        {
          opacity: 0,
          pointerEvents: 'none'
        },
        {
          pointerEvents: 'all',
          opacity: 1,
          duration: 0.3
        }
      )
      .addPause()
      // Change step 1 -> 2
      .to(this.$refs.step_1, {duration: 0.3, opacity: 0, pointerEvents: 'none'})
      .call( this.revealInput, [this.$refs.step_2], "+=0.6" )
      .addPause("+=0.2")
      // Change step 2 -> 3
      .call( this.hideInput, [this.$refs.step_2], "+=0.1" )
      .call( this.revealInput, [this.$refs.step_3], "+=0.6" )
      .addPause("+=0.2")
      // Change step 3 -> 4
      .call( this.hideInput, [this.$refs.step_3], "+=0.1" )
      .call( this.revealInput, [this.$refs.step_4], "+=0.6" )
      .addPause("+=0.2")
      // Change step 4 -> 5
      .call( this.hideInput, [this.$refs.step_4], "+=0.1" )
      .fromTo(
        this.$refs.step_5,
        {
          opacity: 0,
          pointerEvents: 'none'
        },
        {
          pointerEvents: 'all',
          opacity: 1,
          duration: 0.3
        },
        "+=0.6"
      )
      // Stop before end so can reverse
      .addPause()
    }
  })

  Vue.component('MainMenu', {
    data () {
      return {
        test: 'test',
        menuActive: false,
        activeChild: '',
        showMenuTl: gsap.timeline({ paused: true }),
      }
    },
    methods:{
      toggleMenu (item) {
        if (this.menuActive) {
          this.menuActive = false
          document.querySelector('body').style.overflow = 'auto'
          this.activeChild = ''
        } else {
          this.menuActive = true
          document.querySelector('body').style.overflow = 'hidden'
          this.activeChild = item
        }
      },
      showContactForm () {
        const vueComponents = this.$parent
        vueComponents.$children.forEach((element) => {
          if (element.$el.id === 'contact-form') {
            element.show = true
          }
        })
        document.querySelector('body').style.overflow = 'hidden'
      },
      // hideContactForm () {
      //   const vueComponents = this.$parent
      //   console.log(vueComponents)
      //   vueComponents.$children.forEach((element) => {
      //     if (element.$el.id === 'contact-form') {
      //       element.show = false
      //       if (target.step === 8) {
      //         element.step = 0
      //         element.reset()
      //       }
      //     }
      //   })
      // },
      changeSubMenu (item) {
        this.activeChild = item
      },
      enterMenu () {
        this.showMenuTl.play()
        gsap.timeline({})
        .to(this.$refs.menuContainer, { duration: 0.3, opacity: 1, pointerEvents: 'auto' })
      },
      leaveMenu (el, done) {
        gsap.timeline({})
        .to(this.$refs.menuContainer, { opacity: 0, pointerEvents: 'none', duration: 0.3 })
      }
    },
    mounted () {
      const $ = (s, o = document) => o.querySelector(s);
      const $$ = (s, o = document) => o.querySelectorAll(s);

      $$('.sub-item-container').forEach(el => el.addEventListener('mouseenter', function(e) {
        let container = this.querySelectorAll('.sub-item')

        container.forEach(element => {
          // gsap.fromTo(element.children[1], {textShadow: '0px 0px 0 transparent, 0px 0px 0 transparent, 0px 0px 0 transparent, 0px 0px 0 transparent'}, {duration: 0.5, color: '#2D2D2D', textShadow: '-1px -1px 0 #F8F7EE, 1px -1px 0 #F8F7EE, -1px 1px 0 #F8F7EE, 1px 1px 0 #F8F7EE'})
          // gsap.fromTo(element.children[1], {}, {duration: 0.5, color: '#2D2D2D', })
        });
      }));
      $$('.sub-item-container').forEach(el => el.addEventListener('mouseleave', function(e) {
        let container = this.querySelectorAll('.sub-item')

        container.forEach(element => {
          // gsap.to(element.children[1], {duration: 0.5, color: '#F8F7EE', textShadow: '0px 0px 0 #F8F7EE'})
        });
      }));

      $$('.sub-item').forEach(el => el.addEventListener('mousemove', function(e) {
        const pos = this.getBoundingClientRect();
        const mx = e.clientX - pos.left - pos.width/2;
        const my = e.clientY - pos.top - pos.height/2;
        gsap.to(this, {duration: 0.5, x: mx * 0.15 +'px', y: my * 0.3 + 'px' })
        gsap.to(this.children[1], {duration: 0.5, x: mx * 0.025 +'px', y: my * 0.075 + 'px', color: '#FF0088'})
      }));

      $$('.sub-item').forEach(el => el.addEventListener('mouseenter', function(e) {
        // gsap.to(this.children[2], {duration: 0.5, width: 100 + '%'})
        gsap.fromTo(this.children[0], {opacity: 0}, {duration: 0.5, opacity: 1})
        // const feDisplacementMapEl = this.querySelector('feDisplacementMap');
        // const feTurbulenceEl = this.querySelector('feTurbulence');
        // gsap.fromTo(feDisplacementMapEl, { attr: {scale: 250}}, {duration: 1, attr: {scale: 0}, ease: Quad.easeOut})
        // gsap.fromTo(feTurbulenceEl, { attr: {baseFrequency: 0.007}}, {duration: 1, attr: {baseFrequency: 0}, ease: Quad.easeOut})
      }));

      $$('.sub-item').forEach(el => el.addEventListener('mouseleave', function() {
        gsap.to(this, {duration: 0.5, x: 0, y: 0})
        gsap.to(this.children[1], {duration: 0.5, x: 0, y: 0, color: '#F8F7EE'})
        // gsap.to(this.children[2], {duration: 0.5, width: 0 + '%'})
        // const feDisplacementMapEl = this.querySelector('feDisplacementMap');
        // gsap.to(feDisplacementMapEl, {duration: 0.5, attr: {scale: 100}, ease: Quad.easeOut})

        // const feTurbulenceEl = this.querySelector('feTurbulence');
        // gsap.to(feTurbulenceEl, {duration: 0.5, attr: {baseFrequency: 0.007}, ease: Quad.easeOut})
        gsap.to(this.children[0], {duration: 0.5, opacity: 0})
      }));


    }
  })

  new Vue({
    el: document.getElementById('site-wrapper')
  })

  // new Vue({
  //   el: document.getElementById('header')
  // })

  // Apply highlight color to text
  const problems = document.querySelectorAll('.problems-list__item');
  if (problems.length > 0) {
    const accentColor = getComputedStyle(problems[0]).borderColor;
    problems.forEach(element => {
      element.querySelectorAll('strong').forEach(e => {
        e.style.color = accentColor
      });
    });
  }

  // Scroll to
  const scrollButtons = document.querySelectorAll('.scroll-button')
  for (var i = 0; i < scrollButtons.length; i++) {
    scrollButtons[i].addEventListener('click', function () {
      el = document.getElementById('content');
      var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        left: 0,
        top: rect.top + scrollTop,
        behavior: 'smooth'
      })
    })
  }

  const pageScrollButtons = document.querySelectorAll('.scroll-button-page')
  for (var i = 0; i < pageScrollButtons.length; i++) {
    pageScrollButtons[i].addEventListener('click', function () {
      el = document.querySelector('.pop-container');
      var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        left: 0,
        top: rect.top + scrollTop,
        behavior: 'smooth'
      })
    })
  }


  const magnifyImage = document.querySelectorAll('.image-magnify');
  for (var i = 0; i < magnifyImage.length; i++) {
    let index = i
    console.log(magnifyImage[0])
    magnifyImage[index].addEventListener("click", function() {
      let popup = magnifyImage[index].closest('.image-container').querySelector('.full-width-image-popup');
      popup.style.display = "block";
      gsap.to(popup, { duration: 0.3, opacity: 1 })
    })
  }

  const hideImage = document.querySelectorAll('.image-hide');
  for (var i = 0; i < hideImage.length; i++) {
    let index = i
    hideImage[index].addEventListener("click", function() {
        let popup = hideImage[index].closest('.image-container').querySelector('.full-width-image-popup');
        gsap.to(popup, { duration: 0.3, opacity: 0, onComplete: function(){
        popup.style.display = "none";
      }})
    })
  }

  // Social Media Sharing

  function shareFB(url){
    const link = 'https://www.facebook.com/sharer/sharer.php?u=' + url + '&t=your message';
    window.open(link, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    return false;
  }

  function shareTwitter(url){
    const link = 'https://twitter.com/intent/tweet?url=' + url + '&via=getboldify&text=yourtext';
    TwitterWindow = window.open(link, 'TwitterWindow', width=600, height=300);
    return false;
  }

  function shareLinkedin(url){
    const link = 'https://plus.google.com/share?url=' + url;
    window.open(link, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=350,width=480');
    return false;
  }

  // const highlights = problems.getElementsByTagName('strong');
  // console.log(highlights)
  // gsap.set(".section__title", {
  //   y: 100,
  //   opacity: 0,
  // })
  // gsap.set(".section__item", {
  //   y: 100,
  //   opacity: 0,
  // })

  // gsap
  // .timeline({
  //   scrollTrigger: {
  //     trigger: ".section",
  //     toggleActions: "play none none none"
  //   },
  // })
  // .to(
  //   ".section__title",
  //   {
  //     y: 0,
  //     opacity: 1,
  //     duration: 0.75
  //   }
  // )
  // .to(
  //   ".section__item",
  //   {
  //     y: 0,
  //     opacity: 1,
  //     duration: 1,
  //     stagger: 0.5
  //   },
  //   "-=0.5"
  // );


})

