window.addEventListener('load', function() {
  
  var elements = document.querySelectorAll('[data-video-banner]');
  
  if (!elements.length) return;
  
  setHeights();
  window.addEventListener('resize', debounce(setHeights, 500));
  
  function setHeights() {
    
    for (var i = 0; i < elements.length; i++) {
      (function (i) {
        
        elements[i].removeAttribute('style');
        elements[i].style.height = elements[i].offsetHeight + 'px';
        elements[i].style.minHeight = elements[i].offsetHeight + 'px';
    
      }).call(this, i);
    }
    
  }
  
  function debounce(func, wait, immediate) {
  
    var timeout;
  
    return function executedFunction() {
      var context = this;
      var args = arguments;
  
      var later = function() {
        timeout = null;
        if (!immediate) { func.apply(context, args); }
      };
  
      var callNow = immediate && !timeout;
  
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);
  
      if (callNow) { func.apply(context, args); }
    };
  
  }
  
});