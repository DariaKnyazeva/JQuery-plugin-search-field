/*global jQuery: true */
(function($) {

    var alignImage = function(element, options) {
        element.css('background', 'url(' + options.image + ') no-repeat scroll 2px 2px');
        element.css('background-size', options.icon_size + 'px');
        if (options.position === 'left') {
            element.css('padding-left', options.padding + 'px');
        } else {
            element.css('padding-right', options.padding + 'px');
            element.css('background-position', 'right');
        }
    };

    $.fn.searchable = function(options) {
        var defaults = {
                inactive_class: 'inactive', // class name for inactive state
                active_class: 'active', //class name for active state
                text: this.val(), //text for displaying in the field on focus out
                image: 'images/search_icon.jpg', // relative path to the background image
                position: 'left', // the backround image location: 'left' or 'right'
                onSubmit: null // function to process 
            },	   
            // extend default values with options
            opts = $.extend(defaults, options);            

        opts.icon_size = this.height() - 3;
        opts.padding = this.height() + 3;

        this.addClass(opts.active_class);
        this.addClass(opts.inactive_class);
        this.val(opts.text);	        
        alignImage(this, opts);

        this.focus(function() {
            var element = $(this);
            if (element.val() === opts.text) {
                element.val(''); 
            }
            element.removeClass(opts.inactive_class); 
        });

        this.focusout(function() {
            var element = $(this);
            if (element.val() === '') {
                element.val(opts.text);
            }
            element.addClass(opts.inactive_class);
        });

        this.keyup(function(e) {
            var element = $(this),
                form = element.closest('form');                

            // if Enter is pressed
	    if(e.keyCode === 13) {
               if (typeof opts.onSubmit === 'function') {
		    opts.onSubmit();
                } else {
		    form.submit();
                }
	    }
         });

         this.mousemove(function(e) {
             var element = $(this),
                 leftEdge = element.offset().left + opts.icon_size,
                 rightEdge = element.offset().left + element.width() + opts.padding - opts.icon_size;

             element.css('cursor', 'text');

             if ( (opts.position === 'left' && e.pageX < leftEdge) ||
                  (opts.position !== 'left' && e.pageX > rightEdge)) {
                     element.css('cursor', 'pointer');                 
             } 
         });

         this.click(function(e) {
             var element = $(this),
                 form = element.closest('form'),
                 leftEdge = element.offset().left + opts.icon_size,
                 rightEdge = element.offset().left + element.width() + opts.padding - opts.icon_size;

             if ( (opts.position === 'left' && e.pageX < leftEdge) ||
                  (opts.position !== 'left' && e.pageX > rightEdge)) {
                  if (typeof opts.onSubmit === 'function') {
		      opts.onSubmit();
		  } else {
		     form.submit();
		  }                  
             }              
         });          
         
    };	
}(jQuery)); 
