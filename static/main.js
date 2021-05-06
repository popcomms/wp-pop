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
        email: '',
        firstName: '',
        surName: '',
        company: ''
      }
    },
    methods: {
      nextStep () {
        this.tl.play();
        this.step += 1
      },
      prevStep () {
        if (this.step > 0 ) {
          this.tl.reverse()
          this.step -= 1
        }
      },
      validateEmail: function(e) {
        if (e.keyCode === 13) {
          this.nextStep()
        }
      },
      validateName: function(e) {
        if (e.keyCode === 13) {
          this.nextStep()
        }
      },
      validateCompany: function(e) {
        if (e.keyCode === 13) {
          this.nextStep()
        }
      }
    },
    mounted () {
      gsap.set(this.$refs.step_1, { opacity: 0 })
      gsap.set('.steps', {pointerEvents: 'none'})
      
      this.tl = gsap
      .timeline({ paused: true })
      .to(
        ".download_cover",
        {
          left: 0,
          duration: 0.75
        }
      )
      .fromTo(
        '.steps',
        {
          pointerEvents: 'none'
        },
        {
          pointerEvents: 'all',
          duration: 0.5
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
          duration: 1,
          stagger: 0.5
        },
        "-=0.5"
      )
      .addPause()
      .to(this.$refs.step_1, {duration: 1, opacity: 0, pointerEvents: 'none'})
      .fromTo(
        this.$refs.step_2,
        {
          opacity: 0,
          pointerEvents: 'none'
        },
        {
          pointerEvents: 'all',
          opacity: 1,
          duration: 1,
          stagger: 0.5
        },
        "-=0.5"
      )
      .addPause()
      .to(this.$refs.step_2, {duration: 1, opacity: 0, pointerEvents: 'none'})
      .fromTo(
        this.$refs.step_3,
        {
          opacity: 0,
          pointerEvents: 'none'
        },
        {
          pointerEvents: 'all',
          opacity: 1,
          duration: 1,
          stagger: 0.5
        },
        "-=0.5"
      )
      .addPause()
      .to(this.$refs.step_3, {duration: 1, opacity: 0, pointerEvents: 'none'})
      .fromTo(
        this.$refs.step_4,
        {
          opacity: 0,
          pointerEvents: 'none'
        },
        {
          pointerEvents: 'all',
          opacity: 1,
          duration: 1,
          stagger: 0.5
        },
        "-=0.5"
      )
      .addPause()
    }
  })
  
  new Vue({
    el: document.getElementById('site-wrapper')
  })
})

