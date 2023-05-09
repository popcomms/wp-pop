document.addEventListener("DOMContentLoaded", function () {
  function calcCaptcha() {
    const min = Math.ceil(1)
    const max = Math.floor(10)
    return Math.floor(Math.random() * (max - min) + min)
  }

  function getCookie(cname) {
    var name = cname + "="
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(";")
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == " ") {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return null
  }

  function showContactForm() {
    const contact = document.getElementById('contact-form')
    if (contact && contact.style.display === 'none') {
      contact.style.display = 'block'
    }
  }

  function addContactTriggers () {
    const parent = document.getElementById('site')
    parent.addEventListener('click', function(e) {
      console.log(e.target.parentElement.href)
      if ((e.target.href && e.target.href.includes("#contact-form")) || (e.target.parentElement.href && e.target.parentElement.href.includes("#contact-form"))) {
        e.preventDefault();
        showContactForm();
      }
    }, false)
  }
  addContactTriggers()

  gsap.registerPlugin(ScrollTrigger)

  Vue.component("contact-form", {
    data() {
      return {
        step: 1,
        form: null,
        captcha: {
          a: calcCaptcha(),
          b: calcCaptcha(),
        },
        show: false,
      }
    },
    methods: {
      validationHighlight(el) {
        if (el === true) {
          return "bg-pop-white"
        } else {
          return "bg-pop-pink"
        }
      },
      hide() {

        this.show = false
        this.$el.style.display = 'none'
        document.querySelector("body").style.overflow = "auto"
        if (this.step === 6) {
          this.step = 1
          this.reset()
        }
      },
      nextStep() {
        const container = this.$refs.contactForm
        const heightContainer = container.clientHeight
        gsap.set(container, { height: heightContainer })

        const current = this.$refs["contactFormStep" + this.step]
        this.hideInput(current)
        this.hideText(current)
        this.hideEye(current)

        const next = this.$refs["contactFormStep" + (this.step + 1)]
        const eye = next.getElementsByClassName("eye-mask")
        const lines = next.getElementsByClassName("lines")
        gsap.set(eye, { scaleY: 0 })
        gsap.set(lines, { opacity: 0 })

        if (this.step === 5) {
          const fingers = next.querySelectorAll(".finger")
          const hand = next.querySelectorAll(".hand")
          gsap.set(hand, { translateY: 100 + "%" })
          gsap.set(fingers, { translateY: 100 + "%" })
        }

        setTimeout(() => {
          this.step = this.step + 1
          const next = this.$refs["contactFormStep" + this.step]
          gsap.to(container, {
            duration: 0.5,
            height: "auto",
            onComplete: () => {
              this.revealInput(next)
              this.revealText(next)
              if (next.getElementsByClassName("eye-mask").length !== 0) {
                this.revealEye(next)
              }
              if (this.step === 6) {
                this.revealFingers(next)
              }
            },
          })
        }, 500)
      },
      validateName(e) {
        if (this.form.name.value.length > 3) {
          this.form.name.valid = true

          if (
            e.type === "click" ||
            (e.keyCode === 13 && this.form.email.valid === true)
          ) {
            this.nextStep()
          }
        } else {
          this.form.name.valid = false
        }
      },
      validateEmail(e) {
        const re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (re.test(this.form.email.value.toLowerCase())) {
          this.form.email.valid = true

          if (
            e.type === "click" ||
            (e.keyCode === 13 && this.form.name.valid === true)
          ) {
            this.nextStep()
          }
        } else {
          this.form.email.valid = false
        }
      },
      validateCompany(e) {
        if (this.form.company.value.length > 2) {
          this.form.company.valid = true
          if (
            e.type === "click" ||
            (e.keyCode === 13 && this.form.phone.valid)
          ) {
            this.nextStep()
          }
        }
      },
      validatePhone(e) {
        if (!isNaN(this.form.phone.value)) {
          this.form.phone.valid = true
          if (
            e.type === "click" ||
            (e.keyCode === 13 && this.form.company.valid)
          ) {
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
      validateCaptcha(e) {
        if (
          this.captcha.a + this.captcha.b ===
          parseInt(this.form.captcha.value)
        ) {
          this.form.captcha.valid = true
        } else {
          this.form.captcha.valid = false
        }
      },
      reset() {
        this.form = {
          id: "contact",
          name: {
            valid: false,
            value: "",
          },
          email: {
            valid: false,
            value: "",
          },
          company: {
            valid: false,
            value: "",
          },
          phone: {
            valid: false,
            value: "",
          },
          message: "",
          newsletter: "",
          captcha: {
            valid: false,
            value: "",
          },
        }
      },
      submit() {
        if (this.form.captcha.valid) {
          this.nextStep()

          const xhr = new XMLHttpRequest()
          const url =
            "https://api.hsforms.com/submissions/v3/integration/submit/7620391/15de7731-0a8d-4220-83a9-807607da5964"

          const name = this.form.name.value.split(" ")
          const firstname = name[0]
          const lastname = this.form.name.value.replace(name[0] + " ", "")

          const data = {
            fields: [
              {
                name: "email",
                value: this.form.email.value,
              },
              {
                name: "firstname",
                value: firstname,
              },
              {
                name: "lastname",
                value: lastname,
              },
              {
                name: "company",
                value: this.form.company.value,
              },
              {
                name: "phone",
                value: this.form.phone.value,
              },
              {
                name: "message",
                value: this.form.message,
              },
            ],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
            legalConsentOptions: {
              legitimateInterest: {
                value: true,
                subscriptionTypeId: 1,
                legalBasis: "LEAD",
                text: "By submitting this form you agree to (i) The POPcomms Privacy Policy (ii) Receive occassional, valuable information regarding POPcomms and our services. You may unsubscribe from these communications at any time.",
              },
            },
          }

          const hubspotTrackingId = getCookie("hubspotutk")
          if (hubspotTrackingId) {
            data.context.hutk = hubspotTrackingId
          }

          xhr.open("POST", url)
          xhr.setRequestHeader("Content-Type", "application/json")
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              console.log(xhr.responseText) // Returns a 200 response if the submission is successful.
            } else if (xhr.readyState == 4 && xhr.status == 400) {
              console.log(xhr.responseText) // Returns a 400 error the submission is rejected.
            } else if (xhr.readyState == 4 && xhr.status == 403) {
              console.log(xhr.responseText) // Returns a 403 error if the portal isn't allowed to post submissions.
            } else if (xhr.readyState == 4 && xhr.status == 404) {
              console.log(xhr.responseText) //Returns a 404 error if the formGuid isn't found
            }
          }
          xhr.send(JSON.stringify(data))

          setTimeout(() => {
            this.hide()
            this.reset()
          }, 5000)
        }
      },
      revealInput(step) {
        const borders = step.getElementsByClassName("input-border")
        const guides = step.getElementsByClassName("input-guide")
        const inputs = step.querySelectorAll(".input-content")
        const text = step.querySelectorAll("h4")

        this.revealInputAnim(step, inputs, borders, guides, text)
      },
      hideInput(step) {
        const borders = step.getElementsByClassName("input-border")
        const guides = step.getElementsByClassName("input-guide")
        const inputs = step.querySelectorAll(".input-content")
        const text = step.querySelectorAll("h4")

        this.hideInputAnim(step, inputs, borders, guides, text)
      },
      hideText(step) {
        const text = step.getElementsByClassName("form-text")
        gsap.to(text, { duration: 0.5, translateY: -2.25 + "rem", opacity: 0 })
      },
      revealText(step) {
        const text = step.getElementsByClassName("form-text")
        gsap.fromTo(
          text,
          { translateY: +2.25 + "rem", opacity: 0 },
          { duration: 0.4, translateY: 0, opacity: 1 }
        )
      },
      hideEye(step) {
        const eye = step.getElementsByClassName("eye-mask")
        const lines = step.getElementsByClassName("lines")
        gsap.to(eye, {
          duration: 0.35,
          translateY: this.step > 1 ? 40 : 0,
          scaleY: 0,
        })
        gsap.to(lines, { duration: 0.35, opacity: 0 })

        window.removeEventListener("mousemove", this.moveEye)
      },
      revealEye(step) {
        const eye = step.getElementsByClassName("eye-mask")
        const lines = step.getElementsByClassName("lines")
        gsap.to(eye, { duration: 0.35, scaleY: 1 })
        gsap.to(lines, { duration: 0.35, opacity: 1 })
        if (this.step === 5) {
          gsap.to(eye, {
            duration: 0.35,
            delay: 1,
            translateY: 10,
            scaleY: 0.5,
          })
        }

        window.addEventListener("mousemove", this.moveEye, false)
      },
      revealFingers(step) {
        const fingers = step.querySelectorAll(".finger")
        const hand = step.querySelectorAll(".hand")
        gsap.to(fingers, {
          duration: 0.7,
          translateY: 0 + "%",
          stagger: 0.1,
          ease: Elastic.easeOut.config(1, 1),
        })
        gsap.to(hand, { duration: 0.3, translateY: 0 + "%", delay: 0.25 })
      },
      moveEye(evt) {
        const current = this.$refs["contactFormStep" + this.step]
        const iris = current.querySelector(".iris")
        const pupil = current.querySelector(".pupil")

        var svg = current.querySelector(".watching-eye").getBoundingClientRect()
        var irisTop = svg.top + svg.height / 2
        var irisLeft = svg.left + svg.width / 2

        const irisX = (evt.clientX - irisLeft) / 5 + 247.653
        const irisY = (evt.clientY - irisTop) / 3 + 102

        iris.setAttribute("cx", Math.min(400, Math.max(100, irisX)))
        iris.setAttribute("cy", Math.min(200, Math.max(50, irisY)))

        var pupilTop = svg.top + svg.height / 2
        var pupilLeft = svg.left + svg.width / 2

        const pupilX = (evt.clientX - pupilLeft) / 4 + 247.5
        const pupilY = (evt.clientY - pupilTop) / 2 + 100

        pupil.setAttribute("cx", Math.min(450, Math.max(50, pupilX)))
        pupil.setAttribute("cy", Math.min(225, Math.max(25, pupilY)))
      },
      hideInputAnim(step, inputs, borders, guides, text) {
        gsap
          .timeline({})
          .to(borders, { duration: 0.5, width: 0 + "%" })
          .to(text, { duration: 0.5, opacity: 0 }, "-0.5")
          .to(
            inputs,
            {
              duration: 0.5,
              translateY: -100 + "%",
              opacity: 1,
              ease: "power3.in",
            },
            "-=0.5"
          )
          .to(guides, { duration: 0.3, opacity: 0, ease: "power3.in" }, "-=0.3")
          .set(inputs, { translateY: 100 + "%" })
          .set(step, { pointerEvents: "none" })
      },
      revealInputAnim(step, inputs, borders, guides, text) {
        gsap
          .timeline({})
          .to(borders, { duration: 0.5, width: 100 + "%" })
          .to(text, { duration: 0.5, opacity: 1 }, "-0.5")
          .to(
            inputs,
            {
              duration: 0.5,
              translateY: 0 + "%",
              opacity: 1,
              ease: "power3.out",
            },
            "-=0.5"
          )
          .to(guides, { duration: 0.3, opacity: 1, ease: "power3.in" }, "-=0.3")
          .set(step, { pointerEvents: "all" }, "-=0.01")
      },
    },
    created() {
      this.show = false
      this.reset()
    },
    mounted() {
      window.addEventListener("mousemove", this.moveEye, false)
      document.querySelector("#contact-form").classList.add("opacity-100")
    },
  })

  Vue.component("download", {
    data() {
      return {
        step: 1,
        form: null,
        captcha: {
          a: calcCaptcha(),
          b: calcCaptcha(),
        },
      }
    },
    computed: {
      getStepName() {
        return this.stepName[this.step]
      },
      getIntro() {
        if (this.step < 3) {
          return "Your"
        } else {
          return "All done!"
        }
      },
    },
    methods: {
      validationHighlight(el) {
        if (el === true) {
          return "bg-pop-white"
        } else {
          return "bg-pop-pink"
        }
      },
      nextStep() {
        const current = this.$refs["downloadFormStep" + this.step]
        this.hideInput(current)
        this.hideText(current)

        if (this.step === 4) {
          this.hideEye(current)
        }

        const next = this.$refs["downloadFormStep" + (this.step + 1)]

        if (this.step === 3) {
          const eye = next.getElementsByClassName("eye-mask")
          const lines = next.getElementsByClassName("lines")
          gsap.set(eye, { scaleY: 0 })
          gsap.set(lines, { opacity: 0 })
        }

        if (this.step === 4) {
          const fingers = next.querySelectorAll(".finger")
          const hand = next.querySelectorAll(".hand")
          gsap.set(hand, { translateX: 100 + "%" })
          gsap.set(fingers, { translateX: 100 + "%" })
        }

        // Allow for bg to fade in before appears
        const timeout = this.step !== 1 ? 1000 : 10

        setTimeout(() => {
          this.step = this.step + 1
          const next = this.$refs["downloadFormStep" + this.step]
          this.revealInput(next)
          this.revealText(next)
          if (this.step === 4) {
            this.revealEye(next)
          }
          if (this.step === 5) {
            this.revealFingers(next)
          }
        }, timeout)
      },
      validateFirstName(e) {
        if (this.form.firstName.value.length > 2) {
          this.form.firstName.valid = true
          if (
            e.type === "click" ||
            (e.keyCode === 13 && this.form.lastName.valid === true)
          ) {
            this.nextStep()
          }
        } else {
          this.form.firstName.valid = false
        }
      },
      validateLastName(e) {
        if (this.form.lastName.value.length > 2) {
          this.form.lastName.valid = true
          if (
            e.type === "click" ||
            (e.keyCode === 13 && this.form.firstName.valid === true)
          ) {
            this.nextStep()
          }
        } else {
          this.form.lastName.valid = false
        }
      },
      validateEmail(e) {
        const re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (re.test(this.form.email.value.toLowerCase())) {
          this.form.email.valid = true
          if (
            e.type === "click" ||
            (e.keyCode === 13 && this.form.company.valid === true)
          ) {
            this.nextStep()
          }
        } else {
          this.form.email.valid = false
        }
      },
      validateCompany(e) {
        if (this.form.company.value.length > 2) {
          this.form.company.valid = true
          if (
            e.type === "click" ||
            (e.keyCode === 13 && this.form.email.valid === true)
          ) {
            this.nextStep()
          }
        } else {
          this.form.company.valid = false
        }
      },
      validateCaptcha(e) {
        if (
          this.captcha.a + this.captcha.b ===
          parseInt(this.form.captcha.value)
        ) {
          this.form.captcha.valid = true
        } else {
          this.form.captcha.valid = false
        }
      },
      reset() {
        this.form = {
          id: "download",
          firstName: {
            value: "",
            valid: false,
          },
          lastName: {
            value: "",
            valid: false,
          },
          email: {
            value: "",
            valid: false,
          },
          company: {
            value: "",
            valid: false,
          },
          newsletter: "",
          captcha: {
            valid: false,
            value: "",
          },
        }
      },
      revealInput(step) {
        const borders = step.getElementsByClassName("input-border")
        const guides = step.getElementsByClassName("input-guide")
        const inputs = step.querySelectorAll(".input-content")
        this.revealInputAnim(step, inputs, borders, guides)
      },
      hideInput(step) {
        const borders = step.getElementsByClassName("input-border")
        const guides = step.getElementsByClassName("input-guide")
        const inputs = step.querySelectorAll(".input-content")
        this.hideInputAnim(step, inputs, borders, guides)
      },
      hideText(step) {
        const text = step.getElementsByClassName("form-text")
        gsap.to(text, { duration: 0.5, translateY: -2.25 + "rem", opacity: 0 })
      },
      revealText(step) {
        const text = step.getElementsByClassName("form-text")
        gsap.fromTo(
          text,
          { translateY: +2.25 + "rem", opacity: 0 },
          {
            duration: 0.4,
            translateY: 0,
            opacity: 1,
            delay: this.step === 2 ? 0.5 : 0,
          }
        )
      },
      hideEye(step) {
        const eye = step.getElementsByClassName("eye-mask")
        const lines = step.getElementsByClassName("lines")
        gsap.to(eye, {
          duration: 0.35,
          translateY: this.step > 1 ? 40 : 0,
          scaleY: 0,
        })
        gsap.to(lines, { duration: 0.35, opacity: 0 })

        window.removeEventListener("mousemove", this.moveEye)
      },
      revealEye(step) {
        const eye = step.getElementsByClassName("eye-mask")
        const lines = step.getElementsByClassName("lines")
        gsap.to(eye, { duration: 0.35, scaleY: 1 })
        gsap.to(lines, { duration: 0.35, opacity: 1 })
        if (this.step === 5) {
          gsap.to(eye, {
            duration: 0.35,
            delay: 1,
            translateY: 10,
            scaleY: 0.5,
          })
        }

        window.addEventListener("mousemove", this.moveEye, false)
      },
      revealFingers(step) {
        const fingers = step.querySelectorAll(".finger")
        const hand = step.querySelectorAll(".hand")
        const waves = step.querySelectorAll(".waves")

        gsap.to(fingers, {
          duration: 0.7,
          translateX: 0 + "%",
          stagger: 0.1,
          ease: Elastic.easeOut.config(1, 1),
        })
        gsap.to(hand, { duration: 0.3, translateX: 0 + "%", delay: 0.25 })
        gsap
          .timeline({})
          .fromTo(
            waves,
            {
              scale: 0.8,
              translateX: 1 + "%",
              translateY: 1 + "%",
              opacity: 0,
            },
            {
              duration: 0.5,
              translateX: -1 + "%",
              translateY: 1 + "%",
              scale: 1.05,
              opacity: 1,
              delay: 0.5,
              stagger: -0.2,
              ease: Elastic.easeOut.config(1, 1),
            },
            "+=0.25"
          )
          .to(
            waves,
            {
              duration: 1.25,
              scale: 0.8,
              translateX: 1 + "%",
              translateY: 1 + "%",
              opacity: 0,
              stagger: -0.2,
              ease: Elastic.easeOut.config(1, 1),
            },
            "+=0.5"
          )

        const repeatPulseAnim = gsap
          .timeline({ repeat: -1, paused: true })
          .to(fingers[0], {
            duration: 0.5,
            translateX: 5 + "%",
          })
          .to(fingers[0], {
            duration: 0.5,
            translateX: 0 + "%",
            ease: Elastic.easeOut.config(1, 1),
          })
          .fromTo(
            waves,
            {
              scale: 0.8,
              translateX: 1 + "%",
              translateY: 1 + "%",
              opacity: 0,
            },
            {
              duration: 0.5,
              translateX: -1 + "%",
              translateY: 1 + "%",
              scale: 1.05,
              opacity: 1,
              delay: 0.5,
              stagger: -0.2,
              ease: Elastic.easeOut.config(1, 1),
            },
            "-=0.5"
          )
          .to(
            waves,
            {
              duration: 1.25,
              scale: 0.8,
              translateX: 1 + "%",
              translateY: 1 + "%",
              opacity: 0,
              stagger: -0.2,
              ease: Elastic.easeOut.config(1, 1),
            },
            "+=0.5"
          )

        setTimeout(() => {
          repeatPulseAnim.play()
        }, 3000)
      },
      moveEye(evt) {
        // console.log(evt)
        const current = this.$refs["downloadFormStep" + this.step]
        const iris = current.querySelector(".iris")
        const pupil = current.querySelector(".pupil")

        var svg = current.querySelector(".watching-eye").getBoundingClientRect()
        var irisTop = svg.top + svg.height / 2
        var irisLeft = svg.left + svg.width / 2

        const irisX = (evt.clientX - irisLeft) / 5 + 247.653
        const irisY = (evt.clientY - irisTop) / 3 + 102

        iris.setAttribute("cx", Math.min(400, Math.max(100, irisX)))
        iris.setAttribute("cy", Math.min(200, Math.max(50, irisY)))

        var pupilTop = svg.top + svg.height / 2
        var pupilLeft = svg.left + svg.width / 2

        const pupilX = (evt.clientX - pupilLeft) / 4 + 247.5
        const pupilY = (evt.clientY - pupilTop) / 2 + 100

        pupil.setAttribute("cx", Math.min(450, Math.max(50, pupilX)))
        pupil.setAttribute("cy", Math.min(225, Math.max(25, pupilY)))
      },
      hideInputAnim(step, inputs, borders, guides) {
        gsap
          .timeline({})
          .to(borders, { duration: 0.5, width: 0 + "%" })
          .to(
            inputs,
            {
              duration: 0.5,
              translateY: -100 + "%",
              opacity: 1,
              ease: "power3.in",
            },
            "-=0.5"
          )
          .to(guides, { duration: 0.3, opacity: 0, ease: "power3.in" }, "-=0.3")
          .set(inputs, { translateY: 100 + "%" })
          .set(step, { pointerEvents: "none" })
      },
      revealInputAnim(step, inputs, borders, guides) {
        gsap
          .timeline({})
          .to(borders, {
            duration: 0.5,
            width: 100 + "%",
            delay: this.step === 2 ? 0.5 : 0,
          })
          .to(
            inputs,
            {
              duration: 0.5,
              translateY: 0 + "%",
              opacity: 1,
              ease: "power3.out",
            },
            "-=0.5"
          )
          .to(guides, { duration: 0.3, opacity: 1, ease: "power3.in" }, "-=0.3")
          .set(step, { pointerEvents: "all" }, "-=0.01")
      },
      submit() {
        if (this.form.captcha.valid) {
          this.nextStep()

          const xhr = new XMLHttpRequest()
          const url =
            "https://api.hsforms.com/submissions/v3/integration/submit/7620391/a80eef42-8cb7-432d-ad17-a1cb3d1ee17c"

          const data = {
            fields: [
              {
                name: "email",
                value: this.form.email.value,
              },
              {
                name: "firstname",
                value: this.form.firstName.value,
              },
              {
                name: "lastname",
                value: this.form.lastName.value,
              },
              {
                name: "company",
                value: this.form.company.value,
              },
            ],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
            legalConsentOptions: {
              legitimateInterest: {
                value: true,
                subscriptionTypeId: 1,
                legalBasis: "LEAD",
                text: "By submitting this form you agree to (i) The POPcomms Privacy Policy (ii) Receive occassional, valuable information regarding POPcomms and our services. You may unsubscribe from these communications at any time.",
              },
            },
          }

          const hubspotTrackingId = getCookie("hubspotutk")
          if (hubspotTrackingId) {
            data.context.hutk = hubspotTrackingId
          }

          xhr.open("POST", url)
          xhr.setRequestHeader("Content-Type", "application/json")
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              console.log(xhr.responseText) // Returns a 200 response if the submission is successful.
            } else if (xhr.readyState == 4 && xhr.status == 400) {
              console.log(xhr.responseText) // Returns a 400 error the submission is rejected.
            } else if (xhr.readyState == 4 && xhr.status == 403) {
              console.log(xhr.responseText) // Returns a 403 error if the portal isn't allowed to post submissions.
            } else if (xhr.readyState == 4 && xhr.status == 404) {
              console.log(xhr.responseText) //Returns a 404 error if the formGuid isn't found
            }
          }
          xhr.send(JSON.stringify(data))
          const containerEl = document.getElementById('download-form')

          const download = {
            name: this.form.firstName.value,
            email: this.form.email.value,
            title: containerEl.getAttribute('data-email-title'),
            url: containerEl.getAttribute('data-email-file'),
            image: containerEl.getAttribute('data-email-image'),
          }

          // console.log('download', download)

          this.sendDownload(download)

          setTimeout(() => {
            this.step = 1
            this.reset()
          }, 10000)
        }
      },
      sendDownload(data) {
        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        const raw = JSON.stringify({
          name: data.name,
          email: data.email,
          title: data.title,
          url: data.url,
          image: data.image,
        })

        const requestOptions = {
          method: "POST",
          headers: headers,
          body: raw,
          redirect: "follow",
        }

        fetch(
          "https://www.popcomms.com/wp-json/pop/v1/download-fulfilment",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error))
      },
    },
    created() {
      this.reset()
    },
    mounted() {
    },
  })

  Vue.component("MainMenu", {
    data() {
      return {
        test: "test",
        menuActive: false,
        activeChild: "",
        showMenuTl: gsap.timeline({ paused: true }),
      }
    },
    methods: {
      toggleMenu(item) {
        if (this.menuActive) {
          this.menuActive = false
          document.querySelector("body").style.overflow = "auto"
          this.activeChild = ""
        } else {
          this.menuActive = true
          document.querySelector("body").style.overflow = "hidden"
          this.activeChild = item
        }
      },
      showContactForm() {
        const vueComponents = this.$parent
        if (window.innerWidth < 575) {
          // console.log('small!', vueComponents)
          vueComponents.$children.forEach((element) => {
            if (element.$el.id === "contact-form" && element.step === 1) {
              element.nextStep()
            }
            setTimeout(() => {
              element.show = true
            }, 500)
          })
        } else {
          vueComponents.$children.forEach((element) => {
            if (element.$el.id === "contact-form") {
              element.show = true
            }
          })
        }
        document.querySelector("body").style.overflow = "hidden"
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
      changeSubMenu(item) {
        this.activeChild = item
      },
      enterMenu() {
        this.showMenuTl.play()
        gsap.timeline({}).to(this.$refs.menuContainer, {
          duration: 0.3,
          opacity: 1,
          pointerEvents: "auto",
        })
      },
      leaveMenu(el, done) {
        gsap.timeline({}).to(this.$refs.menuContainer, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.3,
        })
      },
    },
    mounted() {
      const $ = (s, o = document) => o.querySelector(s)
      const $$ = (s, o = document) => o.querySelectorAll(s)

      $$(".sub-item-container").forEach((el) =>
        el.addEventListener("mouseenter", function (e) {
          let container = this.querySelectorAll(".sub-item")

          container.forEach((element) => {
            // gsap.fromTo(element.children[1], {textShadow: '0px 0px 0 transparent, 0px 0px 0 transparent, 0px 0px 0 transparent, 0px 0px 0 transparent'}, {duration: 0.5, color: '#2D2D2D', textShadow: '-1px -1px 0 #F8F7EE, 1px -1px 0 #F8F7EE, -1px 1px 0 #F8F7EE, 1px 1px 0 #F8F7EE'})
            // gsap.fromTo(element.children[1], {}, {duration: 0.5, color: '#2D2D2D', })
          })
        })
      )
      $$(".sub-item-container").forEach((el) =>
        el.addEventListener("mouseleave", function (e) {
          let container = this.querySelectorAll(".sub-item")

          container.forEach((element) => {
            // gsap.to(element.children[1], {duration: 0.5, color: '#F8F7EE', textShadow: '0px 0px 0 #F8F7EE'})
          })
        })
      )

      $$(".sub-item").forEach((el) =>
        el.addEventListener("mousemove", function (e) {
          const pos = this.getBoundingClientRect()
          const mx = e.clientX - pos.left - pos.width / 2
          const my = e.clientY - pos.top - pos.height / 2
          gsap.to(this, {
            duration: 0.5,
            x: mx * 0.15 + "px",
            y: my * 0.3 + "px",
          })
          gsap.to(this.children[1], {
            duration: 0.5,
            x: mx * 0.025 + "px",
            y: my * 0.075 + "px",
            color: "#FF0088",
          })
        })
      )

      $$(".sub-item").forEach((el) =>
        el.addEventListener("mouseenter", function (e) {
          // gsap.to(this.children[2], {duration: 0.5, width: 100 + '%'})
          gsap.fromTo(
            this.children[0],
            { opacity: 0 },
            { duration: 0.5, opacity: 1 }
          )
          // const feDisplacementMapEl = this.querySelector('feDisplacementMap');
          // const feTurbulenceEl = this.querySelector('feTurbulence');
          // gsap.fromTo(feDisplacementMapEl, { attr: {scale: 250}}, {duration: 1, attr: {scale: 0}, ease: Quad.easeOut})
          // gsap.fromTo(feTurbulenceEl, { attr: {baseFrequency: 0.007}}, {duration: 1, attr: {baseFrequency: 0}, ease: Quad.easeOut})
        })
      )

      $$(".sub-item").forEach((el) =>
        el.addEventListener("mouseleave", function () {
          gsap.to(this, { duration: 0.5, x: 0, y: 0 })
          gsap.to(this.children[1], {
            duration: 0.5,
            x: 0,
            y: 0,
            color: "#F8F7EE",
          })
          // gsap.to(this.children[2], {duration: 0.5, width: 0 + '%'})
          // const feDisplacementMapEl = this.querySelector('feDisplacementMap');
          // gsap.to(feDisplacementMapEl, {duration: 0.5, attr: {scale: 100}, ease: Quad.easeOut})

          // const feTurbulenceEl = this.querySelector('feTurbulence');
          // gsap.to(feTurbulenceEl, {duration: 0.5, attr: {baseFrequency: 0.007}, ease: Quad.easeOut})
          gsap.to(this.children[0], { duration: 0.5, opacity: 0 })
        })
      )
    },
  })
  // get JSON url
  var WpJsonUrl = document.querySelector('link[rel="https://api.w.org/"]').href
  // then take out the '/wp-json/' part
  var homeurl = WpJsonUrl.replace("/wp-json/", "")

  new Vue({
    el: document.getElementById("site-wrapper"),
  })

  // Apply highlight color to text
  const problems = document.querySelectorAll(".problems-list__item")
  if (problems.length > 0) {
    const accentColor = getComputedStyle(problems[0]).borderColor
    problems.forEach((element) => {
      element.querySelectorAll("strong").forEach((e) => {
        e.style.color = accentColor
      })
    })
  }

  // Scroll to
  const scrollButtons = document.querySelectorAll(".scroll-button")
  for (var i = 0; i < scrollButtons.length; i++) {
    scrollButtons[i].addEventListener("click", function () {
      el = document.getElementById(".pop-container")
      var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop
      window.scrollTo({
        left: 0,
        top: rect.top + scrollTop,
        behavior: "smooth",
      })
    })
  }

  const pageScrollButtons = document.querySelectorAll(".scroll-button-page")
  for (var i = 0; i < pageScrollButtons.length; i++) {
    pageScrollButtons[i].addEventListener("click", function () {
      el = document.querySelector(".pop-container")
      var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop
      window.scrollTo({
        left: 0,
        top: rect.top + scrollTop,
        behavior: "smooth",
      })
    })
  }

  const magnifyImage = document.querySelectorAll(".image-magnify")
  for (var i = 0; i < magnifyImage.length; i++) {
    let index = i
    // console.log(magnifyImage[0])
    magnifyImage[index].addEventListener("click", function () {
      let popup = magnifyImage[index]
        .closest(".image-container")
        .querySelector(".full-width-image-popup")
      popup.style.display = "block"
      gsap.to(popup, { duration: 0.3, opacity: 1 })
    })
  }

  const hideImage = document.querySelectorAll(".image-hide")
  for (var i = 0; i < hideImage.length; i++) {
    let index = i
    hideImage[index].addEventListener("click", function () {
      let popup = hideImage[index]
        .closest(".image-container")
        .querySelector(".full-width-image-popup")
      gsap.to(popup, {
        duration: 0.3,
        opacity: 0,
        onComplete: function () {
          popup.style.display = "none"
        },
      })
    })
  }

  // Social Media Sharing
  function shareFB(url) {
    const link =
      "https://www.facebook.com/sharer/sharer.php?u=" + url + "&t=your message"
    window.open(
      link,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
    )
    return false
  }

  function shareTwitter(url) {
    const link =
      "https://twitter.com/intent/tweet?url=" +
      url +
      "&via=getboldify&text=yourtext"
    TwitterWindow = window.open(
      link,
      "TwitterWindow",
      (width = 600),
      (height = 300)
    )
    return false
  }

  function shareLinkedin(url) {
    const link = "https://plus.google.com/share?url=" + url
    window.open(
      link,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=350,width=480"
    )
    return false
  }

  // DOWNLOADS BANNER LINK
  // const isDownload = document.querySelector('#download-form')
  // if (isDownload) {
  //   const scrollButton = document.querySelector('.scroll-button-page')
  //   const downloadButtonClasses = 'right-0 sm:right-auto sm:left-40'
  //   const banner = document.querySelector('.page-hero .container-wide')
  //   const buttonHtml = `
  //     <div class="download-banner-button absolute bottom-0 ${downloadButtonClasses}" style="">
  //       <div class="link flex cursor-pointer">
  //         <div class="flex lowercase items-center px-6 py-2 bg-pop-black">
  //           <p class="link__text text-pop-white m-0 transform text-sm group-hover:text-base text-pop-white">
  //             download
  //           </p>
  //         </div>
  //         <div class="relative w-10 h-10 p-2 bg-pop-pink">
  //           <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full absolute transform left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45">
  //             <path d="M13.0607 0.625645C12.4749 0.0398579 11.5251 0.0398579 10.9393 0.625645L1.3934 10.1716C0.807611 10.7574 0.807611 11.7071 1.3934 12.2929C1.97919 12.8787 2.92893 12.8787 3.51472 12.2929L12 3.80762L20.4853 12.2929C21.0711 12.8787 22.0208 12.8787 22.6066 12.2929C23.1924 11.7071 23.1924 10.7574 22.6066 10.1716L13.0607 0.625645ZM13.5 24.3137V1.6863H10.5V24.3137H13.5Z" fill="#3A3EAB" class="fill-current text-pop-white"></path>
  //           </svg>
  //         </div>
  //       </div>
  //     </div>`
  //   banner.innerHTML += buttonHtml
  // }

  // VIDEO PLAYER

  const play = `<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 transform -translate-x-1/2 filter drop-shadow" viewBox="0 0 26 26" fill="none">
    <circle cx="13.1328" cy="12.9296" r="12.2461" fill="#FF0088" stroke="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.505 12.9296L10.25 8.72087V17.1384L17.505 12.9296ZM18.495 12.0596C18.6482 12.1474 18.7756 12.274 18.8642 12.4268C18.9527 12.5796 18.9994 12.753 18.9994 12.9296C18.9994 13.1062 18.9527 13.2797 18.8642 13.4324C18.7756 13.5852 18.6482 13.7119 18.495 13.7996L10.5412 18.4146C9.89125 18.7921 9 18.3609 9 17.5446V8.31462C9 7.49837 9.89125 7.06712 10.5412 7.44462L18.495 12.0596Z" fill="white"/>
  </svg>`;
  const pause = `<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 transform -translate-x-1/2 filter drop-shadow" viewBox="0 0 26 26" fill="none">
    <circle cx="13.1328" cy="12.9296" r="12.2461" fill="#FF0088" stroke="white"/>
    <path transform="translate(-0.5 0)" fill-rule="evenodd" clip-rule="evenodd" d="M11.0977 7.30457C11.2634 7.30457 11.4224 7.37041 11.5396 7.48762C11.6568 7.60483 11.7227 7.76381 11.7227 7.92957V17.9296C11.7227 18.0953 11.6568 18.2543 11.5396 18.3715C11.4224 18.4887 11.2634 18.5546 11.0977 18.5546C10.9319 18.5546 10.7729 18.4887 10.6557 18.3715C10.5385 18.2543 10.4727 18.0953 10.4727 17.9296V7.92957C10.4727 7.76381 10.5385 7.60483 10.6557 7.48762C10.7729 7.37041 10.9319 7.30457 11.0977 7.30457V7.30457ZM16.0977 7.30457C16.2634 7.30457 16.4224 7.37041 16.5396 7.48762C16.6568 7.60483 16.7227 7.76381 16.7227 7.92957V17.9296C16.7227 18.0953 16.6568 18.2543 16.5396 18.3715C16.4224 18.4887 16.2634 18.5546 16.0977 18.5546C15.9319 18.5546 15.7729 18.4887 15.6557 18.3715C15.5385 18.2543 15.4727 18.0953 15.4727 17.9296V7.92957C15.4727 7.76381 15.5385 7.60483 15.6557 7.48762C15.7729 7.37041 15.9319 7.30457 16.0977 7.30457V7.30457Z" fill="white"/>
  </svg>`;
  const sound = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>`;
  const mute = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>`;

  const playButton = document.querySelector('.play-button');
  const video = document.getElementById('video');
  const timeline = document.querySelector('.timeline');
  const soundButton = document.querySelector('.sound-button');
  const fullscreenButton = document.querySelector('.fullscreen-button');
  const videoContainer = document.querySelector('.video-player');
  let isFullScreen = false;
  if (playButton) {
    playButton.addEventListener('click', function () {
      if (video.paused) {
        video.play();
        videoContainer.classList.add('playing');
        playButton.innerHTML = pause;
      } else {
        video.pause();
        videoContainer.classList.remove('playing');
        playButton.innerHTML = play;
      }
    })
  }
  if (video) {
    video.onended = function () {
      playButton.innerHTML = play;
    }

    video.ontimeupdate = function () {
      const percentagePosition = (100*video.currentTime) / video.duration;
      timeline.style.backgroundSize = `${percentagePosition}% 100%`;
      timeline.value = percentagePosition;
    }
  }

  if (timeline) {
    timeline.addEventListener('change', function () {
      const time = (timeline.value * video.duration) / 100;
      video.currentTime = time;
    });
  }
  if (soundButton) {
    soundButton.addEventListener('click', function () {
      video.muted = !video.muted;
      soundButton.innerHTML = video.muted ? mute : sound;
    });
  }
  if (fullscreenButton) {
    fullscreenButton.addEventListener('click', function () {
      if (!isFullScreen) {
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.webkitRequestFullscreen) { /* Safari */
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) { /* IE11 */
            video.msRequestFullscreen();
          }
      } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
          }
      }
    });
  }

  // END VIDEO PLAYER

  if (document.querySelector(".download-banner-button")) {
    document
      .querySelector(".download-banner-button")
      .addEventListener("click", () => {
        var element = document.getElementById("download-form")
        const offset = 150
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = element.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      })
  }

  if (document.querySelector(".search-bar-button")) {
    const searchBar = document.querySelector(".search-bar-container")
    const searchNav = document.querySelector(".search-nav-items")
    document
      .querySelector(".search-bar-button")
      .addEventListener("click", () => {
        gsap.set(searchNav, { pointerEvents: "none" })
        gsap.set(searchBar, { pointerEvents: "auto" })
        gsap.to(searchNav, { duration: 0.23, opacity: 0 })
        gsap.fromTo(
          searchBar,
          { translateX: -60 + "%" },
          { duration: 1, delay: 0.25, translateX: -50 + "%", opacity: 1 }
        )
      })
    document
      .querySelector(".search-bar-close")
      .addEventListener("click", () => {
        gsap.set(searchNav, { pointerEvents: "auto" })
        gsap.set(searchBar, { pointerEvents: "none" })
        gsap.to(searchBar, { translateX: -60 + "%", duration: 0.5, opacity: 0 })
        gsap.to(searchNav, { duration: 0.5, delay: 0.5, opacity: 1 })
      })
  }

  let elements = document.querySelectorAll(".lazyframe");
  if (elements) {
    lazyframe(elements);
  }
})
