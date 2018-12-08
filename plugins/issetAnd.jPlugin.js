(function (root, factory) {
	var hookWith_z = { issetAnd: factory(root) };
	
    if ( typeof define === 'function' && define.amd ) {
        define([], hookWith_z);
    } else if ( typeof exports === 'object' ) {
        module.exports = hookWith_z;
    } else {
        root.issetAnd = hookWith_z;
    }
	
	_z.declare('issetAnd').method(hookWith_z.issetAnd);
})(typeof global !== 'undefined' ? global : this._z || this.window || this.global, (function (root) {
	
	var 
	// isset `val` And callback
	issetAnd = function issetAnd( val, cb ) {
		cb = cb || fns.true;
		return !!( _z.isset( val ) && fns.callFunction( cb, [val], this ) );
	};

	return issetAnd;
}));