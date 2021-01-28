/* http://gregfranko.com/blog/jquery-best-practices/ */
(function($) {

  /* Clipboard --------------------------*/

  function changeTooltipMessage(element, msg) {
    var tooltipOriginalTitle=element.getAttribute('data-original-title');
    element.setAttribute('data-original-title', msg);
    $(element).tooltip('show');
    element.setAttribute('data-original-title', tooltipOriginalTitle);
  }

  if(ClipboardJS.isSupported()) {
    $(document).ready(function() {
      var copyButton = "<button type='button' class='btn btn-primary btn-copy-ex' type = 'submit' title='Copier le code' aria-label='Copier le code' data-toggle='tooltip' data-placement='right auto' data-trigger='hover' data-clipboard-copy><i class='fas fa-copy'></i></button>";
      
       $( "pre" ).wrap( "<div class='sourceCode'></div>" );

      $(".examples, div.sourceCode").addClass("hasCopyButton");

      // Insert copy buttons:
      $(copyButton).prependTo(".hasCopyButton");

      // Initialize tooltips:
      $('.btn-copy-ex').tooltip({container: 'body'});

      // Initialize clipboard:
      var clipboardBtnCopies = new ClipboardJS('[data-clipboard-copy]', {
        text: function(trigger) {
          return trigger.parentNode.textContent;
        }
      });

      clipboardBtnCopies.on('success', function(e) {
        changeTooltipMessage(e.trigger, 'Copié!');
        e.clearSelection();
      });

      clipboardBtnCopies.on('error', function() {
        changeTooltipMessage(e.trigger,'Press Ctrl+C or Command+C to copy');
      });
    });
  }
})(window.jQuery || window.$)
