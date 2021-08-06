document.addEventListener("DOMContentLoaded", function() {

  function calcCaptcha () {
    const min = Math.ceil(1)
    const max = Math.floor(10)
    return Math.floor(Math.random() * (max - min) + min)
  }

  function getCookie(cname) {
    var name = cname + '='
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return null
  }

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
        if (this.step === 6) {
          this.step = 1
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

        if (this.step === 5) {
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
              if (this.step === 6) {
                this.revealFingers(next)
              }
            }
          })
        }, 500)
      },
      validateName (e) {
        if (this.form.name.value.length > 3) {
          this.form.name.valid = true

          if(e.type === 'click' || (e.keyCode === 13 && this.form.email.valid === true)) {
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

          if(e.type === 'click' || (e.keyCode === 13 && this.form.name.valid === true)) {
            this.nextStep()
          }
        } else {
          this.form.email.valid = false
        }
      },
      validateCompany (e) {
        if (this.form.company.value.length > 2) {
          this.form.company.valid = true
          if(e.type === 'click' || (e.keyCode === 13) && this.form.phone.valid) {
            this.nextStep()
          }
        }
      },
      validatePhone (e) {
        if (!isNaN(this.form.phone.value)) {
          this.form.phone.valid = true
          if(e.type === 'click' || (e.keyCode === 13) && this.form.company.valid) {
            this.nextStep()
          }
        }
      },
      // validateGDPR (e) {
      //   // if (this.form.gdpr.one && this.form.gdpr.two) {
      //   //   this.nextStep()
      //   // }
      //   if (this.form.gdpr && this.captcha.a + this.captcha.b === parseInt(this.form.captcha.value)) {
      //     this.nextStep()
      //     this.submit()
      //     setTimeout(() => {
      //       this.hide()
      //     }, 4000)
      //   }
      // },
      validateCaptcha (e) {
        if (this.captcha.a + this.captcha.b === parseInt(this.form.captcha.value)) {
          this.form.captcha.valid = true
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
          }
        }
      },
      submit () {
        if (this.form.captcha.valid) {
          this.nextStep()

          const xhr = new XMLHttpRequest();
          const url = 'https://api.hsforms.com/submissions/v3/integration/submit/7620391/15de7731-0a8d-4220-83a9-807607da5964'

          const name = this.form.name.value.split(' ')
          const firstname = name[0]
          const lastname = this.form.name.value.replace(name[0] + ' ', '')

          const data = {
            "fields": [
              {
                "name": "email",
                "value": this.form.email.value
              },
              {
                "name": "firstname",
                "value": firstname
              },
              {
                "name": "lastname",
                "value": lastname
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
              "pageUri": window.location.href,
              "pageName": document.title
            },
            "legalConsentOptions":{
              "legitimateInterest": {
                "value": true,
                "subscriptionTypeId": 1,
                "legalBasis": "LEAD",
                "text": "By submitting this form you agree to (i) The POPcomms Privacy Policy (ii) Receive occassional, valuable information regarding POPcomms and our services. You may unsubscribe from these communications at any time."
              }
            }
          }

          const hubspotTrackingId = getCookie('hubspotutk')
          if (hubspotTrackingId) {
            data.context.hutk = hubspotTrackingId
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

          setTimeout(() => {
            this.hide()
            this.reset()
          }, 5000)
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
        if(this.step === 5) {
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

        var svg = current.querySelector('.watching-eye').getBoundingClientRect();
        var irisTop = svg.top + svg.height / 2;
        var irisLeft = svg.left + svg.width / 2;


        const irisX = ((evt.screenX - irisLeft) / 5) + 247.653;
        const irisY = ((evt.screenY - irisTop) / 3) + 102;

        iris.setAttribute('cx', Math.min(400, Math.max(100, irisX)))
        iris.setAttribute('cy', Math.min(200, Math.max(50, irisY)))

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
      this.show = false
      this.reset()
    },
    mounted () {
      window.addEventListener('mousemove', this.moveEye, false);
      document.querySelector('#contact-form').classList.add('opacity-100')
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
        if (this.step < 3) {
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

        if (this.step === 4) {
          this.hideEye(current)
        }

        const next = this.$refs['downloadFormStep' + (this.step + 1)]

        if (this.step === 3) {
          const eye = next.getElementsByClassName('eye-mask')
          const lines = next.getElementsByClassName('lines')
          gsap.set(eye, { scaleY: 0 })
          gsap.set(lines, {opacity: 0})
        }

        if (this.step === 4) {
          const fingers = next.querySelectorAll('.finger')
          const hand = next.querySelectorAll('.hand')
          gsap.set(hand, {translateX: 100 + '%'})
          gsap.set(fingers, {translateX: 100 + '%'})
        }

        // Allow for bg to fade in before appears
        const timeout = this.step !== 1 ? 1000 : 10

        setTimeout(() => {
          this.step = this.step + 1
          const next = this.$refs['downloadFormStep' + this.step]
          this.revealInput (next)
          this.revealText(next)
          if (this.step === 4) {
            this.revealEye(next)
          }
          if (this.step === 5) {
            this.revealFingers(next)
          }
        }, timeout)
      },
      validateFirstName (e) {
        if (this.form.firstName.value.length > 2) {
          this.form.firstName.valid = true
          if(e.type === 'click' || (e.keyCode === 13 && this.form.lastName.valid === true)) {
            this.nextStep()
          }
        } else {
          this.form.firstName.valid = false
        }
      },
      validateLastName (e) {
        if (this.form.lastName.value.length > 2) {
          this.form.lastName.valid = true
          if(e.type === 'click' || (e.keyCode === 13 && this.form.firstName.valid === true)) {
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
          if(e.type === 'click' || (e.keyCode === 13 && this.form.company.valid === true)) {
            this.nextStep()
          }
        } else {
          this.form.email.valid = false
        }
      },
      validateCompany(e) {
        if (this.form.company.value.length > 2) {
          this.form.company.valid = true
          if(e.type === 'click' || (e.keyCode === 13 && this.form.email.valid === true)) {
            this.nextStep()
          }
        } else {
          this.form.company.valid = false
        }
      },
      validateCaptcha (e) {
        if (this.captcha.a + this.captcha.b === parseInt(this.form.captcha.value)) {
          this.form.captcha.valid = true
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
        }
      },
      revealInput(step) {
        const borders = step.getElementsByClassName('input-border')
        const guides = step.getElementsByClassName('input-guide')
        const inputs = step.querySelectorAll('.input-content')
        this.revealInputAnim(step, inputs, borders, guides)

      },
      hideInput(step) {
        const borders = step.getElementsByClassName('input-border')
        const guides = step.getElementsByClassName('input-guide')
        const inputs = step.querySelectorAll('.input-content')
        this.hideInputAnim(step, inputs, borders, guides)
      },
      hideText (step) {
        const text = step.getElementsByClassName('form-text')
        gsap.to(text, { duration: 0.5, translateY: -2.25 + 'rem', opacity: 0 })
      },
      revealText (step) {
        const text = step.getElementsByClassName('form-text')
        gsap.fromTo(text, {translateY: +2.25 + 'rem', opacity: 0}, {duration: 0.4, translateY: 0, opacity: 1, delay: this.step === 2 ? 0.5 : 0})
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
        if(this.step === 5) {
          gsap.to(eye, { duration: 0.35, delay: 1, translateY: 10, scaleY: 0.5 })
        }

        window.addEventListener('mousemove', this.moveEye, false);
      },
      revealFingers (step) {
        const fingers = step.querySelectorAll('.finger')
        const hand = step.querySelectorAll('.hand')
        const waves = step.querySelectorAll('.waves')

        gsap.to(fingers, { duration: 0.7, translateX: 0 + '%', stagger: 0.1, ease: Elastic.easeOut.config(1, 1) })
        gsap.to(hand, { duration: 0.3, translateX: 0 + '%', delay: 0.25 })
        gsap.timeline({})
          .fromTo(waves, {
            scale: 0.8,
            translateX: 1 + '%',
            translateY: 1 + '%',
            opacity: 0
          },
          {
            duration: 0.5,
            translateX: -1 + '%',
            translateY: 1 + '%',
            scale: 1.05,
            opacity: 1,
            delay: 0.5,
            stagger: -0.2,
            ease: Elastic.easeOut.config(1, 1)
          }, "+=0.25")
          .to(waves, {
            duration: 1.25,
            scale: 0.8,
            translateX: 1 + '%',
            translateY: 1 + '%',
            opacity: 0,
            stagger: -0.2,
            ease: Elastic.easeOut.config(1, 1)
          }, '+=0.5')

        const repeatPulseAnim = gsap.timeline({ repeat: -1, paused: true })
          .to(fingers[0], {
            duration: 0.5,
            translateX: 5 + '%'
          })
          .to(fingers[0], {
            duration: 0.5,
            translateX: 0 + '%',
            ease: Elastic.easeOut.config(1, 1)
          })
          .fromTo(waves, {
            scale: 0.8,
            translateX: 1 + '%',
            translateY: 1 + '%',
            opacity: 0
          },
          {
            duration: 0.5,
            translateX: -1 + '%',
            translateY: 1 + '%',
            scale: 1.05,
            opacity: 1,
            delay: 0.5,
            stagger: -0.2,
            ease: Elastic.easeOut.config(1, 1)
          }, "-=0.5")
          .to(waves, {
            duration: 1.25,
            scale: 0.8,
            translateX: 1 + '%',
            translateY: 1 + '%',
            opacity: 0,
            stagger: -0.2,
            ease: Elastic.easeOut.config(1, 1)
          }, '+=0.5')

        setTimeout(() => {
          repeatPulseAnim.play()
        }, 3000);

      },
      moveEye (evt) {
        const current = this.$refs['downloadFormStep' + this.step]
        const iris = current.querySelector('.iris');
        const pupil = current.querySelector('.pupil');

        var svg = current.querySelector('.watching-eye').getBoundingClientRect();
        var irisTop = svg.top + svg.height / 2;
        var irisLeft = svg.left + svg.width / 2;


        const irisX = ((evt.screenX - irisLeft) / 5) + 247.653;
        const irisY = ((evt.screenY - irisTop) / 3) + 102;

        iris.setAttribute('cx', Math.min(400, Math.max(100, irisX)))
        iris.setAttribute('cy', Math.min(200, Math.max(50, irisY)))

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
        .to(borders, {duration: 0.5, width: 100 + '%',  delay: this.step === 2 ? 0.5 : 0})
        .to(inputs, {duration: 0.5, translateY: 0 + '%', opacity: 1, ease: "power3.out"}, "-=0.5")
        .to(guides, {duration: 0.3, opacity: 1,  ease: "power3.in"}, "-=0.3")
        .set(step,{ pointerEvents: 'all'}, "-=0.01")
      },
      submit () {
        if (this.form.captcha.valid) {
          this.nextStep()

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
              "pageUri": window.location.href,
              "pageName": document.title
            },
            "legalConsentOptions":{
              "legitimateInterest": {
                "value": true,
                "subscriptionTypeId": 1,
                "legalBasis": "LEAD",
                "text": "By submitting this form you agree to (i) The POPcomms Privacy Policy (ii) Receive occassional, valuable information regarding POPcomms and our services. You may unsubscribe from these communications at any time."
              }
            }
          }

          const hubspotTrackingId = getCookie('hubspotutk')
          if (hubspotTrackingId) {
            data.context.hutk = hubspotTrackingId
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

          const download = {
            name: this.form.firstName.value,
            email: this.form.email.value,
            title: "The Beginners’ Guide to Creating Interactive Touchscreen Experiences",
            url: 'https://www.popcomms.com/wp-content/uploads/2021/07/POP_Beginners-guide-to-touchscreens.pdf',
            image: 'https://www.popcomms.com/wp-content/uploads/2021/07/Touchscreen-cover.jpg'
          }
          this.sendDownload(download)

          setTimeout(() => {
            this.step = 1
            this.reset()
          }, 5000)
        }
      },
      sendDownload (data) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "name": data.name,
          "email": data.email,
          "title": data.title,
          "url": data.url,
          "image": data.image
        });

        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://www.popcomms.com/wp-json/pop/v1/download-fulfilment", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      },
    },
    created () {
      this.reset()
    },
    mounted () {
      gsap.set(this.$refs.steps, { pointerEvents: 'none' })
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
        if (window.innerWidth < 575 ) {
          console.log('small!', vueComponents)
          vueComponents.$children.forEach((element) => {
            if (element.$el.id === 'contact-form' && element.step === 1) {
              element.nextStep()
            }
            setTimeout(() => {
              element.show = true
            }, 500);
          })
        } else {
          vueComponents.$children.forEach((element) => {
            if (element.$el.id === 'contact-form') {
              element.show = true
            }
          })
        }
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
  // get JSON url
  var WpJsonUrl = document.querySelector('link[rel="https://api.w.org/"]').href
  // then take out the '/wp-json/' part
  var homeurl = WpJsonUrl.replace('/wp-json/','');
  console.log(homeurl)
  Vue.component('3D-Turbine', {
    data () {
      return {
        // NOTHING HERE AS ALL THREEJS ITEMS MUST BE NON REACTIVE
        active: false,
        wireframeState: true,
        animationState: true,
        clippingPlane: true,
        activeContent: '',
        hideLabels: false,
        fullScreen: false,
        points: [
          {
            position: new THREE.Vector3(0.7, 0.15, 2),
            title: 'Fan',
            content: 'The fan is the first component in a turbofan. The large spinning fan sucks in large quantities of air. Most blades of the fan are made of titanium. It then speeds this air up and splits it into two parts. One part continues through the "core" or center of the engine, where it is acted upon by the other engine components.'
          },
          {
            position: new THREE.Vector3(0.8, -0.75, 0.5),
            title: 'Cold Area',
            content: 'Area before compression where air is taken in cold. Around 80% of the air that comes through the intake will simply pass through the turbine without being compressed or heated.'
          },
          {
            position: new THREE.Vector3(0.2, -0.2, -0.55),
            title: 'Compressor',
            content: 'The compressor is made up of fans with many blades and attached to a shaft. The compressor squeezes the air that enters it into progressively smaller areas, resulting in an increase in the air pressure. This results in an increase in the energy potential of the air.'
          },
          {
            position: new THREE.Vector3(-0.2, 0.4, -0.65),
            title: 'Combustion',
            content: 'In the combustor the air is mixed with fuel and then ignited. There are as many as 20 nozzles to spray fuel into the airstream. The mixture of air and fuel catches fire. This provides a high temperature, high-energy airflow. The fuel burns with the oxygen in the compressed air, producing hot expanding gases.'
          },
          {
            position: new THREE.Vector3(-0.75, -0.75, -0.6),
            title: 'Hot Area',
            content: 'Air that has been compress and passed through the combustion chamber can be up to 1600C. This is above the melting point of the turbines. It is only the excess cold air that keeps them from melting!'
          },
          {
            position: new THREE.Vector3(-1, 0.75, -2),
            title: 'Turbines',
            content: 'The high-energy airflow coming out of the combustor goes into the turbine, causing the turbine blades to rotate. The turbines are linked by a shaft to turn the blades in the compressor and to spin the intake fan at the front. This rotation takes some energy from the high-energy flow that is used to drive the fan and the compressor. The gases produced in the combustion chamber move through the turbine and spin its blades.'
          }
        ]
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      fullScreenToggle () {
        // THIS DOESNT WORK AHHHHH
        this.fullScreen = !this.fullScreen
        this.resizeCanvas()
      },
      toggleClippingPlane () {
        if (this.clippingPlane) {
          this.modelMaterials.forEach(childData => {
            childData.child.material.clippingPlanes = [ this.modelClipPlane ]
          })
        } else {
          this.modelMaterials.forEach(childData => {
            childData.child.material.clippingPlanes = []
          })
        }
        this.clippingPlane = !this.clippingPlane
      },
      toggleWireframe () {
        this.modelMaterials.forEach(childData => {
          childData.child.material.wireframe = this.wireframeState
          childData.child.material.envMapIntensity = this.wireframeState ? 0 : 3
        })
        this.wireframeState = !this.wireframeState
      },
      toggleLights () {
        if (this.animationState) {
          this.turbineTimeline.pause(-1)
          this.redPointLight.intensity = 500
          this.bluePointLight.intensity = 500
        } else {
          this.redPointLight.intensity = 0
          this.bluePointLight.intensity = 0
          this.turbineTimeline.play()
        }
        this.animationState = !this.animationState
      },
      mouseOver () {
        if (!this.active) {
          this.active = !this.active
          this.modelMaterials.forEach(childData => {
            const baseColor = new THREE.Color('rgb(70, 70, 70)')
            gsap.fromTo(childData.child.material.color, {r: baseColor.r, g: baseColor.g, b: baseColor.b}, {duration:0.3, r: childData.color.r, g: childData.color.g, b: childData.color.b})
            gsap.fromTo(childData.child.material, {metalness: 0}, {duration:0.3, metalness: childData.metalness})
            gsap.fromTo(childData.child.material, {emissiveIntensity: 0}, {duration:0.3, emissiveIntensity: childData.emissiveIntensity + 1})
            gsap.fromTo(childData.child.material, {envMapIntensity: 0}, {duration:0.3, envMapIntensity: 2})
            childData.child.material.wireframe = false
          })
          gsap.to(this.camera.position, {duration: 0.5, x: 0, y: 0, z: 5})
          gsap.to(this.turbineGroup.rotation, {duration: 1.5, x: 0, y: -Math.PI * 0.25, z: 0})    
          this.turbineTimeline.restart()
        } else {
          this.active = !this.active
          this.turbineTimeline.pause(-1)
          this.modelMaterials.forEach(childData => {
            const baseColor = new THREE.Color('rgb(70, 70, 70)')
            gsap.fromTo(childData.child.material, {envMapIntensity: 2}, {duration:0.3, envMapIntensity: 0, emissiveIntensity: 0, metalness: 0})
            gsap.to(childData.child.material.color, {duration: 0.3, r: baseColor.r, g: baseColor.g, b: baseColor.b})
            childData.child.material.wireframe = true
            childData.child.material.clippingPlanes = []
          })
          gsap.to(this.turbineGroup.rotation, {duration: 0.5, x: 0, y: 0, z: 0})
          gsap.to(this.camera.position, {duration: 0.5, x: 0, y: 0, z: 5})
          gsap.to(this.controls.target, {duration: 0.5, x: 0, y: 0, z: 0})

          this.activeContent = ''
        }
      },
      init () {
        // SCENE
        this.scene = new THREE.Scene()
  
        // SIZES
        this.sizes = {
          width: document.querySelector('.canvas-container').clientWidth,
          height: document.querySelector('.canvas-container').clientHeight
        }
  
        // CAMERA
        this.camera = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100)
        this.camera.position.set(0, 0, 6)
        this.scene.add(this.camera)
  
        // RENDERER
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        })
        this.renderer.setClearColor( 0x000000, 0 ); // the default
        this.renderer.physicallyCorrectLights = true
        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.toneMapping = THREE.ReinhardToneMapping
        this.renderer.toneMappingExposure = 1.5
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        document.querySelector('.canvas-container').insertBefore( this.renderer.domElement, document.querySelector('.canvas-container').firstChild );
        this.canvas = this.renderer.domElement
        
        this.renderer.localClippingEnabled = true;
        this.modelClipPlane = new THREE.Plane( new THREE.Vector3( -1, 0, 1), 0 );
  
        // CONTROLS
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
  
        // LIGHTING
        let ambientLight = new THREE.AmbientLight (0xdaccff, 0.5)
        this.scene.add(ambientLight)
  
        const directionalLight = new THREE.DirectionalLight('#ffffff', 5)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.camera.far = 15
        directionalLight.shadow.normalBias = 0.05
        directionalLight.position.set(0, 1.5, -1.25)
        this.scene.add(directionalLight)
  
        // ENVIRONMENT
        var textureLoader = new THREE.TextureLoader();
        this.environmentMap = textureLoader.load(homeurl + '/wp-content/themes/wp-pop/static/js/models/hdri-studio.jpg');
          
        this.environmentMap.encoding = THREE.sRGBEncoding
        this.environmentMap.mapping = THREE.EquirectangularReflectionMapping
        this.scene.background = null
  
        // CONTENT
        this.modelMaterials = []
  
        const updateAllMaterials = () =>
        {
          this.scene.traverse((child) =>
          {
            if(child instanceof THREE.Mesh )
            {
              child.material.envMap = this.environmentMap
              child.material.envMapIntensity = 0
              child.material.needsUpdate = true
              child.castShadow = true
              child.receiveShadow = true
              
              const childData = {
                child: child,
                color: {
                  r: child.material.color.r,
                  g: child.material.color.g,
                  b: child.material.color.b
                },
                metalness: child.material.metalness,
                emissiveIntensity: child.material.emissiveIntensity
              }
              this.modelMaterials.push(childData)
  
              child.material.color = new THREE.Color('rgb(50, 50, 50)')
              child.material.metalness = 0
              child.material.transmission = 0
              child.material.emissiveIntensity = 0
              
              child.material.wireframe = true
              child.material.wireframeLineJoin = 'bevel'
  
              child.material.side = THREE.DoubleSide
              child.material.clippingPlanes = [ ]
              child.material.clipShadows = true
            }
          })
        }
  
        const loader = new THREE.ObjectLoader();
  
        loader.load(
          // resource URL
          `${homeurl}/wp-content/themes/wp-pop/static/js/models/jet-v2.json`,
  
          ( obj ) => {
            this.turbineGroup = new THREE.Group();
  
            this.turbineModel = obj.children[0]
            this.turbineModel.position.y = 0
            this.turbineModel.scale.set(0.1, 0.1, 0.1)
            this.turbineGroup.add(this.turbineModel)
  
            this.redPointLight = obj.children[0]
            this.redPointLight.castShadow = true
            this.redPointLight.position.y = 0
            this.redPointLight.position.x = -4
            this.redPointLight.intensity = 0
            this.turbineGroup.add(this.redPointLight)
            
            this.bluePointLight = obj.children[0]
            this.bluePointLight.castShadow = true
            this.bluePointLight.position.y = 0
            this.bluePointLight.position.x = 4
            this.bluePointLight.intensity = 0
            this.turbineGroup.add(this.bluePointLight)
  
            this.scene.add(this.turbineGroup)
  
            this.turbineBlades = this.turbineGroup.children[0].children[0].children[5]
            this.turbineTimeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1 })
              .fromTo(this.turbineBlades.rotation, {x: 0}, {duration: 5, x: -Math.PI * 5, ease: 'Power1.easeInOut' })
              .fromTo([this.bluePointLight, this.redPointLight], {intensity: 0}, {duration: 1, intensity: 500, ease: 'Power3.easeInOut' }, '-=3.5')
              .to([this.bluePointLight, this.redPointLight], {duration: 1, intensity: 0, ease: 'Power3.easeInOut' }, '-=2')
  
            updateAllMaterials()
          }
        );
  
        // LABELS
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize( this.sizes.width, this.sizes.height );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.classList.add('label-div');
        this.labelRenderer.domElement.style.top = '0px';
        this.labelRenderer.domElement.style.pointerEvents = 'none';
        document.querySelector( '.canvas-container' ).appendChild( this.labelRenderer.domElement );
  
        this.css2DObjects = []
        for (let index = 0; index < this.points.length; index++) {
          const element = this.points[index]
          const text = document.createElement( 'div' )
          text.className = 'label-title'
          text.textContent = element.title
          const label = new CSS2DObject( text )
          label.scale.set(0.1, 0.1, 0.1)
          label.position.set(element.position.x, element.position.y, element.position.z);
          this.scene.add( label );
          this.css2DObjects.push(label)
  
          const $vm = this
  
          text.addEventListener('click', function() {
            if ($vm.activeContent === element.content) {
              $vm.activeContent = ''
            } else {
              $vm.activeContent = element.content
            }
          })
        }
   
        this.raycaster = new THREE.Raycaster
  
        // POST PROCESSING
  
        //  Check Browser for antialias - standard doesnt work for mobile or IE
        let RenderTargetClass = null
  
        if(this.renderer.getPixelRatio() == 1 && this.renderer.capabilities.isWebGL2)
        {
          RenderTargetClass = THREE.WebGLMultisampleRenderTarget
          console.log('Using WebGLMultisampleRenderTarget')
        }
        else
        {
          RenderTargetClass = THREE.WebGLRenderTarget
          console.log('Using WebGLRenderTarget')
        }
  
        // Render Target - set props for Composer render targets
        const renderTarget = new RenderTargetClass(
          this.sizes.width,
          this.sizes.height,
          {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            encoding: THREE.sRGBEncoding
          }
        )
  
        this.composer = new EffectComposer( this.renderer, renderTarget );
        this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.composer.setSize(this.sizes.width, this.sizes.height)
        
        const renderPass = new RenderPass( this.scene, this.camera );
        this.composer.addPass( renderPass );

        // BLOOM TRANSPARENT HACK REQUIRES ES6 IMPORTS - ASK SIMON ABOUT THIS
        // const params = {
        //   exposure: 1.8,
        //   bloomStrength: 0.55,
        //   bloomThreshold: 0.7,
        //   bloomRadius: 0.4
        // };
        // const bloomPass = new UnrealBloomPass( new THREE.Vector2( this.sizes.width, this.sizes.width ), 4, 1, 0.1 );
        // bloomPass.threshold = params.bloomThreshold;
        // bloomPass.strength = params.bloomStrength;
        // bloomPass.radius = params.bloomRadius;
        // this.composer.addPass( bloomPass );
        
        // Anti Alias - when browser doesn't support auto render target AA
        if(this.renderer.getPixelRatio() === 1 && !this.renderer.capabilities.isWebGL2){
            const smaaPass = new SMAAPass()
            this.composer.addPass(smaaPass)
            console.log('using smaa')
        }
  
        // ANIMATION LOOP
        this.clock = new THREE.Clock()
        this.previousTime = 0
        this.tick()
  
        window.addEventListener("resize", () => {
          this.resizeCanvas()
        })

        // console.log(this.scene)
      },
  
      tick () {
        // Time settings
        const elapsedTime = this.clock.getElapsedTime()
        const deltaTime = elapsedTime - this.previousTime
        this.previousTime = elapsedTime
  
        // Update anims
        if (this.animation) { this.animation.update(deltaTime) }
        if(this.turbineGroup) {
          const $vm = this
          this.css2DObjects.forEach(function (point){
            const screenPosition = point.position.clone()
            screenPosition.project($vm.camera)
    
            $vm.raycaster.setFromCamera(screenPosition, $vm.camera)
  
            if ($vm.hideLabels) {
              point.element.classList.remove('visible')
            } else {
              // set the objects which will trigger raycaster
              const intersects = $vm.raycaster.intersectObjects($vm.turbineGroup.children[0].children[0].children[0].children, true)
              // Does intersection exist
              if(intersects.length === 0){
                if ($vm.active === true) {
                  point.element.classList.add('visible')
                } else {
                  point.element.classList.remove('visible')
                }
    
              } else {
                // distance from $vm.camera of first intersection
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo($vm.camera.position)
                for (let i = 0; i < intersects.length; i++) {
                  if(pointDistance > intersectionDistance || $vm.active == false){
                      point.element.classList.remove('visible')
                  } else {
                      point.element.classList.add('visible')
                  }
                }
              }
            }
    
          })
        }
  
        // Controls
        this.controls.update()
        // this.stats.update()
  
        // Camera
        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix() 
  
        // Rinse and repeat
        this.composer.render(this.scene, this.camera)
        this.labelRenderer.render(this.scene, this.camera)
  
        window.requestAnimationFrame(this.tick)
      },
      
      resizeCanvas () {
        // Update sizes
        this.sizes.width = document.querySelector('.canvas-container').clientWidth
        this.sizes.height = document.querySelector('.canvas-container').clientHeight
  
        // Update camera
        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()
  
        // Update renderer
        this.composer.setSize(this.sizes.width, this.sizes.height)
        this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        
        // Update Labels
        this.labelRenderer.setSize(this.sizes.width, this.sizes.height)
        this.labelRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }
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

