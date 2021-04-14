console.log('JS Active');
document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  
  console.log('Document Loaded');
  gsap.set(".section__title", {
    y: 100,
    opacity: 0,
  })
  gsap.set(".section__item", {
    y: 100,
    opacity: 0,
  })
  
  gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section",
      toggleActions: "play none none none"
    },
  })
  .to(
    ".section__title",
    {
      y: 0,
      opacity: 1,
      duration: 0.75
    }
  )
  .to(
    ".section__item",
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.5
    },
    "-=0.5"
  );
})
