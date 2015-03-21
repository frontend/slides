'use strict';

(function($, Reveal){
  function focusCode (event) {
    var $this = $(event.fragment);
    if (typeof $this.attr("data-focus") !== typeof undefined) {
      var lineData = $this.data('focus');
      if (String(lineData).match(/\,/g)) {
        var lines = lineData.split(',');
        $this.parents('section').find('pre .rainbow-line').css('opacity', '0.3');
        lines.forEach(function(line) {
          $this.parents('section').find('pre .rainbow-line-'+line).css('opacity', '1');
        });
      } else {
        $this.parents('section').find('pre .rainbow-line').css('opacity', '0.3');
        $this.parents('section').find('pre .rainbow-line-'+lineData).css('opacity', '1');
      }
    }
  }
  Reveal.addEventListener( 'slidechanged', function( event ) {
    $(event.currentSlide).find('pre .rainbow-line').css('opacity', '1');
  });
  Reveal.addEventListener( 'fragmentshown', function( event ) {
    focusCode(event);
  });
  Reveal.addEventListener( 'fragmenthidden', function( event ) {
    focusCode(event);
  });
}(jQuery, Reveal));