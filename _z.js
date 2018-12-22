// UnderZ 0.0.9 Beta 1 - JavaScript Library
// Copyright © 2008-2017 hlaCk (https://github.com/hlaCk)
// Licensed under the GNU General Public License v3.0 (https://github.com/hlaCk/UnderZ/blob/master/LICENSE) license.

(function( window ) {

    // number object
    var Num = function( n ) {
        var $this = this;
        if(n instanceof Num){
            $this.value = n.toString();
            return;
        }
        $this.value = Array.prototype.slice.call( String(n) );
    };
    with({_n: Num.prototype}){
        _n.toString = _n.valueOf = function toString(){
            return this.value.join("");
        };
        // plus
        _n.plus = function Plus(n) {
            var n1 = Array.from( this.value ).reverse(),
                n2 = Array.prototype.slice.call( String(n) ).reverse(),
                n3 = [];
            var res = "";

            _z.for(n1, function(nKey, nVal) {
                var n2_;
                // second hand value
                n2_ = ( nKey < n2.length ) ? n2[nKey] : "0";

                res = (res===""?0:Number(res.join(""))) + Number(nVal) + Number(n2_);
                if( String(res).length > String(n2_).length ) {
                    res = Array.prototype.slice.call( String(res) );
                    n3[nKey] = String(res.pop());
                    res = res.length == 0 ? "" : res;
                }
                else
                {
                    n3[nKey] = String(res);
                    res = "";
                }
            });

            if( n1.length < n2.length ) {
                var rn3 = String(n2.join("")).substr(n1.length);
                rn3 = Array.prototype.slice.call( String(rn3) );

                var res2 = res;
                res = "";

                if( res2.length )
                    _z.for(rn3, function(nKey, nVal) {
                        var n2_;
                        // second hand value
                        n2_ = ( nKey < res2.length ) ? res2[nKey] : "0";

                        res = (res===""?0:Number(res.join(""))) + Number(nVal) + Number(n2_);
                        if( String(res).length > String(n2_).length ) {
                            res = Array.prototype.slice.call( String(res) );
                            n3[nKey] = String(res.pop());
                            res = res.length == 0 ? "" : res;
                        }
                        else
                        {
                            n3[nKey] = String(res);
                            res = "";
                        }
                    });

                n3.add(rn3);
            }

            if( res !== "" ) {
                n3.add( res );
                res = "";
            }

            n3 = n3.length ? n3.reverse().join("") : "0";

            return n3;
        };
    }
window.Num = Num;
// Function.callSelf(args) = Function.apply( Function, args )
if(typeof Function.prototype.callSelf !== 'function')
    Function.prototype.callSelf = function( args ) { args = args || [];
        return this.apply( this, args );
    };

// Function.bindSelf(args) = Function.bind( Function, args )
if(typeof Function.prototype.bindSelf !== 'function')
    Function.prototype.bindSelf = function( args ) { args = args || [];
        return this.bind( this, args );
    };

// Array.pushSetter='value' => Array.push( 'value' )
if(typeof Array.prototype.pushSetter !== 'function')
	Object.defineProperty( Array.prototype, 'pushSetter', { set: function(v) { return this.push(v); }, configurable: false} );

// String String.replaceArray(Array needle, Array haystack)
if(typeof String.prototype.replaceArray !== 'function')
	String.prototype.replaceArray = function(find, replace) {
		var replaceString = this;
		for (var i = 0; i < find.length; i++) {
			replaceString = replaceString.replace(find[i], replace[i]);
		}
		return replaceString;
	};

// String String.replaceAll(String needle, String haystack)
if(typeof String.prototype.replaceAll !== 'function')
	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.split(search).join(replacement);
	};

// METHD1: Normal Array
	// [1, 2, 3, 1].unique() = [1, 2, 3]
// METHD2: MultiDimensional Array
	// var a=[], b=[];
    // b["ID"]= 1; // [ ID = 1 ]
    // a.push(b); // [ [ ID = 1 ] ]
    // b=[]; // []
    // b["ID"]= 2; // [ ID = 2 ]
    // a.push(b); // [ [ ID = 1 ], [ ID = 2 ] ]
    // b=[]; // []
    // b["ID"]= 3; // [ ID = 3 ]
    // a.push(b); // [ [ ID = 1 ], [ ID = 2 ], [ ID = 3 ] ]
    // b=[]; // []
    // b["ID"]= 1; // [ ID = 1 ]
    // a.push(b); // [ [ ID = 1 ], [ ID = 2 ], [ ID = 3 ], [ ID = 1 ] ]
    // a.unique("ID"); // [ [ ID = 1 ], [ ID = 2 ], [ ID = 3 ] ]
if(typeof Array.prototype.unique !== 'function')
	Array.prototype.unique = function(keyUnique){
		var keyUnique = keyUnique || null;

		var u = {}, a = [];
		for(var i = 0, l = this.length; i < l; ++i){
			var currentKeyElement = this[i];
			currentKey = keyUnique !== null ? this[keyUnique] : currentKeyElement;
			if(u.hasOwnProperty(currentKey)) {
				continue;
			}
			a.push(currentKeyElement);
			u[currentKey] = 1;
		}
		return a;
	};

// Array Array.add( ARRAY ) = add multi var
if(typeof Array.prototype.add !== 'function') {
	Array.prototype.add = function(arr) {
		var arr = arr || {};
		if( !((typeof arr) in { 'function':0, 'FUNCTION':0, 'object':0, 'OBJECT':0 }) )
			arr = [ arr ];
		
		if((typeof this.push) in { 'function':0, 'FUNCTION':0 })
			return this.push.apply(this, arr);
		else
			return _z.extend(true, this, _z.extend(true, _z(this).toArray(), arr));
	};
}

// Array Array.inArray(needle, haystack) = index OR -1 if not found
if(typeof Array.prototype.inArray !== 'function')
	Array.prototype.inArray = function(needle, haystack) {
		var haystack = haystack || this;
		if(typeof(haystack) != typeof([]))
			return -1;
		
		var length = haystack.length;
		for(var i = 0; i < length; i++) {
			if(haystack[i] == needle) 
				return haystack.indexOf(needle)?haystack.indexOf(needle):0;
		}
		return -1;
	};

// Array Array.remove(from, to) = remove vars by index or value
if(typeof Array.prototype.remove !== 'function')
	// Array Remove - By John Resig (MIT Licensed)
	Array.prototype.remove = function(from, to) {
		if( from && typeof(from)==typeof('hlack'))
			from = this.indexOf( from );
		
		if( to && typeof(to)==typeof('hlack'))
			to = this.indexOf( to );
		if( !!!from && !!!to )
			return this;
		
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};

// String Number.plus( number ) = +1 to large number
if(typeof Number.prototype.plus !== 'function')
    // 9999999999999998// 9999999999999998
    Number.prototype.plus= function(num){
		if( !this.length ) return String(num);
        var nW = "";
        for(var n_ = this.length -1 ; n_ > 0; n_--) {
            if(this[n_] == "9")
            	nW = this[n_] + nW;
            else {
                nW = nW != "" ? String(this[n_]) + String(nW) : String(this[n_]);
                break;
            }
        }
        return String(this.substr(0, n_)) + String( Number(nW) + Number(num) );

        // if( this >= 9999999999999998 || this+num >= 9999999999999998 ) {
        //     var data2 = String(this).substr(-13);
        //     var data1 = String(this).substr(0, String(this).length - 13);
        //     var nW = "";
        //     for(var n_ = 0; n_ < data2.length; n_++) {
        //         if(data2.substr(n_, 1) == "0")
        //             nW += "0";
        //         else
        //             break;
        //     }
        //     if( nW.length )
        //     	data2 = data2.substr(nW.length, data2.length -nW.length);
        //
        //     var r = Number(data2) + Number(num);
        //     return String(data1) + String(nW) + String(r);
        // }
        // return Number(this) + Number(num);
    };

// String Number.minus( number ) = -1 to large number
if(typeof Number.prototype.minus !== 'function')
    // 9999999999999998
    Number.prototype.minus= function(num){
        if( this >= 9999999999999998 || this+num >= 9999999999999998 ) {
            var data2 = String(this).substr(-5);
            var data1 = String(this).substr(0, String(this).length - 5);
            var nW = "";
            for(var n_ = 0; n_ < data2.length; n_++) {
                if(data2.substr(n_, 1) == "0")
                    nW += "0";
                else
                    break;
            }
            if( nW.length )
                data2 = data2.substr(nW.length, data2.length -nW.length);

            var r = Number(data2) - Number(num);
            return String(data1) + String(nW) + String(r);
        }
        return Number(this) - Number(num);
    };


// String String.plus( number ) = +1 to large number
if(typeof String.prototype.minus !== 'function')
    String.prototype.minus = Number.prototype.minus;
// String String.minus( number ) = -1 to large number
if(typeof String.prototype.plus !== 'function')
    String.prototype.plus = Number.prototype.plus;

// variables
var
	// window - private var
	window = window || this,
	
	// document - private var
	doc = window.document || this.document || document,

	// global variable - public var for private use in window.gVar
	gVar = window.gVar || (window.gVar = gVar = {}),

	// global jQuery - private var
	globaljQuery = window["jQuery"] || new Function("return false"),

	// engine version - public var in _z.$.underZ, _z.$.newSelector.proto.underZNS
	version = '0.0.9 b-1',
	
	// prototypes of objects - public var in _z.privates.protos
	protos = {
		object: Object.prototype,
		element: Element.prototype,
		array: Array.prototype,
		string: String.prototype,
		likeArray: {
			push: [].push,
			sort: [].sort,
			splice: [].splice
		},
	
		// default Object Prop
		objectProp: {
			enumerable: false,
			configurable: false,
			writable: false
		},
	},
	
	// is `elm` instanceof _z - public function in _z.is_z( Object ) = true|false
	is_z = function( elm ) { return elm instanceof _z; },
	
	// is _z prototype - public function in _z.isCore( Object ) = true|false
	isCore = function( elm ) { return _z===elm && elm.prototype === _z.prototype; },
	
	// `val` in `obj` - public function in _z.hasProp( Object, Property), _z(Object).hasProp(Property) = true | false
	hasProp = function hasProp( obj, val ) {
		return protos.object.hasOwnProperty.call( 
					(arguments.length===1 ? this : obj), 
					(arguments.length===1 ? obj : val)
				);
	},
	
	// isset `val` - public function in _z.isset(var) = true|false
	isset = function isset( val ) {
		if( arguments.length > 1 )
			for(var i=0,i2=arguments.length; i<i2;i++)
				if( !!!isset(arguments[i]) ) return false;

		return val !== void 0 || typeof(val) !== 'undefined';
	},
	
	// trim prototype - public function in _z.trim( String ) = trimmed String
	triming = (protos.string.trim&&protos.string.trim || function trimString(str) {
		return (str||this).replace(/^\s+/, '').replace(/\s+$/, '');
	}),
	
	// type of `val` as string toLowerCase
	typeOfVar = TOV = function type( val ) {
		return Object.prototype.toString.call( val ).replace(/^\[object (.+)\]$/, '$1').trim().toLowerCase();
	},
	
	// toLowerCase
	toLC = function( $var, $reDefine ) {
		if( typeOfVar($var)=='array' )
		{
			if( !isset($reDefine) )
				$var2 = Array.from($var),
				$var = $var2;
			
			return foreach($var, function(k, v) {
				$var[k] = toLC(v);
			}), $var;
		}
		
		return (String( $var ) || "").toLowerCase();
	},
	// toUpperCase
	toUC = function( $var, $reDefine ) {
		if( typeOfVar($var)=='array' )
		{
			if( !isset($reDefine) )
				$var2 = Array.from($var),
				$var = $var2;
			
			return foreach($var, function(k, v) {
				$var[k] = toUC(v);
			}), $var;
		}
		
		return (String( $var ) || "").toUpperCase();
	},
	
	// for stop loops
	stopLoopinException = new Error("stopLoopinException"),
	
	// forEach
	foreach = function foreach( obj, cb, context ) {
		if( typeOfVar( obj ) == 'function' )
		{
			context = cb;
			cb = obj;
			obj = this['element']&&this.element() || [];
		}
		
		obj = obj || false;
		if( !!!obj || !!!cb || typeOfVar( cb ) != 'function' )
			return false;
		
		obj = is_z( obj ) ? obj.element() : obj;
		if( typeof stopLoopinException == "undefined" ) {
			var stopLoopinException = new Error("stopLoopinException");
		}
		
		var returns =
					(
						(typeOfVar( obj )==typeOfVar( [] )&&[])||
						(typeOfVar( obj )==typeOfVar( {} )&&{})||
						(_z['createAs']&&_z.createAs( obj ))
					)||{};
		
		try {
			var _keys = Object.keys( obj );
			
			for( var i = 0, l = _keys.length; i < l ; i++ )
			{
				var key = _keys[ i ];
				
				var cbReturn = cb.apply(context||obj, [ key, obj[ key ], obj]);
				
				if( !!!cbReturn && cbReturn != undefined )
					throw stopLoopinException;
				else if( cbReturn != undefined )
					returns[ key ] = cbReturn;
				else
					returns[ key ] = obj[ key ];
			}
		}
		catch(e)
		{
			if(e !== stopLoopinException) throw e;
		}
		
		return returns;
	},
	
	// toArray
	toArray = function toArray() {
		var sliced = ( sliced = protos.array.slice.call( arguments.length&&arguments[0] || this ) ).length&&sliced || [];
			
		arguments.length && 
		!sliced.length && 
		!is_z( arguments[0] ) &&[
			'number', 'object', 'function'
		].includes( typeOfVar(arguments[0]) ) && 
		( sliced = [ arguments[0] ] );
			
		return sliced;
	},
	
	// subArray
	subArray = function subArray( startFrom, endTo, array ) {
		if( endTo&&!isset(array) )
			if( typeOfVar(endTo)!=typeOfVar(7) )
				array = endTo,
				endTo = false;
		var sliceit = [startFrom || 0];
		if( endTo!==false )
			sliceit.push( endTo );
		
		return toArray( fns.turn( array, this ) ).slice(...sliceit);
	},
	
	// filterArray
	filterArray = function filterArray( array, callback ) {
		var ArgLen = arguments.length || 0;
		var tunning = fns.turny({
						arg: arguments,
						self: this,
						last: undefined
					});
		tunning = tunning.call(tunning, 'end');
		array = tunning[0] || undefined;
		callback = tunning[1] || undefined;
		if( isset(tunning[2]) && _z.isFunction(tunning[2]) )
			callback = tunning[2] || callback;
		
		if( isset(callback) && !_z.isFunction(callback) )
		{
			var _callback = _z( callback );
			callback = (x)=>_z(x).is( _callback );
		}
		
		arguments = tunning || [];
		var filterElements = false;
		if( _z.isFunction( array ) && !isset(callback) && is_z(this) )
			callback = array,
			array = this.element(),
			filterElements = true;
		if( is_z(this) )
			array = this.element(),
			filterElements = true;
		
		if( isset(array) )
			array = _z( array ).element();
		
		callback = _z.isFunction(callback)&&callback || function( x ) { return x; };
		var result = protos.array.filter.apply( array, [callback] ) || array;
		
		if( filterElements && is_z(this) )
		{
			var newInstance = this.newSelector( result );
			newInstance.args = [ array ];
			newInstance.selector = "";
			
			return newInstance;
		}
		else return _z( result );
		// return filterElements ? _z( result ) : result;
	},
	
	// vanillas shortcuts
	vanilla = function getVanillas( $var ) {
		var _vanilla = {
				vanilla: true,
				window: window,
				document: doc,
				body: doc.body,
				root: doc.getRootNode.bind(doc),
				head: doc.head,
				title: doc.title,
				
				compStyle: (window.getComputedStyle || getComputedStyle),
				
				byID: doc.getElementById.bind(doc),
				byClass: doc.getElementsByClassName.bind(doc),
				byName: doc.getElementsByName.bind(doc),
				byTag: doc.getElementsByTagName.bind(doc),
				
				w: doc.write.bind(doc),
				wln: doc.writeln.bind(doc),
				
				qsa: doc.querySelectorAll.bind(doc),
				qs: doc.querySelector.bind(doc),
				
				elm: doc.createElement.bind(doc),
				attr: doc.createAttribute.bind(doc),
				comment: doc.createComment.bind(doc),
			};
		return ( isset($var) ? _vanilla[ $var ] : _vanilla);
	},

    // clone object
    cloneObj = function cloneObj( obj ) {
        try {
            var copy = Object.create( Object.getPrototypeOf( obj ) ),
                propNames = Object.getOwnPropertyNames( obj );

            propNames.forEach(function( name ) {
                var desc = Object.getOwnPropertyDescriptor( obj, name );
                Object.defineProperty( copy, name, desc );
            });

            return copy;
        } catch(e) {
            console.error( e );
            return obj;
        }
    },

    // Element.matches function
    matchesFunction = protos.element.matches ||
        protos.element.matchesSelector ||
        protos.element.mozMatchesSelector ||
        protos.element.msMatchesSelector ||
        protos.element.oMatchesSelector ||
        protos.element.webkitMatchesSelector ||
        function( s ) {
            var _matches = (this.document || this.ownerDocument).querySelectorAll( s ),
                i = _matches.length;
            while (--i >= 0 && _matches.item( i ) !== this) {}
            return i > -1;
        },

    // elements functions
    elmFunc = {
        // Element.matches() polyfill
        matches: function elementMatches() {
            var element = arguments[0] || false,
                arg = subArray( 1, arguments );
            try {
                return matchesFunction.apply( element, arg );
            } catch(e1) {
                console.error(e1);
                return false;
            }
        },

        // Element.matchesAll() polyfill
        matchesAll: function elementMatchesAll( elm, $elm, $not ) {
            var ArgLen = arguments.length || 0;
            var tunning = fns.turny({
                arg: arguments,
                self: this,
                last: undefined
            });
            tunning = tunning.call(tunning, 'end');
            elm = tunning[0] || undefined;
            $elm = tunning[1] || undefined;
            $not = tunning[2] || false;

            if( arguments.length==1 )
                $elm = elm,
                    elm = this;

            var $return = [];
            if( arguments.length )
            {
                $elm = _z( typeOfVar($elm)==='string' ? [ $elm ] : $elm );

                elmFunc.elmLoop( elm, function( e ) {
                    var $currentElement = [];
                    elmFunc.elmLoop( _z( $elm ), function( e2 ) {

                        if( !_z.isDOM( e2 ) && toLC(typeOfVar( e2 ))=='string' )
                            $currentElement.push( ( elmFunc.matches( e, e2 )!==$not && !$return.includes(e) ) ? e : false );
                        else
                            $currentElement.push( ( e['isEqualNode'] && e['isEqualNode']( e2 )!==$not && !$return.includes(e) ) ? e : false );

                    }, (x)=>(_z(x).isDOMElement( true )||_z.isString(x)));

                    if( filterArray( $currentElement ).length === $elm.length ) $return.push( e );
                }, (x)=>(_z(x).isDOMElement( true )||_z.isString(x)));

                $return = filterArray( $return );
            }

            if( is_z(this) )
            {
                var newInstance = this.newSelector( $return );
                newInstance.args = arguments;
                newInstance.selector = $elm;

                return newInstance;
            }
            else return _z( $return );
        },

        // prepare css style
        prepareCSS: function prepareCSS( css ) {
            if( _z.is_z( css ) )
                return (_z.trim(css)||"").replace( /^-ms-/, "ms-" ).replace( /-([\da-z])/gi, ( all, fst)=>fst.toUpperCase() ) || "";

            var s = {};
            if( !!!css ) return s;

            if( css instanceof CSSStyleDeclaration ) {
                for( var i in css )
                    if( (css[i]).toLowerCase )
                        if( !!css[ css[i] ] || css[ css[i] ] == "" )
                            s[ (css[i]).toLowerCase() ] = ( css[ css[i] ] );

            }
            else if( typeof css == "string" ) {
                css = css.split("; ");
                for( var i in css )
                    if( css[i] && typeof css[i]!='object' && typeof css[i]!='function' )
                        try {
                            var l = css[i].split(": ");
                            if( !!l[1] || l[1] == "" )
                                s[ l[0].toLowerCase() ] = ( l[1] );
                        }
                        catch(e)
                        {
                            console.warn( [ css[i], !!!css[i] ] );
                        }
            }

            return s;
        },

        // set or get element prop
        elmLoop: function elmLoop( elm, callback, tester ) {
            if( !!!elm )
                elm = this;

            if( !!!_z.is_z( elm ) )
                elm = _z( elm );

            if( !!!callback || !_z.isFunction( callback ))
                callback = fns.ef;

            var $results = [];
            if( elm.length )
            {
                var $this = this,
                    tester = tester&&_z.isFunction(tester) ? tester : (x)=>_z(x).isDOMElement( true );
                if( elm.length == 1 && (e = elm[0]) ) {
                    if( tester(e) )
                        ( $results.pushSetter = callback.apply( $this, [ e, 0 ]) );
                } else
                    elm.each(function( i, e ){
                        if( tester(e) )
                            return ( $results.pushSetter = callback.apply( $this, [ e, ...arguments ]) );
                    });

                // return isset( $val ) ? this : ( elm.length==1 ? ($return[0]||"") : $return );
            }
            // else
            // return undefined;
            return $results;
        },

        // insert adjacent element
        insertAdjacentElement: function insertElement( $val, $q ) {
            if( !isset( $val ) || ( !_z.is_z( $val ) && !_z.isDOM( $val ) && !_z.isString( $val ) ) || !this.length )
                return this;

            if( ( _z.isDOM($val)||!_z.is_z($val) ) && !_z.isTypes( 'str', $val) )
                $val = _z($val);

            var elm = this,
                $q = $q || 'beforebegin';
            elmFunc.elmLoop( elm, function( e ) {
                if( !e['insertAdjacentElement'] )
                    return;

                if( !_z.isTypes( 'str', $val) )
                    $val.for( function( key, value ) {
                        if( _z.isDOM( value ) )
                            e['insertAdjacentElement']( $q, value );
                    });
                else
                    e['insertAdjacentHTML']( $q, $val );
            });
            return this;
        },

        // fade element/s
        fade: function fadeElement( $q, speed, callback ) {
            var elm = this,
                $q = $q || 'In',
                opacityValue = { In:0, Out:1 };

            elm.css( 'opacity', opacityValue[ $q ] );

            var tick = function() {
                if( _z.size( gVar[ 'fade' ] ) &&
                    gVar[ 'fade' ][ 'tick' ] != tick &&
                    gVar[ 'fade' ][ 'elm' ] == tick.elm
                )
                    return false;

                var fstElement = tick.elm.element(0);
                // tick.opacity = tick.q=='In'?
                // ( +(tick.opacity)+((new Date() - tick.last) / 400) ) :
                // ( +(tick.opacity)-((new Date() - tick.last) / 400) );
                tick.opacity = tick.q=='In'?
                    ( +(tick.opacity)+(tick.lastVal) ) :
                    ( +(tick.opacity)-(tick.lastVal) );
                tick.elm.css( 'opacity', tick.opacity);
                tick.last = +new Date();

                if(
                    (tick.q=='In' && +(_z(fstElement).css( 'opacity' )) < 1) ||
                    (tick.q=='Out' && +(_z(fstElement).css( 'opacity' )) > 0)
                )
                {
                    // (gVar['fade'].aftimeOut=( window.requestAnimationFrame && requestAnimationFrame( tick ) )) ||
                    // (gVar['fade'].timeOut=setTimeout(tick, tick.speed));
                    setTimeout(function(){
                        (gVar['fade'].aftimeOut=( window.requestAnimationFrame && requestAnimationFrame( tick ) )) ||
                        (gVar['fade'].timeOut=setTimeout(tick, tick.speed))
                    }, 16);
                }
                else
                {
                    elm.css( 'opacity', +!opacityValue[ tick.q ] ), gVar[ 'fade' ] = {};

                    if(tick.q=='Out')
                        tick.elm.hide();

                    if( _z.isFunction(tick.callback) )
                        tick.callback.call(elm, elm);
                }
            };

            tick.q = $q;
            tick.last = +new Date();
            tick.elm = elm;
            tick.speed = parseInt(speed)||1000;
            tick.lastVal = ((1/ ((tick.speed/1000)||1) )/10)||0.25;
            tick.opacity = opacityValue[ $q ];
            tick.callback = _z.isFunction(callback) ? callback : false;

            // check if other fade on this element
            if( isset(gVar[ 'fade' ]) &&
                _z.size(gVar[ 'fade' ]) &&
                gVar[ 'fade' ][ 'tick' ] != tick &&
                gVar[ 'fade' ][ 'elm' ] == tick.elm
            )
            {
                if( gVar[ 'fade' ][ 'aftimeOut' ] )
                    cancelAnimationFrame( gVar[ 'fade' ][ 'aftimeOut' ] );
                else if( gVar[ 'fade' ][ 'timeOut' ] )
                    clearTimeout( gVar[ 'fade' ][ 'timeOut' ] );
            }

            gVar[ 'fade' ] = gVar[ 'fade' ]||{};
            gVar[ 'fade' ][ 'tick' ] = tick;
            gVar[ 'fade' ][ 'elm' ] = tick.elm;

            if($q=='In')
                elm.show();

            tick();
            return this;
        },

    },
	// addEventListener
	registerEvent = function eventListenerHandler( target, type, callback ) {
		var listenerMethod = target.addEventListener || target.attachEvent,
			eventName = target.addEventListener ? type : 'on' + type;
		
		var registerData = {
			element: callback['element']||target,
			eventName: callback['eventName']||type,
			qselector: callback['qselector']||"",
			_callback: callback['_callback']||callback['callback']||"",
			callback: callback['callback']||false
		};
		// console.log(registerData);
		
		var arg = [ eventName, registerData['_callback']||registerData['callback'] ];
		if( target.addEventListener )
			arg.push( false );
		
		return registeredEvents.add(registerData), listenerMethod.apply(target, arg );
	},
	// removeEventListener
	unRegisterEvent = function eventUnListenerHandler( target, type, callback ) {
		var removeMethod = target.removeEventListener || target.detachEvent,
			eventName = target.removeEventListener ? type : 'on' + type;
		
		return removeMethod.call(target, eventName, callback );
	},
	// all registeredEvents
	registeredEvents = {
		events: {},
		find: function findRegisteredEvents( fn ){
			var ev = this.events,
				$return = [];
			
			_z.for( ev, function( k, v ) {
				if( _z.isFunction(fn) && v['realcallback'] && v['realcallback']==fn)
					$return.push( v );
				else if( _z.isObject( fn ) )
				{
					var $return2={};
					_z.for( fn, function( $k, $v ) {
						if( v[$k] != $v)
							return $return2=false, false;
						else
							$return2[ $k ] = $v;
					});
					if( $return2!==false )
						$return.push( v );
				}
			});
			
			return $return||false;
		},
		add: function addRegisteredEvents( e, eventName, qselector, _callback, callback, element ) {
			var data = arguments.length==1&&typeOfVar(e)=='object' ? e : false;
			if( data )
				e = data['element'] || false;
			
			var element = element || data['element'] || e || doc,
				eventName = eventName || data['eventName'],
				qselector = qselector || data['qselector'],
				_callback = _callback || data['_callback'],
				callback = callback || data['callback'];
			
			var fName = 'cb'+fns.time();
			while( isset(this.events[ fName ]) )
				fName = 'cb'+fns.time()+'_'+ _z.size( this.events );
			
			this.events[ fName ] = { 
						element: element,
						name: data['eventName'] || eventName,
						qselector: data['qselector'] || qselector, 
						callback: data['_callback'] || _callback,
						remover: function(){
							unRegisterEvent( element, (data['eventName'] || eventName), _callback );
							delete registeredEvents.events[ fName ];
						},
						realcallback: callback
					};
			
			return this.events[ fName ]['callback'];
		}
	},
	// parse functions
	parssing = {
		// parseHTML
		html: function() { return parssing.parseHTML.apply(parssing, arguments); },
		parseHTML: function parseHTML( str ) {
			try{
				var tmp = document.implementation.createHTMLDocument();
				tmp.body.innerHTML = str;
				return tmp.body.children;
			} catch( _err ){ return console.error( "Parse Error[parseHTML]:", _err), false; }
		},
		// text to html node list
		parseHTMLNode: function parseHTMLNode( str ) {
			try{
				var tmp = document.implementation.createHTMLDocument();
				tmp.body.innerHTML = str;
				return tmp.body.childNodes;
			} catch( _err ){ console.error( "Parse Error[parseHTMLNode]:", _err); }
		},

		// parseJSON
		json: function() { return parssing.parseJSON.apply(parssing, arguments); },
		parseJSON: function parseJSON( str ) {
			try{
				return JSON.parse( str );
			} catch( _err ){ console.error( "Parse Error[parseJSON]:", _err); }
		},
		
		// JSON.stringify
		stringJSON: function() { return parssing.unjson.apply(parssing, arguments); },
		unjson: function JSONstringify( str ) {
			try{
				return JSON.stringify( str );
			} catch( _err ){ console.error( "Parse Error[unjson]:", _err); }
		},
		
		// parseXML
		xml: function parseXML( str ) {
			try{
				var xml, parser;
				if( !!!str||!!!_z.isString(str) )
					return null;
				
				try {
					if( window.DOMParser )
					{
						parser = new DOMParser();
						xml = parser.parseFromString( str, "text/xml" );
					}
					else // Internet Explorer
					{
						xml = new ActiveXObject("Microsoft.XMLDOM");
						xml.async = false;
						xml.loadXML( str ); 
					}
				} catch( e ) { xml = null; }
				
				if( !!!xml )
					return console.error( "Invalid XML: " + str ), null;
				
				return xml;
			} catch( e ) { console.error( "Parse Error:"+ e ); }
		},
		parseXML: function parseXML(htmlString) {
			return (new DOMParser()).parseFromString(htmlString,"text/xml");
		},
		
		// parseXML from url
		xmlFromURL: function parseXMLFromUrl( url ) {
			try{
				var xml, xmlhttp, parser;
				if( !!!url||!!!_z.isString(url) )
					return null;
				
				try {
					if( window.XMLHttpRequest ) // code for IE7+, Firefox, Chrome, Opera, Safari
						xmlhttp = new XMLHttpRequest();
					else // code for IE6, IE5
						xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
					
					xmlhttp.open( "GET", url, false );
					xmlhttp.send();
					xml = xmlhttp.responseXML;
				} catch( e ) { return console.error( "error while parssing: " + e ), null; }
				
				return xml;
			} catch( e ) { console.error( "Parse Error:"+ e ); }
		},
	},
	
	// base64 en/decoder
	base64 = {
		// encoder polyfill
		// [https://gist.github.com/999166] by [https://github.com/nignag]
		btoa: ( window.btoa || ( window.btoa = function (input) {
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
				InvalidCharacterError = fns.newErrorType( 'InvalidCharacterError' ),
				str = String(input);
			for (
			  // initialize result and counter
			  var block, charCode, idx = 0, map = chars, output = '';
			  // if the next str index does not exist:
			  //   change the mapping table to "="
			  //   check if d has no fractional digits
			  str.charAt(idx | 0) || (map = '=', idx % 1);
			  // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
			  output += map.charAt( 63 & block >> 8 - idx % 1 * 8 )
			)
			{
			  charCode = str.charCodeAt( idx += 3/4 );
			  if( charCode > 0xFF )
				  throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
			  
			  block = block << 8 | charCode;
			}
			
			return output;
		})).bind(window),
		
		// decoder polyfill
		// [https://gist.github.com/1020396] by [https://github.com/atk]
		atob: ( window.atob || ( window.atob = function (input) {
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
				InvalidCharacterError = fns.newErrorType( 'InvalidCharacterError' ),
				str = String( input ).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
			
			if( str.length % 4 == 1 )
				throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
			
			for (
				// initialize result and counters
				var bc = 0, bs, buffer, idx = 0, output = '';
				// get next character
				buffer = str.charAt( idx++ );
				// character found in table? initialize bit storage and add its ascii value;
				~buffer && ( bs = bc % 4 ? bs * 64 + buffer : buffer,
				// and if not first of each 4 characters,
				// convert the first 8 bits to one ascii character
				bc++ % 4 ) ? output += String.fromCharCode( 255 & bs >> (-2 * bc & 6) ) : 0
			)
			{
				// try to find character in table (0-63, not found => -1)
				buffer = chars.indexOf( buffer );
			}
			
			return output;
		})).bind(window),
		
		// base64_encode
		encode: function base64_encode( code ) {
			return base64.btoa( unescape( encodeURIComponent( code ) ) );
		},

		// base64_decode
		decode: function base64_decode( code ) {
			return decodeURIComponent( escape( base64.atob( code ) ) );
		},
	},
		
	// get var by refrance
	byRef = function byRef( varName ) {
		try{
			if( !_z.isString(varName) )
				fns.t.t( 'First argument Is NOT a Variable Name !!!' );
			
			return eval(
					"try { "+
						"try { "+varName+" = "+varName+"; } catch(e1) { "+varName+" = undefined; } " + 
						"({get value(){return "+varName+";}, set value(v){"+varName+"=v;}, get refrance() { return `"+varName+"`; } })" +
					" } catch(e2) { } "
				);
		}
		catch(e)
		{
			throw !( e instanceof Error ) ? new Error(e) : e;
		}
	},
	
	// functions ( shortcuts )
	fns = {
		registeredEvents: registeredEvents,
		propertyGetter: function( cb, args ) { 
			return { get () { return cb( ...(args||[]) ); } };
		},
		ef: new Function(" "),
		nan: new Function(" "),
		inputbox: function inputbox() { return prompt.apply(window, arguments) || undefined; },
		arg: function consoleArguments() { console.log.apply(console, arguments) },
		trc: function consoleTrace() { console.trace.apply(console, arguments) },
		logthis: function consoleThis() { console.log.apply(console, this) },
		log: function consoleThisAndArguments() { console.log.apply(console, [this, arguments]) },
		alert: new Function("alert.apply(null, arguments)"),
		'true': new Function("return true"),
		'false': new Function("return false"),
		wrn: function consoleWarn() { console.warn.apply(console, arguments) },
		dir: function consoleDir() { console.dir.apply(console, arguments) },
		info: function consoleDir() { console.info.apply(console, arguments) },
		
		toLC: toLC,
		toUC: toUC,
		objectProp: protos.objectProp,
		objProp: function objProp( obj, ps ) {
			ps = ps===undefined ? [] : ps;
			var newProping = extendFunction({}, protos.objectProp);
			newProping['enumerable'] = ps['e']!==undefined ? !!ps['e'] : true;
			newProping['configurable'] = ps['c']!==undefined ? !!ps['c'] : true;
			newProping['writable'] = ps['w']!==undefined ? !!ps['w'] : true;
			newProping['add'] = ps['add']!==undefined && typeOfVar( ps['add'] )==typeOfVar( [] ) ? ps['add'] : false;
			newProping['skip'] = ps['skip']!==undefined ? !!ps['skip'] : false;
			
			if( newProping['add'] )
				foreach(newProping['add'], ( i, p )=>{ p&&Object.defineProperty( obj, p, newProping); } );
			
			if( !!!newProping['skip'] )			
				foreach(obj, (p)=>{ Object.defineProperty( obj, p, newProping); } );
			
			return obj;
		},
		
		// return v as number || 0
		toNum: function toNumber( v ) { return Number( v )||0; },
		
		isSetFunc: function isSetAndIsFunction( v, k ) { k = k || false;
			return ( v && !!( k!==false ? v[k] : v ) && _z.isFunction( ( k!==false ? v[k] : v ) ) );
		},
		
		// create new error type
		newErrorType: function createNewErrorType( errorName, typeName ) {
			typeName = typeName || 'Error',
			errorName = errorName || '_zError';
			
			return fns.tryEval(
				`
				return function `+errorName+`( message ) {
					var error = new `+typeName+`( message||'Error' );
					error.name = '`+errorName+`';
					return error;
				}
				`
			);
		},
		
		toggle: {
			class: {
				off: true,
				_call: new Function("if(!!!arguments||!!!arguments.length||fns.toggle.off) { return false; } return _z(this).toggleClass(arguments[0]);"),
				call: function(){
					if(this.off)
						return;
					
					return this._call.apply( arguments[0], Array.from(arguments).slice(1) );
				},
			}
		},
		ask: {
			off: false,
			_call: new Function("if(!!!arguments||!!!arguments.length||fns.toggle.off) { return false; } return confirm.apply(null, arguments);"),
			call: function(){
				if(this.off)
					return true;
				
				return this._call.apply( this._call, arguments );
			},
		},
		
		// apply to function
		callFunction: function callFunction( func, arg, $this ) {
			$this = fns.turn( $this, this );
			arg = arg || [];
			func = func || fns.ef;
			arg = !_z.isArray(arg) ? [arg] : arg;
			return (
						(_z.isFunction( func ) && func.apply($this, arg )) || 
						(_z.isset( _z[func] ) && _z.isFunction( _z[func] ) && _z[func].apply($this, arg ))
					);
		},
		
		// current timestamp
		time: function time() {
			return ( new Date() ).getTime();
		},

        // eval
        eval: ( window.execScript || function _zEval( code ) { window[ "eval" ].call( window, code ); }),
        tryEval: function tryEval( code ) {
            var returns="";
            if( triming.call( code ) )
                try{ returns = fns.eval( triming.call( code ) ) || ""; } catch (e1) {
                    try { returns = fns.eval( '('+triming.call( code )+')' ) || ""; } catch(e2) {
                        try { returns = (new Function( triming.call( code ) ))() || ""; } catch(e3) { returns=""; }
                    }
                }
            return returns;
        },

        // define randome vars ( development purpose )
		get defineRandom() {
			var VarsNames = [
				'a', 
				'o', 
				's', 
				'f'
			],
			
			VarsValues = [
				VarsNames, 
				{
					num: 123,
					str: "hlaCk _z",
					bool: true,
					arr: Array.from( VarsNames ),
					obj: {
						a: 'a', b: 'b', c: 'c'
					},
				}, 
				'The hlaCk ..', 
				function() {
					return arguments;
				}
			],
			
			override = false,
			
			$return = [],
			
			tWin = window;
			
			foreach( VarsNames, function( rVar ) {
				// do not override
				if( isset( tWin[ VarsNames[ rVar ] ] ) && !override )
					return;
				
				// register as defined
				$return.push( VarsNames[ rVar ] );
				
				// add functions
				tWin[ VarsNames[ rVar ] ] = VarsValues[ rVar ];
			} );
			
			return $return;
		},
	
		br: byRef,
		byRef: byRef,
		
		// throw functions
		t: {
			// throw new error
			e: function() { throw new Error( ...arguments ); },
			
			// throw new type error
			t: function() { throw new TypeError( ...arguments ); },
			
			// throw new refrance error
			r: function() { throw new ReferenceError( ...arguments ); },
			
			// throw generator
			generate: function(e) { throw !( e instanceof Error ) ? new Error(e) : e },
		},
	
		turn: function( c, y ) {
			if( this == true ) // case sensitive
				return !isset(c)&&y || c;
			else
				return !!!c&&y || c;
		},
		
		turny: function turny( o ) {
			if(window['last']==123) console.warn( this, arguments );
			
			if( !isset( this['BINDED'] ) && (!arguments.length || !isset(o['arg'])) ) return;
			
			if( !isset( this['BINDED'] ) ) {
				o['arg'] = [ ...( o['arg']||[] ) ].reverse();
				o['arguments'] = [ ...o['arg'] ].reverse();
				
				return turny.bind( { BINDED: 1, 'o': o } );
			}
			else
			{
				var anyQuery = [];
				anyQuery['passed'] = isset( o ) || false;
				anyQuery['end'] = anyQuery['passed'] && o == 'end' || false;
				anyQuery['last'] = anyQuery['passed'] && o == 'last' || false;
				anyQuery['self'] = anyQuery['passed'] && o == 'self' || false;
				anyQuery['arguments'] = anyQuery['passed'] && (o == 'arguments' && this['o']['arg'] || typeOfVar(o)=='number'&&this['o']['arg'][ o ]) || false;
				anyQuery['isset'] = anyQuery['passed'] && (anyQuery['last'] || anyQuery['self'] || anyQuery['arguments'] || anyQuery['end']) && true || false;
				
				if( anyQuery['passed'] && !anyQuery['end'] )
				{
					return anyQuery['last']&&this['o']['last'] || 
							anyQuery['self']&&this['o']['self'] || 
							anyQuery['arguments'] || undefined;
				}
				
				if( isset(this['o']['self']) || anyQuery['end'] )
				{
					var selfFnd;
					if( !is_z( this['o']['self'] ) )
						selfFnd = this['o']['arg'].length ? this['o']['arg'].pop() : 
							( isset(this['o']['last']) ? (this['o']['last']===true ? this['o']['arguments'] : this['o']['last']) : undefined );
					else
					{
						selfFnd = this['o']['self'];
						this['o']['arguments'].unshift( selfFnd );

						if( this['o']['arg'].length && selfFnd.equalsAll( this['o']['arg'].slice(-1).pop() ) )
							this['o']['arg'].pop() && this['o']['arguments'].shift();
					}
					
					if( isset(this['o']['self']) ) delete this['o']['self'];
					
					if( anyQuery['end'] )
						return this['o']['arguments'];
					
				}
				else 
				if( isset(this['o']['arg']) ) {
					if( !this['o']['arg'].length && isset(this['o']['last']) )
					{
						var selfFnd = (this['o']['last']===true ? this['o']['arguments'] : this['o']['last']) || undefined;
						delete this['o']['last'];
					}
					else
					{
						var selfFnd = this['o']['arg'].length ? this['o']['arg'].pop() : 
								( isset(this['o']['last']) ? (this['o']['last']===true ? this['o']['arguments'] : this['o']['last']) : undefined );
					}
				}
				
				return selfFnd;
				return console.warn( this, arguments );
			}
			
			return 0;
		},
		_zturn: function( c, y ) {
			return !_z.is_z(c)&&y || c;
		},
		_turn: function( c, y ) {
			return _z.is_z(c)&&y || c;
		},
	},
	
/* 
CSSSELECTOR.indexed(e,['','input']) => "[name$=']'][name^='total[']input"
CSSSELECTOR.indexed(e,['input','']) => "input[name$=']'][name^='total[']"
CSSSELECTOR.indexed(e) => "[name$=']'][name^='total[']"
*/
	cssSelectorsIndexed = function cssSelectorReadIndexedElements(elm, adds, selType, returnAs) {
		if( !!!elm ) elm = this;
		
		elm = elm || false;
		returnAs = returnAs || 'elements';
		adds = adds || [];
		selType = selType || 'name';
		// console.info("["+selType+"^='"+elm+"[']["+selType+"$=']']");
		try {
			elm = _z.isString(elm) ? _z("["+selType+"^='"+elm+"[']["+selType+"$=']']") : elm;
			adds = _z.isArray(adds) ? adds : [adds, ''];
			// console.info(elm);
			str = false;
			var $return = [];
			
			elm = _z(elm);
		} catch(e) {
			return elm.info.selector;
		}
		
		if( elm && elm.length )
		{
			elmFunc.elmLoop( elm, function( e ) {
				if( e && e[selType] )
				{
					var str = e[selType].replace(/\[\d*?\]/g,'[')||false;
					
					if( str )
						$return.push(
								adds.slice(0,parseInt(adds.length/2)) + 
								"["+selType+"$=']']"+
								"["+selType+"^='"+str+"']" + 
								adds.slice(parseInt(adds.length/2))
						);
				}
			}, fns.true);
		}
		
		$return = $return.join(', ') || "";
		// console.info(elm,elm.length);
		return $return!=='' ? (returnAs=='string'?$return:_z($return)) : elm.info.selector;
	},
	
	// search by indexed element
	cssSelectorsIndexedSelector = function cssSelectorReadIndexedSelector( str ) {
		str = str || false;
		if( 
			!!!str || 
			!!!_z.isString( str ) || 
			!!!(new RegExp( selectorPatterns.indexed )).test( str )
		) return false;
		
		var selectorVal = str.replace( selectorPatterns.indexed, function(){
			return (matches = [ ...arguments ].slice(1, 5)).length ? 
						"[" +
							(matches[0] = 
								matches[0]!='#' ? 
								( (matches2 = selectorPatterns.indexedAttr.exec(matches[0])) ? matches2[1] : "name" )
									: "id"
							) +
						"^='" +
							matches[1] + matches[2] + 
						"'][" +
							matches[0] + 
						"$='" + 
							matches[3] + 
						"']"
							: false;
		});
		
		if( !!!selectorVal || !!!selectorVal.length ) return false;
		
		return selectorVal;
	},
	
	// return css selector by DOM element 
	cssSelector = function getCSSSelectorByElement( node, limit, path, returnType ) {
		path = path || [];
		limit = limit || 1024;
		returnType = returnType || "string";
		path = !_z.isArray(path) ? [path] : path;
		var _path = Array.from(path) || [""];
		
		if( node.parentNode && (limit!==1) )
			path = getCSSSelectorByElement( node.parentNode, limit-1, path, "array" );
		
		if( node.nodeType == 1 )
			path.push((
						node.nodeName.toLowerCase() + 
						(node.id ? "[id='"+node.id+"']" : '' ) +
						(node.name ? "[name='"+node.name+"']" : '' ) + 
						(node.className ? '.'+node.className.split(' ').join('.') : '' )
					));
		
		limit = ( limit!==false && limit>path.length ) ? path.length : limit;
		var result = ((limit!==false) ? Array.from(path).reverse().slice(0, limit).reverse() : path);
		
		result.unshift( ..._path );
		result = returnType=='string' ? result.join(' ') : result;
		
		return result;
	},
	
	// is element == window
	isWindow = function isWindow( element ) {
		var t = _z.privates.type( element );
		return element != null && 
			( 
				!!(t['window']) || (
					!!_z.is_z( element ) && 
					!!(elmFunc.elmLoop( element, fns.true, isWindow ).length == element.length)
				)
			);
	},
	
	// check if this module is _z declare system & exist
	isDeclare = function isDeclare( module, obj ) {
		obj = obj || false;
		if( obj === false )
			return isset( _z['declaresMap'] ) && isset( _z['declaresMap'][ module ] ) && isDeclare( module, _z['declaresMap'][ module ] ) || false;
		
		return obj && isset( obj['declares'] ) && isset( obj['declares'][ module ] ) && obj['declares'][ module ]
				|| false;
	},
	
	// find free id
	new_zID = function createNew_zID( isEngine ) {
		var newStamp = fns.time() || 0,
			newID = ++_z._counter || 0,
			_newID = 0,
			isEngine = isEngine || false,
			_zIDData = isEngine ? new_zID.edata : new_zID.data;
		
		while( isset( _zIDData[ 'UnderZ_' + newID + '_' + newStamp + '_' + _newID ] ) )
			_newID++;
		
		_zIDData[ 'UnderZ_' + newID + '_' + newStamp + '_' + _newID ] = isEngine ? true : {
			data: {},
			// id: newID,
			// stamp: newStamp,
			// idIndex: _newID,
		};
		return 'UnderZ_' + newID + '_' + newStamp + '_' + _newID;
	};
	new_zID.data = [];
	new_zID.edata = [];

	// register global variables
	window.fns = window.fns || fns;
	window.byRef = window.byRef || fns.byRef;
	window.Math.__random = isset(window.Math['__random']) ? window.Math['__random'] : window.Math['random'];
	window.Math.random = function() { return arguments.length ? _z.rnd( ...arguments ) : window.Math['__random'](); };
	// register global variables
	
	// Promiser module like promise
	var Promiser = function Promiser( callback ) {
		if( typeof(callback)!==typeof(this.push) )
			return console.error("Promiser: argument is not Function!");
		
		this.resolving = {
			error: [],
			success: []
		};
		this.callback = {
			error: null,
			success: null,
		};
		this.resolve = this.resolve.bind(this);
		this.reject = this.reject.bind(this);
		this.promise = ()=>{ callback( this.resolve ,this.reject ) };
		this.promise();
		this.length=0;
		return this;
	};
	Promiser.prototype = {
		promise: ()=>{ },
		reject: function(m) {
			this.resolving.error.push(m);
			this.error();
		},
		resolve: function(m) {
			this.resolving.success.push(m);
			this.success();
		},
		resolving: "",
		
		callback: "",
		
		error: function(f) {
			(f===false||f)&&(this.callback.error = f);
			if( typeof(this.callback.error)==typeof(this.error) && this.resolving.error.length )
				while( f=this.resolving.error.shift() )
				{
					this.callback.error(f);
					this.relays&&(this.relays('error',f));
				}
			else if( this.resolving.error.length )
				this.relays&&(this.relays('error'));
			
			return this;
		},
		success: function(f) {
			(f===false||f)&&(this.callback.success = f);
			if( typeof(this.callback.success)==typeof(this.success) && this.resolving.success.length )
				while( f=this.resolving.success.shift() )
				{
					this.callback.success(f);
					this.relays&&(this.relays('success',f));
				}
			else if( this.resolving.success.length )
				this.relays&&(this.relays('success'));
			
			return this;
		},
		then: function( s, e ) {
			return (s===false||s)&&(this.success( s )),
			(e===false||e)&&(this.error( e )), this;
		},
		relay: function( s, e ) {
			return (s===false||s)&&(this.relay.success=s),
			(e===false||e)&&(this.relay.error=e), this;
		},
		relays: function( type, result ) {
			if(type&&this.relay[type] && typeof(this.relay[type])==typeof(Function)&&result)
				this.relay[type](result);
			else if(type&&this.relay[type]&&typeof(this.relay[type])==typeof(Function)&&!!!result&&this.resolving[type])
			{
				result = Array.from(this.resolving[type]);
				var r;
				while( r=result.shift() )
					this.relays(type, r);
			}
				
		},
		
		by: 'hlaCk For UnderZ Engine 2017',
		length:0,
		push: [].push,
		sort: [].sort,
		splice: [].splice
	};
	
	var selectorPatterns = {
		// selector get indexed elements 
		// indexed: /(\b\[\*\])/,
		indexed: /\s*?(^|\#|\s|!\.|[PATTREN]?)\b(\w+)\b(\[)\*(\])/,
		indexedAttr: /\b(\w+)\b[\=]{2}/,
		// \\b\(\\w\+\)\\b\(\\[\)\\*\(\\]\)
		index: [ "(?:(.*?)\\:{2}([PATTREN])|.+)" ],
		indexFullPattrenTpl: "(.*?)\\:{2}([PATTREN])",
		idx: {
			// selector get first element
			first: "first\\b",
			// last
			last: "last\\b",
			// selector get n element
			// index: "i\\([n0-9]+\\)",
			// selector get indexed element
			// indexed: "\\b\\[\\*\\]",
		},
	};
	
	// css selector pattrens prepare
	Object.keys( selectorPatterns.idx ).forEach(function( s ) { selectorPatterns.index.push( selectorPatterns.idx[s] ); });
	selectorPatterns.index = 
	selectorPatterns.indexBackup = 
		selectorPatterns.index.length>2 ? 
					new RegExp( selectorPatterns.index.shift().replace( '[PATTREN]', selectorPatterns.index.join('|') ) , 'g')
						: "";

	selectorPatterns.indexed = new RegExp(
			( selectorPatterns.indexedAttr && selectorPatterns.indexedAttr ) ? 
				( selectorPatterns.indexed.toString()
					.replace(/\\/g, "\\")
					.replace(/\//g, "")
					.replace('[PATTREN]', selectorPatterns.indexedAttr.toString()
											.replace(/\/|\(|\)/g, "")
											.replace(/\\\\/g, "\\")
							)
				)
				: ( selectorPatterns.indexed.toString().replace(/\/|\|\[PATTREN\]/g, "") )
			, 'g' );
	
	
	// Pass in the objects to merge as arguments.
	// For a deep extend, set the first argument to `true`.
	// For a ArrayLike extend, set the first argument to `[]`.
	var extendFunction = function extend() {
		// Variables
		var extended = {},
			deep = false,
			idx = 0,
			length = arguments.length,
			args = arguments;
		
		if( typeOfVar( args[0] ) === 'boolean' ) {
			deep = args[ idx++ ];
			extended = args[ idx ] || extended;
		}
		
		// extend _z when use _z()
		if( length === (idx + 1) )
			extended = this;
		
		// extend as ArrayLike
		if( typeOfVar( args[0] )==typeOfVar( [] ) && Object.keys(extended).length === 0)
			extended = [];
		
		// Merge the object into the extended object
		var merge = function(obj) {
			for( var prop in obj )
			{
				if( 
					(hasProp( obj, prop ) && isDeclare( prop, obj )) || 
					obj[ prop ] === extended
				) continue;
				
				if( hasProp( obj, prop ) )//&& !(obj[prop] && extended[prop] && obj[prop] === extended[prop]))
					// If deep merge and property is an object, merge properties
					if( deep && typeOfVar( obj[prop] ) === 'object' ) {
						extended[prop] = extend( true, extended[ prop ], obj[ prop ] );
					} else {
						extended[prop] = obj[prop];
					}
			}
		};

		// Loop through each object and conduct a merge
		for ( ; idx < length; idx++ ) {
			var obj = args[idx];
			merge(obj);
		}
		
		return extended;
	};

	// extend objects
    var extendObjFunction = function extendObjects() {
        var objs = Array.from(arguments);
        objs.unshift({});

        return Object.assign( ...objs );
    };

	// arg1, arg2, ... assign all prototypes of all args in arg1
	var mix = function mix( arg1 ) {
		argsLen = arguments.length || 0;
		if( argsLen <= 1 ) return arg1 || {};
		
		var i, j, newObj = arg1 || {};

		for( i = 1; i < argsLen; i++ )
			for( j in arguments[i] )
				if( arguments[i].hasOwnProperty(j) )
					newObj[j] = arguments[i][j];

		return newObj;
	};

	// create copy of functions
	var cloneFunction = function cloneFunction( obj, copy ) {
		if( typeOfVar( obj ) !== 'function' )
			return extendFunction( true, copy, obj );

		copy = typeOfVar( obj ) === 'function' && (copy = obj) && obj.bind( copy ) || false;
		if( _z.typeOfVar( obj ) !== 'function' || !!!copy ) return (copy = obj);

		var _copy = Object.create( Object.getPrototypeOf( obj ), Object.getOwnPropertyDescriptors( obj ) );
		return mix( copy, extendFunction( true, {}, _copy ) );
	};
	
	/**
	*	( _z.$ || _z ).extend.status = [ true | false ]
	*	status of ( [ {}, {} ].extend )
	*/
	Object.defineProperty( extendFunction, 'status', {
		// get status of ( {}.extendIn & {}.extendIn$ )
		get () { return !!this._status; },
		
		// stop status of ( {}.extendIn & {}.extendIn$ )
		set ( s ) { this._status = !!s; },
		configurable: false
	});
	extendFunction._status = true;
	
	// _z engine
	var _z = function _z() {
		$this = (this && this.window === this) ? _z : this;
		
		if( arguments.length == 1 && arguments[0] instanceof _z )
			return arguments[0];

		// check if the argument is function to try to execute it
		if( arguments[0] && _z.isFunction(arguments[0]) && !is_z(arguments[0]) ) {
			if( $this.execFunctions || $this.$.execFunctions || false ) {
			    if( _z.document.isReady() )
			        return arguments[0].call(doc, arguments[0]);
			    else
			        return _z.ready(arguments[0]);

				// return _z( doc );
			}
			else arguments[0] = [ arguments[0] ];
		}
		
		return new ( $this.$.init.bind( $this.$ ) )( ...arguments );
	};

	// execute function addon if sent as element
	_z.f = function exec() { return _z.apply( _z.f, arguments ); };
	// status of execute function addon
    _z.f.execFunctions = true;
	// change/get status of execute function addon
	_z.f.status = function execFunctionsStatus(d) {
	    d = d == false ? false : d == true ? true : 9;
	    return d == 9 ? _z.$.execFunctions : (_z.$.execFunctions = d);
	};

	_z.extend = extendFunction;
	_z.cloneFunction = cloneFunction;
	_z.mix = mix;
	_z._counter = 0;
	// internal data
	_z._data = {};
	
	// register .is[type] functions
	[
		'Arguments', 
		'Function', 
		'String', 
		'Number', 
		'Date', 
		'RegExp', 
		'Object', 
		'Array', 
		'WeakSet', 
		'Set', 
		'Symbol', 
		'Error', 
		'WeakMap', 
		'Map',
		'NodeList',
		'Boolean'
	].forEach(function( name ) {
		// do not override// if( isset( _z['is' + name] ) && !override )// return;
		if( !isset( _z['is' + name] ) )
			_z['is' + name] = function(obj) {
				return toLC( typeOfVar( obj ) ) == toLC( name );
			}; 
	});

	// do not return if NaN #fix
	_z.isNumber = function isNumber(n) { return typeOfVar( n ) == typeOfVar( 1 ) && !isNaN(n); };
	//toString.call(obj) == '[object ' + name + ']';
	
	// attach Promiser module to engine
    // ex:
    // var p =_z.Promiser(function(r,j) {
    // r([1]);
    // }).then( (z)=>{log(z)}, (z)=>{log(z,'e')} );
    _z.Promiser = (x)=>new Promiser(x);

    // static objects
	fns.objProp( _z, { c: 0,
						add : [
						// ENGINE's
							'$', 'is_z', 'isCore', '_data', '_counter',
							// mine :$
							'privates',
						], 
						'skip': true
					});

	// _z.$ function holder => _z().
	_z.$ = _z.prototype = {
		// engine version
		underZ: version,
		
		constructor: _z,
		// allow to execute functions
		execFunctions: true,
		
		// create new instance _z()
		init: function UnderZ() {
			this.info = {
				// created timestamp
				stamp: 0,
				
				// arguments of _z object when called
				args: null,
				
				// like context in jQuery
				head: "",
				
				// selector
				selector: "",
				
				// previous selector
				lastSelector: undefined,
				
				id: new_zID( true ),
			};
			this.stamp = fns.time();
			this.args = arguments;
			
			// object, DOM, window
			var $elements = arguments[0] && 
							( _z.isDOMOW( arguments[0] ) || (isObj=_z.isObject( arguments[0] )) || arguments[0]['nodeType'] ) && 
							[ arguments[0] ] || false;
			
			// NodeList, HTMLCollection
			$elements = $elements || arguments[0] && 
									( _z.type( arguments[0] )=='NodeList' || (arguments[0] instanceof HTMLCollection) ) &&
									_z.toArray( arguments[0] ) || false;
			
			// !string, !number
			$elements = $elements || arguments[0] && 
									!( _z.isTypes( "hlaCk", arguments[0] ) || _z.isTypes( 7, arguments[0] ) ) && 
									arguments[0] || false;
			
			// context
			if( !!!isObj )
			{
				// DOM
				var head = arguments[1]&&
								_z.isDOM( arguments[1] ) &&
								arguments[1] || false;
				// nodeList
				head = head || _z.type( arguments[1] ) == 'NodeList' && 
								_z.toArray( arguments[1] ) || false;
				// string
				head = head || _z.isTypes( "hlaCk", arguments[1] ) &&
								_z( arguments[1] ).element(0) ||
								doc;
			}
			else
				var head;
			
			// search by underZ pattrens
			if( isset(arguments[0]) && _z.isTypes( "hlaCk", arguments[0] ) && $elements===false ) {
				if(
					selectorPatterns.index && 
					arguments[0].match(new RegExp(selectorPatterns.index)).length > 0 &&
					( testSelector = new RegExp(selectorPatterns.index).exec( arguments[0]) ) && 
					isset( testSelector[1], testSelector[2] )
				) {
					var testPattren=null,
						testPattrens=[];
					while( (testPattren=selectorPatterns.index.exec(arguments[0]))!=null ) testPattrens.push(testPattren);
					
					if( testPattrens.length ) {
						var _lastElement=false,
							_lastElementArgs = arguments;
						_z.for( testPattrens, function(i, path){
							// no pattren result
							if( !!!( path[2] && path[1] ) ) {
								path[0] = triming.call( path[0] );
								
								if( _lastElement===false )
									_lastElement = _z( path[0] || undefined );
								else
									_lastElement = _lastElement.find( path[0] || undefined );
									
								_lastElement.args.length = 1;
								_lastElement.args[0] = path[0];
								_lastElement.selector = path[0];
								
								return;
							}
							
							path[2]&&path[1]&&(path[1] = triming.call(path[1]));
							_lastElement = _lastElement===false ? 
												_z( path[2]&&path[1] ) : 
													_lastElement.find( path[2]&&path[1] );
													
							_lastElement = _lastElement[ path[2] ]();
							
							return;
						});
						
						return _lastElement;
					}
					
				}
				
				// search by indexed element
				$elements = cssSelectorsIndexedSelector( arguments[0] ) || false;
				if( $elements!== false && !_z($elements).length )
					console.warn( [arguments[0], $elements, arguments] );
				
				if( $elements!== false && $elements.length )
					$elements = fns.false(arguments[0] = $elements);
			}
			
			// string selector
			if( isset(arguments[0]) && head && head != doc && _z.isTypes( "hlaCk", arguments[0] ) ) {
				var qSelector = arguments[0];
				$elements = [];
				_z( head ).for(function( k, v, _all ) {
					if( _z.isDOM( v ) || _z.type( v ) != 'NodeList' )
						v = _z.toNodeList( v )[0];
					
					if( v && v['querySelectorAll'] )
					{
						v = v.querySelectorAll( qSelector );
						if( v.length ) $elements.add( _z( v ).element() );
					}
				});
			}
			
			// try querySelector
			try {
				$elements = $elements || _z.toArray( 
												(window.document || window.ownerDocument).querySelectorAll( arguments[0] ) || []
											);
			}
			// try parseHTML
			catch(e) {
				// try to parse html
				try {
					// is string
					if( isset(arguments[0]) && _z.isTypes( 'HTMLDOM', arguments[0] ) && arguments[0].length )
					{
						$elements = parssing.parseHTML( arguments[0] );
						// not html code
						if( !!!$elements.length )
							 fns.t.generate( e );
						else
						{ // html code
							head = document;
							// $elements = [ $elements[0] ];
                            $elements = _z.toArray($elements) || [];
						}
					}
					// empty
					else fns.t.generate( e );
				}
				catch(eParse) {
					$elements = [ arguments[0] ];
				}
			}
			
			if( arguments[0] && _z.isTypes( ':selector', arguments[0] ) )
				arguments[0]&&(this.selector = arguments[0]);
			
			this.length = ( $elements.length || 0 );
			this.extend( $elements );
			head&&(this.head = head);
			
			if( !isset( this.info.lastSelector ) )
				delete this.info.lastSelector;
			
			return this;
		},
		
		// created timestamp
		get stamp() { return this.info.stamp || 0; },
		set stamp( stamp ) { this.info.stamp = stamp || 0; },
		
		// arguments of _z object when called
		get args() { return this.info.args || []; },
		set args( args ) { this.info.args = args || []; },
		
		// selector
		get selector() { return this.info.selector || ""; },
		set selector( args ) { this.info.selector = args || ""; },
		
		// elements count
		length: 0,
		get len() { return this.length; },
		
		// like context in jQuery
		get head() { return this.info.head || ""; },
		set head( head ) { this.info.head = head || ""; },
		
		// last selector
		get lastSelector() { return this.info.lastSelector || undefined; },
		set lastSelector( lastSelector ) { this.info.lastSelector = lastSelector || ""; },
		
		// private data
		info: "",
		
		// Get element by index 
		element: function getElement( index ) {
			// find index || undefined || get all if no index
			return isset( index ) ? 
					this[ ( index < 0 ? ( this.len + index ) : index ) ] : 
						( this.length ? this.toArray() : []);
		},
		
		// update current elements
		update: function updateElements( a ) {
			a = _z( a ).element();
			this.newSelector( null );
			// newInstance.args = arguments;
			// newInstance.selector = "";
			
			this.filter(( v, k ) => {
				if( k > a.length-1 )
				{
					delete this[k];
					return false;
				}
				this[k] = a[k];
				return true;
			});
			
			this.extend(a);
			this.length=a.length;
			
			this.args = arguments;
			this.selector = a;
			return this;
		},
		
		// add elements, return new underz
		add: function addElements( anElements ) {
			try {
				(aE=toArray( anElements )) && ( anElements = aE);
			} catch ( err ) { }
			( $anElements=this.element() ).push( ...( typeOfVar( anElements )=='array' ? anElements : [anElements] ) );

			return this.newSelector( $anElements );
		},

		// add elements to this object, return same underz
		addThis: function addThisElements( anElements ) {
			try {
				(aE=toArray( anElements )) && ( anElements = aE);
			} catch ( err ) { }
			( $anElements=this.element() ).push( ...( typeOfVar( anElements )=='array' ? anElements : [anElements] ) );

            this.update( $anElements );
            return this;
		},

		// create new selector and save current
		newSelector: function newSelector() {
			var lastSelector = new ( newSelector.proto.init.bind( newSelector.proto ) )( this.info, this.element() );
			var a = ( arguments.length==1 && arguments[0]===null ) ? this : _z( ...arguments );
			a.lastSelector = lastSelector;
			
			return ( arguments.length==1 && arguments[0]===null ) ? this : a;
		},
		
		// get Last saved Selector
		getLastSelector: function getLastSelector() {
			if( !!this.info.lastSelector && isset(this.info.lastSelector) ) {
				var z = _z( this.info.lastSelector.element() );
				z.info = this.info.lastSelector.info;
				// _z.for(this.info.lastSelector.info, ( k, v )=>z.info[k]=v );
				return z;
			}
			return _z();
		},
		end: function getLastSelector() { return this.getLastSelector(); },
		
	};
	_z.$.init.prototype = _z.$;
	_z.$.extend = extendFunction;
	_z.$.extend( protos.likeArray );
	
	// static objects _z.$
	fns.objProp( _z.$,  { c: 0,
							add : [
								// ENGINE's
								'underZ', 'constructor', 'init', 'length', 'info',
								'end','getLastSelector', 'newSelector', 
								'updateElements', 'element'
							],
							'skip': true
						});

	// lastSelector holder
	_z.$.newSelector.proto = _z.$.newSelector.prototype = {
		// engine version
		underZNS: version,
		// lastSelector info
		info: "",
		constructor: _z.$.newSelector,
		// create new instance newSelector()
		init: function UnderZSelector( info, $elements ) {
			info = _z.extend({}, info)||{},
			$elements = _z.extend([], $elements)||[];
			
			this.info = info||{};
			this.extend( $elements||[] );
			this.length = $elements['length'] || 0;
			return this;
		},
		// Get elements
		element: function getElements( ) { return Array.from( this ); },
	};
	_z.$.newSelector.proto.init.prototype = _z.$.newSelector.proto;
	_z.$.newSelector.proto.extend = extendFunction;
	_z.$.newSelector.proto.extend( protos.likeArray );

	// static objects _z.$.newSelector
	fns.objProp( _z.$.newSelector, { c: 0,
									add : [
										// ENGINE's
										'underZNS', 'constructor', 'init', 'info',
										'proto', 'element'
									],
									'skip': true
								});
					
	// notification module
	_z.notification = function Notifications( options, options2 ) {
		if( !!!(this instanceof Notifications) )
			return fns.t.e("Failed to construct 'Notifications': Please use the 'new' operator.");
		
		// if notification blocked try to grant permission
		if( !!!this.status && !!!this.blocked )
			return this.request( ()=> new notificationModule( ...(arguments||[]) ) );
		
		options2 = options2 || {};
		options = options || "DefaultTag";
		options = _z.isObject(options) ? options : (
			_z.isString(options) ? { tag: options } : options||{}
		);
		options = _z.extend({}, 
						this.options || {}, 
						{ data: arguments },
						options || {}, 
						options2 || {}
					);
		options['data']&&(options.data=_z.extend({}, options||{}));
		options['events'] = options['events'] || {};
		
		// remove events from options to this
		_z.for(this.events, function( eIdx, eName ) {
			eName = (eName&&_z.isArray( eName ) ? eName : [ eName ])[0] || false;
			if(
				eName && 
				(isset(options['events'][ eName ]) || (options['events'][ eName ]=[])) &&
				(_z.isArray(options['events'][ eName ]) || (options['events'][ eName ]=[ options['events'][ eName ] ])) &&
				isset( options[ eName ] ) && 
				(
					(_z.isArray(options[ eName ]) && options[ eName ]) || 
					(options[ eName ] = [ options[ eName ] ])
				) && 
				(options['events'][ eName ].push( ... (options[ eName ] || []) ))
			) delete options[ eName ];
			
		}, options['events']);
		
		// current notification options
		this.options = _z.extend({}, options);
		this.length = _z.toArray( this ).length || 0;
		
		return this;
	};
	_z.notification.prototype = {
		options: {
			title: "ERP Millions, Best ERP Solution.", 
			body: "By M.F.Al-Safadi, Al-Tall Inc.", 
			
			icon : "favicon.ico",
			image : "ERP.png",
			badge : "favicon.ico",
			
			dir : "auto",
			lang : "",
			tag : "DefaultTag",
			
			data: []
		},
		
		// open notification module
		open: function openNotification( options ) {
			if( !!!this.options ) this.options = {};
			
			var newOptions = _z.extend({}, this['options'] || {}, { data: false, events: false } );
			
			delete newOptions['events'];
			delete newOptions['data'];
			newOptions = _z.extend({}, newOptions || {} );
			
			var n = new Notification( newOptions['title']||"", newOptions||{} );
			
			// add registered handleEvent to current notification
			_z.for(this.events, function( eIdx, eName ) {
				eName = eName&&_z.isArray( eName ) ? eName : [ eName ];
				eName = eName[0] || false;
				
				if( isset( this['events'][ eName ] ) && (this['events'][ eName ].length) )
				{
					_z.for(this['events'][ eName ], function( fIdx, fName ) {
						var ELArgs = [ (eName || 'click').replace(/^on/, ''), fName ],
							addEL;
						if( n.addEventListener )
						{
							ELArgs.push( false );
							addEL = n.addEventListener;
						} else addEL = n.detachEvent;
						
						if( fns.isSetFunc( fName ) )
							return addEL.apply( n, ELArgs );
						
					});
				}
				
			}, this['options']);
			
			// attach notification object to options
			this.push( n );
			// options.instance = this.instance = n;
			return this;
		},
		
		
		// update notification status - request permission
		request: function requestPermission() {
			try { return Notification.requestPermission( ...(arguments||[]) ); } catch (NotificationException) { return false; }
		},
		
		// all available eventhandlers
		events: [ 
			'onclick',
			'onshow',
			'onerror',
			'onclose'
		],
		
		// all available eventhandlers
		// events = [ 
					// 'onclick',
					// 'onshow',
					// 'onerror',
					// 'onclose'
				// ];
		// events = [ 
			// [ 'click', 'onclick' ],
			// [ 'show', 'onshow', 'done', 'success' ],
			// [ 'error', 'onerror', 'block', 'denied' ], 
			// [ 'close', 'onclose' ]
		// ];
		
		
		// notification status get
		get status() { return Notification.permission == 'granted' || false; },
		// notification status is denied
		get blocked() { return Notification.permission == 'denied' || false; },
		
		length: 0,
	};
	_z.notification.prototype.extend = extendFunction;
	_z.notification.prototype.extend( protos.likeArray );
	// notification module
	
	// element/elements value
	Object.defineProperty( _z.$, 'value', {
		get () { return this.val(); },
		set ( v ) { return this.val( v ); },
		configurable: false
	});

	// [ arg1, args... ].extend => _z.extend( arg1, ...args )
	Object.defineProperty( Array.prototype, 'extend', {
		get: function() {
			return extendFunction.status === false ? this : (
				( !!!this.length || this.length < 2 ) ? ( this[0] || this ) :
					_z.extend( true, this[0], ...subArray( 1, this ) )
				);
		},
		configurable: false
	});

    // element attributes functions
	var __zAttrFunctions = {
		// check if element has an attribute
		hasAttr: function hasAttr( elm, attrName ) {
			var tunning = fns.turny({
							arg: arguments,
							self: this,
							last: undefined
						});
			elm = tunning.call();
			attrName = tunning.call();
			arguments = [ elm, attrName ];
			
			if( arguments.length === 1 || ( !!!attrName && elm ) )
			{
				attrName = elm;
				elm = this;
			}
			
			if( _z.isArray( attrName ) && attrName.length )
			{
				var $return = true;
				_z(attrName).each(function() {
					if( $return === false )
						return;
					
					$return = _z( elm ).hasAttr( this );
				});
				
				return $return;
			}
				
			attrName = _z.trim( attrName );
			if( !!!attrName )
				return false;
			
			if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length )
				return false;
			else if( !_z.is_z( elm ) )
				elm = _z( elm );
			
			
			if( elm.len || elm.length )
			{
				var $return = false;
				( _z.is_z( elm ) ? elm : _z( elm ) ).each(function() {
					if( $return !== false )
						return;
					
					if( _z.isDOM( this ) )
						$return = this.hasAttribute( attrName );
				});
				
				return $return;
			}
			
			return false;
		},
		
		// remove attribute from element
		remAttr: function removeAttr( elm, attrName ) {
			// var elm = fns._zturn( this, elm );
			if( arguments.length === 1 || ( !!!attrName && elm ) )
			{
				attrName = elm;
				elm = this;
			}
			// console.info(attrName);
			
			if( _z.isArray( attrName ) && attrName.length )
			{
				_z( attrName ).each(function() {
					_z( elm ).removeAttr( this );
				});
				
				return this;
			}
				
			attrName = _z.trim( attrName );
			if( !!!attrName || ( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length ) )
				return this;
			
			if( !_z.is_z( elm ) )
				elm = _z( elm );
			
			if( elm.len || elm.length )
			{
				( elm ).each(function() {
					if( _z.isDOM( this ) )
						this.removeAttribute( attrName );
				});
				
				return this;
			}
			
			return this;
		},
		
		// set & get attribute of an element
		attr: function attr( elm, attrName, attrValue ) {
			var tunning = fns.turny({
							arg: arguments,
							self: this,
							last: undefined
						});
			elm = tunning.call();
			attrName = tunning.call();
			attrValue = tunning.call();
			arguments = [ elm, attrName, attrValue ];
			/* 
			// var elm = fns._zturn( this, elm );
			// just attribute name
			if( arguments.length === 1 || ( !isset(attrValue) && !isset(attrName) && isset(elm) ) )
			{
				attrName = elm;
				elm = this;
			}
			// just attribute name & attribute value
			else if( arguments.length === 2 || ( !isset(attrValue) && isset( attrName ) && isset( elm ) ) )
			{
				if( !_z.isDOM( elm ) && !_z.is_z( elm ) )
				{
					attrValue = attrName;
					attrName = elm;
					elm = this;
				}
			}
			 */
			var attrValueExist = isset(attrValue);
			attrName = triming.call( attrName );
			isset(attrValue)&&( attrValue = triming.call( attrValue ) );
			
			if( !!!attrName )
				return false;
			
			if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length )
				return false;
			
			if( !_z.is_z( elm ) )
				elm = _z( elm );
			
			// console.log([attrValue,attrName ,elm,this]);
			if( elm.len || elm.length )
			{
				var $return = [];
				elmFunc.elmLoop( elm, function( e ) {
					if( // checkbox || radio
						e['tagName'] && toLC(e['tagName'])=='input' && 
						e['type'] && 
						( e['type'] == 'checkbox' || e['type'] == 'radio' ) && 
						toLC(attrName) == 'checked' && isset(attrValue)
					)
						e['checked'] = (attrValue!==false && attrValue!==triming.call( false )) ? attrValue='checked' : '';
					
					if( toLC(attrName) == 'checked' && (attrValue===false || attrValue===triming.call( false )) )
						e.removeAttribute('checked');
					else
						$return.push(
							( isset(attrValue) ? e.setAttribute( attrName, attrValue ) : e.getAttribute( attrName ) )||"" 
						);
				});
				
				// ( e['checked'] && ( e['checked'] = ( _z.inArray( e['value'], val )!==-1 ) ) )
				// _z( elm ).each(function() {
					// if( _z.isDOM( this ) )
						// $return.push(
							// ( attrValue ? this.setAttribute( attrName, attrValue ) : this.getAttribute( attrName ) )||"" 
						// );
				// });
				return ( attrValueExist ? this : ( $return.length===1 ? ( $return[0]||"" ) : $return) );
			}
			
			return attrValueExist ? this  : "";
		},
		
		/* function fullPath(el, limit){ limit = Number(limit) || false;
  var names = [];
  while (el.parentNode){
	var fResult = false;
	
    if (el.id){
		fResult = true;
      names.unshift("[id='"+el.id+"']");
      // break;
    }else{
      if (el==el.ownerDocument.documentElement) names.unshift(el.tagName);
      else{
        for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
        console.log(e),
		console.warn(fullPath(e,1));
        // names.unshift(fullPath(e,1));
        // names.unshift(el.tagName+fullPath(el);
      }
    }
	
	if(el.className)
	{
		fResult = true;
		names[0] += '.'+el.className.split(' ').join('.');
	}
	if( fResult === false && el.tagName)
		names.unshift(el.tagName);
	
	el=el.parentNode;
	
	if(limit !=false && names.length>=limit)
		break;
  }
  
  return names.join(" ");
} */
		// get all attributes
		attrs: function getAllElementAttributes() {
			var idxOF = "",
				deleteAttr = -1,
				returnAttr = -1,
				obj = {},
				thisElement = this;

			if(arguments.length === 2 || arguments.length === 3) {
				if(
					(  arguments[0] && (_z.isTypes("string", arguments[0])||_z.isTypes(true, arguments[0])) || true ) && 
					(  arguments[1] && (_z.isTypes("string", arguments[1])||_z.isTypes(true, arguments[1])) || true )
				)
				{
					deleteAttr = ( arguments[0]===true || toLC( arguments[0] ) == 'delete' || toLC( arguments[1] ) == 'delete' );
					returnAttr = ( arguments[1]===true || toLC( arguments[0] ) == 'return' || toLC( arguments[1] ) == 'return' );
				}
				var _arguments = []; 
				_arguments = ( arguments[0]!==true && toLC( arguments[0] ) != 'return' && toLC( arguments[0] ) != 'delete' ) ? [...arguments] : subArray( 1, [...arguments] );
				
				if( !!!( arguments[1]!==true && toLC( arguments[1] ) != 'return' && toLC( arguments[1] ) != 'delete' ) ) 
					_arguments = subArray( 1, _arguments );
				
				arguments = _arguments;//[ (arguments.length&&arguments[ arguments.length-1 ] || "") ];
			}
			
			if( arguments.length === 1 && (_z.isDOM( arguments[0] ) || _z.is_z( arguments[0] )) )
			{
				thisElement = arguments[0];
				arguments = [];
			}
			else
				thisElement = this;
			
			// search for attributes
			if( arguments.length === 1 ) {
				if( arguments[0] && (_z.isTypes("string", arguments[0]) || _z.isArray(arguments[0])) )
					idxOF = toLC(arguments[0]);
				
				arguments = [];
			}

			if( arguments.length === 0 ) {
				if(_z.size( thisElement ) === 0)
					return null;
				
				var pushIt = _z.size( thisElement ) > 1;
				obj = pushIt ? [] : {};
				
				// console.log(idxOF.length);
				if( idxOF&&_z.isArray(idxOF)&&idxOF.length>1 ) {
					var $__return = {};
					foreach(idxOF, function(__k, __v) {
						var $__val = _z(thisElement).attrs( deleteAttr, returnAttr, __v );
						$__return = _z.extend($__return, $__val );
					});
					// console.warn($__return);
					return $__return;
				}
				
				_z( thisElement ).each(function() { 
					var $elm = this;
					var subObj = {};
					_z.each( _z.toArray( $elm.attributes ), function() {
						if( idxOF !== "" )
						{
							// console.info([
								// toLC(this.name),
								// toLC(idxOF[0]),
								// toLC(this.name) != toLC(idxOF[0])
							// ]);
							
							if( _z.isString(idxOF) && this.name.indexOf( idxOF ) === -1)
								return;
							else if( _z.isArray(idxOF) && idxOF.length==1 && toLC(this.name) != toLC(idxOF[0]) )
								return;
						}
						
						if( this.specified ) {
						  if( deleteAttr === true )
							$elm.removeAttribute( this.name );
							
							if(
								(returnAttr===true && deleteAttr===true) || 
								(returnAttr===true && deleteAttr===false) || 
								(returnAttr===-1 && deleteAttr===-1)
							)
							{
								if( pushIt )
									subObj[ this.name ] = this.value;
								else
									obj[ this.name ] = this.value;
							}
							else if(
								(returnAttr===false && deleteAttr===false) || 
								(returnAttr===false && deleteAttr===true)
							)
								obj = obj;
							
						}
					});
					
					if( pushIt )
					{
						subObj = [ $elm, subObj ];
						obj.push( subObj );
					}
			  });
			  
			}
			
			return obj;
		},
		
	};
	__zAttrFunctions.removeAttr = __zAttrFunctions.remAttr;
	
	// elements class functions
	var __zClassFunctions = {
		// check if element has class
		hasClass: function hasClass( elm, className ) {
			// var elm = fns._zturn( elm, this );
			if( arguments.length === 1 || ( !!!className && elm ) )
			{
				className = elm;
				elm = this;
			}
			
			if( _z.isArray( className ) && className.length )
			{
				var $return = true;
				_z(className).each(function() {
					if( $return === false )
						return;
					
					$return = _z( elm ).hasClass( this );
				});
				
				return $return;
			}
				
			className = _z.trim( className );
			if( !!!className )
				return false;
			
			className = ' ' + className + ' ';
			
			if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length )
				return false;
			else if( !_z.is_z( elm ) )
				elm = _z( elm );
			
			
			if( elm.len || elm.length )
			{
				var $return = false;
				( _z.is_z( elm ) ? elm : _z( elm ) ).each(function() {
					if( $return !== false )
						return;
					
					if( _z.isDOM( this ) )
						$return = new RegExp( className ).test(' ' + this.className + ' ');
				});
				
				return $return;
			}
			
			return false;
		},
		
		// add class to element
		addClass: function addClass( elm, className ) {
			// var elm = fns._zturn( this, elm );
			if( arguments.length === 1 || ( !!!className && elm ) )
			{
				className = elm;
				elm = this;
			}
			
			if( _z.isArray( className ) && className.length )
			{
				_z(className).each(function() {
					_z( elm ).addClass( this );
				});
				
				return this;
			}
			
			className = _z.trim( className );
			if( !!!className )
				return this;
			
			if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length )
				return this;
			else if( !_z.is_z( elm ) )
				elm = _z( elm );
			
			if( elm.len || elm.length )
			{
				( _z.is_z( elm ) ? elm : _z( elm ) ).each(function() {
					if( _z.isDOM( this ) && !_z( this ).hasClass( className ) )
						this.className = _z.trim( this.className + ' ' + className );
				});
				return this;
			}
			return this;
		},
		
		// remove class from element
		remClass: function removeClass( elm, className ) {
			// var elm = fns._zturn( this, elm );
			if( arguments.length === 1 || ( !!!className && elm ) )
			{
				className = elm;
				elm = this;
			}
			
			if( _z.isArray( className ) && className.length )
			{
				_z(className).each(function() {
					_z( elm ).removeClass( this );
				});
				
				return this;
			}
			
			className = _z.trim( className );
			if( !!!className )
				return this;
			
			if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length )
				return this;
			else if( !_z.is_z( elm ) )
				elm = _z( elm );
			
			if( elm.len || elm.length )
			{
				( _z.is_z( elm ) ? elm : _z( elm ) ).each(function() {
					if( _z.isDOM( this ) )
					{
						var newClass = ' ' + this.className.replace( /[\t\r\n]/g, ' ') + ' ';
						if( _z( this ).hasClass( className ) ) {
							while( newClass.indexOf( ' ' + className + ' ' ) >= 0 )
								newClass = newClass.replace( ' ' + className + ' ', ' ' );
							
							this.className = newClass.replace( /^\s+|\s+$/g, '' );
						}
					}
				});
				return this;
			}
			return this;
		},
		
		// toggle class from element
		toggleClass: function toggleClass( elm, className ) {
			// var elm = fns._zturn( this, elm );
			if( arguments.length === 1 || ( !!!className && elm ) )
			{
				className = elm;
				elm = this;
			}
			
			if( !!!className || !!!elm)
				return this;
			
			if( !_z.isArray( className ) )
				className = [ className ];
			
			if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length )
				return this;
			else if( !_z.is_z( elm ) )
				elm = _z( elm );
			
			if( elm.len || elm.length )
			{
				( _z.is_z( elm ) ? elm : _z( elm ) ).each(function() {
					var $elm = this;
					_z( className ).each(function() {
						if( _z.isDOM( $elm ) )
							$elm.classList.toggle( this );
						else if( _z( $elm ).hasClass( this ) )
							_z( $elm ).removeClass( this );
						else
							_z( $elm ).addClass( this );
					});
				});
				return this;
			}
			return this;
		},
		
		// toggle class from element
		classList: function classList( elm, unique ) {
			var elm = elm || this,
				unique = unique===false ? false : ( unique || true ),
				$classList = [];
			
			if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length )
				return $classList;
			else if( !_z.is_z( elm ) )
				elm = _z( elm );
			
			if( elm.len || elm.length )
			{
				( _z.is_z( elm ) ? elm : _z( elm ) ).each(function() {
					if( _z.isDOM( this ) )
						$classList.add( _z.toArray( this.classList || []) );
				});
			}
			return $classList.unique();
		},

        // css of element
        css: function css( elm, $var, $val ) {
            if( isset(elm) )
            {
                if( _z.isDOM(elm) )
                    elm = _z( elm );
                if( !_z.is_z(elm) )
                {
                    if( isset($var) )
                        $val = $var;

                    $var = elm,
                        elm = this;
                }
            }
            else
                elm = this;

            elm = ( _z.is_z( elm ) ? elm :
                ( (_z.isDOM(elm)||_z.isArray( elm )) ? _z(elm) : false ));
            if( elm===false )
                return this;

            // get style
            if( $var&&!!!_z.isTypes( {}, $var ) )
            {
                $var = _z.privates.prepareCSS( _z($var) );
                var $return=[],
                    compStyle = vanilla( 'compStyle' );

                elmFunc.elmLoop( elm, function( e ) {
                    if( isset($val) )
                    {
                        if( e['style'] )
                            e['style'][ $var ] = _z.isFunction( $val ) ? $val.apply( e, arguments ) : $val;
                    }
                    else
                        $return.push( ( (compStyle(e, null)||e.currentStyle)[ $var ]||"" ) );
                });

                return isset( $val ) ? this : ( elm.length==1 ? ($return[0]||"") : $return );
            }
            else if( $var&&_z.isTypes( {}, $var ) )
            {
                elmFunc.elmLoop( elm, function( e, k ) {
                    _z.for( $var, function( $k, $v ) {
                        _z(e).css( $k, $v );
                    });
                });
                return this;
            }

            var $return=[];
            if( elm.length > 1 )
            {
                elm.each(function() {
                    $return.add( [_z(this).css()] );
                });
                return $return;
            }

            var $var = $var || false;
            var sheets = document.styleSheets, o = [];
            for( var i in sheets ) {
                var rules = sheets[i].rules || sheets[i].cssRules;
                for( var r in rules ) {
                    elmFunc.elmLoop( elm, function( e, k ) {
                        o[ k ]||(o[ k ] = {});

                        // if( _z(e).is(rules[r].selectorText) )
                        if( elmFunc.matches( e, rules[r].selectorText ) )
                        {
                            var pcss1 = elmFunc.prepareCSS( rules[r].style )||{},
                                pcss2 = _z(e).attr('style');
                            pcss2 = pcss2 ? (elmFunc.prepareCSS( pcss2 )||{}) : {};

                            o[ k ] = _z.extend( o[ k ], pcss2, pcss1 );
                        }
                    }, fns.true);
                }
            }

            if($var)
            {
                elmFunc.elmLoop( elm, function( e, k ) {
                    if( o.length )
                    {
                        o[ k ]||(o[ k ] = {});

                        if( o[ k ] && ($var in o[ k ]))
                            o[ k ] = o[ k ][$var];
                        else
                            o[ k ] = "";
                    }
                    else
                        o[ k ]={};
                });
            }

            // if( o.length )
            // foreach( o, function( k, v ) {
            // if( _z.size( v ) )
            // foreach( v, function( k2, v2 ) {
            // if( !!!k2 || (!!!v2 && v2 !== "") )
            // delete o[k][k2];
            // });
            // });
            return elm.length==1 ? o[0] : o;
        },
		
	};
	__zClassFunctions.removeClass = __zClassFunctions.remClass;
	
	// for _z()
	var __zElementsFunctions = {
		// add last selector elements, elm = filter by selector
		addBack: function addBack( elm ) {
			return this.newSelector( this.add( (isset( elm ) ? this.end().whereIs( elm ) : this.end()).element() ) );
		},
		
		equalsAll: function matchesAllElements( iObj ) {
			var o1 = this.element();
			var o2 = _z( !_z.isFunction(iObj) ? iObj : [iObj] ).element();
			// if( _z.isFunction(o2) ) 
				// return o1.inArray( o2 )!==-1;
			
			if (o1.length !== o2.length) return false;
			
			if( _z.isArray(o1) && _z.isArray(o2) )
			{
				for( var a=0, aa=o1.length; a<aa; a++)
					if( o2.inArray(o1[a])==-1 ) return false;
				
				// for( var a=0, aa=o2.length; a<aa; a++)
					// if( o1.inArray(o2[a])==-1 ) return false;
				
				return true;
			}
			
			
			var aMemberCount = 0;
			for (var a in o1) {
				if (!o1.hasOwnProperty(a)) continue;
				
				if (typeof o1[a] === 'object' && typeof o2[a] === 'object' ? !o1[a].equals(o2[a]) : o1[a] !== o2[a]) return false;
				++aMemberCount;
			}
			
			for (var a in o2)
				if (o2.hasOwnProperty(a))
					--aMemberCount;
			
			return aMemberCount ? false : true;
		},
		
		// hide element
		hide: function hide( elm ) {
			var elm = elm || this;
			// var elm = fns._zturn( this, elm );
			if( !_z.isDOM( elm ) && !elm.len && !elm.length )
				return false;
			
			if( elm.len || elm.length )
			{
				( elm.len ? elm : _z(elm) ).each(function(){
					if( _z.isDOM( this ) )
						this.style.display = 'none';
				});
			}
			return this;
		},
		
		// show element
		show: function show( elm, displayStyle ) {
			var displayStyle = fns.turn( displayStyle, (is_z(elm) ? false : elm) );
			var elm = (is_z(elm) ? elm : this) || false;
			// var elm = fns._zturn( this, elm );
			if( !_z.isDOM( elm ) && !elm.len && !elm.length )
				return false;
			
			if( elm.len || elm.length )
			{
				elm = ( elm.len ? elm : _z(elm) );
				elm.each(function() {
					if( _z.isDOM( this ) )
						this.style.display = ( displayStyle || elm.defaultDisplayStyle() );
				});
			}
			return this;
		},
		
		// toggle show/hide
		toggle: function toggle( elm, displayStyle ) {
            var displayStyle = fns.turn( displayStyle, (is_z(elm) ? 'toggle' : elm) || 'toggle' );
            var elm = (is_z(elm) ? elm : this) || false;
			// var elm = fns._zturn( this, elm ),

			if( !_z.isDOM( elm ) && !elm.len && !elm.length )
				return this;
			
			if( elm.len || elm.length )
			{
				( elm.len ? elm : _z(elm) ).each(function() {
					if( _z.isDOM( this ) )
					{
						var display,
							compStyle = vanilla('compStyle');
						if( displayStyle == 'toggle' )
							display = (compStyle ? compStyle(this, null) : this.currentStyle).display == 'none' ? 
								( _z(this).defaultDisplayStyle()||'' ) : 'none';
						else
							display = ( displayStyle || ( _z(this).defaultDisplayStyle()||'' ) );
						
						this.style.display = display;
					}
				});
			}
			
			return this;
		},
		
		// get default display css value
		defaultDisplayStyle: function defaultDisplayStyle( tag ) {
			// var tag = fns._zturn( tag, this.element( 0 ).tagName || false );
			var tag = tag || this.element( 0 ).tagName || false ;
			if( !tag )
				return '';
			
			tag = String( tag ).replace( /^\s+|\s+$/g, '' );
			
			if( isset( _z.defaultDisplayStyleLog[ tag ] ) )
				return _z.defaultDisplayStyleLog[ tag ];
			
			var iframe = document.createElement('iframe');
			iframe.setAttribute('frameborder', 0);
			iframe.setAttribute('width', 0);
			iframe.setAttribute('height', 0);
			document.documentElement.appendChild(iframe);

			var doc = (iframe.contentWindow || iframe.contentDocument).document;

			// IE support
			doc.write();
			doc.close();

			var testEl = doc.createElement(tag);
			doc.documentElement.appendChild(testEl);
			var display = (vanilla('compStyle') ? vanilla('compStyle')(testEl, null) : testEl.currentStyle).display
			iframe.parentNode.removeChild(iframe);
			
			_z.defaultDisplayStyleLog[ tag ] = display;
			return display;
		},
		
		// scroll To element
		scrollTo: function scrollToElement( elm/* , eIdx */ ) {
			if( !isset(elm) && !isset(this['underZ'], this['element']) ) return false;

			var topOfElement,
				$return = false;
			
			// check if elm is Top
			if( _z.isNumber(elm) )
			{
				topOfElement = elm;
				elm = undefined;
			}

			var scroller = isset( this['underZ'], this['element'] ) && !_z.isWindow(this)?
								this.filter( ($e)=>(_z($e).isShow()&&_z.isDOM($e)) ).element(0) :
									window;

			if( isset( elm ) && !!!_z( elm ).isDOMElement(true) && !!!_z.isNumber( elm ) )
				return isset( this['underZ'], this['element'] ) ? this : _z( scroller );
			
			if( isset( elm ) && _z( elm ).isDOMElement() )
				elm = _z( elm ).filter($e=>(_z($e).isShow()&&_z.isDOM($e)));
			
			if( isset( scroller ) && !!!_z( scroller ).isDOMElement(true) )
				scroller = window;
			
			try {
				var scrollIntoView;
				
				if( isset(elm) && _z.isFunction( (scrollIntoView = elm.prop('scrollIntoView')) ) )
					return scrollIntoView.call( elm[0] ), _z( elm[0] );
				else 
				if(
					( arguments.length==0 || ( !isset( elm ) && !_z.isNumber( topOfElement ) ) ) && 
					scroller && _z.isDOM(scroller) && 
					_z.isFunction( (scrollIntoView = _z(scroller).prop('scrollIntoView')) )
				) return scrollIntoView.call( scroller ), _z( scroller );
				
				var $returnTester = isset(elm) ? elm.rect('top') : 1;
				if( (topOfElement = topOfElement || $returnTester)==$returnTester ) $return = _z( elm.element(0) );
				
				$returnTester = _z(scroller).rect('top');
				if( (topOfElement = topOfElement || $returnTester)==$returnTester ) $return = _z( _z(scroller).element(0) );
				
				if( _z.isArray(topOfElement) )
					topOfElement = topOfElement[0];
					
				if( _z.isNumber(topOfElement) )
				{
                    // elm =  elm ||
					if( _z.isWindow(scroller) )
						return scroller.scroll(0, topOfElement), 
								$return || _z( scroller );
					else if( isset(scroller['scrollTop']) && !!!elm )
						return scroller['scrollTop'] = topOfElement || 0, 
								$return || _z( scroller );
                    else if( isset(scroller['scrollTop']) )
                        return scroller['scrollTop'] = (
                            (topOfElement + (Number(_z(scroller).scrollTop()) || 0)) -
                            (Number(_z(scroller).rect('top')) || 0)
                        ) || topOfElement,
                        $return || _z( scroller );

                }
				else
				{
					console.error('elm not found', [ scroller, elm, topOfElement ]);
				}
			} catch(e) { fns.t.generate(e); }
			
			return this;
		},

        // execute functions that in _z(FUNCTION)
        exec: function execFtunctions( doExec ) {
            doExec = doExec == false ? false : true;
            elms = is_z(this) ? this : false;
            if( !elms || elms.length < 1 ) return this;

            try {
                var resp = [];

                elmFunc.elmLoop( elms, function( e ) {
                    try {
                        if( doExec ) {
                            e.call(doc);
                        } else {
                            resp.push(e);
                        }
                    } catch( err ) {
                        console.error( err );
                    }
                }, (f)=>_z.isFunction(f) );

                if( !doExec )
                    return _z(resp);

            } catch(eEval) {
                console.error(eEval);
            }

            return this;
        },
	};
	
	// for _z
	var __zGlobalFunctions = [ {
        // scroll To element
        scrollTo: __zElementsFunctions.scrollTo,

		// String.trim
		trim: function trimString( str ) {
			var tunning = fns.turny({
							arg: arguments,
							// self: this,
							last: undefined
						});
			str = tunning.call();// || tunning.call();
			
			if( !isset(str) ) return "";
			
			if( str && !!!str['underZ'] )
				str = _z(str);
			
			if( !str.selector && !str.len )
				return "";
			
			var t = triming,
				trimmedContext = str.selector ? String(str.selector) : false;
			
			trimmedContext = trimmedContext || str.element( 0 ) || trimmedContext;
			if( !trimmedContext )
				return "";
			
			if( _z.isDOM( trimmedContext ) && trimmedContext['textContent'])
				trimmedContext = trimmedContext.textContent || trimmedContext;
			
			if( trimmedContext.length )
				return t.call( trimmedContext );
			
			return trimmedContext;
		},

		// Object, Array, String length
		size: function size( obj ) {
			var obj = obj || false;
			if( !!!obj )
				return this.length || 0;
			
			if( _z.is_z( obj ) )
				obj = obj.element();
			
			return Object.keys( obj||{} ).length || 0;
		},
		
		// new typeof(`obj`), sameValue = new typeof(`obj`)( obj )
		createAs: function createAs( obj, sameValue ) {
			obj = obj || false,
			sameValue = sameValue || false;
			if( !!!obj )
				return false;
			
			try{
				var newObject = eval( _z.type( obj ) );
				if( newObject['constructor'] )
					if( sameValue )
						return new newObject( obj );
					else
						return new newObject;
			}
			catch(e)
			{
				console.error("No Constructor in `" + (obj.toString() || String( obj ) || obj.name || _z.type( obj ) || "UNKNOWN") + "` !!");
			}
			return false;
		},
	
		// if all array membar is numbers
		isNumbers: function isArrayNumber(n) {
			n = isset(n) ? (_z.isArray(n) ? n : [n]) : undefined;
			
			return _z.customLoop.apply(this, 
				[
					{ 
						// assign or _z.elements
						elements: n, // element to loop

						// required
						callback: function(e) { return _z.isNumber(e); }, // function for each callback

						// assign or all elements is valid
						valid: fns.true, // function to filter elements before looping

						// assign or return all results
						result: function( r, ra ) { return !!(ra.length&&r.filter((v)=>v).length===ra.length); } // function for fillter results
					}
				]
			);
		},

        // isJson( JSONString ) true|false
        isJson: function isJson( json ) {
            json = json || "";
            try {
                return !!(json = JSON.parse(json));
            } catch( _err ) {
                console.error("Parse Error[parseJSON]:", _err);
            }

            return false;
        },

    }, {
		// add css role in head
		cssRole: function cssRole( c ) {
			if( !isset( _z.cssRole['styleSheet'] ) )
			{
				_z.cssRole['styleSheet'] = document.createElement('style');
				document.head.appendChild( _z.cssRole['styleSheet'] );
			}
			if( arguments.length == 0 ) return this;//_z.cssRole['styleSheet'];
			
			var styleSheet = _z.cssRole['styleSheet']['sheet'];
			styleSheet.insertRule( c, 0 );
			
			return this;
		},
		
	}, {
        // extends objects only
        extendObjects: extendObjFunction,

        // return current time stamp
        now: function currentTimeStamp() {
            return Date.now();
        },

        // bind function
        proxy: function proxy( fn, fn2 ) {
            if( _z.isFunction(fn) )
                return fn.bind( fn2 );
            else return fn;
        },

        // global eval
        globaleval: function globaleval( code ) {
            try {
                const script = document.createElement('script');
                script.text = code;

                document.head.appendChild( script ).parentNode.removeChild( script );
            } catch(e1) { }
            return this;
        },

        // execute <script>
        execScript: function execScript( e ) {
            if( !e ) return false;

            try {
                var resp;

                elmFunc.elmLoop( _z(e), function( elem ) {
                    if( _z(elem).attr("src") && elem.src )
                        _z.ajax({
                            url: elem.src,
                            type: 'GET',
                            data: "",
                            dataType: "text",
                            async: false,
                            done: function(respText) {
                                resp = _z.globaleval( ( respText || "" ).replace( /^\s*<!(?:\[CDATA\[|\-\-)/, "/*$0*/" ) );
                            }
                        });
                    else
                        resp = _z.globaleval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( /^\s*<!(?:\[CDATA\[|\-\-)/, "/*$0*/" ) );
                });
            } catch(eEval) {
                console.error(eEval);
            }
            return this;
        },

    }].extend;
	
	// shared, functions in _z & _z()
	var __zFunctions = {
		// object.hasOwnProperty
		hasProp: hasProp,
		
		/**
		 * Get the closest matching element up the DOM tree.
		 * @private
		 * @param  {Element} elm     Starting element
		 * @param  {String}  selector Selector to match against
		 * @return {Boolean|Element}  Returns null if not match found
		 */
		closest: function closest( elm, selector ) {
			if( !is_z(this) ) return _z( elm ).closest( selector );
			
			selector = arguments.length==1&&arguments[0] || selector;
			elm = arguments.length==2&&arguments[0] || this;
			
			if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length )
				return this.newSelector( [] );
			
			
			elm = ( _z.is_z( elm ) ? elm : _z( elm ) );
			if( elm.len || elm.length )
			{
				var $return = [], 
					copyOfElm;
				elm.each(function() {
					if( _z.isDOM( this ) )
					{
						copyOfElm = this;
						// Get closest match
						for ( ; copyOfElm && copyOfElm !== document; copyOfElm = copyOfElm.parentNode ) {
							if( elmFunc.matches(copyOfElm, selector ) )
								$return.push( copyOfElm ), copyOfElm = document;
						}
					}
				});
				
				return this.newSelector( $return );
			}

			return this.newSelector( [] );
		},
		
		// random number // salt
		rnd: function( start, end ) {
			if( arguments.length > 2 || (start&&!_z.isNumber(start)) || (end&&!_z.isNumber(end)) )
				return arguments[ _z.rnd( arguments.length-1 ) ];
				
			if( !!!end )
				end = start,
				start = 0;
			
			end = Math.__random() * ( ( ( end - start ) +1 ) || 100 ),
			end = Math.floor( end || 100 );
			
			return start + end;
		},

        // argument to array
        Array: function Array( input ) {
            input = input || [];
            if( _z.isString(input) || _z.isNumber(input) )
                input = [ input ];
            return _z.toArray(input);
        },

        // arguments to array
		toArray: toArray,
		
		// array slice
		subArray: subArray,
		
		// filter Array
		filter: filterArray,
		
		// apply function to all array membar
/**
*	return boolean
*
*	_z.customLoop({ 
*		// _z.elements or assign
*		elements: [1,2,3,4,5], // element to loop
*
*		// required
*		callback: function(e) { return _z.isNumber(e); }, // function for each callback
*
*		// assign or all elements is valid
*		valid: fns.true, // function to filter elements before looping
*
*		// assign or return all results
*		result: function(r,ra) { return ra.length?r[0]:false; } // function for fillter results
* 	})
*/
		customLoop: function customLoop(op) {
			var 
				op = op || false,
				elm = op!==false?(op['elements'] = ( isset(op['elements']) ? op['elements'] : (isset(this['element'])&&this||false) )) : false;
			if( !!!op || !!!(op['callback'] = fns.isSetFunc(op['callback'])&&op['callback'] || false) ) return false;
			
			elm = _z( elm );
			
			op['result'] = fns.isSetFunc(op['result'])&&op['result'] || function(c) { return c; };
			op['valid'] = fns.isSetFunc(op['valid'])&&op['valid'] || fns.true;
			
			var result = [false];
			if( _z.is_z(elm) )
				result = elm.length ? elmFunc.elmLoop( elm, op['callback'], op['valid']) : [false];
			
			return op['result']( result, elm );
		},

		// forEach
		each: function each( obj, callback, args ) {
			if( _z.isTypes(Function, obj) )
			{
				if( callback )
					args = callback;
				
				callback = obj;
				obj = this.toArray();
			}
			
			var obj = obj || [],
				value,
				i = 0,
				length = obj.length,
				isArray = _z.isTypes( [], obj );
			
			if( args )
			{
				if( isArray )
				{
					for (; i < length; i++ )
					{
						value = callback.apply( obj[ i ], args );

						if( value === false )
							break;
					}
				}
				else
				{
					for( i in obj )
					{
						value = callback.apply( obj[ i ], args );
						if( value === false )
							break;
					}
				}

			}
			else
			{ // A special, fast, case for the most common use of each
				if( isArray )
				{
					for(; i < length; i++ )
					{
						value = callback.call( obj[ i ], i, obj[ i ] );
						if( value === false )
							break;
					}
				}
				else
				{
					for( i in obj )
					{
						value = callback.call( obj[ i ], i, obj[ i ] );
						if( value === false )
							break;
					}
				}
			}

			return obj;
		},

		// foreach( Object|Array, function ), when function return false will break the loop
		for: foreach,
		
		// array map
		map: function map( array, func ) {
			if( _z.isTypes( Function, array ) && !!!func )
			{
				func = array;
				array = this['element']&&this.element() || [];
			}
			
			if( _z.type( array ) != "Array" )
				array = this.toArray( array );
			
			if( _z.type( func ) != "Function" )
				throw new TypeError('Second argument IS NOT a Function!');
			
			var l = array.length;
			var result = [], i = 0;
			for( ; i < l ; i++ ) {
				result.push( func.apply( array[i], [array[i], i, array] ) );
				// result[ i ] = func( array[i], i );
			}
			
			// for( var result = [], i=0; i < array.length; ++i ) {
				// result.push( func.apply( array[i], [array[i], i, array] ) );
			// }
			return array = null, result;
		},
	};
	
	
		
	// serialize data options
	var __zSerializeSettings = {
		// global serialize settings
		serializeSetting: {
			// do not serialize these
			not: [
					'[type="file"]', 
					'[type="reset"]', 
					'[type="submit"]', 
					'[type="button"]', 
					':disabled', 
					'[readonly]', 
					'[type="checkbox"]:not(:checked)', 
					'[type="radio"]:not(:checked)'
				],
		},
		
	};

    // serialize data
    var __zSerialize = {
        // serialize array
        serializeArray: function serializeArray( elm ) {
            var field, length, $return = [];
            elm = is_z(this) ? this : _z( elm );

            elmFunc.elmLoop( elm, function( e ) { try {
                if( !e['elements'] ) return;

                $currentGroup = _z( e.elements );
                if( _z.serializeSetting && _z.size( _z.serializeSetting ) )
                    _z.for(_z.serializeSetting, function( ssk, ssv ) {
                        if( $currentGroup[ ssk ] )
                            $currentGroup = $currentGroup[ ssk ]( ssv );
                    });

                $currentGroup.for(function( IK, input ) {
                    if( (input=_z(input)) && input.prop('name') )
                    {
                        var _IVal = input.val();
                        _IVal = _z.isArray(_IVal) ? _IVal : [_IVal];
                        _z.for(_IVal, (_IValK, _IValV)=>{
                            $return.push({ name: input.prop('name'), value: _IValV });
                        });
                    }
                });

            } catch( err ) { }
            }, (f)=>_z(f).is('form') );

            return $return;
        },

        // serialize string
        serialize: function serialize( elm ) {
            var field, length, $return = [];
            elm = is_z(this) ? this : _z( elm );

            elmFunc.elmLoop( elm, function( e ) { try {
                if( !e['elements'] ) return;

                $currentGroup = _z( e.elements );
                if( _z.serializeSetting && _z.size( _z.serializeSetting ) )
                    _z.for(_z.serializeSetting, function( ssk, ssv ) {
                        if( $currentGroup[ ssk ] )
                            $currentGroup = $currentGroup[ ssk ]( ssv );
                    });

                $currentGroup.for(function( IK, input ) {
                    if( (input=_z(input)) && input.prop('name') )
                    {
                        var _IVal = input.val();
                        _IVal = _z.isArray(_IVal) ? _IVal : [_IVal];
                        _z.for(_IVal, (_IValK, _IValV)=>{
                            $return.push(encodeURIComponent(input.prop('name')) + "=" + encodeURIComponent(_IValV));
                        });
                    }
                });

            } catch( err ) { }
            }, (f)=>_z(f).is('form') );

            return $return.join("&").replace(/%20/g, "+");
        },

    };

    // deferring system
	var __zDeferring = {
		vars: [],
		backcallbacks: {
			f_asap: [],
			f_ready: [],
		},
		
		callbacks: {
			f_asap: [],
			f_ready: [],
			
			asap: function(f, promise, unique) { 
				var f=f||false,
					promise=promise||false,
					unique=unique||false;
				if(!f)
					return false;
				
				var pushIdx=false;
				if(promise)
					$( document ).promise().done(function() {
						var dof=_z.callbacks.asap(f,false,unique);
						return unique?dof.unique():false;
					});
				else
					pushIdx = _z.callbacks.f_asap.push(f);
				
				var retObj = {
					idx: pushIdx?--pushIdx:false,
					func: promise?false:f,
					unique: function() { 
						if(promise || this.func==false)
							return this;
						
						if(_z.callbacks.f_asap.length<=1)
							return this;
						
						var uFunc = _z.callbacks.f_asap[this.idx];
						if(!uFunc)
							return this;
						
						_z.callbacks.f_asap.remove(this.idx);
						
						for(var findr in _z.callbacks.f_asap)
							if(findr in _z.callbacks.f_asap)
							if(_z.callbacks.f_asap[findr]==uFunc || _z.inArray(uFunc, _z.callbacks.f_asap)!=-1 || _z.callbacks.f_asap[findr].toString()==uFunc.toString())
								return logy(['duplicate function',uFunc]),false;
							
						_z.callbacks.f_asap.push(uFunc);
						return this;
					}
				};
				
				return unique?retObj.unique():retObj;
			},
			ready: function(f, promise, unique) { 
				var f=f||false,
					promise=typeOfVar(promise)!='undefined'?promise:true,
					unique=typeOfVar(unique)!='undefined'?unique:true;
				
				if(!f)
					return false;
				
				var pushIdx=false;
				if(promise)
					$( document ).promise().done(function() {
						var dof=_z.callbacks.ready(f,false,unique);
						
						return unique?dof.unique():false;
					});
				else
					pushIdx = _z.callbacks.f_ready.push(f);
				
				var retObj = {
					idx: pushIdx?--pushIdx:false,
					func: promise?false:f,
					unique: function() { 
						if(promise || this.func==false)
							return this;
						
						if(_z.callbacks.f_ready.length<=1)
							return this;
						
						var uFunc = _z.callbacks.f_ready[this.idx];
						if(!uFunc)
							return this;
						
						_z.callbacks.f_ready.remove(this.idx);
						
						for(var findr in _z.callbacks.f_ready)
							if(findr in _z.callbacks.f_ready)
							{
								if(_z.callbacks.f_ready[findr]==uFunc || _z.inArray(uFunc, _z.callbacks.f_ready)!=-1 || _z.callbacks.f_ready[findr].toString()==uFunc.toString())
									return logy(['duplicate function',uFunc]),this;
							}
							
						_z.callbacks.f_ready.push(uFunc);
						return this;
					}
				};
				
				return unique?retObj.unique():retObj;
			},
		
			arrayData: [],
			array: function (arr,callback,sped){
				if(typeOfVar(arr)=='undefined' && typeOfVar(callback)=='undefined' && typeOfVar(sped)=='undefined')
					return _z.callbacks.arrayData;
				
				arr= arr || [];
				callback= callback || false;
				sped= sped || 250;
				
				var engine = {
					data: arr,
					tI: 0,
					callback: callback,
					speed: sped,
					sarray: [],
					crntSpeed: function(){ 
						if(this.speed instanceof Array && !this.sarray.length)
							this.sarray=Array.from(this.speed);
							
						var crntSpeed = 250;
						if(this.speed instanceof Array)
						{
							if(this.speed.length<1) 
								this.speed = Array.from(this.sarray);
							
							crntSpeed = this.speed.shift();
						} else crntSpeed = this.speed;
						
						return crntSpeed;
					},
					start: function(cb){
						_z(document).ready(function() {
							return this.init(cb);
						}.bind(this));
					},
					init: function(cb){
						cb = cb || false;
						if(typeof cb == 'function')
							this.lfunc = cb;
						
						if(this.tI)
							return false;
						
						var c=this.crntSpeed()||250;
						this.tI=setTimeout(this.func.bind(this), c);
					},
					func: function(){
						this.stop();
						if(this.data.length && typeof this.callback=='function')
						{
							var d=this.data.shift();
							var res=this.callback.bind(d)(this);
							if(res===false)
							{
								this.data.unshift(d);
							}
							if(res===-1)
							{
								this.stop();
								if(typeof this.lfunc=='function')
									this.lfunc();
								
								return false;
							}
						}
						else
						{
							if(typeof this.lfunc=='function')
								this.lfunc();
							
							return false;
						}
						
						this.init();
					},
					stop: function(){
						clearTimeout(this.tI);
						this.tI=0;
					},
					lfunc: false
				};
				_z.callbacks.arrayData.push(engine);
				return engine;
			}
		},
		
		interval: {
			s:100,
			i:0,
			ready:true,
			apply:true,
			init: function(c) { 
				// c = true=call from class, false=timer
				var c = fns.turn( c, false);
				if((this.i && c) || this.ready==false)
					return false;
				
				if(!_z.callbacks.f_ready.length && !_z.callbacks.f_asap.length && this.i)
					return false;
				
				if(!this.i && c)
					return this.i = setInterval(_z.interval.init.bind(this), typeof c=='number'?c:this.s), this;
				
				this.ready=false;
				if(_z.callbacks.f_asap.length && this.apply!==false)
				{
					var counter=0;
					while(_z.callbacks.f_asap.length)
					{
						var tF=_z.callbacks.f_asap.shift();
						_z.backcallbacks.f_asap.push(tF);
						logy(['call: ',tF]);
						tF();
						if(++counter==10)
							break;
					}
						// _z.callbacks.f_asap.shift()();
					
				}
				
				if(_z.callbacks.f_ready.length && _z.document.isReady && this.apply!==false)
				{
					var counter=0;
					while(_z.callbacks.f_ready.length)
					{
						var tF=_z.callbacks.f_ready.shift();
						_z.backcallbacks.f_ready.push(tF);
						logy(['call: ',tF]);
						tF();
						if(++counter==10)
							break;
					}
						// _z.callbacks.f_ready.shift()();
				}
				
				this.ready=true;
				if(!_z.callbacks.f_ready.length && !_z.callbacks.f_asap.length && this.s!=2000)
				{
					clearInterval(this.i);
					this.i=0;
					this.s=2000;
					console.log('Deferred .. [304:hlack]');
					return _z.interval.init(true);
				}
				
				return this;
			},
			stop: function() {
				if(this.i)
				{
					clearInterval(this.i);
					this.i=0;
					this.s=2000;
				}
				
				return this;
			}
		},
	};

	// declare module system
	var __zDeclare = {
		// defaultValues
		dec_Default: {
			// moduleName
			id: "",
			
			// registery of all requirments
			requires: "",
			
			// is module requirments loaded
			loaded: false,
			
			// default main function
			callback: false,//fns.ef,
			
			// default init function
			initFunction: "",
			
			// call when module requesting function, return false = cancel load
			whenRequest: "",
			
			// register this module in window.[MODULE]
			global: function global() {
				if( _z.isset(this.global.registered) && this.global.registered===true ) return this;
				
				var w = _z.vanilla.window&&_z.vanilla.window || window;
				if( !_z.isWindow(w) ) return console.error("UnderZ[" + this.id + "]: No Window Found."), this;
				
				if( _z.isset(w[ this.id ]) ) return console.error("UnderZ[" + this.id + "]: Already Exist!"), this;
				
				this.global.registered = true;
				return this.hook( w );
			},
			
			// recall function after while
			timeout: function timeout( method, limiter ) {
				if(!!method && _z.isFunction( method ))
				{
					if( limiter )
					{ // limiter = seconds of tring
						limiter = ((parseFloat(limiter-1)*1000)/10) || 0;
						this.limiter = this.limiter || 0;
						
						if( limiter )
							if( (parseFloat(this.limiter)*10) > limiter ) return;
							else this.limiter++;
					}
					
					if( this.timeout.timeoutHandler )
						clearTimeout( this.timeout.timeoutHandler );
					
					this.timeout.timeoutHandler = setTimeout( method/*.bind(this, [arguments])*/, 100);
				}
				
				return this;
			},
			
			// set requirment of module ( execute before load module )
			require: function require( req ) {
				if(!!req)
					this.requires.push( req );
				
				return this;
			},
			
			// call when module requesting, return false = cancel load
			onRequest: function whenRequest( fn ) {
				if(!!fn && _z.isFunction( fn ))
					this.whenRequest = fn;
				
				return this;
			},
			
			// set main module function ( execute when function called )
			method: function method( method ) {
				if(!!method && _z.isFunction( method ))
					this.callback = method;
				
				return this;
			},
			
			// execute right now, if return true load all requirments
			init: function init( method ) {
				if(!!method && _z.isFunction( method ))
					if(method.apply(this) == true && this.whenRequest.apply( this ) !== false )
						this.loadDeclare.apply( this );
				
				return this;
			},
			
			// try to load requirments
			loadDeclare: function loadDeclare() {
				var module = this || false;
				
				if( !!!module || module.loaded )
					return this.callback||this;//this;//fns.ef;
				
				if( module.whenRequest.apply( module ) === false )
					return this;
				
				if(module.requires.length)
				{
					// console.warn(module.requires);
					_z( module.requires ).each(function() {
						if(!!!this || this['loaded'])
							return this;
						
						if( _z.isFunction( this ) )
						{
							this.apply( this );
						}
						else if( this['js'] )
						{
							_z.loader.js( this['js'] );
						}
						else if( this['css'] )
						{
							_z.loader.css( this['css'] );
						}
						this.loaded = true;
					});
				}
				this.loaded = true;
			
				return this.callback||this;//this;
			},
		
			// declare new module in specifiec object
			hook: function hookObject( obj ) {
				if( !_z.isObject(obj) && !_z.isArray(obj) && !_z.isFunction(obj) && !_z.isWindow(obj) )
					obj = false;
				
				if( obj )
				{
					// register main function
					var loadDeclareCallback = this.loadDeclare.bind(this);
					
					// register loader
					Object.defineProperty( 
						obj, 
						this.id, 
						{ get: loadDeclareCallback, configurable: !!!isCore( obj ) }
					);
				}
				
				return this;
			},
		},
		
		// registery of all declareed modules for this Object
		declares: {},
		
		// registery of all declareed modules => object
		declaresMap: {},
		
		// hook registery of all declareed modules
		// hookedDeclares: {},
		
		// check if this module is _z declare system & exist
		isDeclare: isDeclare,
		
		// declare new module
		declare: function declare( module, obj ) {
			var hook = {
				obj: fns.turn( obj, this ),
				module: module,
			};
			var newDeclare = _z.extend({}, _z.dec_Default);
			
			if( !_z.isArray(newDeclare.requires) )
				newDeclare.requires = [];
			
			if( !_z.isFunction(newDeclare.initFunction) )
				newDeclare.initFunction = window.fns.ef;
			
			if( !_z.isFunction(newDeclare.whenRequest) )
				newDeclare.whenRequest = window.fns.ef;
			
			if( !!!module )
				return newDeclare;
			
			if( !isset( hook.obj['declares'] ) )
				hook.obj['declares'] = {};
			
			// if already declareed
			// if( _z.hasProp( hook.obj, module ) && isset( hook.obj['declares'][ module ] ) )
				// return hook.obj['declares'][ module ];
			if( isDeclare( module/* , hook.obj  */) )
				return isDeclare( module/* , hook.obj  */);
			
			newDeclare.id = module;
			hook.obj['declares'][ module ] = newDeclare;
			
			// register this plugin in Map
			_z.declaresMap[ module ] = hook.obj;
			
			// register main function
			hook.obj[ module ] = _z.getDeclare.bind(hook.obj, module);
			var loadDeclareCallback = ()=>{ return newDeclare.loadDeclare.apply(newDeclare) ; };
			
			// register loader
			Object.defineProperty(
				hook.obj, 
				module, 
				{ get: loadDeclareCallback, configurable: !!!isCore( obj ) }
			);
			
			return newDeclare;
		},
		
		// main function loader
		getDeclare: function getDeclare( moduleName ) {
			var module = this.declares[ moduleName ] || false;
			
			if(!!!module)
				return fns.wrn("Module Not Found: "+moduleName), fns.ef;
			
			// try to load requirments
			module.loadDeclare();
			
			if( module.callback && _z.isFunction( module.callback ) )
			{
				var handler = this,
					arg = arguments;
				return module.callback.apply( handler, _z(arg).subArray(1) || [] );
			}
			else
			{
				
			}
			
			return this;
		},
	};
	
	// ajax system
	var classAjax = {
		// counter
		id: 0,
		stopCalling: false,
		
		// XMLHttpRequest
		xhr: function () {
			assign = function assign( arg ) {
				var $this = this;
				if( arg.length )
					_z.each( arg, function( k, v ) {
						if( _z.isObject(v)&&arg[k]['ajaxer'] )
						{
							arg[k].xhr = xhr;
							$this.xhrs.push( arg[k] );
						}
					});
					
				_z.each( $this.xhrs||[], function( k, v ) {
					if( _z.isObject(v)&&v['xhr'] )
						if( (parseFloat(v['xhr']['status'])||0) == 200 )
							$this.xhrs.remove(v['xhr']);
				});
			};
			
			if( typeof XMLHttpRequest !== 'undefined' )
			{
				var xhr = new XMLHttpRequest();
				++this.id;
				assign.call( this, arguments );
				return;
			}
			
			var versions = [
				"MSXML2.XmlHttp.6.0",
				"MSXML2.XmlHttp.5.0",
				"MSXML2.XmlHttp.4.0",
				"MSXML2.XmlHttp.3.0",
				"MSXML2.XmlHttp.2.0",
				"Microsoft.XmlHttp"
			];

			var xhr;
			for( var i = 0; i < versions.length; i++ )
				try {
					xhr = new ActiveXObject( versions[i] );
					break;
				} catch (e) { }
			
			++this.id;
			assign.call( this, arguments );
			return;
		},
		
		// delete this keys from return new ajax ..
		deleteKeys: [
			'get',
			'init',
			// 'xhrFuncs',
		],
		
		ajaxer: {
			// development porpose
			get: function(){
				return ajaxer;
			},

            init: function Ajaxer( options, response ) {
                var ajaxEnv = ajaxer,
                    options = _z.extend({}, __zAjax.ajaxSettings, options || {} ),
                    param,
                    $this = this,
                    xhrFuncs = _z.extend({}, $this.xhrFuncs);
                ;

                param = $this.param = options;
                // url
                if( !!!param['url'] )
                    try {
                        param['url'] = location.href;
                    } catch( e ) {
                        // Use the href attribute of an A element
                        // since IE will modify it given document.location
                        param['url'] = document.createElement( "a" );
                        param['url'].href = "";
                        param['url'] = param['url'].href;
                    }
                // console.log($this);
                param['url'] += (param['url'].indexOf('?')===-1 ? '?' : '&');
                var cacheVar = !!!param['cache'] ? '_cache='+fns.time()+'&' : '';

                var start = function start() {
                    if( ajaxEnv.stopCalling == true || param.fired == true )
                        return this;

                    if( toLC(param.type) != "get" ) {
                        xhr.open( param.type,
                            ajaxEnv.urling( param.url + cacheVar ),
                            !!(param.async != false) );

                        if( param.processData != undefined &&
                            param.processData == false &&
                            param.contentType != undefined &&
                            param.contentType == false
                        ) {

                        }
                        else if( param.contentType != undefined || param.contentType == true )
                            xhr.setRequestHeader('Content-Type', param.contentType);
                        else
                            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    }
                    else
                        xhr.open( param.type,
                            ajaxEnv.urling(param.url + ajaxEnv.params( param.data ) +'&'+ cacheVar),
                            !!(param.async != false)
                        );

                    if( param.data != null || param.data != undefined ) {
                        if( param.processData != undefined &&
                            param.processData == false &&
                            param.contentType != undefined &&
                            param.contentType == false
                        )
                            xhr.send( param.data );
                        else
                            xhr.send( ajaxEnv.params( param.data ) );
                    }
                    else
                        xhr.send();

                    xhrFuncs.funcApply( 'always', false, [xhr]);
                    // if( !!!(param.async != false) ) {
                    // xhrFuncs.funcApply( 'done', false, [xhr, $this]);
                    // console.log(xhrFuncs);
                    // }
                    param.fired = true;
                    return this;
                };

                if( param.async == undefined )
                    param.async = true;

                // if( param.async == false )
                // ajaxEnv.stopCalling = true;

                var xhr = {};
                param.xhr = xhr;
                param.xhr.ajaxer = $this;
                ajaxEnv.xhr( param.xhr );
                if( isset( param.xhr['xhr'] ) )
                    param.xhr = param.xhr.xhr;
                xhr = param.xhr;
                try{
                    xhr['withCredentials'] = param['withCredentials'];
                } catch ($withCredentials) { }

                param.promise = _z.Promiser(function(resolve, reject) {
                    xhr.onprogress = function onprogress( event ) {
                        xhrFuncs.funcApply( 'progress', false, [{ loaded: event.loaded }, "success", event]);
                    };

                    xhr.ontimeout = function () {
                        $this['abort'] && $this.abort();
                        this.abort();

                        xhrFuncs.funcApply( 'timeout', false, [ "timeout" ]);
                        ajaxEnv.stopCalling = false;
                        reject("timeout");
                    };

                    xhr.onerror = function () {
                        xhrFuncs.funcApply( 'error', false, [xhr.responseText, "error"]);
                        ajaxEnv.stopCalling = false;
                        reject(xhr.responseText);
                    };

                    xhr.onreadystatechange = function( ) {
                        if( param['statusCodes']&&param['statusCodes'][ this.status ]&&
                            _z.isFunction(param['statusCodes'][ this.status ]) )
                            param['statusCodes'][ this.status ](xhr);

                        if( param['states']&&param['states'][ this.readyState ]&&
                            _z.isFunction(param['states'][ this.readyState ]) )
                            param['states'][ this.readyState ](xhr);

                        xhrFuncs.funcApply( 'onreadystatechange', false, [ this.readyState, xhr ]);
                        if( this.readyState == 4 ) {
                            if( this.status == 200 )
                                --ajaxer.id,
                                    xhrFuncs.funcApply( 'success', false, [ xhr, $this ]);
                            else
                                xhrFuncs.funcApply( 'done', false, [ xhr, $this ]);

                            xhrFuncs.funcApply( 'always', false, [ xhr, $this ]);
                        }

                        var newXHRStatus = {
                            readyState: xhr.readyState,
                            response: xhr.response + 'hh',
                            responseText: xhr.responseText,
                            responseType: xhr.responseType,
                            responseURL: xhr.responseURL,
                            responseXML: xhr.responseXML,
                            status: xhr.status,
                            statusText: xhr.statusText,
                            timeout: xhr.timeout,
                            upload: xhr.upload,
                            withCredentials: xhr.withCredentials
                        };
                        $this = _z.extend(true, $this, newXHRStatus);
                        $this['param'] = _z.extend(true, $this['param'], newXHRStatus);
                    };

                    xhr.onload = function onloadFunction( event ) {
                        var xhr = param.xhr,
                            xhrFuncs = param.xhrFuncs;

                        if( param.xhr.status === 200 ) {
                            var data = ajaxEnv.ajaxer.convertResponse( param );
                            // param.xhr.responseText;
                            // if( param.dataType&&param.dataType != "text" )
                            // if( param['converters']&&param['converters'][param.dataType] )
                            // if( _z.isFunction(param['converters'][param.dataType]))
                            // data = param['converters'][param.dataType](param.xhr.responseText);

                            if( resolve )
                                resolve([data, "success", xhr, ajaxEnv, param, ajax]);
                        }
                        else
                        {
                            xhrFuncs&&xhrFuncs.funcApply( 'error', false, [ param.xhr.responseText, "error", xhr, ajaxEnv, param, ajax]);
                            reject([param.xhr.responseText, "error", xhr, ajaxEnv, param, ajax]);

                        }

                        ajaxEnv.stopCalling = false;
                        var newXHRStatus = {
                            readyState: xhr.readyState,
                            response: xhr.response,
                            responseText: xhr.responseText,
                            responseType: xhr.responseType,
                            responseURL: xhr.responseURL,
                            responseXML: xhr.responseXML,
                            status: xhr.status,
                            statusText: xhr.statusText,
                            timeout: xhr.timeout,
                            upload: xhr.upload,
                            withCredentials: xhr.withCredentials
                        };
                        $this = _z.extend(true, $this, newXHRStatus);
                        $this['param'] = _z.extend(true, $this['param'], newXHRStatus);
                        return ;
                    };

                    if( param.timeout != undefined && !!(param.async != false) )
                        xhr.timeout = param.timeout;
                    else if( !!(param.async != false) )
                        xhr.timeout = 20000;

                    return start.call($this);
                });

                param.promise.relay(function(result) {
                    xhrFuncs.funcApply( 'done', true, result);
                }, function(result) {
                    xhrFuncs.funcApply( 'error', true, result);
                });

                // create return likearray
                var _$this = [];
                foreach($this, function( k, v ){
                    if( _z.inArray( k, ajaxer.deleteKeys )===-1 )
                        _$this[ k ] = v;
                });

                _$this = _z.extend(_$this, {
                    always: xhrFuncs.funcSetter('always' , $this),
                    done: xhrFuncs.funcSetter('done' , $this),
                    doneAndArguments: xhrFuncs.funcSetter('doneAndArguments' , $this),
                    success: xhrFuncs.funcSetter('done' , $this),
                    complete: xhrFuncs.funcSetter('complete' , $this),
                    error: xhrFuncs.funcSetter('error' , $this),
                    fail: xhrFuncs.funcSetter('error' , $this),
                    progress: xhrFuncs.funcSetter('progress' , $this),
                    timeout: xhrFuncs.funcSetter('timeout' , $this),
                    onreadystatechange: xhrFuncs.funcSetter('onreadystatechange' , $this),
                },{
                    pipe: param.promise,
                    then: function(s, e) { return param.promise.then.call(param.promise, s, e),this; },
                    abort: $this.abort,
                    param: param,
                    readyState: param.xhr.readyState,
                    response: param.xhr.response,
                    responseText: param.xhr.responseText,
                    responseType: param.xhr.responseType,
                    responseURL: param.xhr.responseURL,
                    responseXML: param.xhr.responseXML,
                    status: param.xhr.status,
                    statusText: param.xhr.statusText,
                    timeout: param.xhr.timeout,
                    upload: param.xhr.upload,
                    withCredentials: param.xhr.withCredentials,
                    xhr: param.xhr,
                });

                foreach( ajaxEnv.ajaxObjectTrans, function( realFuncName, alterFuncNames) {
                    foreach( alterFuncNames, function( k, alterFuncName) {
                        if( isset( param[ alterFuncName ] ) )
                            xhrFuncs.funcSet(realFuncName , param[ alterFuncName ], 'scoop');
                    });
                });
                xhrFuncs.whenSet = ()=>{ param.promise.success(), param.promise.error(); };
                _$this.param['xhrFuncs'] = xhrFuncs;
                _$this.param['scoop'] = _$this;
                $this = _$this;

                if( !!!($this.param.async != false) ) {
                    var data = this.convertResponse( $this.param );
                    // var data = $this.param.xhr.responseText;
                    // if( $this.param.dataType&&$this.param.dataType != "text" )
                    // if( $this.param['converters']&&$this.param['converters'][$this.param.dataType] )
                    // if( _z.isFunction($this.param['converters'][$this.param.dataType]))
                    // data = $this.param['converters'][$this.param.dataType]($this.param.xhr.responseText);

                    xhrFuncs.funcApply( 'done', true, [data]);
                }
                return $this;
            },

			// current ajax options
			param: {},
			
			abort: function abort( response ) {
				if( XMLHttpRequest != null ) {
					this.param.xhr.abort();
					ajaxer.stopCalling = false;
					
					if( _z.isFunction( response ) )
						response( { status: "success" } );
				}
			},
			
			xhrFuncs: {
				whenSet: ()=>{},
				whenGet: ()=>{},
				// return setter function
				funcSetter: function xhrFuntionsSetter( fname, $return ) {
					var funcSet = this.funcSet,
					_this = this;
					return function( $fn ) {
						if( _z.isFunction( $fn ) )
							funcSet.apply(_this, [fname, $fn] );
						
						return ($return['param']&&$return['param']['scoop'])||$return;
					};
				},
				// set specifiec function
				funcSet: function( fname, $fn ) {
					if( fname=='doneAndArguments' )
					{
						fname = 'done';
						var o$fn = $fn;
						$fn = function() {
							var extraArgs = arguments[4] || [];
								extraArgs = (_z.isObject(extraArgs)&&extraArgs['data'] ? extraArgs['data'] : []);
								extraArgs = (_z.isArray(extraArgs) ? extraArgs : [extraArgs]);
								extraArgs.add( Array.from(arguments)||[] );
							return o$fn.apply(this, extraArgs);
						};
					}
					this[ fname ] = this[ fname ] || [];
					this[ fname ].push( $fn );
					if(this.whenSet&&_z.isFunction(this.whenSet))
						this.whenSet();
				},
				// apply on all function
				funcApply: function( fname, deleteIt, args ) {
					var fnsList = this['xhrFuncs'] ? (this['xhrFuncs'][ fname ] || []) : this[ fname ]||[];
					var fs, fsIndex=fnsList.length||0;
					while( fnsList.length&&fsIndex>0 )
					{
						fs = !!!deleteIt ? fnsList[--fsIndex] : fnsList.pop();
						if( _z.isFunction(fs) )
							fs.apply( this, args||[]);
					}
				},
				
				
				always: [],
				done: [],
				complete: [],
				error: [],
				fail: [],
				progress: [],
			},

            // convert responseText by dataType
            convertResponse: function convertResponse( _param ) {
                var data = _param.xhr.responseText;
                if( _param.dataType&&_param.dataType != "text" )
                    if( _param['converters']&&_param['converters'][_param.dataType] )
                        if( _z.isFunction(_param['converters'][_param.dataType]))
                            data = _param['converters'][_param.dataType](_param.xhr.responseText);

                return  data;
            },

            // ajaxs
			pipe: null,
			then: null,
			param: null,
			readyState: null,
			response: null,
			responseText: null,
			responseType: null,
			responseURL: null,
			responseXML: null,
			status: null,
			statusText: null,
			timeout: null,
			upload: null,
			withCredentials: null,
			xhr: null,
		},
		
		ajaxObjectTrans: {
			progress: [ 'onprogress', 'progress' ],
			timeout: [ 'ontimeout', 'timeout'],
			success: [ 'onsuccess', 'success' ],
			done: [ 'ondone', 'done' ],
			onabort: [ 'onabort' ],
			complete: [ 'onloadend', 'complete' ],
			beforeload: [ 'onloadstart', 'onbeforeload', 'beforeload' ],
			onreadystatechange: [ 'onreadystatechange', 'readystatechange', 'statechange' ],
			error: [ 'onerror', 'onfail', 'fail', 'error' ],
		},
		
		params: function params( obj ) {
			var parts = [];
			if( arguments.length==2 )
			{
				parts.push( encodeURIComponent(arguments[0]) + '=' + encodeURIComponent(arguments[1]) );
				return parts.join('&');
			}
				
			if( !_z.isObject(obj) )
				return (obj).toString() || String(obj) || "";
			
			for( var key in obj )
				if( hasProp( obj, key ) )
					parts.push( encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) );
			
			return parts.join('&');
		},
		
		urling: function urling( url ) {
			url = String(url)
					.replaceAll('&&','&').replaceAll('??','?')
					.replaceAll('&&','&').replaceAll('?&','?')
					.replaceAll('&&','&');
			if( url.substr(-1) == '&' )
				url = url.substr( 0, url.length-1 );
			
			return url;
		},
		
		xhrs: [],
	};
	
	// abort all xhr
	classAjax.xhrs.abortAll = function() {
		var requests = [];
		for( var index in this )
			if( isFinite( index ) === true )
				requests.push( this[ index ] );
		
		for( index in requests && requests[ index ]['ajaxer'])
			requests[ index ]['ajaxer'].abort();
	};
	
	// remove one xhr
	classAjax.xhrs.remove = function removeXHR( xhr ) {
		var $this = this;
		for( var index in $this )
			if( $this[index]['xhr'] === xhr ) {
				$this.splice( index, 1 );
				break;
			}
	};

    // ajax init
    var ajax = function ajax(){
        return new ( ajaxer.ajaxer.init.bind( __zAjax.ajax ) )( ...arguments );
    };

	var ajaxer = ajax.prototype = classAjax;
	
	ajaxer.ajaxer.init.prototype = ajaxer.ajaxer;
	var __zAjax = {
		// normal ajax
		ajax: ajax,

        // load data to elment ajax
        getInTo: function ajaxGETInToElement( elm, url, callback ) {
            var url = url || "",
                elm = elm || false,
                callback = callback || false;

            if( !url ) return this;

            var pr = fetch(url).then(data => data.text());
            pr.then(data => {
                elm&&_z(elm).html( data );
            });

            if( callback )
                pr.then(callback);

            return pr;
        },

        // get ajax
		get: function ajaxGET( url, data, callback ) {
			var url = url || "",
				data = data || false,
				callback = callback || false,
				tmp;
			if( _z.isFunction( data ) && !!!callback )
				callback = data,
				data = {};
			
			if( _z.isFunction( data ) && !!callback )
				tmp = callback,
				callback = data,
				data = tmp,
				tmp="";
			data = data || {};
			tmp = _z.ajax({
					dataType: 'text',
					url: url||"",
					type : 'GET',
					data: data
				});
			if( callback )
				tmp.done( callback );
			
			return tmp;
		},
		
		// post ajax
		post: function ajaxPOST( url, data, callback ) {
			var url = url || "",
				data = data || false,
				callback = callback || false,
				tmp;
			if( _z.isFunction( data ) && !!!callback )
				callback = data,
				data = {};
			
			if( _z.isFunction( data ) && !!callback )
				tmp = callback,
				callback = data,
				data = tmp,
				tmp="";
			data = data || {};
			tmp = _z.ajax({
					dataType: 'text',
					url: url||"",
					type : 'POST',
					data: data
				});
			if( callback )
				tmp.done( callback );
			
			return tmp;
		},
		
		// json ajax
		getJSON: function ajaxJSON( url, data, callback ) {
			var url = url || "",
				data = data || false,
				callback = callback || false,
				tmp;
			if( _z.isFunction( data ) && !!!callback )
				callback = data,
				data = {};
			
			if( _z.isFunction( data ) && !!callback )
				tmp = callback,
				callback = data,
				data = tmp,
				tmp="";
			data = data || {};
			tmp = _z.ajax({
					dataType: 'json',
					url: url||"",
					type : 'GET',
					data: data
				});
			if( callback )
				tmp.done( callback );
			
			return tmp;
		},
		
		// script ajax
		getScript: function ajaxScript( url, data, callback ) {
			var url = url || "",
				data = data || false,
				callback = callback || false,
				tmp;
			if( _z.isFunction( data ) && !!!callback )
				callback = data,
				data = {};
			
			if( _z.isFunction( data ) && !!callback )
				tmp = callback,
				callback = data,
				data = tmp,
				tmp="";
			data = data || {};
			tmp = this.ajax({
					dataType: 'script',
					url: url||"",
					type : 'GET',
					data: data
				});
			
			if( callback )
				tmp.doneAndArguments( callback );
			
			return tmp;
		},
		
		// default ajax options
		ajaxSettings: {
			url: "",
			type: "GET",
			isLocal: false,
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			// contentType: true,
			data: {},
			timeout: 20000,
			fired: false,
			dataType: "json",
			accepts: {
				"*": "*/*",
				"text": "text/plain",
				"html": "text/html",
				"xml": "application/xml, text/xml",
				"json": "application/json, text/javascript",
				"script": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			
			statusCodes: {},
			states: {},
			
			contents: {
				script: /(?:java|ecma)script/,
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			
			responseFields: {
				"xml": "responseXML",
				"text": "responseText",
				"json": "responseJSON"
			},
			
			converters: {
				// return from eval
				"return": function returnFromEval( s ) {
					try {
						return fns.tryEval( s );
					} catch(e) { console.error(e); return {}; }
				},
				// toString
				"text": window.String,
				// toJSON
				"json": parssing.json,
				// toXML
				"xml": parssing.xml,
				// js
				"script": function( text ) {
					return fns.tryEval( text ), text;
				}
			},
		},
		
		ajaxSetup: function changeDefaultAjaxOption( opt ) {
			_z.ajaxSettings = _z.extend(true, _z.ajaxSettings, opt);
			return _z.ajaxSettings;
		}
	};
	
// _z.$ {

	// elements function
	[ _z.$, __zElementsFunctions, __zClassFunctions, __zAttrFunctions ].extend;
	
	// add sheared functions to _z.$
	[ _z.$, __zFunctions ].extend;
	
	// add serialize functions to _z.$
	[ _z.$, __zSerialize ].extend;
	
	// elements function
	[ _z.$, {
		// is this element/elements = HTMLDOM
		isDOMElement: function isDOMElement( orIsWindow ) { orIsWindow = orIsWindow || false;
			if(this.element().length)
			{
				return !!(elmFunc.elmLoop( this, fns.true, orIsWindow ? _z.isDOMOW : _z.isDOM ).length == this.length);
				var isDOM = true;
				this.each(function(){
					isDOM = isDOM ? !!_z.isDOM( this ) : isDOM;
				});
				return isDOM;
			}
			else
				return false;
		},
		
		// get indexed element
		indexed: cssSelectorsIndexed,
		
		// index element in elements list
		index: function indexOfElement( elms, elm ) {
			elm = elm?_z( ( arguments.length==1&&elms ) ? elms : elm ):false;
			elms = ( arguments.length==1 ) ? this : (elms?_z(elms):false);
			
			if( !arguments.length )
				elms = this;
			
			if( elm !== false )
				return _z.inArray(elm.element(0), elms.element());
			
			var newElm = _z( (( elm !== false )?elm:elms).subArray(-1) );
			
			if( newElm.length == 0)
				return false;
			
			var _name = newElm.attr('name') || newElm.attr('id') || "";
			var _ex;
			_name = (_ex = /\[(\d+)\]/.exec(_name))!=null ? _ex[1] : false;
			return _name;
		},

        // element/elements HTML
        html: function html( elm, $val ) {
            $val = ( arguments.length==1&&(_z.isTypes( 'string', elm)||_z.isTypes( 1, elm)) ) ? elm : $val;
            elm = ( arguments.length==1&&(_z.isTypes( 'string', elm)||_z.isTypes( 1, elm)) ) ? this : _z( elm );

            if( !arguments.length )
                elm = this;

            var $return = [];
            elmFunc.elmLoop( elm, function( e ) {
                if( isset( $val )&&isset(e['innerHTML']) ) {
                    e.innerHTML = $val,
                        $return.push( e.innerHTML );

                    if( _z.Array(_z($val).tagName(x=>x=="script")).length > 0 )
                        _z.execScript( $val );
                }
                else if( isset(e['innerHTML']) )
                    $return.push( e.innerHTML );
            });

            return isset( $val ) ? this : ( elm.length==1 ? ($return[0]||"") : $return );
        },

        // element/elements prop
		prop: function elementProp( prop, val ) {
			if( arguments.length == 0 )
				return this;
			
			var elm = this;
			
			var $return = [];
			elmFunc.elmLoop( elm, function( e ) {
				if( isset( e[ prop ] ) ) 
				{
					if( isset(val) )
						e[ prop ] = val;
					else
						$return.push( e[ prop ] );
				}
			});
			
			return isset(val) ? this : ( this.length==1 ? $return[0] : $return );
		},

		// set element/elements value(val) if value = (IFVal)
		numval: function elementValueToNumber() {
			var $return = [];
			elmFunc.elmLoop( this, function( e ) {
				try {
					$return.push( (Number(e.value)||0) );
				} catch( err ) { }
			});
			
			return this.length>1?$return:$return[0];
		},
		
		// set element/elements value(val) if value = (IFVal)
		valIF: function elementValue( IFVal, val ) {
			elmFunc.elmLoop( this, function( e ) {
				try {
					if( _z.isFunction( IFVal ) )
					{
						if( IFVal(e.value, e) ) e.value = val;
					}
					else
					if( e.value == _IFVal ) 
						e.value = val;
					
				} catch( err ) { }
			});
			
			return this;
		},
		// element/elements value
		val: function elementValue( val ) {
			
			if( isset(val) )
				val = _z.map( _z.isArray( val ) ? val : [val], function(){
					return triming.apply(this, arguments);
				} ).filter( k => !!k );

			elm = this;

            var $return = [];
			elmFunc.elmLoop( elm, function( e ) {
				try {
					if( // checkbox || radio
						e['tagName'] && toLC(e['tagName'])=='input' && 
						e['type'] && 
						( e['type'] == 'checkbox' || e['type'] == 'radio' )
					)
					$return.push( isset( val ) ? ( e['value'] = val ) : ( e['value'] || "on" ) );
						// ( e['checked'] && ( e['checked'] = ( _z.inArray( e['value'], val )!==-1 ) ) )
					else if( // select
						e['tagName'] && toLC(e['tagName'])=='select' && 
						e['options'] && e['options'].length
					)
					{
						var $return_options = [];
						_z.each( e['options'], function( k, oE ) {
							// set
							if( isset( val ) && ( oE['selected'] = ( _z.inArray( oE['value'], val )!==-1 ) ) )
								$return_options.push( oE['value'] );
							
							// get
							if( 
								!isset( val )		&&	// not in set mode
								oE['selected'] 		&&	// selected option
								!oE['disabled'] 	&&	// not disabled
								oE['parentNode'] 	&&	// has parentNode & not disabled
								( !oE['parentNode']['disabled'] || toLC(oE['parentNode']['tagName']) != 'optgroup' )
							)
								$return_options.push( oE['value'] );
						});
						
						if( isset( val ) && $return_options.length==0 )
							e['selectedIndex'] = -1;
						
						if( !isset( val ) && toLC(e['type']) === "select-multiple" )
							$return.push( $return_options );
						else if( !isset( val ) )
							$return.push( $return_options[0] );
					}
					else
					{
						e['value'] = e['value'] || "";
						if( isset( val ) ) e['value'] = val;
						$return.push( e['value'] || "" );
					}
					
				} catch( err ) {
                    console.error(err);
				}
			});
			
			return isset( val ) ? this : ( elm.length==1 ? $return[0] : ( !elm.length ? "" : $return ) );
		},
		
		// element/elements TEXT
		text: function text( elm, $val ) {
			$val = ( arguments.length==1&&(_z.isTypes( 'string', elm)||_z.isTypes( 1, elm)) ) ? elm : $val;
			elm = ( arguments.length==1&&(_z.isTypes( 'string', elm)||_z.isTypes( 1, elm)) ) ? this : _z( elm );
			
			if( !arguments.length )
				elm = this;
			
			var $return = [];
			elmFunc.elmLoop( elm, function( e ) {
				var findRightAttr = e['innerText'] ? 'innerText' : 
					(e['textContent'] ? 'textContent' : false);
				if( !findRightAttr )
					return ;
				
				if( isset( $val )&&e[ findRightAttr ] )
					e[ findRightAttr ] = $val;
				else if( e[ findRightAttr ] )
					$return.push( e[ findRightAttr ] );
			});
			return isset( $val ) ? this : (( elm.length==1 ? $return[0] : $return ) || "");
		},
		
		// sum all vallues
		sum: function sumValues( elm ) {
			// elm = fns._zturn( this, elm );
			elm = elm || this;
			elm = (_z.isDOM(elm)||_z.isArray(elm)) ? _z( elm ) : (
				_z.is_z(elm) ? elm : ( _z.isArray(elm) ? elm : false )
			);
			
			if( !elm ) elm = this;
			
			if( !elm.length ) return 0;
			
			var $return = 0;
			elmFunc.elmLoop( elm, function( e ) {
				if( _z.isDOM(e) )
					$return += Number(e.value)||0;
				else if( _z.isArray(e) )
					e.filter((x)=>{$return += Number(x.value)||0; });
				else if( _z.isNumber(e) || _z.isString(e) )
					$return += Number(e)||0;
			
			}, ()=>{ return true; });
			
			return Number($return)||0;
		},

        // is element/s contains elm2
        contains: function contains( elm2 ) {
            var elm = this;
            elm = (_z.isDOM(elm)||_z.isArray(elm)) ? _z( elm ) : (
                _z.is_z(elm) ? elm : ( _z.isArray(elm) ? elm : false )
            );
            elm2 = (_z.isDOM(elm2)||_z.isArray(elm2)) ? _z( elm2 ) : (
                _z.is_z(elm2) ? elm2 : ( _z.isArray(elm2) ? elm2 : false )
            );

            if( !elm )
                elm = this;
            if( !elm.length || !elm2.length)
                return false;

            var $return = null;
            elmFunc.elmLoop( elm, function( e ) {
                if( $return != false )
                    elmFunc.elmLoop( elm2, function( e2 ) {
                        $return = (e !== e2 && e.contains( e2 ));
                    });
            });

            return $return;
        },

        // element/s tagName
        tagName: function tagName( filter ) {
            // elm = fns._zturn( this, elm );
            filter = filter || fns.true;
            var elm = elm || this;
            elm = (_z.isDOM(elm)||_z.isArray(elm)) ? _z( elm ) : (
                _z.is_z(elm) ? elm : ( _z.isArray(elm) ? elm : false )
            );

            if( !elm )
                elm = this;
            if( !elm.length )
                return "";

            var $return = [];
            elmFunc.elmLoop( elm, function( e ) {
                var tn;
                if( e[ 'tagName' ]&&(tn=e.tagName.toLowerCase()) ||
                    e['outerHTML']&&(tn=( /<([\w:]+)/.exec( e.outerHTML ) || ["", ""] )[1].toLowerCase()) )
                    if( _z.isFunction(filter) && filter.callSelf( [tn] ) || !_z.isFunction(filter) )
                        $return.push( tn );
            });

            return elm.length==1?($return[0]||""):$return;
        },

		// clone element/elements
		clone: function cloneNode( deep ) {
			deep = deep || false;
			elm = this;
			
			var $return = [];
			elmFunc.elmLoop( elm, function( e ) {
				if( deep&&e['cloneNode'] )
					$return.push( e['cloneNode']( true ) );
				else if( e['cloneNode'] )
					$return.push( e['cloneNode']() );
			});
			
			var newInstance = this.newSelector( $return );
			newInstance.args = arguments;
			newInstance.selector = "";
			
			return newInstance;
		},
		
		// remove element/elements
		remove: function() { return this.rem.apply( this, arguments ); },
		rem: function removeElement( elm ) {
			// var elm = fns._zturn( this, elm ),
			var elm = elm || this,
				callback=false;
			if( _z.isFunction(elm) )
				callback = elm,
				elm = this;
			
			elmFunc.elmLoop( elm, function( e ) {
				try{
					var remThis=true;
					if( callback&&_z.isFunction( callback ) )
						remThis = callback(e, elm);
					
					if( remThis===true )
						e.parentNode.removeChild( e );
				} catch( er ) { }
			});
			
			return this;
		},

        // append element
        append: function append( $val ) {
            if( !isset( $val ) ||
                ( !_z.is_z( $val ) && !_z.isDOM( $val )  && !_z.isString( $val ) ) ||
                !this.length )
                return this;

            if( _z.isString( $val ) )
            {
                var _$val = _z.parse.parseHTMLNode($val);
                if( _z.isNodeList( _$val ) )
                    $val = _z.toArray( _$val );
            }

            if( _z.isDOM($val)||!_z.is_z($val) )
                $val = _z($val);

            var elm = this;
            elmFunc.elmLoop( elm, function( e ) {
                if( !e['appendChild'] )
                    return;

                $val.for( function( key, value ) {
                    if( _z.isDOM( value ) || _z.type( value )=='Text' ) {
                        e['appendChild']( value );

                        if( _z(value).tagName() == "script")
                            _z.execScript( value );
                    }
                });
            });
            return this;
        },

        // append to element
        appendTo: function appendTo( $elm ) {
            if( !isset( $elm ) || !($elm=_z( $elm )).isDOMElement() || !this.length ) return this;

            return $elm.append( this ), this.newSelector( null );
        },

        // prepend element
        prepend: function prepend( $val ) {
            if( !isset( $val ) ||
                ( !_z.is_z( $val ) && !_z.isDOM( $val )  && !_z.isString( $val ) ) ||
                !this.length )
                return this;

            if( _z.isString( $val ) )
            {
                var _$val = _z.parse.parseHTMLNode($val);
                if( _z.isNodeList( _$val ) )
                {
                    $val = _z.toArray( _$val );
                    if( $val['reverse'] )
                        $val.reverse();
                }
            }

            if( _z.isDOM($val)||!_z.is_z($val) )
                $val = _z($val);

            var elm = this;
            elmFunc.elmLoop( elm, function( e ) {
                if( !e['insertBefore'] || !e['firstChild'] )
                    return;

                $val.for( function( key, value ) {
                    if( _z.isDOM( value ) || _z.type( value )=='Text' ) {
                        e['insertBefore']( value, e['firstChild'] );

                        if( _z(value).tagName() == "script")
                            _z.execScript( value );
                    }
                });
            });
            return this;
        },

        // prepend to element
        prependTo: function prependTo( $elm ) {
            if( !isset( $elm ) || !($elm=_z( $elm )).isDOMElement() || !this.length ) return this;

            return $elm.prepend( this ), this.newSelector( null );
        },

        // insert after element
        after: function after( $val ) { return elmFunc.insertAdjacentElement.apply( this, [ $val, 'afterend'] ); },

        // insert before element
        before: function before( $val ) { return elmFunc.insertAdjacentElement.apply( this, [ $val, 'beforebegin'] ); },

        // insert element after element
        insertAfter: function insertAfter( $val ) { return _z( $val ).after( this ), this.newSelector( null ); },

        // insert element before element
        insertBefore: function insertBefore( $val ) { return _z( $val ).before( this ), this.newSelector( null ); },

        // wrap element
        wrap: function wrap( $elm ) {
            if( !isset( $elm ) || !($elm=_z( $elm )).isDOMElement() || !this.length ) return this;

            elmFunc.elmLoop( this, function( e ) {
                try{
                    _z(e).before($elm);
                    _z($elm).append(e);
                } catch( er ) { }
            });

            return this;
        },

        // unwrap element
        unwrap: function unwrap() {
            elmFunc.elmLoop( this, function( e ) {
                try{
                    var parent = _z(e).parent();
                    if( !parent.is("body") ) {
                        parent.before( parent.children() );
                        parent.remove();
                    }
                } catch( er ) { }
            });

            return this;
        },

        // is element shown
        isShow: function isShow( ret ) {
            ret = ret || false;
            status = false;
            // if( ret )
            // return this;

            if( this.length > 1 )
            {
                var elm = this,
                    $return=[];
                elmFunc.elmLoop( elm, function( e ) {
                    if( ret==true && _z(e).isShow() )
                        $return.push( e );
                    else if( ret!=true )
                        $return.push( _z(e).isShow() );

                });

                return ret==true ? this.newSelector( $return ) : $return;
            }

            if( _z(this))
            // console.log(this);
                var status = _z(this).hasClass( 'hidden' ) ? true :
                    ( /hidden|none/i.test( _z( this ).css( 'visibility' ) +" "+ _z( this ).css( 'display' ) ) );

            if( ret==true && !!!status )
                status = this;
            else status = !!!status;

            return status;
        },

        // is element hidden
        isHidden: function isHidden() { return !!!_z( this ).isShow(); },
        isHide: function isHidden() { return !!!_z( this ).isShow(); },

        // is element in view
        inViewport: function inViewport() {
            $ele = this;
            var lBound = _z(window).scrollTop(),
                uBound = lBound + _z(window).height(),
                top = $ele.offset().top,
                bottom = top + $ele.outerHeight(true);

            return (top > lBound && top < uBound)
                || (bottom > lBound && bottom < uBound)
                || (lBound >= top && lBound <= bottom)
                || (uBound >= top && uBound <= bottom);
        },

        // fade element/s in/out
        fadeIn: function fadeIn( speed, callback ) {
            callback = _z.isFunction(speed)? speed : ( callback || false );
            speed = _z.isTypes(1,callback) ? callback : ( speed || 1000);
            callback = !_z.isFunction(callback)? false : callback;
            // console.log(this,elmFunc,elmFunc.fade);
            return elmFunc.fade.apply( this, [ 'In', speed, callback ] );
        },
        fadeOut: function fadeOut( speed, callback ) {
            callback = _z.isFunction(speed)? speed : ( callback || false );
            speed = _z.isTypes(1,callback) ? callback : ( speed || 1000);
            callback = !_z.isFunction(callback)? false : callback;
            // console.log(this,elmFunc,elmFunc.fade);
            return elmFunc.fade.apply( this, [ 'Out', speed, callback ] );
        },

        // animate element
        animate: function animate( params, speed ) {
            elm = this;
            elmFunc.elmLoop( elm, function( e ) {
                e.style.transition = 'all ' + speed;
                Object.keys( params ).forEach( (key) => {
                    e.style[ key ] = params[ key ];
                });

            });

            return this;
        },

        // get childrens of an element
		children: function children( $val ) {
			var elm = this,
				$return=[];
			elmFunc.elmLoop( elm, function( e ) {
				if( e['children'] )
					if( isset( $val ) )
					{
						_z.for( _z.toArray( e['children'] ), function( k, v) {
							if( _z.isDOM( $val ) )
							{
								if( v['isEqualNode'] && v['isEqualNode']( $val ) )
									$return.push( v );
							}
							else if( _z.isTypes( 'selector', $val ) )
								if( elmFunc.matches( v, $val ) )
									$return.push( v );
						});
					}
					else
						$return.add( e['children'] );
			});
			
			var newInstance = this.newSelector( $return );
			newInstance.args = arguments;
			newInstance.selector = "";
			
			return newInstance;
		},
		
		// get element siblings
		brothers: function elementSiblings( $val ) {
			var elm = this,
				$returns=[];
			
			elmFunc.elmLoop( elm, function( e ) {
				var $return=[],
					p = e,
					n = e;
				
				while( p = p['previousElementSibling'] ) {
					if( isset($val) && !_z( p ).is( $val ) || $returns.concat( $return ).includes( p ) ) continue;
					
					$return.push( p );
				}
				
				$returns.push( ...( $return.reverse() || [] ) );
				while( n = n['nextElementSibling'] ) {
					if( isset($val) && !_z( n ).is( $val ) || $returns.includes( n ) ) continue;
					
					$returns.push( n );
				}
				
				// $return.add( elm.filter(_z(e).parent().children( $val ).element(), function(child) {
					// return !!!_z(e).is(child);
				// })||[] );
			});
			
			var newInstance = this.newSelector( $returns );
			newInstance.args = arguments;
			newInstance.selector = "";
			
			return newInstance;
		},
		siblings: function elementInSameLeve() { return this.brothers.apply( this, arguments ); },
		
		// find in this elements
		find: function findChildren( qSelector ) {
			var qSelector = qSelector || false,
				$return = [],
				elm = this;
			
			if( !qSelector ) return this;
			
			elmFunc.elmLoop( elm, function( v ) {
				if( _z.isDOM( v ) || _z.type( v ) != 'NodeList' )
					v = _z.toNodeList( v )[0];
				
				if( v && v['querySelectorAll'] )
				{
					v = v.querySelectorAll( qSelector );
					if( v.length ) $return.add( _z( v ).element() );
				}
			});
			
			var newInstance = this.newSelector( _z.unique( $return ) );
			newInstance.args = arguments;
			newInstance.selector = qSelector;
			return newInstance;//_z( _z.unique( $return ) );
		},

		// get element has child $_ELM
		has: function hasChild( $_ELM ) {
			var elm = this,
				$return=[];
			
			elmFunc.elmLoop( elm, function( e ) {
				if( _z(e).find($_ELM).length )
					$return.push( e );
			});
			
			var newInstance = this.newSelector( $return );
			newInstance.args = arguments;
			newInstance.selector = "";
			
			return newInstance;
		},
		
		// elements to html
		toHTML: function outerHTML( ) {
			var $return = [],
				elm = this,
				getHTML = function getHTML( node ) {
					if( !node || !node.tagName ) return '';
					if( node.outerHTML ) return node.outerHTML;

					// polyfill:
					var wrapper = document.createElement('div');
					wrapper.appendChild( node.cloneNode(true) );
					return wrapper.innerHTML;
				};
			
			elmFunc.elmLoop( elm, function( v ) {
				if( _z.isDOM( v ) || _z.type( v ) != 'NodeList' )
					v = _z.toNodeList( v )[0];
				
				if( v )
					$return.push( getHTML( v ) );
			});
			
			return this.length==1 ? $return[0] : $return;
		},
		
		// get last element as _z
		last: function lastElement( len ) {
			if( _z.isArray(len) )
				return _z.subArray( -1, len);
			
			len = parseInt(len) || 1;
			var newInstance = this.newSelector( this.subArray(len<=0?len:len*-1) );
			newInstance.args = arguments;
			newInstance.selector = "::last";
			
			return newInstance;
		},
		
		// get first element as _z
		first: function firstElement( len ) {
			if( _z.isArray(len) )
				return _z.subArray( 0, 1, len);
			
			len = parseInt(len) || 1;
			
			var newInstance = this.newSelector( this.subArray(0, len>=0?len:len*-1) );
			newInstance.args = arguments;
			newInstance.selector = "::first";
			
			return newInstance;
		},
		
		// get next element
		next: function next( $val ) {
			var elm = this,
				$return=[];
			elmFunc.elmLoop( elm, function( e ) {
				if( e['nextElementSibling'] )
					if( isset( $val ) )
					{
						_z.for( [ e['nextElementSibling'] ], function( k, v) {
							if( _z.isDOM( $val ) )
							{
								if( v['isEqualNode'] && v['isEqualNode']( $val ) )
									$return.push( v );
							}
							else if( _z.isTypes( 'selector', $val ) )
								if( elmFunc.matches( v, $val ) )
									$return.push( v );
						});
					}
					else
						$return.push( e['nextElementSibling'] );
			});
			
			var newInstance = this.newSelector( $return );
			newInstance.args = arguments;
			newInstance.selector = "";
			
			return newInstance;
		},
		
		// get next element in document
		// nextElement( selector )
		// nextElement( cb )
		// nextElement( selector, cb )
		nextElement: function nextElement( selector, cb ) {
			var elm = this,
				$return=[];
			
			if( arguments.length<1 )
				try {
					selector = 'input, select, textarea, button';
					arguments = [ selector ];
				} catch (e) {
					selector = undefined;
					arguments = [];
				}
			
			if( arguments.length<1 || this.length != 1 )
				return this.newSelector( $return );
			
			// case selector || cb
			if( arguments.length==1 && !!selector )
			{
				cb = _z.isFunction( selector ) ? selector : fns.true;
				selector = !_z.isFunction( selector ) ? selector : "";
			} // case cb && selector
			else if( arguments.length==2 && !!selector && !!cb )
			{
				cb = _z.isFunction( selector ) ? selector : (
						_z.isFunction( cb ) ? cb : fns.true );
				selector = !_z.isFunction( selector ) ? selector : (
						!_z.isFunction( cb ) ? cb : "" );
			}
			
			var allElements = selector ? _z( selector ).element() : _z( 'input' ).element(),
				ElementIndex = _z.inObject( allElements, elm.element(0) );
			
			if( ElementIndex != -1 )
				allElements = _z.subArray( (+ElementIndex)+1, allElements);
			else
				return this.newSelector( $return );
			
			elmFunc.elmLoop( allElements, function( el ) {
				if( $return.length > 0 )
					return;
				
				if(
					( selector && _z(el).is( selector ) && 
						cb && _z.isFunction( cb ) && ( cb.call(el, el, selector) == true )
						)
					||
					( !!!selector && 
						cb && _z.isFunction( cb ) && ( cb.call(el, el, selector) == true )
					)
					||
					(
						( !!selector && _z(el).is( selector ) ) && !!!cb || !_z.isFunction( cb )
					)
				)
					return $return.push( el ), false;
				
			});
			
			var newInstance = this.newSelector( ( $return.length > 0 ) ? $return[0] : [] );
			newInstance.args = arguments;
			newInstance.selector = "";
			
			return newInstance;
		},

        // get previous element
        prev: function prev( $val ) {
            var elm = this,
                $return=[];
            elmFunc.elmLoop( elm, function( e ) {
                if( e['previousElementSibling'] )
                    if( isset( $val ) )
                    {
                        _z.for( [ e['previousElementSibling'] ], function( k, v) {
                            if( _z.isDOM( $val ) )
                            {
                                if( v['isEqualNode'] && v['isEqualNode']( $val ) )
                                    $return.push( v );
                            }
                            else if( _z.isTypes( 'selector', $val ) )
                                if( elmFunc.matches( v, $val ) )
                                    $return.push( v );
                        });
                    }
                    else
                        $return.push( e['previousElementSibling'] );
            });

            var newInstance = this.newSelector( $return );
            newInstance.args = arguments;
            newInstance.selector = "";

            return newInstance;
        },
        previous: function() { return this.prev.apply( this, arguments ); },

        // get equal elements
        whereIs: function isEqual2() { return elmFunc.matchesAll.apply( this, [ ...arguments, false ] ); },
        // get not equal elements
        not: function isNotEqual2() { return elmFunc.matchesAll.apply( this, [ ...arguments, true ] ); },
        // is equal elements ?
        is: function isEqual( $val ) {
            var elm = this,
                $return=0,
                $val =
                    ( _z.isDOM( $val ) || _z.isArray( $val ) ) && _z( $val ) ||
                    _z.is_z($val) && $val ||
                    _z.isString( $val ) && _z([ $val ]) ||
                    false;

            if( !$val )
                return false;

            elmFunc.elmLoop( elm, function( e ) {
                elmFunc.elmLoop( $val, function( e2 ) {
                    if( _z.isDOM( e2 ) )
                        $return += _z.toNum( e['isEqualNode'] && e['isEqualNode']( e2 ) );
                    else if( _z.isTypes( 'selector', e2 ) )
                        elmFunc.matches( e, e2 )&&(++$return);
                    // else
                    // $return.push( false )
                }, (_e)=>{ return ( _z.isDOM( _e ) || _z.isString( _e ) ); });
            });

            $return = _z.toNum( $return ) || 0;
            return !!( elm.length&&elm.length===$return);
        },

        // element rect (top/left/height/width)
        rect: function elementRect( scrolls ) {
            var elm = this,
                scrolls= isset(scrolls) ? scrolls : true,
                $return=[],
                returnKey = _z.isBoolean( scrolls ) ? false : scrolls,
                scrolls = _z.isBoolean( scrolls ) ? scrolls : true;

            elmFunc.elmLoop( elm, function( e ) {
                var tResult = {};

                if( isWindow( e ) )
                {
                    var height = e.innerHeight ||
                        e.document.documentElement.clientHeight ||
                        e.document.body.clientHeight || 0,

                        width = e.innerWidth ||
                            e.document.documentElement.clientWidth ||
                            e.document.body.clientWidth || 0;
                    // var height = e.document.documentElement[ "client" + 'Height' ] | 0,
                    // width = e.document.documentElement[ "client" + 'Width' ] | 0;

                    tResult = {
                        top: e.document.documentElement[ "client" + 'Top' ] | 0,
                        right: e.document.documentElement[ "client" + 'Width' ] | 0,
                        left: e.document.documentElement[ "client" + 'Left' ] | 0,
                        bottom: e.document.documentElement[ "client" + 'Height' ] | 0,

                        outerHeight: height,
                        outerHeightWP: height,
                        innerHeight: height,
                        height: height,

                        outerWidth: width,
                        outerWidthWP: width,
                        innerWidth: width,
                        width: width,
                    };
                }// document
                else if( e.nodeType === 9 )
                {
                    var height = Math.max(
                        e.body[ "scroll" + 'Height' ], e.documentElement[ "scroll" + 'Height' ],
                        e.body[ "offset" + 'Height' ], e.documentElement[ "offset" + 'Height' ],
                        e.documentElement[ "client" + 'Height' ]
                        ),
                        width = Math.max(
                            e.body[ "scroll" + 'Width' ], e.documentElement[ "scroll" + 'Width' ],
                            e.body[ "offset" + 'Width' ], e.documentElement[ "offset" + 'Width' ],
                            e.documentElement[ "client" + 'Width' ]
                        );

                    tResult = {
                        top: Math.max(
                            e.body[ "scroll" + 'Top' ], e.documentElement[ "scroll" + 'Top' ],
                            e.body[ "offset" + 'Top' ], e.documentElement[ "offset" + 'Top' ],
                            e.documentElement[ "client" + 'Top' ]
                        ) | 0,
                        right: Math.max(
                            e.body[ "scroll" + 'Width' ], e.documentElement[ "scroll" + 'Width' ],
                            e.body[ "offset" + 'Width' ], e.documentElement[ "offset" + 'Width' ],
                            e.documentElement[ "client" + 'Width' ]
                        ) | 0,
                        left: Math.max(
                            e.body[ "scroll" + 'Left' ], e.documentElement[ "scroll" + 'Left' ],
                            e.body[ "offset" + 'Left' ], e.documentElement[ "offset" + 'Left' ],
                            e.documentElement[ "client" + 'Left' ]
                        ) | 0,
                        bottom: Math.max(
                            e.body[ "scroll" + 'Height' ], e.documentElement[ "scroll" + 'Height' ],
                            e.body[ "offset" + 'Height' ], e.documentElement[ "offset" + 'Height' ],
                            e.documentElement[ "client" + 'Height' ]
                        ) | 0,

                        outerHeight: height,
                        outerHeightWP: height,
                        innerHeight: height,
                        height: height,

                        outerWidth: width,
                        outerWidthWP: width,
                        innerWidth: width,
                        width: width,
                    };
                }
                else
                {
                    var rect = ( e['getBoundingClientRect'] ) ? e.getBoundingClientRect() : {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    };
                    var style = vanilla( 'compStyle' )(e);
                    tResult = {
                        top: (rect.top||0) + (scrolls? (document.body.scrollTop||0) : 0),
                        right: (rect.right||0),
                        left: (rect.left||0) + (scrolls? (document.body.scrollLeft||0) : 0),
                        bottom: (rect.bottom||0),

                        // height of element
                        height: parseInt( style.height ),

                        // outer
                        // the height of an element (includes padding and border).
                        outerHeight: e.offsetHeight,
                        // (
                        // parseInt( style.height ) +
                        // parseInt(style.paddingTop) +
                        // parseInt(style.paddingBottom) +
                        // parseInt(style.borderTop) +
                        // parseInt(style.borderBottom)
                        // ),

                        // outer
                        // the height of an element (includes padding, border and margin).
                        outerHeightWP: (
                            e.offsetHeight +
                            parseInt(style.marginTop) +
                            parseInt(style.marginBottom)
                        ),
                        // (
                        // parseInt( style.height ) +
                        // parseInt(style.paddingTop) +
                        // parseInt(style.paddingBottom) +
                        // parseInt(style.borderTop) +
                        // parseInt(style.borderBottom) +
                        // parseInt(style.marginTop) +
                        // parseInt(style.marginBottom)
                        // ),

                        // inner
                        // the height of an element (includes padding).
                        innerHeight: e.clientHeight || e.scrollHeight,
                        // (
                        // parseInt(style.height) +
                        // parseInt(style.paddingTop) +
                        // parseInt(style.paddingBottom)
                        // ),

                        width: parseInt( style.width ),
                        // (function(e) { var style = vanilla( 'compStyle' )(e);
                        // return e.offsetWidth +
                        // parseInt(style.marginLeft) +
                        // parseInt(style.marginRight);
                        // })(e),

                        // the width of an element (includes padding and border).
                        outerWidth: e.offsetWidth,
                        // (function(e) { var style = vanilla( 'compStyle' )(e);
                        // return e.offsetWidth;
                        // })(e),

                        // the width of an element (includes padding, border and margin).
                        outerWidthWP: (
                            e.offsetWidth +
                            parseInt(style.marginLeft) +
                            parseInt(style.marginRight)
                        ),

                        innerWidth: e.clientWidth || e.scrollWidth,
                        // (function(e) { var style = vanilla( 'compStyle' )(e);
                        // return e.clientWidth;
                        // })(e),
                    };
                }

                if( returnKey !== false && isset(tResult[ returnKey ]) )
                    tResult = tResult[ returnKey ];

                $return.push(tResult);

            }, (x)=>{ return _z.isDOM(x)||isWindow(x)||x.nodeType===9; });

            return this.length==1? $return[0] : $return;
        },

        // element position (top/left)
        position: function position() {
            var elm = this,
                $return=[];

            elmFunc.elmLoop( elm, function( e ) {
                if( e['offsetLeft'] && e['offsetLeft'] )
                {
                    $return.push({
                        top: (e['offsetTop']||0),
                        left: (e['offsetLeft']||0),
                    });
                }
            });

            return this.length==1? $return[0] : $return;
        },

        // offsetParent of element ( closest visable parent)
        offsetParent: function offsetParent() {
            var elm = this,
                $return = [];
            elmFunc.elmLoop( elm, function( e ) {
                $return.push( e['offsetParent'] || e );
            });

            return this.length===1 ? $return[0] : $return;
        },

        // parent of element ( direct parent )
        parent: function elementParent( selector ) {
            var elm = this,
                selector = selector || "",
                $return = [];

            elmFunc.elmLoop( elm, function( e ) {
                if( !!selector && e['parentNode'] && _z(e['parentNode']).is( selector ) )
                    $return.push( e['parentNode'] );
                else if( !!selector && (!e['parentNode'] || !_z(e['parentNode']).is( selector )) )
                {

                }
                else if( !!!selector )
                    $return.push( e['parentNode'] );
            });

            var newInstance = this.newSelector( this.length===1 ? $return[0] : $return );
            newInstance.args = arguments;
            newInstance.selector = selector;

            return newInstance;
        },

        // parents of element ( all parents )
        parents: function elementParents( selector ) {
            var elm = this,
                selector = selector || "",
                $return = [],
                pElement=false;

            elmFunc.elmLoop( elm, function( e ) {
                pElement=e;
                do {
                    pElement = pElement['parentNode'];

                    if( !!selector && pElement && _z.isDOM(pElement) && _z(pElement).is(selector) )
                    {
                        if( !$return.includes( pElement ) )
                            $return.push( pElement );
                        // return;
                    }
                    else if( !!!selector )
                        $return.push( pElement );

                } while(
                    ( !!!selector && pElement && _z.isDOM(pElement) ) ||
                    ( !!selector && pElement && _z.isDOM(pElement) )
                    );
            });

            if( !!!$return.length )
                $return = [];// return _z();

            var newInstance = this.newSelector( $return );
            newInstance.args = arguments;
            newInstance.selector = selector;

            return newInstance;
            newInstance.head = elm.length==1 ? elm[0] : newInstance.head;

            var newReturn = _z( ...this.args );
            newReturn.newSelector( $return );
            newReturn.head = elm.length==1 ? elm[0] : newReturn.head;
            return newReturn;
        },

        // parents of element ( until the selector )
        parentsUntil: function parentsUntil( selector, filter ) {
            var elm = this,
                selector = selector || "",
                $return = [],
                filter = filter || fns.true;

            elmFunc.elmLoop( elm, function( e ) {
                if( e && e["parentElement"] ) {
                    e = e.parentElement;
                    while( e && !_z(e).is( selector ) && e["parentElement"] ) {
                        if( !filter || filter.callSelf( [e] ) )
                            $return.push( e );
                        e = e.parentElement;
                    }
                }
            });

            if( !!!$return.length )
                $return = [];// return _z();

            var newInstance = this.newSelector( $return );
            newInstance.args = arguments;
            newInstance.selector = selector;

            return newInstance;
        },

        // iframe contentDocument
        contents: function contents( elm ) {
            var elm = elm || this,
                $return = [];
            elm = !is_z(elm) ? _z(elm) : elm;
            elmFunc.elmLoop( elm, function( e ) {
                if( e && e["contentDocument"] )
                    $return.push( e.contentDocument );
            });

            if( !!!$return.length )
                $return = [];// return _z();

            var newInstance = this.newSelector( $return );
            newInstance.args = arguments;
            newInstance.head = elm.length==1?elm[0]:elm;

            return newInstance;
        },

        // replace element with HTML
        replace: function replaceElement( $html ) {
            var elm = this,
                $return = [];
            elmFunc.elmLoop( elm, function( e ) {
                if( e['outerHTML'] )
                {
                    $return.push( _z(e).clone() );
                    e['outerHTML'] = is_z($html) ? $html.toHTML() : $html;
                }
                else if( e['replaceWith'] )
                {
                    $return.push( _z(e).clone() );
                    e['replaceWith']( $html );
                }
                // if( e['parentNode']&&e['parentNode']['replaceChild'] )
                // {
                // $return.push( _z(e).clone() );
                // e['parentNode']['replaceChild']( e, $html );
                // }
            });

            return this.length===1 ? $return[0] : $return;
        },

        // replace element with element
        replaceWith: function replaceElementWith( $elm ) {
            var elm = this;
            elmFunc.elmLoop( elm, function( e ) {
                elmFunc.elmLoop( $elm, function( $e ) {
                    e.parentNode.insertBefore($e, e);
                });
                e.parentNode.removeChild(e);
            });

            return this;
        },

        // trigger an event
        trigger: function triggerEvent( eventName ) {
            var elm = this,
                eventName = eventName || false;
            if( !eventName )
                return this;

            // handle multi event
            if( _z.isString(eventName) && eventName.split(" ").length > 1 )
                eventName = eventName.split(" ");

            if( _z.isArray(eventName) ) {
                eventName = _z.filter(eventName).toArray();

                _z.for(eventName, function(eKey, eName) {
                    _z(elm).trigger(eName);
                });

                return this;
            }

            elmFunc.elmLoop( elm, function( e ) {
                var event = document.createEvent('HTMLEvents');
                event.initEvent(eventName, true, false);

                try {
                    // console.log(window.getEventListeners(document),e);
                    // console.log(window.getEventListeners(document),e);
                    // var registeredEvent = window.getEventListeners( e );

                    // if( (!registeredEvent || _z.size( registeredEvent ) < 1 || !_z.isset(registeredEvent[ eventName ])) )
                    // {
                    if( eventName in e && _z.isFunction(e[eventName]) )
                    {
                        // console.groupCollapsed(eventName);
                        // console.count(eventName);
                        // console.trace(e);
                        // console.warn(arguments);
                        // console.warn(e[eventName]);
                        // console.groupEnd(eventName);
                        e[eventName]();
                        // return;
                    }
                    // }
                } catch (er) {
                    console.error(er);
                }
                e.dispatchEvent(event);
                // console.warn(event);
                // var event = new Event(eventName);
                // Dispatch the event.
                // e.dispatchEvent(event);

                // Listen for the event.
                // target.addEventListener('build', function (e) { ... }, false);

            }, fns.true);

            return this;
        },

        // attach an event
		on: function attachEvent( eventName, qselector, callback ) {
			var elm = this,
				eventName = eventName || false,
				qselector = qselector || false,
				callback = callback || false;

			// if multi elements
            if( eventName && _z.isObject(eventName) && arguments.length < 2 ) {
                _z.for(eventName, function(eName, eCB) {
                    if( _z.isFunction(eCB) ) {
                        _z(elm).on(eName, eCB);
                    } else if( _z.isObject(eCB) ) {
                        _z.for(eCB, function(eSelector, eCB_) {
                            if (_z.isFunction(eCB_))
                                _z(elm).on(eName, eSelector, eCB_);
                        });
                    }
                });
                return this;
            }

			if( !eventName || !qselector )
				return this;

			if( arguments.length == 2 && _z.isFunction( qselector ) )
				callback = qselector,
				qselector = false;
			
			// listener to element
			if( !qselector )
			{
				elmFunc.elmLoop( elm, function( e ) {
					registerEvent( 
							e, 
							eventName, 
							{
								element: e, 
								eventName: eventName,
								qselector: qselector,
								_callback: callback,
								callback: callback
							}
					);
				}, fns.true);
				
				return this;
			}
			else
			{ // listener to document
				// if( doc['addEventListener'] )
				// {
					// just keep DOM Element
					var elms = this.filter(($e)=>_z.isDOM($e)),
						elms2;
					
					if( !elms.length || !elms )
						return this;
					
					try{ // find the selector
						elms2 = elms;
						elms = _z([
							...elms.find( qselector ).toArray(),
							...elms.whereIs( qselector ).toArray()
							]);
					} catch(er) { console.error(er); return this; }
					
					if( !elms.length )
						return _z();
					
					var _callback = function _callback( event ) {

						try{ // find the selector
							elms = _z([
								...elms2.find( qselector ).toArray(),
								...elms2.whereIs( qselector ).toArray()
								]);
						} catch(er) { console.error(er); return this; }
						
						var target = event.target;
						while( target ) {
							if( ( elms.toArray() ).includes( target ) )
								return callback.call(target, event);
							
							target = target.parentNode;
						}
					};
					
					// attachEvent
					registerEvent(
						doc,
						eventName, 
						{
							element: elm.element(0), 
							eventName: eventName, 
							qselector: qselector, 
							_callback: _callback, 
							callback: callback							
						}
					);
					// doc.addEventListener( eventName, 
							// registeredEvents.add( elm.element(0), eventName, qselector, _callback, callback )
						// , false);
				// }
			}
			
			return this;
		},
		
		// deattach an event
		un: function attachEvent( eventName, qselector, callback ) {
			var elm = this,
				eventName = eventName || false,
				qselector = qselector || false,
				callback = callback || false;

            if( !eventName && !qselector && arguments.length < 1 )
                return this;

			// .un(callback)
			if( arguments.length == 1 && _z.isFunction( eventName ) ) {
                callback = eventName;
                qselector = false;
                eventName = "*";
            }

			// .un(eventName, callback)
			if( arguments.length == 2 ) {
                if( _z.isFunction( qselector ) || (_z.isArray( qselector ) && _z.isFunction( qselector[0] )))
                    callback = qselector,
                    qselector = false;
            }

			// .un("hover")
			if( eventName == "hover" )
                eventName = "mouseenter mouseleave";

			// hamdle multi callback
            if( callback && _z.isArray(callback) ) {
                var oldArgs = _z.filter([eventName, qselector||"", callback||""]).toArray();

                _z.for(callback, function(cKey, cName) {
                    oldArgs.pop();
                    oldArgs.push(cName);
                    _z(elm).un(...oldArgs);
                });
                return this;
            }

			// handle multi event
			if( _z.isString(eventName) && eventName.split(" ").length > 1 )
			    eventName = eventName.split(" ");

			if( _z.isArray(eventName) ) {
			    var oldArgs = _z.filter([eventName, qselector||"", callback||""]).toArray();

                _z.for(eventName, function(eKey, eName) {
                    oldArgs.shift();
                    oldArgs.unshift(eName);
                    _z(elm).un(...oldArgs);
                });
                return this;
            }

			elmFunc.elmLoop( elm, function( e ) {
			    var needleData = false;/*!callback ? {
                                    element: e,
                                    name: eventName,
                                    qselector: qselector
                                } : false;*/
			    if( needleData == false ) {
                    needleData = {};
                    e&&(needleData['element'] = e);
                    eventName&&(needleData['name'] = eventName);
                    qselector&&(needleData['qselector'] = qselector);
                    callback&&(needleData['realcallback'] = callback);
                }

                var rEL = registeredEvents.find(needleData);
				// var rEL = registeredEvents.find(
				// 	!callback ? {
				// 		element: e,
				// 		name: eventName,
				// 		qselector: qselector
				// 	} : callback );
				if( rEL.length )
					_z.for(rEL, function(ELK, ELV){
						ELV['remover']&&ELV['remover']();
					});
				else if( rEL['remover'] )
					rEL['remover']&&rEL['remover']();
				else
					try { unRegisterEvent( e, eventName, callback ); } catch(__error) { }
			}, fns.true);
			
			return this;
		},
		
		// trigger event
		callEvent: function callEvent(evt) {
			var evt = evt || false;
			if( !evt )
				return this;
			
			return this.each( function( evtN ) {
					if( 'createEvent' in document ) {
						var doc = this.ownerDocument,
							evt = doc.createEvent( 'MouseEvents' );
						evt.initMouseEvent( evtN, true, true, doc.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
						this.dispatchEvent( evt );
					}
					else if( evtN in this )
						this[ evtN ](); // IE Boss!
				}, [ evt ] );
		},
		
		// trigger keyboard event
		callKEvent: function callKEvent(evt,evtData) {
			var evt = evt || false;
			var evtData = evtData || false;
			if( !evt )
				return this;
			
			return this.each( function( evtN, evtD ) {
					if( 'createEvent' in document ) {
						var keyboardEvent = document.createEvent("KeyboardEvent");
						var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
						
						keyboardEvent[initMethod](
											evtN, // event type : keydown, keyup, keypress
											evtD['bubbles']?evtD['bubbles']:true, // bubbles
											evtD['cancelable']?evtD['cancelable']:true, // cancelable
											evtD['view']?evtD['view']:window, // viewArg: should be window
											evtD['ctrlKey']?evtD['ctrlKey']:false, // ctrlKeyArg
											evtD['altKey']?evtD['altKey']:false, // altKeyArg
											evtD['shiftKey']?evtD['shiftKey']:false, // shiftKeyArg
											evtD['metaKey']?evtD['metaKey']:false, // metaKeyArg
											evtD['keyCode']?evtD['keyCode']:0, // keyCodeArg : unsigned long the virtual key code, else 0
											evtD['charCode']?evtD['charCode']:0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
						);
						this.dispatchEvent(keyboardEvent);
					}
					else if( evtN in this )
						this[ evtN ](); // IE Boss!
				}, [ evt, evtData ] );
		},
		
		// on DOM change event
		dchange: function DOMChange( func ) {
			if( !_z.isFunction(func) )
				throw new Error(func + " Is not function!!");

			return this.on("DOMSubtreeModified",func);
		},
		
		// wait for DOM change on specifiec selector
		watchIn: function watchInDOMTree( forSelector, callback ) {
			var watch = this;
			if( !isset( callback ) && _z.isFunction( forSelector ) )
			{
				callback = forSelector;
				forSelector = '*';
			}
			if( !_z.isFunction( callback ) )
				throw new Error(callback + " Is not function!!");
			
			forSelector = ( _z.is_z( forSelector ) ? forSelector : 
					( (_z.isDOM(forSelector)||_z.isArray( forSelector )) ? _z(forSelector) : 
							(_z.isString( forSelector ) ? forSelector : '*' )));
			
			if( !watch.length || (!callback || !_z.isFunction( callback )) )
				return this;
			
			elmFunc.elmLoop( watch, function( e, k ) {
				_z( e ).dchange(function( event ) {
					if( forSelector && _z( event.target ).is( forSelector ) )
						return callback.apply(event.target, arguments);
				});
			});
			
			return this;
		},
		
	}, { // data
		// get/set data for element
		data: function updateData( $var, $val ) {
			var elm = this,
				$return=[];
			$val = _z.isset($val) ? $val : undefined;
			var $isVal = _z.isset($val);
			
			var newData = (!!$var && !!$isVal) || (!!$var && !!!$isVal && _z.isObject($var));
			var getData = (!!$var && !!!$isVal) || (!!!$var && !!!$isVal);
			// console.log({
		// '$var': $var,
		// '$val': $val,
		// '$isVal': $isVal,
		// 'newData': newData,
		// 'getData': getData
		// });
			
			if( elm.length )
			{
				var $this = this;
				elm.each(function( i, e ){
					// get data & no data
					if( !isset(e[ version ]) && getData )
					{
						$return.push( undefined );
						return;
					}
					// new data & create object
					if( !isset(e[ version ]) )
						e[ version ] = new_zID();
					
					var crnt_zIDData = new_zID.data[ e[ version ] ];
					
					// set data
					if( !!$var && !!$isVal && !!e[ version ] )
					{
						crnt_zIDData['data'][$var] = $val;
						$return.push(e);
					}
					else if( !!$var && !!!$isVal )
						if( !_z.isObject($var) ) // get data
							$return.push(
											(crnt_zIDData['data']&&_z.isset(crnt_zIDData['data'][$var]) ? 
												crnt_zIDData['data'][$var] : undefined )
										);
						else
						{ // set data
							crnt_zIDData['data'] = crnt_zIDData['data'] || { data: { } };
							crnt_zIDData['data'] = _z.extend(crnt_zIDData['data'], $var);
						}
					else if( !!!$var && !!!$isVal ) // get all data
						$return.push(crnt_zIDData['data']);
					
					// console.error([
						// crnt_zIDData['data'],
						// crnt_zIDData['data'][$var],
						// $var,
						// $isVal,
						// new_zID,
						// new_zID.data,
						// version,
						// e[ version ],
						// e,
					// ]);
					
				});
				
				// return isset( $isVal ) ? this : ( elm.length==1 ? ($return[0]||"") : $return );
			}
			// console.warn($return);
			return newData ? this : ( this.length==1?$return[0]:$return );
		},
		
		// remove data\s for element
		remData: function removeData( $var ) {
			var elm = this;
				
			elmFunc.elmLoop( elm, function( e, v ) {
				if( !isset(e[ version ]) )
					return;
				
				if( !!$var && !!e[ version ] )
				{
					delete new_zID.data[ e[ version ] ]['data'][$var];
				}
				else if( !!!$var && !!e[ version ] )
				{
					delete new_zID.data[ e[ version ] ];
					delete e[ version ];
				}
			}, fns.true);
			
			return this;
		},
		removeData: function removeData( ) { return this.remData.apply( this, arguments ); },
		clearData: function removeData( ) { return this.remData.apply( this, arguments ); },
		
	}, { // selection enabled/disabled
        __selection: function __selection(mod) {
            var mod = mod || 0;
            var retFalse = [
                function() { if(_z.cookie.get('selection')!='on') return false; },
                function() { }
            ];
            this.each(function() {
                if (typeof this.onselectstart != 'undefined') {
                    this.onselectstart = retFalse[mod]||mod[0];
                } else if (typeof this.style.MozUserSelect != 'undefined') {
                    this.style.MozUserSelect = 'none';
                } else {
                    this.onmousedown = retFalse[mod]||mod[0];
                }
            });
            return this;
        },

        selection: function selection(mod) {
            if( !!!("cookie" in _z) ) return this;

            var mod = mod || 0;
            this.each(function() {
                _z(this).parents().__selection(mod);
            });
            return this;
        }
    } ].extend;
	
	[ _z.$, {
		// element scrollTop
		scrollTop: function scrollTop( element ) {
			// var element = fns._zturn( this, element ),
			var element = element || this,
				$return=[];
			
			elmFunc.elmLoop( element, function( e ) {
				var w = isWindow( e ) ? e : 
					( e.nodeType === 9 ? (e.defaultView || e.parentWindow) : false );
				
				$return.push(( 
w ? (('pageYOffset' in w) ? w[ 'pageYOffset' ] : w.document.documentElement[ 'scrollTop' ]) : e[ 'scrollTop' ]
						) || 0);
						
			}, (x)=>{ return _z.isDOM(x)||isWindow(x)||x.nodeType===9; });
			
			return element.length==1? $return[0] : $return;
		},
		
		// element scrollLeft
		scrollLeft: function scrollLeft( element ) {
			// var element = fns._zturn( this, element ),
			var element = element || this,
				$return=[];
			
			elmFunc.elmLoop( element, function( e ) {
				var w = isWindow( e ) ? e : 
					( e.nodeType === 9 ? (e.defaultView || e.parentWindow) : false );
				
				$return.push(( 
w ? (('pageXOffset' in w) ? w[ 'pageXOffset' ] : w.document.documentElement[ 'scrollLeft' ]) : e[ 'scrollLeft' ]
						) || 0);
						
			}, (x)=>{ return _z.isDOM(x)||isWindow(x)||x.nodeType===9; });
			return this.length==1? $return[0] : $return;
		},
		
	} ].extend;
	
	[ _z.$, {
			// offset
			offset: function offset( ) { 
				var rect = this.rect.call( this );
				return {
					top: +( rect['top'] || 0),
					left: +( rect['left'] || 0),
				};
			}
		}, 
		
		// rect functions 
		...foreach("top left outerHeight outerHeightWP innerHeight height outerWidth outerWidthWP innerWidth width".split(' '), ( k, v )=>{
			return {
				[v]: function( WP ) { 
					var rect = this.rect.call( this/* , [ ...arguments ].splice(1)  */);
					if( (toLC(v)=='outerheight' || toLC(v)=='outerwidth') && WP )
						v += 'WP';
					
					rect = rect&&rect[v] || 0;
					
					return _z.isArray( rect ) ? rect : +( rect || 0);
				}}; 
		}), 
		// on && un functions
		...foreach([
			"focusin", 
			"focusout", 
			"focus", 
			"blur", 
			"load", 
			"resize", 
			"scroll", 
			"unload", 
			"click", 
			"dblclick", 
			"mousedown", 
			"mouseup", 
			"mousemove", 
			"mouseover", 
			"mouseout", 
			"mouseenter", 
			"mouseleave", 
			"change", 
			"select", 
			"keydown", 
			"keypress", 
			"keyup", 
			"error"
			], function( k, event) {
				return {
					[event]: function( callback ) {
						return ( arguments.length ) ?
							this.on( event, callback ) :
								this.trigger( event );
					}
				};
			}), {

			// mouse hover
            hover: function hover(enterCB, outCB) {
                if( !arguments.length )
                    return this.trigger("mouseenter mouseleave");

                if( _z.isFunction(enterCB) )
                    this.on( "mouseenter", enterCB );
                if( _z.isFunction(outCB) )
                    this.on( "mouseleave", outCB );

                return this;
            }
        },

	].extend;
// _z.$ }


// _z {

	// add global functions to _z
	[ _z, __zGlobalFunctions ].extend;
	
	// add shared functions to _z
	[ _z, __zFunctions ].extend;
	
	// add serialize settings to _z
	[ _z, __zSerializeSettings ].extend;
	
	// add ajax functions to _z
	[ _z, {
		// hash from url
		hash: function getHash( setHash ) {
			if( _z.isset( setHash ) )
				window.location.hash = _z.trim( setHash );
			
			var hash = window.location.hash || "";
			return hash.substr( 1 );
		},

        // object to url query
		param: function param( object, perfix, parts ) {
			var parts = parts || [],
				perfix = perfix || false,
				add = function( n, v ) {
					parts.push( 
						encodeURIComponent( n ) + "=" + 
						encodeURIComponent( _z.isFunction( v ) ? v() : (v == null && "" || v) )
					);
				};
			
			// append
			if( perfix ) {
				// array
				if( typeOfVar( object ) === 'array' ) {
					for( i = 0, len = object.length; i < len; i++ )
						if ( /\[\]$/.test( perfix ) )
							add( perfix, object[i] );
						else
							param( object[i], perfix + '[' + ( typeOfVar( object[i] ) === 'object' ? i : '' ) + ']', parts );
				}
				// object
				else if( typeOfVar( object ) === 'object' ) {
					for( var prop in object )
						param( object[ prop ], perfix + '[' + prop + ']', parts );
				}
				// string
				else add( perfix, object );
			}
			else if( typeOfVar( object ) === 'array' ) {
				// elements
				elmFunc.elmLoop( object, function( e, v ) {
					if( e.name )
						add( e.name, e.value );
				}, fns.true);
			}
			// init
			else {
				for( var prop in object )
					param( object[ prop ], prop, parts );
			}
			
			return parts.join( '&' ).replace( /%20/g, '+' );
		},
		
	},
	__zAjax
	].extend;
	
	// private usage
	[ _z, {
		privates: { private: true,
			// typeof `obj`
			type: function __type( obj ) {
				if(!obj)
					return false;
				
				var step = [ false, false, false, false ];
				
				try { // is jquery
					step[0] = !!( obj instanceof globaljQuery || obj.constructor.prototype.jquery );
				} catch(e) { step[0] = false; }
				
				try { // is jquery || DOM
					step[1] = !!( obj instanceof globaljQuery ? obj.size() > 0 : !!(obj['tagName']) );
				} catch(e) { step[1] = false; }
				
				try { // is DOM
					step[2] = !!( obj['nodeType'] );
				} catch(e) { step[2] = false; }
				
				try { // is Window
					step[3] = !!( obj != null && obj == obj.window );
				} catch(e) { step[3] = false; }
				
				var isJQ = !!( step[0] && step[1] ),
					isDOM = !!( step[2] && step[1] ),
					isArray = !!( (!isJQ && !isDOM) && (obj instanceof Array) ),
					isObject = !!( (!isJQ && !isDOM && !isArray && !step[3]) && typeof(obj)==typeof({}) ),
					isWindow = !!( step[3] );
				
				return  {
							'jquery': isJQ,
							'dom': isDOM,
							'object': isObject,
							'array': isArray,
							'window': isWindow,
							'typeof': typeof(obj),
						};
			},
		
			// return `filePath` into an array
			pathToArray: function pathToArray( filePath ) {
				var filePath = filePath || "",
					filePathArray = [];
				
				while( filePath.indexOf("/") > -1 ) {
					filePathArray.push( filePath.substring( 0, filePath.indexOf( "/" ) ) );
					filePath = filePath.substring( filePath.indexOf( "/" ) + 1 );
				}
				filePath&&filePathArray.push( filePath );
				
				return filePathArray;
			},
			
			// underZ prototypes
			protos: protos,
			
			// prepareCSS function
			prepareCSS: elmFunc.prepareCSS,
			
			// elm function
			elmFunc: elmFunc,
		},
	} ].extend;
	
	// Objects function
	[ _z, {
		// remove from `obj` the `attr`
		removeFrom: function removeFrom( obj, attr ) {
			if( arguments.length == 0 )
				return [];
			
			// array
			if( _z.isTypes( [], obj ) )
			{
				obj = Array.from(obj);
				if( obj.indexOf( attr )!== -1 )
					obj.splice( obj.indexOf( attr ), 1);
			}
			
			// object
			if( _z.isTypes( {}, obj ) )
			{
				var $return = _z.extend( {}, ( _z.is_z( obj ) ? obj.element() : obj ) );
				_z.for( $return, function( $var ) {
					if( $var == attr )
						delete $return[ $var ];
				});
				return $return;
			}
			
			return obj || [];
		},
		
		// isset `val`
		isset: isset,
		
		// return v as number || 0
		toNum: fns.toNum,
		
		// isEmpty array, string, object 
		isEmpty: function isEmpty( obj ) {
			if( obj == null || !!!obj )
				return true;
			
			if( _z.isArray( obj ) || _z.isString( obj ) || _z.isArguments( obj ) )
				return obj.length === 0;
			
			return _z.size( obj ) === 0;
		},
		
		// isNotEmpty array, string, object 
		isNotEmpty: function isNotEmpty() {
			return !!!_z.isEmpty.apply( this, arguments );
		},
		
		// type of `val`
		type: function type( val ) {
			return protos.object.toString.call( val )
				.replace( '[object ', '' ).replace( ']', '' )
				.trim();
		},
		
		// is element == window
		isWindow: isWindow,
		
		// (`obj` == jQuery)
		isjQuery: function isjQuery( obj ) {
			var t = _z.privates.type( obj );
			return ( !!( !!(t) && !!(t['jquery']) ) );
		},
		
		// (`obj` == DOMElement)
		isDOM: function isDOM(obj) {
			var t = _z.privates.type( obj );
			return ( !!( !!(t) && !!(t['dom']) ) );
		},
		
		// (`obj` == DOMElement || Window)
		isDOMOW: function isDOMOrWindow(obj) {
			var t = _z.privates.type( obj );
			return ( !!( !!(t) && (!!(t['dom']) || !!(t['window'])) ) );
		},
		
		// all (typeof arguments) is equal
		isTypes: function isTypes() { 
			var args = _z.toArray( arguments );
			if(!args || args.length < 2)
				return false;
			
			// first check
			var a = args.shift(),
				b = args.shift();
			
			if( !( this.type( a ) === this.type( b ) ) )
				return false;
			
			while( !!args.length )
			{
				// compare last input with last shifted item
				if( args.length == 1 )
					args.push( a );
					
				// same as first check
				var a = args.shift(),
					b = args.shift();
				
				if( !( this.type( a ) === this.type( b ) ) )
					return false;
			}
			return true;
		},
		
		// is `elm` instanceof _z
		is_z: is_z,/*function is_z( elm ) {
			return elm instanceof _z;
			// useless
			// var elm = elm || false;
			// try{
				// if( !!!elm || !!!elm['init'] || !!!elm['underZ'] || elm.init.prototype !== _z.prototype || elm.init !== _z.$.init )
					// return false;
				// else
					// return true;
			// } catch( e ) { return false; }
		},*/
		
		// is `elm` == _z
		isCore: isCore,
		
		// is not `EMPTY` AND [ local function ]
		isNotEmptyAnd: function isNotEmptyAnd( data, cb ) {
			cb = cb || fns.true;
			return !!( !_z.isEmpty( data ) && fns.callFunction( cb, [data], this ) );
						// (
							// (_z.isFunction( cb ) && cb.apply(this, [data] )) || 
							// (_z.isset( _z[cb] ) && _z.isFunction( _z[cb] ) && _z[cb].apply(this, [data] ))
						// )
					// );
		},
		
		// is not `EMPTY` OR [ local function ]
		isNotEmptyOR: function isNotEmptyOR( data, cb ) {
			cb = cb || fns.true;
			return !!( !_z.isEmpty( data ) && fns.callFunction( cb, [data], this ) );
		},
		
		// unique Array
		unique: function uniqueArray( arr ) {
			return Array.from( ( new Set( _z.toArray( arr ) ) ) ) || arr;
		},
		
		// search inArray
		inArray: Array.prototype.inArray,
		
		// search inArray & inObject
		inObject: function inObject( obj, needle, searchInKey ) {
			var object;
			if( !isset( searchInKey ) && _z.isObject( obj ) )
				searchInKey = true;
				
			if( _z.isObject( obj ) )
				object = Object.keys( obj );
			else if( _z.isArray( obj ) )
				object = obj;
			else if( _z.isFunction( obj ) )
				return _z.hasProp( obj, needle );
			else
			{
				try{
					return arguments.callee.call( this, _z.extend({}, obj), needle, searchInKey );
				} catch(e)
				{
					console.error(e);
					return -1;
				}
			}
			
			if( _z.is_z( obj ) )
				obj = obj.element();
				
			if( _z.isArray( needle ) || _z.isObject( needle ) )
				needle = JSON.stringify( needle );
			
			var result = -1;
			_z( object ).each(function( key ) {
				if( result != -1 )
					return;
				
				key = obj[ object[ key ] ]&&object[ key ] || obj[ key ]&&key;
				
				var value = obj[ key ];
				if( _z.isArray( value ) || _z.isObject( value ) )
					value = JSON.stringify( value );
				
				if( searchInKey && ( value === needle || key === needle ) )
					return result = key;
				else if( value === needle )
					return result = key;
			});
			
			return result;
		},
		
		// element to NodeList
		toNodeList: function toNodeList( elm, context ) {
			var list, 
				context = context || elm.parentNode;
			
			this.fragment = null;
			this.fragmentsCreate = function() {
				this.fragment = document.createDocumentFragment();
				return this;
			};
			
			this.fragmentsAppend = function( appendElement ) {
				this.fragment.appendChild( appendElement );
				return this;
			};
			
			this.fragmentsGet = function() {
				return this.fragment ? this.fragment.childNodes : null;
			};
			
			this.fragmentsDelete = function() {
				try {
					this.fragment.textContent = "";
					
					while( this.fragment.firstChild )
						this.fragment.removeChild( this.fragment.firstChild );
					
					this.fragment = this.fragment.lastChild;
					if( this.fragment )
						this.fragment.removeChild( this.fragment );
					
				} catch(e) { }
				
				return this;
			};
			
			// is part of a document
			if( !context && elm.ownerDocument )
				// is <html> or in a fragment
				if( elm === elm.ownerDocument.documentElement || elm.ownerDocument.constructor.name === 'DocumentFragment' )
					context = elm.ownerDocument;
			
			// fragment
			if( !context ) {
				this.fragmentsCreate();
				this.fragmentsAppend( elm );
				
				list = _z(this.fragmentsGet());
				
				this.fragmentsDelete();
				return list;
				
				return this;//.fragmentsGet();
			}
			
			// element in DOM tree
			// selector method
			elm.setAttribute('wrapNodeList','');
			
			list = context.querySelectorAll('[wrapNodeList]');
			
			elm.removeAttribute('wrapNodeList');
			
			return list;
		},
		
		// from Object to likeArray
		toLikeArray: function toLikeArray( obj ) {
			// var obj = fns._zturn( this, obj );
			var obj = obj || this;
			
			if( _z.is_z( obj ) )
				obj = obj.element();
			
			if( !!!_z.isObject( obj ) && !!!_z.isArray( obj ) )
				return obj;
			
			return _z.extend( [], obj );
		},
		
		// clone Objects
		clone: cloneObj,
		
		// add to end of array
		arrayAppend: function arrayAppend( array1, array2 ) {
			var array1 = array1 || [],
			array2 = array2 || false,
			args = [];
			
			if( !!!array2 )
				array2 = array1,
					array1 = this.toArray();
			
			args = ( arguments.length > 1 ) ? _z.subArray( 1, arguments ) : [ array2 ];
			while( args && (array2 = args.pop()) )
			for( var i = 0, length = array2.length; i < length ; i++ )
				array1.push( array2[ i ] );
			
				// _z.arrayAppend( array1, _z.subArray( 1, args ) );
			
			return array1;
		},

		// DOM Node Types
		nodesTypes: {
			query: function query( rootNode, isDeepSearch ) {
				var nodeTypesObjects = [],
					args = arguments;
				_z.for( this, function(x,v){
					if( x != args.callee.name )
						nodeTypesObjects[ x ] = _z.HTMLNodes.bind( _z, rootNode, isDeepSearch, v );
				});
				return nodeTypesObjects;
			},
			element: window.document.ELEMENT_NODE || 1,
			attr: window.document.ATTRIBUTE_NODE || 2,
			text: window.document.TEXT_NODE || 3,
			comment: window.document.COMMENT_NODE || 8,
			document: window.document.DOCUMENT_NODE || 9
		},
		
		// vanilla shortcut functions
		vanilla: function(){
			return [ this.vanilla, vanilla() ].extend, vanilla();
		},
		
		// get HTMLNodes by types
		HTMLNodes: function HTMLNodes( rootNode, isDeepSearch, nodeType ) {
			var _nodes = [],
				node = rootNode&&rootNode.firstChild || document.body.firstChild,
				nodeType = nodeType || _z.nodesTypes.element;

			while( node ) {
				if( node.nodeType === nodeType )
					_nodes.push( node );
				else if( isDeepSearch && ( node.nodeType === _z.nodesTypes.element ) )
					_z.arrayAppend( _nodes, _z.HTMLNodes( node, isDeepSearch ) );
				
				node = node.nextSibling;
			}

			return _nodes;
		},
		
		// foreach 2 levels, usage: foring(Object, Sub Object, function)
		foring: function foring(o, toSecondLevel, fn)
		{
			if( !(o && (_z.isObject(o) || _z.isArray(o) || _z.is_z(o))) || 
				!_z.isFunction(toSecondLevel) || 
				!_z.isFunction(fn)
			  )
				return false;
			
			o = _z.is_z(o) ? o.element() : o;
			return foreach( o, function() {
				var pass = toSecondLevel(...arguments);
				if( pass && (_z.isObject(pass) || _z.isArray(pass) || _z.is_z(pass)) )
				{
					pass = _z.is_z(pass) ? pass.element() : pass;
					foreach( pass, fn);
				}
			});
		},
		
	} ].extend;
	
	// deferring system
	[ _z, __zDeferring ].extend;
	
	// _z features
	[ _z, {
		// selector, action, prevent true||false
		prevent: function prevent(s, a, p) {
			var s = s || '*',
			a = a || '*',
			p = p || false;
			
			if(a.indexOf(' ')>=0)
				a = a.split(' ');
			
			if(a instanceof Array)
			{
				if(a.length==0)
				{
					console.error("Unknown Action: "+a.join(' '));
					return this;
				}
				a.forEach(function(e) {
					this.prevent(s,e,p);
				}.bind(this));
				
				return this;
			}
			
			if(s.indexOf(' ')>=0)
				s = s.split(' ');
			
			if(s instanceof Array)
			{
				if(s.length==0)
				{
					console.error("Unknown Selector: "+s.join(' '));
					return this;
				}
				s.forEach(function(e) {
					this.prevent(e,a,p);
				}.bind(this));
				
				return this;
			}
			
			var elm = _z(s);
			
			switch(a)
			{
				case "*":
				case "selection":
					elm.selection(!p?1:0);
				if(a!='*')
					break;
				
				case "*":
				case "cut":
					elm.un("cut");
					if(p)
					{
						elm.on("cut", function(e){
							e.preventDefault();
						});
					}
				if(a!='*')
					break;
				
				case "*":
				case "copy":
					elm.un("copy");
					if(p)
					{
						elm.on("copy", function(e){
							e.preventDefault();
						});
					}
				if(a!='*')
					break;
				
				case "*":
				case "contextmenu":
					elm.un("contextmenu");
					if(p)
					{
						elm.on("contextmenu", function(e){
							e.preventDefault();
						});
					}
				if(a!='*')
					break;
				
				case "*":
				case "autocomplete":
					elm.attr('autocomplete',p?'on':'off');
				if(a!='*')
					break;
				
				default:
					if(a!='*')
						console.error("Unknown Action: "+a);
				break;
			}
			
			if(!_z.document.isReady)
			{
				// _z.callbacks.ready(function(){
				_z.ready(function(){
					_z.prevent(s, a, !p);
				});
			}
			
			return this;
		},
		
		// document functions
		document: {
			// get document Status
			status: function documentStatus() {
				return document.readyState;
			},
			
			// document is ready ?
			isReady: function documentIsReady() {
				return (document.readyState==='complete');
			},
			
		},
		
		// parse functions
		parse: parssing,
		
		// base64 en/decoder
		base64: base64,
		
		// get variables from location
		_GET: function _GET( variable ) {
			if( !!!(location && doc.location) )
				return false;
			
			try {
				q = (location||doc.location).search.substring( 1 ),
				asArray = {},
				p = [],
				getAll = ( !!!variable );
				
				v = q.split("&");
				for( var i = 0, iv = v.length; i < iv; i++ ) {
					p = v[ i ].split("=");
					p[1] = ( p[1].indexOf('%20') != -1 ) ? decodeURIComponent( p[1] ) : p[1];
						
					if( getAll )
						asArray[ p[ 0 ] ] = p[ 1 ];
					else if( p[0] == variable )
						return p[1];
				}
				
				if( getAll )
					return asArray;
				
				return '';
			} catch (e) { return ''; }
		},
		
		// get current file name from location
		_FILE_: function _FILE_() {
			try {
				var url = window.location.pathname;
				return url.substring( url.lastIndexOf('/')+1 ) || "";
			} catch (e) { return false; }
		},
		
		// return css select from dom element
		cssSelector: cssSelector,
		
	} ].extend;
	
	// loader js, css, img
	[ _z, {
		__loaders: {
			_: function __loader() {
				var args = Array.from( arguments ),
					LType = args[0] || false,
					flink = args[1] || false;
				
				if( !!!LType )
					return false;
				
				if( !!!args.length )
					return false;
				
				args = args.slice( 1 );
				this[ LType ].push( args );
				return this[ LType ];
			},
			
			ef: function emptyFunction() { },
			error: function error() { },
			done: function done() { },
			css: [],
			js: [],
			img: [],
			inited: [],
		},
		
		// check if file has been loaded
		isLoaded: function(f) {
			// var f = "a/b/c.d";
			if(!!!f)
				return false;
			
			var a = _z.privates.pathToArray( f );
			a = _z.type( a )=='Array' ? a.reverse() : [];
			var returns = false;
			for( var ii = 0; ii < this.__loaders.inited.length; ii++ )
			{
				var a2 = this.__loaders.inited[ii];
				a2 = _z.type(a2)=='Array' ? Array.from( a2 ).reverse() : [];

				returns = true;
				for( var i =0; i < a.length; i++ )
				{
					if( a[i] != a2[i] )
					{
						returns = false;
						break;
					}
				}
				if( returns )
					return returns;
			}
			
			return returns;
		},
		
		// load multi : usage: _z.loaders("path/file.js").js() @init all usage: _z.loaders()
		loaders: function() {
			var doInit = arguments[0] || false;
			if( !!!doInit )
			{
				return Promise.all(
					(function(){
						var arr=[];
						// css
						for( var i=0; i < this.__loaders.css.length; ++i)
							arr.push( this.loader.css.apply( this, this.__loaders.css[i]) );
						
						this.__loaders.css = [];
						// js
						for( var i=0; i < this.__loaders.js.length; ++i)
							arr.push( this.loader.js.apply( this, this.__loaders.js[i]) );
						
						this.__loaders.js = [];
						// img
						for( var i=0; i < this.__loaders.img.length; ++i)
							arr.push( this.loader.img.apply( this, this.__loaders.img[i]) );
						
						this.__loaders.img = [];
						return arr.length ? arr : [ this.__loaders.ef() ];
					}).call( this )
				)
				.then( this.__loaders.done || function() { } )
				.catch( this.__loaders.done || function() { } );
			}
			
			return {
				css: function() { 
					return this.__loaders._( 'css',arguments[0] || [] );
				}.bind( this,arguments ),
				
				js: function() {
					return this.__loaders._( 'js', arguments[0] || [] );
				}.bind( this,arguments ),
				
				img: function() {
					return this.__loaders._( 'img',arguments[0] || [] );
				}.bind( this, arguments ),
			};
		},
		
		// load single
		loader: (function() {
		  // Function which returns a function: https://davidwalsh.name/javascript-functions
		  function _load( tag ) {
			return function( url ) {
				// if(document.readyState!=='complete')
				// {
					// console.log(setTimeout(function(){ _load(tag)(url); }, 100));
					// return false;
				// }
				// register file
				var _z = window._z || { __loaders: { inited: [] } };
				_z.__loaders = _z.__loaders || { inited: [] };
				_z.__loaders.inited = _z.__loaders.inited || [];
				
				
				var cb = (_z.type(url)=='Array') ? url.slice(1) : false;
				url = (_z.type(url)=='Array') ? url[0] : url;
				cb = cb&&cb.length ? (cb[0]||false) : false;
				
				
				if(_z['isLoaded'])
					if(_z['isLoaded'](url))
					{
						return false;
					}
					else
					{
						// console.dir([
							// _z.__loaders.inited,
							// _z['isLoaded'](url),
							// _z.isLoaded(url),
							// url
						// ]);
					}
				
				if(_z['privates']&&_z['privates']['pathToArray'])
				{
					_z.__loaders.inited.push( _z.privates.pathToArray(url) );
				}
				else
				{
					_z.__loaders.inited.push( url.replace(/^.*[\\\/]/, '') );
				}
				
				var loadInBody = false;
				if( (document.readyState!=='complete' && tag=='script') || ((loadInBody=true) && tag=='script'))
				{
					_z(loadInBody?"body":"head").append('<script type="text/javascript" class="_z-loader" src="'+url+'"></script>');
					
					if(cb && typeof(cb) === "function") {
						cb();
					}
					
					return true;
					url = (_z.type(url)=='Array') ? url : [url];
					return (function loadJS( src, cb ){
						"use strict";
						var loadersScripts = document.getElementsByClassName('_z-loader');
						var ref = (loadersScripts.length!==0?loadersScripts[ loadersScripts.length-1 ]:false) || window.document.getElementsByTagName( "script" )[ 0 ];
						var script = window.document.createElement( "script" );
						script.src = src;
						script.async = false;
						ref.parentNode.insertBefore( script, ref.nextSibling );
						if(cb && typeof(cb) === "function") {
							script.onload = cb;
						}
						script.setAttribute("class", "_z-loader");
						script.setAttribute("type", "text/javascript");
						return script;
					}.apply(this, url));
				}
				
			  // This promise will be used by Promise.all to determine success or failure
			  return new Promise(function(resolve, reject) {
				var element = document.createElement(tag);
				var parent = 'body';
				var attr = 'src';
				
				// Important success and error for the promise
				element.onload = function() {
					if(cb && typeof(cb) === "function")
						cb();
					
					resolve(url);
				};
				element.onerror = function() {
				  reject(url);
				};

				// Need to set different attributes depending on tag type
				switch(tag) {
				  case 'script':
					element.async = true;
					break;
				  case 'link':
					element.type = 'text/css';
					element.rel = 'stylesheet';
					attr = 'href';
					parent = 'head';
				}

				// Inject into document to kick off loading
				element[attr] = url;
				document[parent].appendChild(element);
			  });
			};
		  }
		  
		  return {
			css: _load( 'link' ),
			js: _load( 'script' ),
			img: _load( 'img' )
		  }
		})()

	}, {

        // eval function when document is ready
        ready: function ready( fn, load ) {
        var d=document,
            load = load || false;

        if( !_z.isFunction( fn ) )
            return this;

        var $DOMContentLoaded = function() {
            if(d.readyState != 'loading')
                if( ( load&&d.readyState == 'interactive' ) || d.readyState == 'complete')
                {
                    fn();
                    cleanLoadinEvents();
                }
        };
        var $onreadystatechange = function() {
            if(d.readyState != 'loading')
                if( ( load&&d.readyState == 'interactive' ) || d.readyState == 'complete')
                {
                    fn();
                    cleanLoadinEvents();
                }
        };

        var cleanLoadinEvents = function() {
            if ( d.addEventListener ) {
                d.removeEventListener( "readystatechange", $DOMContentLoaded, false );

            } else {
                d.detachEvent( "onreadystatechange", $onreadystatechange );
            }
        };

        switch ( d.readyState+(load?'1':'0') ) {
            case "interactive1": // The document has finished loading. We can now access the DOM elements.
                fn();
                break;

            case "complete"+(load?'1':'0'): // The page is fully loaded.
                fn();
                break;

            // case "loading"+(load?'1':'0'): // The document is still loading.
            default:
                if(d.addEventListener) {
                    d.addEventListener('readystatechange', $DOMContentLoaded , false );
                }
                else
                {
                    d.attachEvent('onreadystatechange', $onreadystatechange);
                }
                break;
        }

        return this;
    },

    // eval function when document load
    load: function load( fn ) {
        if( !_z.isFunction( fn ) )
            return this;

        return this.ready( fn, true );
    }} ].extend;
	
	// global variables
	[ _z, {
		// register tag default display style
		defaultDisplayStyleLog: {},
	} ].extend;
	
	// declare system
	[ _z, __zDeclare ].extend;

	// cookie system
	[ _z, { // cookie
        cookie: {
            set: function (name, value, days) {
                return this.setBySec(name, value, days * 24 * 60 * 60);

                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toGMTString();
                }
                else var expires = "";
                var ck = name + "=" + value + expires + "; path=/";
                document.cookie = ck;
                return this;
            },

            // add cookie expires within seconds
            setBySec: function (name, value, seconds) {
                if (seconds) {
                    var date = new Date();
                    date.setTime(date.getTime() + (seconds * 1000));
                    var expires = "; expires=" + date.toGMTString();
                }
                else var expires = "";
                var ck = name + "=" + value + expires + "; path=/";
                document.cookie = ck;
                return this;
            },

            get: function (name) {
                var name = name || "",
                    nameEQ = name + "=";
                var ca = document.cookie.split(';'),
                    cs = {};
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);

                    if (name && c.indexOf(nameEQ) == 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                    else if (!!!name) {
                        c = c.split('=');
                        cs[c[0]] = c.length > 2 ? c.slice(1) : c[1];
                    }
                    // if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);

                }
                return (name) ? "" : (cs || {});
                return "";
            },

            delete: function (name) {
                return this.set(name, '', -1);
            }
        }
    } ].extend;

// _z }
	// _z.extend.status = false;
	_z.extend.status = true;


//							*/
var hlack = hlack || window.hlack || {};
	hlack = _z.extend(true, hlack);
var xzz = xzz || {};

// alias for _z
var Q = Q || {};
var mm = mm || {};
var hh = hh || {};
var meme = meme || {};
var zx = zx || {};

var hook = hook || function(m){ // hook plugins in _z
	m=m||false;
	var newHook = false;
	if(typeof(m)==typeof("zex"))
		newHook = m;
	
	var hookError = function(){
		if(this==false)
			console.error("Can not hook module in hlack Engine!");
		else
			console.error("Module: "+this+" exist in hlack Engine!");
		
		return false; 
	};
	var hookFunc = function(f) { 
		if(typeof(f)==typeof({}))
		{
			if(f['private']&&!hook.globalAll)
			{
				_z.extend(true, _z.privates, f);
				return hlack;
			}
			var $res = _z.extend(true, hlack,f);
			
			return $res;
		}
		
		var NH = {};
		NH[this] = f;
		return _z.extend(true, hlack,NH);
	};
	
	if(newHook)
	{
		if(hlack[newHook])
		{
			return hookError.bind(newHook);
		}
		else
		{
			return hookFunc.bind(newHook);
		}
	}
	else if(typeof(m)==typeof({}))
	{
		return hookFunc;
	}
	
	return hookError.bind(false);
};
hook.globalAll = false;

hook(xzz)(xzz);
hook(Q)(Q);
hook(mm)(mm);
hook(hh)(hh);
hook(meme)(meme);
hook(zx)(zx);


// alias for _z
window.meme = window.hh = window.mm = window.zx = window.Q = window._z = window.hlack = hlack;

window._z = _z;
window.hook = hook;

if( !window._ )
	window._ = _z.ready.bind(_z);

if( typeof define === "function" && define.amd && define.amd._z ) {
	define( "_z", [], function () { return _z; } );
}


var scripts = _z('[underZ]').element( -1 ); // last
if( scripts&&scripts['innerText'] ) // auto load
	try{ eval( scripts['innerText'] ); } catch( e ) { console.error(e); }

if( !!!_z.vanilla.vanilla )
	_z.ready( ()=>_z.vanilla() );
;(function() { 
	'use strict';
	if( _z.extend.status === false )
	{
		// fns.objProp(_z.prototype, { c: 0});
		// _z.$.init.prototype = fns.objProp(_z.$.init.prototype, { c: 0});
		
	}
		// _z = Object.freeze( _z );
})();

	hlack.typeOfVar = typeOfVar;
	return hlack;
})( this );

_z.ready(()=>{ _z.interval.init(true) });
