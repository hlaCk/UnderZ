/*!
 * attrSetter v0.0.1: attributes setter
 * (c) 2017 hlaCk
 * UnderZ Plugin
 */
(function (root, factory) {
	var hookWith_z = { attrSetter: factory(root) };
	
    if ( typeof define === 'function' && define.amd ) {
        define([], hookWith_z);
    } else if ( typeof exports === 'object' ) {
        module.exports = hookWith_z;
    } else {
        root.attrSetter = hookWith_z;
    }
	_z.declare('attrSetter').method(hookWith_z.attrSetter);
})(typeof global !== 'undefined' ? global : this._z || this.window || this.global, (function (root) {
    'use strict';

    // attrSetter
    return function ( childs ) {
			if( !!!_z.is_z(this) ) return _z();
			childs = childs || this.attr('attrSetterApplyTo') || "";
			childs = !_z.isArray(childs) ? [childs] : childs;
			
			var setters = this;
			if( !setters.length ) return setters
			
			var attr = setters.attr('attrSetter');
			attr = attr&&(attr.indexOf("=")!=-1)&&attr || false;
			if( !attr ) return setters;

			attr = [
				attr.substring(0, attr.lastIndexOf("=")),
				attr.substring(attr.lastIndexOf("=")+1 , attr.length)
			];
			setters.attr(attr[0], attr[1]);
			setters.remAttr('attrSetterApplyTo');
			if( childs.length ) {
				childs = childs.join(",");
				setters.find( childs ).attr(attr[0], attr[1]);
			}
			return setters;
		};
	
}));