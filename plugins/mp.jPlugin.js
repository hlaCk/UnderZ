(function (root, factory) {
    var hookWith_z = { mp: factory(root) };

    if ( typeof define === 'function' && define.amd ) {
        define([], hookWith_z);
    } else if ( typeof exports === 'object' ) {
        module.exports = hookWith_z;
    } else {
        root.mp = hookWith_z.mp;
    }

    _z.declare('mp').method(hookWith_z.mp).global();
})(typeof global !== 'undefined' ? global : this._z2 || this.window || this.global, (function (root) {

    // mp engine
    var mp = function mpDataContainer() {
        $this = (this && this.window === this) ? mp : this;

        if( arguments.length == 1 && arguments[0] instanceof mp ) return arguments[0];

        return new ( $this.mpObject.make.bind( $this.mpObject ) )( ...arguments );
    };

    mp.extend = _z.extend;
    mp.mix = _z.mix;

    mp.ismpObject = function( elm ) { return elm instanceof mp; };
    ismpCore = function( elm ) { return mp===elm && elm.prototype === mp.prototype; };

    mp.rmComments = function( c ) { c = c || mp.ismpObject(this) ? this.source : false;
        return ( c===false ) && "" || (c.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1') || "");
    };
    mp.propsList = function( c ) { c = c || mp.ismpObject(this) ? this.source : false;
        return ( c===false ) && "" || (c.match(/(\s*?@media[\s\S]*?){([\s\S]*?)}\s*?}|([\s\S]*?){([\s\S]*?)}/g) || []);
    };
    // parse props
    mp.parse = function( c ) { c = c || mp.ismpObject(this) ? this.source : false;
        var res = {};
        if( _z.isString( c ) )
            c = this.propsList( this.rmComments(c) );
        if( !_z.isArray(c) ) return false;

        c.filter(function(m) {
            // parse 1 chunk
            var key = m.split(/(\s*?@media[\s\S]*?){([\s\S]*?)}\s*?}|([\s\S]*?){([\s\S]*?)}/g).filter(_z.trim) || [];
            // selector
            key[0] = _z.trim(key[0]);
            // props
            key[1] = key[1].split(new RegExp("\;" + RegExp.regexes.notInQuote.source)) || [];

            res[key[0]] = res[key[0]] || {};

            // assign props
            key[1].filter(function(e) {
                if(!e || (e=e.split(new RegExp("\:" + RegExp.regexes.notInQuote.source), 2).filter(_z.trim)).length < 2) return false;

                res[ key[0] ][ _z.trim(e.shift()) ] = _z.trim( e.shift() );
                return false;
            });

            // assign multi prop
            if( key[0].indexOf(",") > -1 ) {
                key[0].split(",").map(function(e,i) {
                    _z.mix((res[_z.trim(e)] = res[_z.trim(e)] || {}), res[key[0]]);
                });
                delete res[ key[0] ];
            }

            if( mp.ismpObject(this) ) {
                this.data.mp = res;
            }

            return false;
        }.bind(this));

        return this.data.mp || {};
    };

    mp.mpObject = mp.prototype = {
        0: undefined,
        length: 1,
        constructor: mp,

        // compatible with
        _zver: '1.0.0',
        // module version
        version: '0.0.1-b',

        // create new instance mp()
        make: function makeObject() {
            this.data = {
                // created timestamp
                stamp: 0,

                // arguments of mp object when called
                args: null,

                // code source
                source: "",

                // mp object
                mp: ""
            };
            this.stamp = fns.time();
            this.args = arguments;
            this.source = arguments[0] || "";

            // remove comments
            var res = this.parse();
            if( _z.size( res ) == 0 ) return false;

            this[0] = this.data.mp;
            this.length = ( this.length || 0 );

            return this;
        },

        rmComments: mp.rmComments,
        propsList: mp.propsList,
        parse: mp.parse,

        // created timestamp
        get stamp() { return this.data.stamp || 0; },
        set stamp( stamp ) { this.data.stamp = stamp || 0; },

        get size() { return this.data.mp; },

        // Get element by index
        element: function getElement( index ) {
            // find index || undefined || get all if no index
            return _z.isset( index ) ?
                this[ ( index < 0 ? ( this.len + index ) : index ) ] :
                ( this.length ? _z.toArray(this) : []);
        },

    };

    mp.mpObject.make.prototype = mp.mpObject;
    mp.mpObject.extend = _z.extend;
    mp.mpObject.extend( _z.privates.protos.likeArray );

    return mp;
}));