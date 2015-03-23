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
emojify.setConfig({
    img_dir          : 'img/emoji',  // Directory for emoji images
    ignored_tags     : {                // Ignore the following tags
        'SCRIPT'  : 1,
        'TEXTAREA': 1,
        'PRE'     : 1,
        'CODE'    : 1
    }
});
emojify.run();
'use strict';

(function(Reveal){
  var BGR;

  function fullscreen(event) {
    var url = event.currentSlide.getAttribute("fullscreen-img");
    if(url) {
      if(typeof BGR == "undefined")
      {
        // Store background value
        BGR = document.body.style.background;
      }

      // Set image from fullscreen-img attribute as body background
      document.body.style.backgroundImage = "url('" + url + "')";
      var size = event.currentSlide.getAttribute("fullscreen-size");
      if(size != "contain") {
        document.body.style.backgroundSize = "cover";
      }
      else {
        // Put image in 'contain' mode with black background
        // TODO store background color and use it. This is possible by regexping
        // the background property and replacing the 2nd value by the image url.
        // See http://www.w3schools.com/cssref/css3_pr_background.asp
        document.body.style.backgroundColor = "#000000";
        document.body.style.backgroundSize  = "contain";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundPosition = "center center";
      }
    }
    else { 
      if(typeof BGR != "undefined") { 
        document.body.style.backgroundImage = "none";
        document.body.style.background      = BGR;
      } 
    }
  }

  Reveal.addEventListener('ready', function(event) {
    fullscreen(event);
  }, false );

  Reveal.addEventListener('slidechanged', function(event) {
    fullscreen(event);
  }, false );
}(Reveal));
'use strict';


/**
 * Rainbow Highlighter
 *
 * Copyright 2013 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Rainbow is a simple code syntax highlighter
 *
 * Included languages: c, shell, generic, javascript, python, html, php, ruby, css
 *
 * @preserve @version 1.2
 * @url rainbowco.de
 */

