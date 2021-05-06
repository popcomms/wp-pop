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
})
