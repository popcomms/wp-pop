window.addEventListener('load', function() {
  
  var attributeName = 'data-intersection-observer';
  
  var elements = document.querySelectorAll('[' + attributeName + ']');
  
  if (!elements.length) return;
  
  var elementObserver;
  
  var isSupported = 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype;
  
  setup();
  
  function setup() {
    
    if (!isSupported) {
      
      for (var i = 0; i < elements.length; i++) {
        (function (i) {
          
          elements[i].setAttribute(attributeName, 'visible');
      
        }).call(this, i);
      }
      
      return;
      
    }
    
    elementObserver = new IntersectionObserver(function(entries) {
      
      for (var i = 0; i < entries.length; i++) {
        (function (i) {
          
          if (entries[i].isIntersecting) {
          
            entries[i].target.setAttribute(attributeName, 'visible');
          
          }
      
        }).call(this, i);
      }
  
    }, { threshold: 0.25 });
    
    for (var j = 0; j < elements.length; j++) {
      (function (j) {
        
        elementObserver.observe(elements[j]);
    
      }).call(this, j);
    }
    
  }
  
});