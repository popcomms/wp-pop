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
        this.tl.play();
        this.step += 1
      },
      prevStep () {
        if (this.step > 0 && this.tl.paused() === true) {
          this.tl.reverse()
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
      revealInput(target) {
        const swipes = target.getElementsByClassName('input-swipe')
        const inputs = target.getElementsByClassName('input-box')

        if (this.tl.reversed()) {
          this.hideInputAnim(inputs, swipes)
        } else {
          this.revealInputAnim(inputs, swipes)
        }
      },
      hideInput(target) {
        const swipes = target.getElementsByClassName('input-swipe')
        const inputs = target.getElementsByClassName('input-box')
        if (this.tl.reversed()) {
          this.revealInputAnim(inputs, swipes)
        } else {
          this.hideInputAnim(inputs, swipes)
        }
      },
      hideInputAnim (inputs, swipes) {
        gsap.timeline({
        })
        .to(swipes, {duration: 0.15, top: 0 + '%'})
        .to(inputs, {duration: 0.15, opacity: 0})
        .to(swipes, {duration: 0.15, top: 100 + '%'})
        .set(swipes, {top: -100 + '%'})
      },
      revealInputAnim (inputs, swipes) {
        gsap.timeline({
        })
        .to(swipes, {duration: 0.15, top: 0 + '%'})
        .to(inputs, {duration: 0.15, opacity: 1})
        .to(swipes, {duration: 0.15, top: 100 + '%'})
        .set(swipes, {top: -100 + '%'})
      }
    },
    mounted () {
      gsap.set('.steps', {pointerEvents: 'none'})
      
      this.tl = gsap
      .timeline({ paused: true })
      .to(
        ".downloads-cover",
        {
          left: 0,
          duration: 0.4
        }
      )
      .set('.steps',{ pointerEvents: 'all' })
      .to(
        [".download-steps", ".download-back"],
        {
          opacity: 1,
          duration: 0.3
        }
      )

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
      
      .to(this.$refs.step_1, {duration: 0.3, opacity: 0, pointerEvents: 'none'})
      .call( this.revealInput, [this.$refs.step_2], "+=0.1" )
      .set(this.$refs.step_2,{ pointerEvents: 'all'}, "-=0.01")
      .addPause("+=0.5")
      .call( this.hideInput, [this.$refs.step_2], "+=0.01" )
      
      .to(this.$refs.step_2, {duration: 0.3, pointerEvents: 'none'})
      .set(this.$refs.step_3,{ pointerEvents: 'all'})
      .call( this.revealInput, [this.$refs.step_3], "-=0.01" )
      .addPause("+=0.5")
      .call( this.hideInput, [this.$refs.step_3], "+=0.01" )
      
      .to(this.$refs.step_3, {duration: 0.3, pointerEvents: 'none'})
      .set(this.$refs.step_4,{ pointerEvents: 'all'})
      .call( this.revealInput, [this.$refs.step_4], "-=0.01" )
      .addPause("+=0.5")
      .call( this.hideInput, [this.$refs.step_4], "+=0.01" )

      .to(this.$refs.step_4, {duration: 0.3, pointerEvents: 'none'})
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
        }
      )
      .addPause()

    }
  })
  
  new Vue({
    el: document.getElementById('site-wrapper')
  })
})

