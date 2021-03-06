/*global jQuery: true */
(function($) {

    var alignImage = function(element, options) {
            element.css('background', '2px 2px');
            element.css ('background-image', 'url(' + options.image + ')');
            element.css ('background-size', options.icon_size + 'px');
            element.css ('background-repeat', 'no-repeat');
            if (options.position === 'left') {
                element.css ('padding-left', options.padding + 'px');
            } else {
                element.css ('padding-right', options.padding + 'px');
                element.css ('background-position', 'right');
            }
        };   

    $.fn.searchable = function (options) {
        var defaults = {
                inactive_class: 'inactive', // class name for inactive state
                text: this.val (), //text for displaying in the field on focus out
                image: '../images/search_icon.png', // relative path to the background image
                position: 'left', // the backround image location: 'left' or 'right'
                onSubmit: null // function to process 
            },	   
            // extend default values with options
            opts = $.extend (defaults, options),
            isCursorAtIcon = function(element, event) {
                var leftEdge = element.offset ().left + opts.icon_size,
                    rightEdge = element.offset ().left + element.width () + opts.padding - opts.icon_size;
                return (opts.position === 'left' && event.pageX < leftEdge) ||
                           (opts.position !== 'left' && event.pageX > rightEdge);
            }

        opts.icon_size = this.height () - 3;
        opts.padding = this.height () + 3;

        this.addClass (opts.active_class);
        this.addClass (opts.inactive_class);
        this.val (opts.text);	        
        alignImage (this, opts);

        this.focus(function() {
            var element = $(this);
            if (element.val () === opts.text) {
                element.val (''); 
            }
            element.removeClass (opts.inactive_class); 
        });

        this.focusout(function() {
            var element = $(this);
            if (element.val () === '') {
                element.val (opts.text);
            }
            element.addClass (opts.inactive_class);
        });

        this.keypress(function(event) {
            var element = $(this),
                form = element.closest ('form');                

            // if Enter is pressed
	    if(event.keyCode === 13) {
               if (typeof opts.onSubmit === 'function') {
                    event.preventDefault ();
		    opts.onSubmit ();
                } else {
		    form.submit ();
                }
	    }
         });

         this.mousemove(function(event) {
             var element = $(this);
             element.css ('cursor', 'text');

             if ( isCursorAtIcon (element, event)) {
                     element.css ('cursor', 'pointer');                 
             } 
         });

         this.click(function(event) {
             var element = $(this),
                 form = element.closest ('form');

             if ( isCursorAtIcon (element, event) ) {
                  event.preventDefault ();
                  if (typeof opts.onSubmit === 'function') {
		      opts.onSubmit ();
		  } else {
		      form.submit ();
		  }                  
             }              
         });          
         
    };	
}(jQuery)); 
