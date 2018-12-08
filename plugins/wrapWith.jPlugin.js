/**
onload:
<div align="{lang_align}" id="toptoolbar" style="display: block;" wrapWith="a" wrapWith-noWith="br" wrapWith-sep=" | ">
	<button href="bill2vr.php?ebn={billID}&type={billBillType}&btype={billBType}" target="_blank">{hshowr}</button>
	<button href="rbill2viewer.php?ebn={rbillID}" target="_blank">{hprint}</button>
	<br></br>
</div>
results:
<div align="right" id="toptoolbar" style="display: block;">
	<a href="bill2vr.php?ebn=1&amp;type=2&amp;btype=1" target="_blank"><button>عرض الفاتورة بعد المرتجع</button></a> | 
	<a href="rbill2viewer.php?ebn=1" target="_blank"><button>طباعة</button></a>
	<br><br>
</div>
-------------

<div align="right" id="aaa" style="display: block;">
	<button>عرض الفاتورة بعد المرتجع</button>
	<button>طباعة</button>
	<br><br>
</div>

_z('#aaa').wrapWith({
				sep: " | ",
				with: "a", // warp with
				nowith: "br", // skip this selectors
				assignAttrs: true, // true = all, false = null, [attr name]
			})

*/


(function (root, factory) {
	var hookWith_z = { wrapWith: factory(root) };
	
    if ( typeof define === 'function' && define.amd ) {
        define([], hookWith_z.wrapWith);
    } else if ( typeof exports === 'object' ) {
        module.exports = hookWith_z.wrapWith;
    } else {
        root.wrapWith = hookWith_z.wrapWith;
    }
	
	_z.declare('wrapWith').method(hookWith_z.wrapWith);
})( _z.$, (function (root) {
	
	var readOptions = function readOptions( elm ) {
		if( !_z.is_z(elm) || !_z(elm).length || !_z.size( _z(elm).attrs() ) ) 
			return []
		
		var newAttrs = [];
		_z(elm).for(function(_k, e) { 
			var attrs = _z(e).attrs( 'return', 'delete', 'wrapWith' );
			if( !_z.size( attrs ) ) return ;
			
			e['wrapWithOptions'] = attrs;
			
			newAttrs[_k] || (newAttrs[_k]={});
			_z.for( attrs, function(k) {
				var newK = String( k ).replace( 'wrapwith-', '' ).toString();
				newK = newK=='wrapwith' ? 'with' : newK;
				if( newK&&k ) newAttrs[_k][ newK ] = attrs[ k ];
			});
		});
		
		return newAttrs==[] ? false : newAttrs;
	};
	
	var wrapWithW = function wrapWithW( opt ) {
		if( !_z.is_z(this) ) fns.t.t( 'Usage: _z( SELECTOR ).wrapWith( OPTIONS ) !!!' );
		if( this.length==0 ) return false;
		
		var opt = ( opt&&(!_z.isArray(opt)&&[opt]||opt) ) || readOptions(this) || false;
		opt = !_z.size( opt ) ? false : opt ;
		if( opt===false )
			return new wrapWith;
		
		var $WW = wrapWith;
		$WW.prototype = _z.extend([], wrapWith.prototype );
		$WW.prototype.data.options = _z.extend({}, $WW.prototype.data.options, ...(opt||[]));
		$WW.prototype.data.options['with'] || ($WW.prototype.data.options['with'] = "");
		$WW.prototype.data.options['nowith'] || ($WW.prototype.data.options['nowith'] = "");
		$WW.prototype.data.options['sep'] || ($WW.prototype.data.options['sep'] = "");
		$WW.prototype.data.options['assignAttrs'] || ($WW.prototype.data.options['assignAttrs'] = false);
		$WW.prototype.data.options['options'] || ($WW.prototype.data.options['options'] = opt);
		
		$WW.prototype.data.element = this;
		_z.isString( $WW.prototype.data.options['with'] ) &&
		($WW.prototype.data.options['with'] = "<"+$WW.prototype.data.options['with']+">");
		$WW.prototype.data.newElement = ()=>($WW.prototype.data.options['with'] && _z( $WW.prototype.data.options['with'] ) || false);
		
		var $this = new $WW,
			$elements = [];
		$this.data.element.for(function(k, elm) {
			// childrens
			_z( elm ).children().for(function(k, selm) {
				var NWarper = $this.data.newElement();
				if( $this.data.options['nowith'] && _z( selm ).is( $this.data.options['nowith'] ) ) 
					return ;
				
				if( _z( selm ).attr('remove') )
				{
					_z( selm ).remove();
					return;
				}
				
				if( _z( NWarper ).tagName() != _z( selm ).tagName() ) 
				{
					var _attrs = $this.data.options['assignAttrs']&&
						( $this.data.options['assignAttrs']===true && 
							_z( selm ).attrs('return', 'delete') || 
								_z( selm ).attrs('return', 'delete', $this.data.options['assignAttrs']) 
						) || {};
					_z.for(_attrs, function(nk, nwelm) { _z(NWarper).attr( nk, nwelm); });
				}
				
				_z(selm).before( NWarper );
				
				NWarper.append(selm);
				$this.push( ...NWarper.element() );
			});
		});
		
		_z.for( $this, function(k, elm) {
			if( $this.data.options['sep'] && k!=($this.length-1) )
				_z(elm).after( $this.data.options['sep'] );
		});
		
		return $this;
	};
	
	var wrapWith = function wrapWith() {
		return this;
	};
	
	wrapWith.prototype = {
		length: 0,
		
		// compatible with
		_zver: '0.0.8 b-17',
		
		// module version
		version: '0.0.1 1-b',
		
		data: {
			// options
			options: {
				sep: " ",
				with: "", // warp with
				nowith: "", // skip this selectors
				assignAttrs: true, // true = all, false = null, [attr name]
			},
			
			element: undefined,
			newElement: undefined,
		}
	};
	
	return wrapWithW;
}));