'use strict';

(function($, Reveal){
  function focusCode (event) {
    var $this = $(event.fragment),
        $targetID = $this.attr("data-target"),
        $target = $($targetID);
    if (typeof $this.attr("data-focus") !== typeof undefined) {
      var lineData = $this.data('focus');
      if (String(lineData).match(/\,/g)) {
        var lines = lineData.split(',');
        $target.find('.rainbow-line').css('opacity', '0.4');
        lines.forEach(function(line) {
          $target.find('.rainbow-line-'+line).css('opacity', '1');
        });
      } else {
        $target.find('.rainbow-line').css('opacity', '0.4');
        $target.find('.rainbow-line-'+lineData).css('opacity', '1');
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