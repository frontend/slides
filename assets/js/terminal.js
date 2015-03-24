'use strict';

(function($, Reveal){
  function getHour () {
    var currentdate = new Date(); 
    var currenthour = ('0' + currentdate.getHours()).slice(-2) + ':' +
                      ('0' + currentdate.getMinutes()).slice(-2) + ':' +
                      ('0' + currentdate.getSeconds()).slice(-2);
    return currenthour;
  }

  function getDate () {
    var currentdate = new Date(); 
    var currenthour = currentdate.getFullYear() + '-' +
                      (currentdate.getMonth()+1) + '-' +
                      currentdate.getDate();
    return currenthour;
  }

  function launchTerminal (event) {
    var $this = $(event.fragment);
    if (typeof $this.attr('data-terminal') !== typeof undefined) {
      var $terminal = $($this.data('terminal')),
          command = $terminal.data('command'),
          result = $terminal.data('result');

      result = result.replace(new RegExp('_HOUR_','gm'), getHour());
      result = result.replace(new RegExp('_DATE_','gm'), getDate());

      $('<span class="terminal-render"></span>').insertAfter($terminal);
      var $render = $terminal.next('.terminal-render');

      $render.typed({
          strings: [''+command+''],
          typeSpeed: 100,
          backDelay: 500,
          loop: false,
          contentType: 'html', // or text
          // defaults to false for infinite loop
          loopCount: true,
          callback: function(){
            if (String(result).match(/\,/g)) {
              var results = result.split(',');
              for (var i = 0; i < results.length; i++) {
                setTimeout(function(x) { return function() {
                  $render.append('<br>'+results[x]);
                }; }(i), 200*i);
              }
            } else {
              setTimeout(function(){
                $render.append('<br>'+result);
              }, 500);
            }
            $render.next('.typed-cursor').remove();
          },
          resetCallback: function() {console.log(this);}
      });
    }
  }

  function resetTerminal (event) {
    var $this = $(event.fragment);
    if (typeof $this.attr('data-terminal') !== typeof undefined) {
      var $terminal = $($this.data('terminal'));
      $terminal.next('.terminal-render').remove();
      $terminal.next('.typed-cursor').remove();
    }
  }

  Reveal.addEventListener( 'fragmentshown', function(event) {
    launchTerminal(event);
  });
  Reveal.addEventListener( 'fragmenthidden', function( event ) {
    resetTerminal(event);
  });
}(jQuery, Reveal));