window.Rainbow=function(){function q(a){var b,c=a.getAttribute&&a.getAttribute("data-language")||0;if(!c){a=a.attributes;for(b=0;b<a.length;++b)if("data-language"===a[b].nodeName)return a[b].nodeValue}return c}function B(a){var b=q(a)||q(a.parentNode);if(!b){var c=/\blang(?:uage)?-(\w+)/;(a=a.className.match(c)||a.parentNode.className.match(c))&&(b=a[1])}return b}function C(a,b){for(var c in f[d]){c=parseInt(c,10);if(a==c&&b==f[d][c]?0:a<=c&&b>=f[d][c])delete f[d][c],delete j[d][c];if(a>=c&&a<f[d][c]||
b>c&&b<f[d][c])return!0}return!1}function r(a,b){return'<span class="'+a.replace(/\./g," ")+(l?" "+l:"")+'">'+b+"</span>"}function s(a,b,c,i){var e=a.exec(c);if(e){++t;!b.name&&"string"==typeof b.matches[0]&&(b.name=b.matches[0],delete b.matches[0]);var k=e[0],g=e.index,u=e[0].length+g,h=function(){function e(){s(a,b,c,i)}t%100>0?e():setTimeout(e,0)};if(C(g,u))h();else{var m=v(b.matches),l=function(a,c,i){if(a>=c.length)i(k);else{var d=e[c[a]];if(d){var g=b.matches[c[a]],f=g.language,h=g.name&&g.matches?
g.matches:g,j=function(b,d,g){var f;f=0;var h;for(h=1;h<c[a];++h)e[h]&&(f=f+e[h].length);d=g?r(g,d):d;k=k.substr(0,f)+k.substr(f).replace(b,d);l(++a,c,i)};f?n(d,f,function(a){j(d,a)}):typeof g==="string"?j(d,d,g):w(d,h.length?h:[h],function(a){j(d,a,g.matches?g.name:0)})}else l(++a,c,i)}};l(0,m,function(a){b.name&&(a=r(b.name,a));if(!j[d]){j[d]={};f[d]={}}j[d][g]={replace:e[0],"with":a};f[d][g]=u;h()})}}else i()}function v(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(c);return b.sort(function(a,
b){return b-a})}function w(a,b,c){function i(b,k){k<b.length?s(b[k].pattern,b[k],a,function(){i(b,++k)}):D(a,function(a){delete j[d];delete f[d];--d;c(a)})}++d;i(b,0)}function D(a,b){function c(a,b,i,f){if(i<b.length){++x;var h=b[i],l=j[d][h],a=a.substr(0,h)+a.substr(h).replace(l.replace,l["with"]),h=function(){c(a,b,++i,f)};0<x%250?h():setTimeout(h,0)}else f(a)}var i=v(j[d]);c(a,i,0,b)}function n(a,b,c){var d=m[b]||[],e=m[y]||[],b=z[b]?d:d.concat(e);w(a.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&(?![\w\#]+;)/g,
"&amp;"),b,c)}function o(a,b,c){if(b<a.length){var d=a[b],e=B(d);return!(-1<(" "+d.className+" ").indexOf(" rainbow "))&&e?(e=e.toLowerCase(),d.className+=d.className?" rainbow":"rainbow",n(d.innerHTML,e,function(k){d.innerHTML=k;j={};f={};p&&p(d,e);setTimeout(function(){o(a,++b,c)},0)})):o(a,++b,c)}c&&c()}function A(a,b){var a=a&&"function"==typeof a.getElementsByTagName?a:document,c=a.getElementsByTagName("pre"),d=a.getElementsByTagName("code"),e,f=[],g=[];for(e=0;e<c.length;++e)c[e].getElementsByTagName("code").length?
c[e].innerHTML=c[e].innerHTML.replace(/^\s+/,"").replace(/\s+$/,""):f.push(c[e]);for(e=0;e<d.length;++e)g.push(d[e]);o(g.concat(f),0,b)}var j={},f={},m={},z={},d=0,y=0,t=0,x=0,l,p;return{extend:function(a,b,c){1==arguments.length&&(b=a,a=y);z[a]=c;m[a]=b.concat(m[a]||[])},b:function(a){p=a},a:function(a){l=a},color:function(a,b,c){if("string"==typeof a)return n(a,b,c);if("function"==typeof a)return A(0,a);A(a,b)}}}();
document.addEventListener?document.addEventListener("DOMContentLoaded",Rainbow.color,!1):window.attachEvent("onload",Rainbow.color);Rainbow.onHighlight=Rainbow.b;Rainbow.addClass=Rainbow.a;Rainbow.extend("c",[{name:"meta.preprocessor",matches:{1:[{matches:{1:"keyword.define",2:"entity.name"},pattern:/(\w+)\s(\w+)\b/g},{name:"keyword.define",pattern:/endif/g},{name:"constant.numeric",pattern:/\d+/g},{matches:{1:"keyword.include",2:"string"},pattern:/(include)\s(.*?)$/g}]},pattern:/\#([\S\s]*?)$/gm},{name:"keyword",pattern:/\b(do|goto|typedef)\b/g},{name:"entity.label",pattern:/\w+:/g},{matches:{1:"storage.type",3:"storage.type",4:"entity.name.function"},pattern:/\b((un)?signed|const)? ?(void|char|short|int|long|float|double)\*? +((\w+)(?= ?\())?/g},
{matches:{2:"entity.name.function"},pattern:/(\w|\*) +((\w+)(?= ?\())/g},{name:"storage.modifier",pattern:/\b(static|extern|auto|register|volatile|inline)\b/g},{name:"support.type",pattern:/\b(struct|union|enum)\b/g}]);Rainbow.extend("shell",[{name:"shell",matches:{1:{language:"shell"}},pattern:/\$\(([\s\S]*?)\)/gm},{matches:{2:"string"},pattern:/(\(|\s|\[|\=)(('|")[\s\S]*?(\3))/gm},{name:"keyword.operator",pattern:/&lt;|&gt;|&amp;/g},{name:"comment",pattern:/\#[\s\S]*?$/gm},{name:"storage.function",pattern:/(.+?)(?=\(\)\s{0,}\{)/g},{name:"support.command",pattern:/\b(echo|rm|ls|(mk|rm)dir|cd|find|cp|exit|pwd|exec|trap|source|shift|unset)/g},{matches:{1:"keyword"},pattern:/\b(break|case|continue|do|done|elif|else|esac|eval|export|fi|for|function|if|in|local|return|set|then|unset|until|while)(?=\(|\b)/g}],
!0);Rainbow.extend([{matches:{1:{name:"keyword.operator",pattern:/\=/g},2:{name:"string",matches:{name:"constant.character.escape",pattern:/\\('|"){1}/g}}},pattern:/(\(|\s|\[|\=|:)(('|")([^\\\1]|\\.)*?(\3))/gm},{name:"comment",pattern:/\/\*[\s\S]*?\*\/|(\/\/|\#)[\s\S]*?$/gm},{name:"constant.numeric",pattern:/\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi},{matches:{1:"keyword"},pattern:/\b(and|array|as|b(ool(ean)?|reak)|c(ase|atch|har|lass|on(st|tinue))|d(ef|elete|o(uble)?)|e(cho|lse(if)?|xit|xtends|xcept)|f(inally|loat|or(each)?|unction)|global|if|import|int(eger)?|long|new|object|or|pr(int|ivate|otected)|public|return|self|st(ring|ruct|atic)|switch|th(en|is|row)|try|(un)?signed|var|void|while)(?=\(|\b)/gi},
{name:"constant.language",pattern:/true|false|null/g},{name:"keyword.operator",pattern:/\+|\!|\-|&(gt|lt|amp);|\||\*|\=/g},{matches:{1:"function.call"},pattern:/(\w+?)(?=\()/g},{matches:{1:"storage.function",2:"entity.name.function"},pattern:/(function)\s(.*?)(?=\()/g}]);Rainbow.extend("javascript",[{name:"selector",pattern:/(\s|^)\$(?=\.|\()/g},{name:"support",pattern:/\b(window|document)\b/g},{matches:{1:"support.property"},pattern:/\.(length|node(Name|Value))\b/g},{matches:{1:"support.function"},pattern:/(setTimeout|setInterval)(?=\()/g},{matches:{1:"support.method"},pattern:/\.(getAttribute|push|getElementById|getElementsByClassName|log|setTimeout|setInterval)(?=\()/g},{matches:{1:"support.tag.script",2:[{name:"string",pattern:/('|")(.*?)(\1)/g},{name:"entity.tag.script",
pattern:/(\w+)/g}],3:"support.tag.script"},pattern:/(&lt;\/?)(script.*?)(&gt;)/g},{name:"string.regexp",matches:{1:"string.regexp.open",2:{name:"constant.regexp.escape",pattern:/\\(.){1}/g},3:"string.regexp.close",4:"string.regexp.modifier"},pattern:/(\/)(?!\*)(.+)(\/)([igm]{0,3})/g},{matches:{1:"storage",3:"entity.function"},pattern:/(var)?(\s|^)(\S*)(?=\s?=\s?function\()/g},{matches:{1:"keyword",2:"entity.function"},pattern:/(new)\s+(.*)(?=\()/g},{name:"entity.function",pattern:/(\w+)(?=:\s{0,}function)/g}]);Rainbow.extend("python",[{name:"variable.self",pattern:/self/g},{name:"constant.language",pattern:/None|True|False|NotImplemented|\.\.\./g},{name:"support.object",pattern:/object/g},{name:"support.function.python",pattern:/\b(bs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|bin|file|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|set|apply|delattr|help|next|setattr|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern)(?=\()/g},
{matches:{1:"keyword"},pattern:/\b(pass|lambda|with|is|not|in|from|elif|raise|del)(?=\(|\b)/g},{matches:{1:"storage.class",2:"entity.name.class",3:"entity.other.inherited-class"},pattern:/(class)\s+(\w+)\((\w+?)\)/g},{matches:{1:"storage.function",2:"support.magic"},pattern:/(def)\s+(__\w+)(?=\()/g},{name:"support.magic",pattern:/__(name)__/g},{matches:{1:"keyword.control",2:"support.exception.type"},pattern:/(except) (\w+):/g},{matches:{1:"storage.function",2:"entity.name.function"},pattern:/(def)\s+(\w+)(?=\()/g},
{name:"entity.name.function.decorator",pattern:/@([\w\.]+)/g},{name:"comment.docstring",pattern:/('{3}|"{3})[\s\S]*?\1/gm}]);Rainbow.extend("html",[{name:"source.php.embedded",matches:{2:{language:"php"}},pattern:/&lt;\?=?(?!xml)(php)?([\s\S]*?)(\?&gt;)/gm},{name:"source.css.embedded",matches:{"0":{language:"css"}},pattern:/&lt;style(.*?)&gt;([\s\S]*?)&lt;\/style&gt;/gm},{name:"source.js.embedded",matches:{"0":{language:"javascript"}},pattern:/&lt;script(?! src)(.*?)&gt;([\s\S]*?)&lt;\/script&gt;/gm},{name:"comment.html",pattern:/&lt;\!--[\S\s]*?--&gt;/g},{matches:{1:"support.tag.open",2:"support.tag.close"},pattern:/(&lt;)|(\/?\??&gt;)/g},
{name:"support.tag",matches:{1:"support.tag",2:"support.tag.special",3:"support.tag-name"},pattern:/(&lt;\??)(\/|\!?)(\w+)/g},{matches:{1:"support.attribute"},pattern:/([a-z-]+)(?=\=)/gi},{matches:{1:"support.operator",2:"string.quote",3:"string.value",4:"string.quote"},pattern:/(=)('|")(.*?)(\2)/g},{matches:{1:"support.operator",2:"support.value"},pattern:/(=)([a-zA-Z\-0-9]*)\b/g},{matches:{1:"support.attribute"},pattern:/\s(\w+)(?=\s|&gt;)(?![\s\S]*&lt;)/g}],!0);Rainbow.extend("php",[{name:"support",pattern:/\becho\b/g},{matches:{1:"variable.dollar-sign",2:"variable"},pattern:/(\$)(\w+)\b/g},{name:"constant.language",pattern:/true|false|null/ig},{name:"constant",pattern:/\b[A-Z0-9_]{2,}\b/g},{name:"keyword.dot",pattern:/\./g},{name:"keyword",pattern:/\b(die|end(for(each)?|switch|if)|case|require(_once)?|include(_once)?)(?=\(|\b)/g},{matches:{1:"keyword",2:{name:"support.class",pattern:/\w+/g}},pattern:/(instanceof)\s([^\$].*?)(\)|;)/g},{matches:{1:"support.function"},
pattern:/\b(array(_key_exists|_merge|_keys|_shift)?|isset|count|empty|unset|printf|is_(array|string|numeric|object)|sprintf|each|date|time|substr|pos|str(len|pos|tolower|_replace|totime)?|ord|trim|in_array|implode|end|preg_match|explode|fmod|define|link|list|get_class|serialize|file|sort|mail|dir|idate|log|intval|header|chr|function_exists|dirname|preg_replace|file_exists)(?=\()/g},{name:"variable.language.php-tag",pattern:/(&lt;\?(php)?|\?&gt;)/g},{matches:{1:"keyword.namespace",2:{name:"support.namespace",
pattern:/\w+/g}},pattern:/\b(namespace|use)\s(.*?);/g},{matches:{1:"storage.modifier",2:"storage.class",3:"entity.name.class",4:"storage.modifier.extends",5:"entity.other.inherited-class",6:"storage.modifier.extends",7:"entity.other.inherited-class"},pattern:/\b(abstract|final)?\s?(class|interface|trait)\s(\w+)(\sextends\s)?([\w\\]*)?(\simplements\s)?([\w\\]*)?\s?\{?(\n|\})/g},{name:"keyword.static",pattern:/self::|static::/g},{matches:{1:"storage.function",2:"support.magic"},pattern:/(function)\s(__.*?)(?=\()/g},
{matches:{1:"keyword.new",2:{name:"support.class",pattern:/\w+/g}},pattern:/\b(new)\s([^\$].*?)(?=\)|\(|;)/g},{matches:{1:{name:"support.class",pattern:/\w+/g},2:"keyword.static"},pattern:/([\w\\]*?)(::)(?=\b|\$)/g},{matches:{2:{name:"support.class",pattern:/\w+/g}},pattern:/(\(|,\s?)([\w\\]*?)(?=\s\$)/g}]);Rainbow.extend("ruby",[{name:"string",matches:{1:"string.open",2:{name:"string.keyword",pattern:/(\#\{.*?\})/g},3:"string.close"},pattern:/("|`)(.*?[^\\\1])?(\1)/g},{name:"string",pattern:/('|"|`)([^\\\1\n]|\\.)*\1/g},{name:"string",pattern:/%[qQ](?=(\(|\[|\{|&lt;|.)(.*?)(?:'|\)|\]|\}|&gt;|\1))(?:\(\2\)|\[\2\]|\{\2\}|\&lt;\2&gt;|\1\2\1)/g},{matches:{1:"string",2:"string",3:"string"},pattern:/(&lt;&lt;)(\w+).*?$([\s\S]*?^\2)/gm},{matches:{1:"string",2:"string",3:"string"},pattern:/(&lt;&lt;\-)(\w+).*?$([\s\S]*?\2)/gm},
{name:"string.regexp",matches:{1:"string.regexp",2:{name:"string.regexp",pattern:/\\(.){1}/g},3:"string.regexp",4:"string.regexp"},pattern:/(\/)(.*?)(\/)([a-z]*)/g},{name:"string.regexp",matches:{1:"string.regexp",2:{name:"string.regexp",pattern:/\\(.){1}/g},3:"string.regexp",4:"string.regexp"},pattern:/%r(?=(\(|\[|\{|&lt;|.)(.*?)('|\)|\]|\}|&gt;|\1))(?:\(\2\)|\[\2\]|\{\2\}|\&lt;\2&gt;|\1\2\1)([a-z]*)/g},{name:"comment",pattern:/#.*$/gm},{name:"comment",pattern:/^\=begin[\s\S]*?\=end$/gm},{matches:{1:"constant"},
pattern:/(\w+:)[^:]/g},{matches:{1:"constant.symbol"},pattern:/[^:](:(?:\w+|(?=['"](.*?)['"])(?:"\2"|'\2')))/g},{name:"constant.numeric",pattern:/\b(0x[\da-f]+|\d+)\b/g},{name:"support.class",pattern:/\b[A-Z]\w*(?=((\.|::)[A-Za-z]|\[))/g},{name:"constant",pattern:/\b[A-Z]\w*\b/g},{matches:{1:"storage.class",2:"entity.name.class",3:"entity.other.inherited-class"},pattern:/\s*(class)\s+((?:(?:::)?[A-Z]\w*)+)(?:\s+&lt;\s+((?:(?:::)?[A-Z]\w*)+))?/g},{matches:{1:"storage.module",2:"entity.name.class"},
pattern:/\s*(module)\s+((?:(?:::)?[A-Z]\w*)+)/g},{name:"variable.global",pattern:/\$([a-zA-Z_]\w*)\b/g},{name:"variable.class",pattern:/@@([a-zA-Z_]\w*)\b/g},{name:"variable.instance",pattern:/@([a-zA-Z_]\w*)\b/g},{matches:{1:"keyword.control"},pattern:/[^\.]\b(BEGIN|begin|case|class|do|else|elsif|END|end|ensure|for|if|in|module|rescue|then|unless|until|when|while)\b(?![?!])/g},{matches:{1:"keyword.control.pseudo-method"},pattern:/[^\.]\b(alias|alias_method|break|next|redo|retry|return|super|undef|yield)\b(?![?!])|\bdefined\?|\bblock_given\?/g},
{matches:{1:"constant.language"},pattern:/\b(nil|true|false)\b(?![?!])/g},{matches:{1:"variable.language"},pattern:/\b(__(FILE|LINE)__|self)\b(?![?!])/g},{matches:{1:"keyword.special-method"},pattern:/\b(require|gem|initialize|new|loop|include|extend|raise|attr_reader|attr_writer|attr_accessor|attr|catch|throw|private|module_function|public|protected)\b(?![?!])/g},{name:"keyword.operator",pattern:/\s\?\s|=|&lt;&lt;|&lt;&lt;=|%=|&=|\*=|\*\*=|\+=|\-=|\^=|\|{1,2}=|&lt;&lt;|&lt;=&gt;|&lt;(?!&lt;|=)|&gt;(?!&lt;|=|&gt;)|&lt;=|&gt;=|===|==|=~|!=|!~|%|&amp;|\*\*|\*|\+|\-|\/|\||~|&gt;&gt;/g},
{matches:{1:"keyword.operator.logical"},pattern:/[^\.]\b(and|not|or)\b/g},{matches:{1:"storage.function",2:"entity.name.function"},pattern:/(def)\s(.*?)(?=(\s|\())/g}],!0);Rainbow.extend("css",[{name:"comment",pattern:/\/\*[\s\S]*?\*\//gm},{name:"constant.hex-color",pattern:/#([a-f0-9]{3}|[a-f0-9]{6})(?=;|\s|,|\))/gi},{matches:{1:"constant.numeric",2:"keyword.unit"},pattern:/(\d+)(px|em|cm|s|%)?/g},{name:"string",pattern:/('|")(.*?)\1/g},{name:"support.css-property",matches:{1:"support.vendor-prefix"},pattern:/(-o-|-moz-|-webkit-|-ms-)?[\w-]+(?=\s?:)(?!.*\{)/g},{matches:{1:[{name:"entity.name.sass",pattern:/&amp;/g},{name:"direct-descendant",pattern:/&gt;/g},{name:"entity.name.class",
pattern:/\.[\w\-_]+/g},{name:"entity.name.id",pattern:/\#[\w\-_]+/g},{name:"entity.name.pseudo",pattern:/:[\w\-_]+/g},{name:"entity.name.tag",pattern:/\w+/g}]},pattern:/([\w\ ,:\.\#\&\;\-_]+)(?=.*\{)/g},{matches:{2:"support.vendor-prefix",3:"support.css-value"},pattern:/(:|,)\s*(-o-|-moz-|-webkit-|-ms-)?([a-zA-Z-]*)(?=\b)(?!.*\{)/g},{matches:{1:"support.tag.style",2:[{name:"string",pattern:/('|")(.*?)(\1)/g},{name:"entity.tag.style",pattern:/(\w+)/g}],3:"support.tag.style"},pattern:/(&lt;\/?)(style.*?)(&gt;)/g}],
!0);



//Add line number
if (window.Rainbow) window.Rainbow.linecount = (function(Rainbow) {
    Rainbow.onHighlight(function(block) {
        var $block = $(block);
        var $dummy = $block.clone().empty();
        var $lines = $('<table />', {class: 'rainbow'}).appendTo($dummy);

        var lines = $block.html().trim().split('\n');

        $.each(lines, function(index, value) {
            index++;

            var $row = $('<tr />', {class: 'rainbow-line rainbow-line-' + index});

            $('<td />', {class: 'rainbow-line-number', 'data-number': index}).appendTo($row);
            $('<td />', {class: 'rainbow-line-code'}).html(value).appendTo($row);

            $lines.append($row);
        });

        $block.replaceWith($lines);
    });
})(window.Rainbow);
'use strict';

(function($, Reveal){
  function launchTerminal (event) {
    var $this = $(event.fragment);
    if (typeof $this.attr("data-terminal") !== typeof undefined) {
      var $terminal = $($this.data("terminal")),
          command = $terminal.data('command'),
          result = $terminal.data('result');

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
                }; }(i), 300*i);
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
    if (typeof $this.attr("data-terminal") !== typeof undefined) {
      var $terminal = $($this.data("terminal"));
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
'use strict';

(function($){
  $('.reveal section:first-child').find('h1, h2, h3').slabText({
      'viewportBreakpoint':380
  });
}(jQuery));