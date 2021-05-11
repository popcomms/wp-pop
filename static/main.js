console.log('JS Active');
document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  
  console.log('Document Loaded - V2');

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

  const magnifyImage = document.querySelectorAll('.image-magnify');
  for (var i = 0; i < magnifyImage.length; i++) {
    let index = i
    magnifyImage[index].addEventListener("click", function() {
      let popup = magnifyImage[index].closest('.container-narrow').querySelector('.full-width-image-popup');
      popup.style.display = "block";
      gsap.to(popup, { duration: 0.3, opacity: 1 })
    })
  }

  const hideImage = document.querySelectorAll('.image-hide');
  for (var i = 0; i < hideImage.length; i++) {
    let index = i
    hideImage[index].addEventListener("click", function() {
        let popup = hideImage[index].closest('.container-narrow').querySelector('.full-width-image-popup');
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
        if (this.downloadTl.paused() === true) {
          this.downloadTl.play();
          this.step += 1
        }
      },
      prevStep () {
        console.log('prev')
        if (this.step > 0 && this.downloadTl.paused() === true) {
          console.log('prev active')
          this.downloadTl.reverse()
          this.step -= 1
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
    computed: {
      activeForm () {
        if (this.showInput === 'email') {
          return 'text-pop-yellow'
        } else {
          return 'text-pop-white'
        }
      }
    },
    methods: {
      nextStepContact () {
        if (this.contactTl.paused() === true) {
          this.contactTl.play();
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
      .addPause()
      // Change step 1 -> 2
      .to(this.$refs.step_1, {duration: 0.3, opacity: 0, pointerEvents: 'none'})
      .to(this.$refs.step_2.querySelectorAll('h4'), {duration: 0.3, opacity: 1})
      .call( this.revealInput, [this.$refs.email_input], "-=0.3" )
      .addPause("+=0.2")
      // switch inputs
      .call( this.hideInput, [this.$refs.email_input], "+=0.1" )
      .to(this.$refs.email_text, {duration: 0.3, color: '#FFFFFF'})
      .call( this.revealInput, [this.$refs.name_input], "+=0.3" )
      .to(this.$refs.name_text, {duration: 0.3, color: '#FFFF99'})
      .addPause("+=0.2")
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
      .addPause()
    }
  })

  new Vue({
    el: document.getElementById('site-wrapper')
  })
})

