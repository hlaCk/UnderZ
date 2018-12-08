/*!
 * backtotop v0.0.1: Simple back to top of document button
 * (c) 2017 hlaCk
 * UnderZ Plugin
 */
(function (root, factory) {
	var hookWith_z = { backtotop: factory(root) };
	
    if ( typeof define === 'function' && define.amd ) {
        define([], hookWith_z);
    } else if ( typeof exports === 'object' ) {
        module.exports = hookWith_z;
    } else {
        root.backtotop = hookWith_z;
    }
	// console.log(_z.declare('backtotop').method(hookWith_z.backtotop));
	_z.declare('backtotop').method(hookWith_z.backtotop);
	// hook&&hook(hookWith_z)(hookWith_z);
})(typeof global !== 'undefined' ? global : this._z || this.window || this.global, (function (root) {
    'use strict';

_z('.back-to-top').length || _z('body').append(`
<!-- backtotop button -->
<a href="#top" class="back-to-top"> <i class="fa fa-arrow-up" aria-hidden="true" ></i> </a>
`);

    // Back to top
    return (function () {
        var backToTop = _z('.back-to-top'),
        threshold = 2 * _z(window).height();
		
		var funcStatus = function changeFunctionStatus( st ) {
			if( arguments.length==0 ) return this['busy'] || false;
			
			try {
				this['busy'] = st;
			} catch (_err) {}
		};
		
        // Displayed when we've scrolled 2x the viewport height
        if (backToTop.length === 0 || _z(document).height() < threshold) {
            return;
        }
		var checkBackToTopPos=function checkBackToTopPos() {
			if( _z(window).scrollTop() >= threshold )
			{
				backToTop.addClass('affix').removeClass('affix-top');
			}
			else
			{
				backToTop.removeClass('affix').addClass('affix-top');
			}
			return false;
		};
		
		_z(window).scroll(checkBackToTopPos);
		checkBackToTopPos();
		
        // backToTop.affix({
            // offset: {
                // top: threshold
            // }
        // });

        // Smooth scroll to top
        backToTop.on('click', function ( event ) {
			if( funcStatus.call(this)===true ) return false;
			
			funcStatus.call(this, true);
			
            $('html, body').animate( { scrollTop: 0 }, 
									{
										duration: 750,
										easing: 'swing',
										complete: funcStatus.bind(this, false), 
									});
			if( event && event instanceof Event )
				event.preventDefault();
			
			// console.log(event);
            return false; // prevent default href
        });
		
		window['funcStatus'] || ( window['funcStatus'] = funcStatus );
		document.title='backToTop';
		return ()=>backToTop;
    })();
	
}));