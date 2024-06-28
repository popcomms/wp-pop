(function() {
  
  var elements = document.querySelectorAll('[data-video="autoplay"]');
  
  if (!elements.length) return;
  
  for (var i = 0; i < elements.length; i++) {
    (function (i) {
      
      initAutoplayVideo(elements[i], i);      
  
    }).call(this, i);
  }
  
  function initAutoplayVideo(element, videoIndex) {
    
    var videoMarkup = getAutoplayVideoMarkup(element);
    element.insertAdjacentHTML('beforeend', videoMarkup);
    
  }
  
  function getAutoplayVideoMarkup(element) {
    
    var source = window.matchMedia('(min-width: 641px)').matches ? element.getAttribute('data-video-large-source') : element.getAttribute('data-video-small-source');
    return '<video autoplay loop muted playsinline preload="metadata" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><source src="' + source + '" type="video/mp4" /></video>';
    
  }
  
})();