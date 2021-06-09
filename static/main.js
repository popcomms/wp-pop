console.log('JS Active');
document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  
  console.log('Document Loaded - V4');

  Vue.component('downloads', {
    data () {
      return {
        step: 0,
        stepName: [
          '',
          'consent',
          'email',
          'name',
          'Company'
        ],
        email: '',
        firstName: '',
        surName: '',
        company: ''
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
        if (this.downloadTl.paused() === true || this.downloadTl.progress() == 0) {
          console.log('next')
          this.downloadTl.play();
          this.step += 1
        }
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
      validateEmail: function(e) {
        if (e.keyCode === 13 || e.type === 'click') {
          this.nextStep()
        }
      },
      validateName: function(e) {
        if (e.keyCode === 13 || e.type === 'click') {
          this.nextStep()
        }
      },
      validateCompany: function(e) {
        if (e.keyCode === 13 || e.type === 'click') {
          this.nextStep()
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
  

  Vue.component('contact-form', {
    data () {
      return {
        step: 0,
        enquiry: '', 
        email: '',
        name: '',
        showInput: 'email'
      }
    },
    methods: {
      nextStepContact () {
        if (this.contactTl.paused() === true) {
          this.contactTl.tweenFromTo(`${this.step}`, `${this.step + 1}`)
          this.step += 1
        }
      },
      prevStepContact () {
        if (this.step > 0 && this.contactTl.paused() === true) {
          this.contactTl.reverse()
          this.step -= 1
        }
      },
      validateEmail (e) {
        if (e.keyCode === 13 || e.type === 'click') {
          this.nextStepContact()
        }
      },
      validateName (e) {
        if (e.keyCode === 13 || e.type === 'click') {
          this.nextStepContact()
        }
      },
      revealInput(step) {
        const borders = step.getElementsByClassName('input-border')
        const guides = step.getElementsByClassName('input-guide')
        const inputs = step.querySelectorAll('.input-content')
        const text = step.querySelectorAll('h4')
        
        if (this.contactTl.reversed()) {
          this.hideInputAnim(step, inputs, borders, guides, text)
        } else {
          this.revealInputAnim(step, inputs, borders, guides, text)
        }
      },
      hideInput(step) {
        const borders = step.getElementsByClassName('input-border')
        const guides = step.getElementsByClassName('input-guide')
        const inputs = step.querySelectorAll('.input-content')
        const text = step.querySelectorAll('h4')
        
        if (this.contactTl.reversed()) {
          this.revealInputAnim(step, inputs, borders, guides, text)
        } else {
          this.hideInputAnim(step, inputs, borders, guides, text)
        }
      },
      restartTL () {
        this.contactTl.tweenFromTo(`${this.step}`, "0")
        console.log('restart')
        this.step = 0
      },
      // leaveTL () {
      //   for (let i = 0; i < this.step; i++) {
      //     this.contactTl.reverse()
      //   }
      //   this.step = 0
      // },
      hideInputAnim (step, inputs, borders, guides, text) {
        gsap.timeline({
        })
        .to(borders, {duration: 0.5, width: 0 + '%'})
        .to(text, {duration: 0.5, opacity: 0}, "-0.5")
        .to(inputs, {duration: 0.5, translateY: -100 + '%', opacity: 1,  ease: "power3.in"}, "-=0.5")
        .to(guides, {duration: 0.3, opacity: 0,  ease: "power3.in"}, "-=0.3")
        .set(inputs, {translateY: 100 + '%'})
        .set(step, {pointerEvents: 'none'})
      },
      revealInputAnim (step, inputs, borders, guides, text) {
        gsap.timeline({
        })
        .to(borders, {duration: 0.5, width: 100 + '%'})
        .to(text, {duration: 0.5, opacity: 1}, "-0.5")
        .to(inputs, {duration: 0.5, translateY: 0 + '%', opacity: 1, ease: "power3.out"}, "-=0.5")
        .to(guides, {duration: 0.3, opacity: 1,  ease: "power3.in"}, "-=0.3")
        .set(step,{ pointerEvents: 'all'}, "-=0.01")
      },
    },
    mounted () {

      gsap.set(this.$refs.steps, {pointerEvents: 'none'})
      
      this.contactTl = gsap.timeline({ paused: true })
      // Show form

      .addLabel("0")
      .set(this.$refs.steps, {opacity: 1})
      .to(this.$refs.form_bg,{opacity: 1, duration: 0.4})
      .set(this.$refs.steps,{ pointerEvents: 'all' })
      .to([".contact-steps", ".contact-back"], {opacity: 1,duration: 0.3})
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
      // .addPause()
      .addLabel("1")
      // Change step 1 -> 2
      .to(this.$refs.step_1, {duration: 0.3, opacity: 0, pointerEvents: 'none'})
      .to(this.$refs.step_2.querySelectorAll('h4'), {duration: 0.3, opacity: 1})
      .call( this.revealInput, [this.$refs.email_input], "-=0.3" )
      // .addPause("+=0.2")
      .addLabel("2")
      // switch inputs
      .call( this.hideInput, [this.$refs.email_input], "+=0.1" )
      // .to(this.$refs.email_text, {duration: 0.3, color: this.baseColor})
      .call( this.revealInput, [this.$refs.name_input], "+=0.3" )
      // .to(this.$refs.name_text, {duration: 0.3, color: this.highlightColor})
      // .addPause("+=0.2")
      .addLabel("3")
      // Change step 2 -> 3
      .to(this.$refs.step_2.querySelectorAll('h4'), {duration: 0.3, opacity: 0})
      .call( this.hideInput, [this.$refs.name_input], "-=0.29" )
      .fromTo(
        this.$refs.step_3,
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
      // .addPause()
      .addLabel("4")
    }
  })

  Vue.component('MainMenu', {
    data () {
      return {
        test: 'test',
        menuActive: false,
        activeChild: '',
        showMenuTl: gsap.timeline({ paused: true }),
        contactActive: false
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
        this.contactActive = true
        this.$refs.contactForm.step = 0
        this.$refs.contactForm.nextStepContact()
      },
      hideContactForm () {
        // this.contactActive = false
        this.contactActive = false
        this.$refs.contactForm.restartTL()
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

