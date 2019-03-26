// assign property for an object
_z
	.declare('objectProperty')
	.method(function( opt, value ) {
		opt = opt ||  = {
					object: undefined,
					key: undefined,
					seal: true
				},
		value = value || undefined;
		
		if( !_z.hasVar(opt, 'object') || !_z.hasVar(opt, 'key') )
			return {};
		
		if( !_z.hasVar(opt, 'seal') )
			opt.seal = true;
		
		var config = {
		  enumerable: !(opt.seal === true),
		  writable: !(opt.seal === true),
		  configurable: !(opt.seal === true)
		};
		
		let 
			configIt = _z.mix( Object.getOwnPropertyDescriptor( opt.object, opt.key ) || {}, config, _z.isset(value) ? { value } : {} );
		try {
			Object.defineProperty(opt.object, opt.key, configIt);
			return true;
		} catch( $e ) {
			console.error( $e );
			return false;
		}
		
});