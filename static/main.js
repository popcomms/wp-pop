document.addEventListener("DOMContentLoaded", function() {

  const hubspotKey = '8cfb74b2-b064-4d13-90fb-88713f582f81';

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
          a: this.calcCaptcha(),
          b: this.calcCaptcha()
        },
        valid: false
      }
    },
    methods: {
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

        setTimeout(() => {
          this.step = this.step + 1
          const next = this.$refs['contactFormStep' + this.step]
          gsap.to(container, {duration: 0.5, height: 'auto', onComplete: () => {
            this.revealInput(next)
            this.revealText(next)
            this.revealEye(next)
          }
          })
          // this.revealInput(next)
        }, 500)
        // if (this.contactTl.paused() === true) {
        //   this.contactTl.tweenFromTo(`${this.step}`, `${this.step + 1}`)
        //   this.step += 1
        // }
      },
  //     prevStepContact () {
  //       if (this.step > 0 && this.contactTl.paused() === true) {
  //         this.contactTl.reverse()
  //         this.step -= 1
  //       }
  //     },
      calcCaptcha () {
        const min = Math.ceil(1)
        const max = Math.floor(10)
        return Math.floor(Math.random() * (max - min) + min)
      },
      validateName (e) {
        if (this.form.name.value.length > 3) {
          this.form.name.valid = true
        }
      },
      validateEmail (e) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (re.test(this.form.email.value.toLowerCase())) {
          this.form.email.valid = true
          this.nextStep()
        } else {
          this.form.email.valid = false
        }
      },
      validateCompany (e) {
        if (this.form.company.value.length > 2) {
          this.form.company.valid = true
          this.nextStep()
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
            valid: null,
            value: ''
          },
          email: {
            valid: null,
            value: ''
          },
          company: {
            valid: null,
            value: ''
          },
          phone: {
            valid: null,
            value: ''
          },
          message: '',
          newsletter: '',
          captcha: {
            valid: null,
            value: ''
          },
          gdpr: {
            one: false,
            two: false
          }
        }
        // this.$refs.contactForm.reset()
      },
      submit () {
        this.$refs.contactForm.submit()
      },
      revealInput (step) {
        const borders = step.getElementsByClassName('input-border')
        const guides = step.getElementsByClassName('input-guide')
        const inputs = step.querySelectorAll('.input-content')
        const text = step.querySelectorAll('h4')

        // if (this.contactTl.reversed()) {
        //   this.hideInputAnim(step, inputs, borders, guides, text)
        // } else {
          this.revealInputAnim(step, inputs, borders, guides, text)
        // }
      },
      hideInput (step) {
        const borders = step.getElementsByClassName('input-border')
        const guides = step.getElementsByClassName('input-guide')
        const inputs = step.querySelectorAll('.input-content')
        const text = step.querySelectorAll('h4')

        // if (this.contactTl.reversed()) {
        //   this.revealInputAnim(step, inputs, borders, guides, text)
        // } else {
          this.hideInputAnim(step, inputs, borders, guides, text)
        // }
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
        gsap.to(eye, { duration: 0.35, scaleY: 0 })
        gsap.to(lines, {duration: 0.35, opacity: 0})

        window.removeEventListener('mousemove', this.moveEye); 
      },
      revealEye (step) {
        const eye = step.getElementsByClassName('eye-mask')
        const lines = step.getElementsByClassName('lines')
        gsap.to(eye, { duration: 0.35, scaleY: 1 })
        gsap.to(lines, {duration: 0.35, opacity: 1})
        if(this.step === 7) {
          gsap.to(eye, { duration: 0.35, transformOrigin: '50% 32%', delay: 1, scaleY: 0.5 })
        }

        window.addEventListener('mousemove', this.moveEye, false);          
      },
      moveEye (evt) {
        const current = this.$refs['contactFormStep' + this.step]
        const iris = current.querySelector('.iris');
        const pupil = current.querySelector('.pupil');

        const x = -(window.innerWidth / 2 - evt.pageX) / 10;
        const y = -(window.innerHeight / 2 - evt.pageY) / 10;

        iris.setAttribute('cx', 247.653 - 20 + x)
        iris.setAttribute('cy', 121.806 + y)
        pupil.setAttribute('cx', 244.924 + x)
        pupil.setAttribute('cy', 78.2744 + y)
      },
  //     restartTL () {
  //       this.contactTl.tweenFromTo(`${this.step}`, "0")
  //       console.log('restart')
  //       this.step = 0
  //     },
  //     // leaveTL () {
  //     //   for (let i = 0; i < this.step; i++) {
  //     //     this.contactTl.reverse()
  //     //   }
  //     //   this.step = 0
  //     // },
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
      console.log(this.$refs.contactForm)
      window.addEventListener('mousemove', this.moveEye, false);  
      // this.movingEye()
  //     gsap.set(this.$refs.steps, {pointerEvents: 'none'})

  //     this.contactTl = gsap.timeline({ paused: true })
  //     // Show form

  //     .addLabel("0")
  //     .set(this.$refs.steps, {opacity: 1})
  //     .to(this.$refs.form_bg,{opacity: 1, duration: 0.4})
  //     .set(this.$refs.steps,{ pointerEvents: 'all' })
  //     .to([".contact-steps", ".contact-back"], {opacity: 1,duration: 0.3})
  //     .fromTo(
  //       this.$refs.step_1,
  //       {
  //         opacity: 0,
  //         pointerEvents: 'none'
  //       },
  //       {
  //         pointerEvents: 'all',
  //         opacity: 1,
  //         duration: 0.3
  //       }
  //     )
  //     // .addPause()
  //     .addLabel("1")
  //     // Change step 1 -> 2
  //     .to(this.$refs.step_1, {duration: 0.3, opacity: 0, pointerEvents: 'none'})
  //     .to(this.$refs.step_2.querySelectorAll('h4'), {duration: 0.3, opacity: 1})
  //     .call( this.revealInput, [this.$refs.email_input], "-=0.3" )
  //     // .addPause("+=0.2")
  //     .addLabel("2")
  //     // switch inputs
  //     .call( this.hideInput, [this.$refs.email_input], "+=0.1" )
  //     // .to(this.$refs.email_text, {duration: 0.3, color: this.baseColor})
  //     .call( this.revealInput, [this.$refs.name_input], "+=0.3" )
  //     // .to(this.$refs.name_text, {duration: 0.3, color: this.highlightColor})
  //     // .addPause("+=0.2")
  //     .addLabel("3")
  //     // Change step 2 -> 3
  //     .to(this.$refs.step_2.querySelectorAll('h4'), {duration: 0.3, opacity: 0})
  //     .call( this.hideInput, [this.$refs.name_input], "-=0.29" )
  //     .fromTo(
  //       this.$refs.step_3,
  //       {
  //         opacity: 0,
  //         pointerEvents: 'none'
  //       },
  //       {
  //         pointerEvents: 'all',
  //         opacity: 1,
  //         duration: 0.3
  //       },
  //       "+=0.6"
  //     )
  //     // Stop before end so can reverse
  //     // .addPause()
  //     .addLabel("4")
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
      nextStep () {
        const current = this.$refs['downloadFormStep' + this.step]
        this.hideInput (current)
        setTimeout(() => {
          this.step = this.step + 1
          const next = this.$refs['downloadFormStep' + this.step]
          this.revealInput (next)
        }, 1000)
      },
      prevStep () {
        if (this.step > 0 && this.step < 5 && this.downloadTl.paused() === true) {
          console.log('prev active')
          this.downloadTl.reverse()
          this.step -= 1
        } else if (this.step === 5 && this.downloadTl.paused() === true) {
          this.downloadTl.play('restartPoint')
          this.step = 1
        }
      },
      validateFirstName () {
        if (this.form.firstName.value.length > 2) {
          this.form.firstName.valid = true
        } else {
          this.form.firstName.valid = false
        }
      },
      validateLastName () {
        this.validateFirstName()
        if (this.form.lastName.value.length > 2) {
          this.form.lastName.valid = true
        } else {
          this.form.lastName.valid = false
        }
        if (this.form.firstName.valid && this.form.lastName.valid) {
          this.nextStep()
        }
      },
      validateEmail (e) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (re.test(this.form.email.value.toLowerCase())) {
          this.form.email.valid = true
        } else {
          this.form.email.valid = false
        }
      },
      validateCompany(e) {
        if (this.form.company.value.length > 2) {
          this.form.company.valid = true
        }
        if (this.form.email.valid && this.form.company.valid) {
          this.nextStep()
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
            valid: null
          },
          lastName: {
            value: '',
            valid: null
          },
          email: {
            value: '',
            valid: null
          },
          company: {
            value: '',
            valid: null
          },
          newsletter: '',
          captcha: {
            valid: null,
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
              "text":"I agree to allow POPcomms to store and process my personal data.",
              "communications":[
                {
                  "value": this.form.gdpr.one,
                  "subscriptionTypeId":1,
                  "text":"I agree to receive content from POPcomms."
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
        show: {
          contact: false
        }
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
        this.show.contact = true
      },
      hideContactForm () {
        this.show.contact = false
        if (this.$refs.contactForm.step === 8) {
          this.$refs.contactForm.step = 0
          this.$refs.contactForm.reset()
        }
        // this.$refs.contactForm.restartTL()
      },
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

  new Vue({
    el: document.getElementById('header')
  })

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

