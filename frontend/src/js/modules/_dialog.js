(function() {
  
  var bodyScrollSettings = {
    reserveScrollBarGap: true
  };
  
  var dialogAttribute = 'data-dialog';
  var dialogOpenVideoAttribute = 'data-dialog-open-video';
  var dialogCloseAttribute = 'data-dialog-close';
  
  var dialogOpenVideoElements = document.querySelectorAll('[' + dialogOpenVideoAttribute + ']');
  
  var currentUrl = window.location.href;
  var currentTitle = document.title;
  
  assignOpenEvents();
  assignCloseEvents();
  
  function assignOpenEvents() {
    
    if (!dialogOpenVideoElements.length) return;
    
    document.addEventListener('click', function (e) {
      
      var clickedElement = e.target;
      const isDialogOpenVideoElement = clickedElement.matches('[' + dialogOpenVideoAttribute + ']');
      if (isDialogOpenVideoElement) handleOpenVideoClick(clickedElement);
      
    });
  
  }
  
  function assignCloseEvents() {
    
    document.addEventListener('click', function (e) {
      
      var clickedElement = e.target;
      var isDialogElement = clickedElement.matches('[' + dialogAttribute + ']');
      var isCloseElement = clickedElement.matches('[' + dialogCloseAttribute + ']');
    
      if (!isDialogElement && !isCloseElement) return;
      
      window.history.replaceState({}, currentTitle, currentUrl);
    
      var dialogParent = isDialogElement ? clickedElement : clickedElement.closest('[' + dialogAttribute + ']');
      const dialogParentName = dialogParent.getAttribute(dialogAttribute);
      const isInjected = dialogParentName === 'injected';
    
      if (dialogParent) {
        
        bodyScrollLock.enableBodyScroll(dialogParent, bodyScrollSettings);
        dialogParent.close();
        if (isInjected) dialogParent.remove();
    
      }
    
    });
    
  }
  
  function handleOpenVideoClick(openVideoElement) {
    
    var targetName = openVideoElement.getAttribute(dialogOpenVideoAttribute);
    var targetData = openVideoElement.getAttribute(dialogOpenVideoAttribute + '-data');
    var targetTitle = openVideoElement.getAttribute(dialogOpenVideoAttribute + '-title');
    var targetLink = openVideoElement.getAttribute(dialogOpenVideoAttribute + '-link');
    
    window.history.replaceState({}, targetTitle, targetLink);
    
    var isNative = targetName === 'native';
    
    var html = isNative ? '<div class="m-video"><video controls preload="auto" autoplay><source src="' + targetData + '" type="video/mp4"></video></div>' : '<div class="m-video"><iframe allow="autoplay; encrypted-media" allowfullscreen src="' + targetData + '" loading="lazy" width="1280" height="720"title="' + targetTitle + ' (video)"></iframe></div>';
    
    injectDialog(html, targetTitle);
    
  }
  
  function injectDialog(html, title) {
    
    var dialogHtml =
    '<dialog class="m-dialog" data-dialog="injected">' +
      '<div class="m-dialog__inner">' +
        '<div class="m-dialog__header">' +
          '<h2 class="m-dialog__title text-lg font-semibold leading-tight">' + title + '</h2>' +
          '<button class="m-dialog__header__close" type="button" data-dialog-close>' +
            '<span class="m-accessible-hide">Close dialog</span>' +
          '</button>' +
        '</div>' +
        '<div data-dialog-content>' + html + '</div>' +
      '</div>' +
    '</dialog>';
    
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', dialogHtml);
    showDialog('injected');
    
  }
  
  function showDialog(targetName) {
    
    var target = document.querySelector('[data-dialog="' + targetName + '"]');
    
    if (target) {
      
      setTimeout(function () {
      
        try {
          target.scroll({ top: 0, behavior: 'auto' });
        } catch (e) { }
      
      }, 10);
      
      target.showModal();
      
      bodyScrollLock.disableBodyScroll(target, bodyScrollSettings);
      
      if (targetName !== 'injected') return;
      
      target.addEventListener('close', function(e) {
        
        window.history.replaceState({}, currentTitle, currentUrl);
        bodyScrollLock.enableBodyScroll(target, bodyScrollSettings);
        target.remove();
        
      });
       
    }
    
  }
  
})();