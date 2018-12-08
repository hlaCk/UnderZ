(function (root, factory) {
	var hookWith_z = { label2: factory(root) };
	
    if ( typeof define === 'function' && define.amd ) {
        define([], hookWith_z);
    } else if ( typeof exports === 'object' ) {
        module.exports = hookWith_z;
    } else {
        root.label2 = hookWith_z;
    }
	
	_z.declare('label2').method(hookWith_z.label2);
})(typeof global !== 'undefined' ? global : this._z2 || this.window || this.global, (function (root) {
	
	var label2 = function label2( opt ) {
		var opt = opt || {};
		var $this = this;
		
		$this.element = opt['element'] || _z("<div class='moveAble' ></div>");
		
		if( _z.isset(opt['element']) )
		{
			$this.status = opt['status'] || true;
			$this.element.show(0).css({'position': 'absolute','display': 'none'});
			$this.for = $this.for;
		}
		else
		{
			$this.for = opt['for'] || "";
			$this.text = opt['text'] || "";
			$this.status = opt['status'] || $this.status;
			
			$this.element.appendTo('body').show(0).css({'position': 'absolute','display': 'none'});
		}
		$this.element[0]['label2'] = $this;
		
		return $this.element[0];
	};
	
	label2.isFocus = false;
	label2.mouseoverDoc = function(e) { if(label2.isFocus) _z(".moveAble").hide(0); };
	label2.mouseleaveDoc = function(e){ label2.isFocus = true; };

	_z( document.body ).mouseover( label2.mouseoverDoc );

	label2.prototype = {
		0: undefined,
		length: 1,
		
		// compatible with
		_zver: '0.0.7 b-17',
		
		// module version
		version: '0.1.0 1-b',
		
		data: {
			status: false,
			mousemoveFor: function mousemoveFor(e) {
				if( !this.data.status ) { return; } 
				label2.isFocus = false;
				this.element.show(0).css({ 'top': e.pageY + 6,'left': e.pageX - ( this.element.width() / 2) });
			},
		},
		
		// label element
		get element() { return this[0]; },
		set element( f ) {
			this[0] = f||false;
			this[0] = _z.isDOM(this[0]) ? _z(this[0]) : this[0];
			
			this.data.status = this[0] && ( _z.is_z(this[0])&&this[0].isDOMElement() );
		},
		
		// class-main
		get for() { if( !this.data.status ) { return; } return this.element.attr('class-main') || ""; },
		set for( f ) {
			f = f||"";
			if( !this.data.status || !!!f ) return;
			
			this.element.attr('class-main', f);
			
			_z( "." + f + "" )
				.mousemove( this.data.mousemoveFor.bind( this ) )
				.mouseleave( label2.mouseleaveDoc );
			
		},
		
		// status
		get status() { return !!this.data.status; },
		set status( f ) {
			this.data.status = !!f;
		},
		
		// label content
		get text() { if( !this.data.status ) { return; } return this.element.html() || ""; },
		set text( f ) { if( !this.data.status ) { return; } this.element.html(f||""); }
	};
	
	return label2;
}));