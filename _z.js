// UnderZ 1.0.1 - JavaScript Library
// Copyright © 2008-2019 hlaCk (https://github.com/hlaCk)
// Licensed under the GNU General Public License v3.0 (https://github.com/hlaCk/UnderZ/blob/master/LICENSE) license.

(function( window, document ) {
// Function.callSelf(...arguments) = Function.apply( Function, arguments )
    if(typeof Function.prototype.callSelf !== 'function')
        Function.prototype.callSelf = function() {
            return this.apply( this, arguments );
        };

// Function.bindSelf(...arguments) = Function.bind( Function, arguments )
    if(typeof Function.prototype.bindSelf !== 'function')
        Function.prototype.bindSelf = function( ) {
            return this.bind( this, ...arguments );
        };

// Object.each(function) = Object
    if(typeof Object.prototype.each !== 'function')
        Object.prototype.each = function( cb ) {
            cb = cb || false;
            if( !_z.isFunction(cb) ) return this;

            if( _z&&_z["for"] ) {
                var nO = _z.for(this, cb);
                if( _z.isObject(nO) )
                    Object.assign(this, nO);
            } else {
                try {
                    var _keys = Object.keys( this );
                    for( var i = 0, l = _keys.length; i < l ; i++ ) {
                        var thisObj = {};
                        thisObj[ _keys[i] ] = this[ _keys[i] ];
                        var cbReturn = cb.apply(this,  [ _keys[i], this[ _keys[i] ], this[ _keys[i] ]] );

                        if( cbReturn === false )
                            break;
                        else if( cbReturn != undefined )
                            this[ _keys[i] ] = cbReturn;
                    }
                } catch(e) {
                    throw e;
                }
            }

            return this;
        };

// Array.pushSetter='value' => Array.push( 'value' )
    if(typeof Array.prototype.pushSetter !== 'function')
        Object.defineProperty( Array.prototype, 'pushSetter', { set: function(v) { return this.push(v); }, configurable: false} );

// Object.getSize => size of object
    if(typeof Object.prototype.getSize !== 'function')
        Object.prototype.getSize = function( o ) { o = o || this;
            return _z.size(o);
        };

// Object.getType => type of object lowerCase
    if(typeof Object.prototype.getType !== 'function')
        Object.prototype.getType = function( toLowerCase ) { toLowerCase = toLowerCase || arguments.length ? false : true;
            if(this instanceof _z) return "_z";
            else if(this == _z) return "underz";

            return Object.prototype.toString.call( this ).replace("[object ", "").replace("]", "").trim()[toLowerCase ? "toLowerCase" : "trim"]();
        };

// Object.isType => true|false check object type
    if(typeof Object.prototype.isType !== 'function')
        Object.prototype.isType = function( check ) {
            check = ( arguments.length == 1 ) ? String(check).toLowerCase() :  -1;
            return this.getType()==check;
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

            if( keyUnique === null )
                return [...new Set(this)];

            var u = {}, a = [];
            for(var i = 0, l = this.length; i < l; ++i){
                var currentKeyElement = this[i];
                currentKey = this[i][keyUnique];

                if( u.hasOwnProperty(currentKey) ) continue;

                a.push(currentKeyElement);
                u[currentKey] = 1;
            }
            return a;
        };

// Array.add( ...ARRAY ) = push all the arguments
    if(typeof Array.prototype.add !== 'function') {
        Array.prototype.add = function() {
            var arr = _z.Array(arguments) || [];

            if( _z.isFunction(this.push) )
                return this.push.apply(this, arr);
            else
                return _z.arrayAppend(this, ...arr);
        };
    }

// Array.inArray(needle, haystack) = index OR -1 if not found
    if(typeof Array.prototype.inArray !== 'function')
        Array.prototype.inArray = function(needle, haystack) {
            var haystack = haystack || this;
            if( !_z.isArray(haystack) ) return -1;

            for(var i = 0, length = haystack.length; i < length; i++)
                if(haystack[i] == needle)
                    return haystack.indexOf(needle) || 0;

            return -1;
        };

// Array.remove(from, to) = remove vars by index or value
    if(typeof Array.prototype.remove !== 'function')
        Array.prototype.remove = function(from, to) {
            var args = arguments;
            if( args.length > 0 )
                from = typeof(from)==typeof(7) ? from : this.indexOf( from );

            if( args.length > 1 )
                to = typeof(to)==typeof(6) ? to : this.indexOf( to );

            from = (from === -1 && args[0] !== -1) ? false : from;
            to = (to === -1 && args[1] !== -1) ? false : to;
            if( (!!!from && typeof(from)!=typeof(4)) && (!!!to && typeof(to)!=typeof(5)) )
                return this;

            // Array Remove - By John Resig (MIT Licensed)
            var rest = this.slice((to || from) + 1 || this.length);
            this.length = from < 0 ? this.length + from : from;

            return this.push.apply(this, rest);
        };

// Array Array.removeAll(val) = remove vars by value
    if(typeof Array.prototype.removeAll !== 'function')
        Array.prototype.removeAll = function(val) {
            if( this.indexOf(val) === -1 )
                return this;

            while( this.indexOf(val) !== -1 && this.remove(val));

            return this;
        };

// String String.replaceArray(Array needle, Array haystack)
    if(typeof String.prototype.replaceArray !== 'function')
        String.prototype.replaceArray = function(find, replace) {
            var replaceString = this;
            find = (find&&(find).isType("array")) ? find : [find] || [];
            replace = (replace&&(replace).isType("array")) ? replace : [replace] || [];

            for (var i = 0, fL = find.length; i < fL; i++)
                replaceString = replaceString.replace(find[i], (replace&&(replace).isType("array")) ? replace[i]||"" : replace);

            return replaceString;
        };

// String String.replaceAll(String needle, String haystack)
    if(typeof String.prototype.replaceAll !== 'function')
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            search = (search&&(search).isType("array")) ? search : [search] || [];
            replacement = (replacement&&(replacement).isType("array")) ? replacement : [replacement] || [];

            if(search.length > 1) {
                if( replacement.length < search.length )
                    replacement.add( ...Array.from({length: search.length-replacement.length}, () => "") );
                for (var i = 0, fL = search.length; i < fL; i++)
                    target = target.split(search[i]).join((replacement&&(replacement).isType("array")) ? replacement[i] : replacement);
                return target;
            }

            search = search[0];
            replacement = replacement.length ? replacement[0] : "";
            replacement = (replacement===undefined || replacement===null) ? "" : replacement;
            return target.split(search).join(replacement);
        };

// RegExp.regexes = Regexes source
    if(typeof RegExp.regexes !== 'object') {
        RegExp.regexes = {
            // notInQuote: /(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$)/,
            notInQuote: /(?=(?:[^"\\]*(?:\\.|"(?:[^"\\]*\\.)*[^"\\]*"))*[^"]*$)/,
            space: / +?|\t/,
            CSSRole: /((\s*?@media[\s\S]*?){([\s\S]*?)}\s*?})|(([\s\S]*?){([\s\S]*?)})/,
            CSSPropValue: /([a-zA-Z0-9\-\_]*)\s*:\s*(.*)\;/,
        };
    }

// RegExp.mutli(RegExp, RegExp, ...RegExp) = multi RegExp
    if(typeof RegExp.mutli !== 'function')
        RegExp.mutli = function mutli(...regexes) {
            return new RegExp('(' + regexes.map(r => r.source).join(')|(') + ')');
        };

// RegExp.setFlags(...flags) = add flags to the regex
    if(typeof RegExp.prototype.setFlags !== 'function')
        RegExp.prototype.setFlags = function setFlags(...flags) {
            return new RegExp(this.source, flags.join(''));
        };

// is it real document
if( !("isdocument" in document) )
    document.isdocument = true;

// variables
var
    // window - private var
    window = window || this,

    // document - private var
    doc = window.document || this.document || document || this,

    // empty function
    emptyFunction = new Function(" "),

    // function return true
    trueFunction = ()=>true,

    // function return false
    falseFunction = ()=>false,

    // read HTMLCollection
    HTMLCollection = !window['HTMLCollection'] ?  emptyFunction : window['HTMLCollection'],

    // global variable - public var for private use in window.gVar
    gVar = window.gVar || (window.gVar = gVar = {}),

    // global jQuery - private var
    globaljQuery = window["jQuery"] || new Function("return false"),

    // engine version - public var in _z.$.underZ, _z.$.newSelector.proto.underZNS
    version = '1.0.1',

    // prototypes of objects - public var in _z.privates.protos
    protos = {
        object: "Object" in window ? Object.prototype : ()=>{},
        element: "Element" in window ? Element.prototype : ()=>{},
        array: "Array" in window ? Array.prototype : ()=>{},
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
        return Object.prototype.hasOwnProperty.call(
            (arguments.length===1 ? this : obj),
            (arguments.length===1 ? obj : val)
        );
    },

    // `val` in `obj` - public function in _z.hasVar( Object, var), _z(Object).hasVar(var) = true | false
    hasVar = function hasVar( obj, val ) {
        try {
            return val in obj;
        } catch (e) {
            return false;
        }
    },

    // all `val` in `obj` - function in fns.getProtos( Object ), hooked to Objects: Object.getProtos()
    getProtos = Object.getPrototypeOf,

    // isset `val` - public function in _z.isset(var) = true|false
    isset = function isset( val ) {
        if( arguments.length > 1 )
            for(var i=0, i2=arguments.length; i<i2; i++ )
                if( !!!isset(arguments[i]) ) return false;

        return val !== void 0 || typeof(val) !== 'undefined';
    },

    // trim prototype - public function in _z.trim( String ) = trimmed String
    triming = (String.prototype.trim&&String.prototype.trim || function trimString(str) {
        return (str||this).replace(/^\s+/, '').replace(/\s+$/, '');
    }),

    // type of `val` as string toLowerCase
    TOV = function typeOfVar( val ) {
        return protos.object.toString.call( val ).replaceAll( '[object ', '').replaceAll( ']', '').trim();
    },

    typeOfVar = function type( val ) { return TOV( val ).toLowerCase(); },

    // to avoid calling twice typeOfVar
    varsType = {
        "n": "number",
        "s": "string",
        "a": "array",
        "o": "object",
        "f": "function",
        "b": "boolean",
    },

    // toLowerCase
    toLC = function( $var, $reDefine ) {
        if( typeOfVar($var)==varsType.a ) {
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
        if( typeOfVar($var)==varsType.a ) {
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
        if( typeOfVar( obj ) == varsType.f ) {
            context = cb;
            cb = obj;
            obj = this['element']&&this.element() || [];
        }

        obj = obj || false;
        if( !!!obj || !!!cb || typeOfVar( cb ) != varsType.f )
            return false;

        obj = is_z( obj ) ? obj.element() : obj;
        if( typeof stopLoopinException == "undefined" ) {
            var stopLoopinException = new Error("stopLoopinException");
        }

        var returns =
            (
                (typeOfVar( obj )==varsType.a&&[])||
                (typeOfVar( obj )==varsType.o&&{})||
                (_z['createAs']&&_z.createAs( obj ))
            )||{};

        try {
            var _keys = Object.keys( obj );

            for( var i = 0, l = _keys.length; i < l ; i++ ) {
                var key = _keys[ i ];
                var cbReturn = cb.apply(context||obj, [ key, obj[ key ], obj]);

                if( !!!cbReturn && cbReturn != undefined )
                    throw stopLoopinException;
                else if( cbReturn != undefined )
                    returns[ key ] = cbReturn;
                else
                    returns[ key ] = obj[ key ];
            }
        } catch(e) {
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
            if( typeOfVar(endTo)!=varsType.n )
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

        if( isset(callback) && !_z.isFunction(callback) ) {
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

        if( isset(array) ) array = _z( array ).element();

        callback = _z.isFunction(callback)&&callback || function( x ) { return x; };
        var result = protos.array.filter.apply( array, [callback] ) || array;

        if( filterElements && is_z(this) ) {
            var newInstance = this.newSelector( result );
            newInstance.args = [ array ];
            newInstance.selector = "";

            return newInstance;
        } else return _z( result );
    },

    // values of all CSS properties of an element
    compStyle = (window.getComputedStyle || falseFunction),

    // clone object
    cloneObj = function cloneObj( obj ) {
        try {
            var copy = Object.create( getProtos( obj ) ),
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
        };


    // all registeredEvents
var events = {
        // addEventListener
        register: function eventListenerHandler( data ) {
            if( typeOfVar(data)!=varsType.o || !data['eventName'] || !data['element']) return false;

            var target = data['element'],
                eventName;
            var listenerMethod = (eventName = data['eventName'])&&target.addEventListener || (eventName = 'on' + data['eventName'])&&target.attachEvent || (eventName = data['eventName'])&&fns.ef;
            var removeMethod = target.removeEventListener || target.detachEvent || fns.ef;

            var registerData = {
                element: target||false,
                eventName: data['eventName']||false,
                eventNameMethod: eventName,
                qselector: data['qselector']||"",
                alias: data['alias']||[],
                proxyCallback: data['proxyCallback']||data['callback']||data['realcallback']||false,
                realcallback: data['callback']||data['realcallback']||false
            };

            var arg = [ eventName, registerData['proxyCallback']||registerData['realcallback'] ];
            var deArg = Array.from(arg);
            registerData['remover'] = ()=>{
                removeMethod.apply&&removeMethod.apply(target, deArg );
                return true;
            };

            if( target.addEventListener )
                arg.push( false );

            events.add(registerData);
            listenerMethod.apply&&listenerMethod.apply(target, arg );
            return true;
        },
        // removeEventListener
        unRegister: function eventUnListenerHandler( data ) {
            if (typeOfVar(data) != varsType.o) return false;
            var rEL = events.find( data );

            if (!rEL)
                return false;
            else if( rEL.length )
                _z.for(rEL, function(ELK, ELV){
                    ELV['remover']&&_z.isFunction(ELV['remover'])&&ELV['remover']();
                });
            else if( rEL['remover'] )
                rEL['remover']&&_z.isFunction(rEL['remover'])&&rEL['remover']();

            return true;
        },
        data: {},
        find: function findRegisteredEvents( fn ){
            var ev = this.data,
                $return = [];

            var dataID = fn['dataID'] || false;

            if ( dataID && !ev[dataID] ) {
                return false;
            } else
                fn = dataID&&ev[dataID]  ? [ ev[dataID] ] : fn;

            _z.for( ev, function( k, v ) {
                if( _z.isFunction(fn) && v['realcallback'] && v['realcallback']==fn)
                    $return.push( v );
                else if( _z.isObject( fn ) ) {
                    var $return2={};
                    _z.for( fn, function( $k, $v ) {
                        if (v[$k] != $v && $k != "alias")
                            return $return2 = false, false;
                        else if ($k == "alias" && _z.size($v) > 0) {
                            $v = !_z.isArray($v) ? $v.split(".") : $v;
                            var rAlies = v["alias"] || [];
                            if( _z.size(rAlies) > 0  ) {
                                var match = [];
                                _z.for($v, function (vAI, vAV) {
                                    if(rAlies.includes(vAV))
                                        match.push(vAV);
                                    else
                                        return false;
                                });
                                if(match.length != $v.length) match = [];
                            }
                            else return $return2 = false, false;

                            $return2 = !!match.length;
                            return false;
                        } else
                            $return2[ $k ] = $v;
                    });
                    if( $return2 !== false ) $return.push( v );
                }
            });

            return $return || false;
        },
        add: function addRegisteredEvents( data ) {
            var data = arguments.length==1&&typeOfVar(data)==varsType.o ? data : { name: data };
            var _data = {
                element: data['element'] || false,
                eventName: data['eventName'] || data['name'] || false,
                qselector: data['qselector'] || "",
                alias: data['alias'] || [],
                proxyCallback: data['proxyCallback'] || data['realcallback'] || false,
                realcallback: data['callback'] || data['realcallback'] || false
            };
            _data['eventNameMethod'] = data['eventNameMethod'] || _data['eventName'] || false;
            var remover = data['remover'] || fn.ef;

            var fName = 'cb'+fns.time();
            while( isset(this.data[ fName ]) )
                fName = 'cb'+fns.time()+'_'+ _z.size( this.data );

            _data['remover'] = function(){
                remover();
                delete events.data[ fName ];
            };

            this.data[ fName ] = _data;

            return this.data[ fName ]['realcallback'] || true;
        },
        getEventName: function eventNameWithOutAlias( eventName ) {
            if( !eventName || !_z.isString(eventName) ) return false;

            var alias = (eventName = eventName.split(".")).splice(1);
            return eventName[0] || "";
        },
        getAlias: function eventNameAlias( eventName ) {
            if( !eventName || !_z.isString(eventName) ) return false;

            var alias = (eventName = eventName.split(".")).splice(1);
            return alias || [];
        },
        dispatch: function dispatchEvent( event, data ) {
            if( !event || !(e=this)) return false;

            if( e instanceof EventTarget )
                return e.dispatchEvent(event, true);
            else {
                var _elmentWithNS = events.find( data||{
                                                    element: e,
                                                    eventName: event.type||false,
                                                });

                if( _z.size(_elmentWithNS) == 0 ) return false;
                else {
                    _z.for(_elmentWithNS, function (_Index, _e) {

                        var eventName = events.getEventName( _e["eventName"] );
                        var cb = (_e["proxyCallback"]||_e["realcallback"]||fns.ef);
                        cb['apply']&&cb.apply(_e["element"], [event, _e["alias"]]);
                    });
                }
            }
            return true;
        },
        createEventAnddispatch: function createEventAnddispatch( e, eventName ) {
            try {
                // if( hasVar(e, eventName) && _z.isFunction(e[eventName]) )
                //     e[eventName](event, alias);
                // else
                // todo: must try to call element.eventname first
                //     events.dispatch.apply(e, [event, { element: e, eventName: eventName, alias: alias }]);

                var alias = events.getAlias(eventName);
                var aliasQry =  (alias.length ? "." + alias.join(".") : "");
                eventName = events.getEventName(eventName);


                var _doc = e.ownerDocument ? e.ownerDocument : e;
                if (e.dispatchEvent) {
                    var event = _doc.createEvent( ["click", "mousedown", "mouseup"].inArray(eventName)>-1 ? "MouseEvents" : "HTMLEvents" );
                    event.initEvent(eventName, true, true); // All events created as bubbling and cancelable.

                    event.synthetic = true; // allow detection of synthetic events
                    // The second parameter says go ahead with the default action
                    // e.dispatchEvent(event, true);
                    return events.dispatch.apply(e, [event, { element: e, eventName: eventName, alias: alias }]);
                } else  if (e.fireEvent) {
                    // IE-old school style, you can drop this if you don't need to support IE8 and lower
                    var event = _doc.createEventObject();
                    event.synthetic = true; // allow detection of synthetic events
                    return e.fireEvent("on" + eventName, event);
                } else if( e[eventName] && _z.isFunction(e[eventName]) )
                    return e[eventName]();

            } catch (er) {
                console.error(er);
            }
        }
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

            if( arguments.length==1 || $elm==undefined )
                $elm = elm,
                    elm = this;

            var $return = [];
            if( arguments.length )  {
                $elm = _z( typeOfVar($elm)===varsType.s ? [ $elm ] : $elm );

                elmFunc.elmLoop( elm, function( e ) {
                    var _e = e;
                    e = e==doc ? doc.documentElement : e;
                    var $currentElement = [];
                    elmFunc.elmLoop( _z( $elm ), function( e2 ) {
                        e2 = e2==doc ? doc.documentElement : e2;

                        if( !_z.isDOM( e2 ) && toLC(typeOfVar( e2 ))==varsType.s )
                            $currentElement.push( ( elmFunc.matches( e, e2 )!==$not && !$return.includes(_e) ) ? _e : false );
                        else
                            $currentElement.push( ( e['isEqualNode'] && e['isEqualNode']( e2 )!==$not && !$return.includes(_e) ) ? _e : false );

                    }, (x)=>(_z(x).isDOMElement( true )||_z.isString(x)||x==doc));

                    if( filterArray( $currentElement ).length === $elm.length ) $return.push( _e );
                }, (x)=>(_z(x).isDOMElement( true )||_z.isString(x)||x==doc));

                $return = filterArray( $return );
            }

            if( is_z(this) ) {
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

            } else if( typeof css == "string" ) {
                css = css.split("; ");
                for( var i in css )
                    if( css[i] && typeof css[i]!='object' && typeof css[i]!='function' )
                        try {
                            var l = css[i].split(": ");
                            if( !!l[1] || l[1] == "" )
                                s[ l[0].toLowerCase() ] = ( l[1] );
                        } catch(e) {
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
            if( elm.length ) {
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
            }

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
                if( !e['insertAdjacentElement'] ) return;

                if( !_z.isString( $val ) )
                    $val.for( function( key, value ) {
                        if( _z.isDOM( value ) ) e['insertAdjacentElement']( $q, value );
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
                opacity = false;

            if( $q == 'To' ) {
                if( _z.isNumber(callback) ) {
                    opacity = callback > 1 ? 1 : (callback < 0 ? 0 : callback);
                    callback = false;
                }

                if( arguments.length == 4 && _z.isFunction(arguments[3]) ) callback = arguments[3];

                if( _z.isNumber(opacity) ) $q = elm.css( 'opacity' ) > opacity ? "Out" : "In";
            }

            if( _z.eff === false ) return this;

            if( opacity === false )
                elm.css( 'opacity', elmFunc.fadeOpacityValue[ $q ] );

            var tick = function() {
                // check if other fade on this element
                if( (_z.size( gVar[ 'fade' ] ) &&
                    gVar[ 'fade' ][ 'tick' ] != tick &&
                    gVar[ 'fade' ][ 'elm' ] == tick.elm) || _z.eff === false
                ) return false;

                var fstElement = tick.elm.element(0);

                tick.opacity = tick.q=='In'?
                    ( +(tick.opacity)+(tick.lastVal) ) :
                    ( +(tick.opacity)-(tick.lastVal) );
                tick.elm.css( 'opacity', tick.opacity);
                tick.last = +new Date();

                var doFade = tick.fadeTo!==false ?
                    ((tick.q=='In' && +(_z(fstElement).css( 'opacity' )) < tick.fadeTo) ||
                        (tick.q=='Out' && +(_z(fstElement).css( 'opacity' )) > tick.fadeTo))
                    :
                    ((tick.q=='In' && +(_z(fstElement).css( 'opacity' )) < 1) ||
                        (tick.q=='Out' && +(_z(fstElement).css( 'opacity' )) > 0));

                if(
                    _z.eff !== false && gVar[ 'fadeStatus' ] !== false &&
                    doFade
                ) {
                    setTimeout(function(){
                        (gVar['fade'].aftimeOut=( window.requestAnimationFrame && requestAnimationFrame( tick ) )) ||
                        (gVar['fade'].timeOut=setTimeout(tick, tick.speed))
                    }, 16);
                } else {
                    if( tick.fadeTo===false )
                        elm.css( 'opacity', +!elmFunc.fadeOpacityValue[ tick.q ] );
                    gVar[ 'fade' ] = {};

                    if( tick.q == 'Out' && tick.fadeTo===false ) tick.elm.hide();

                    if( _z.isFunction(tick.callback) )
                        tick.callback.call(elm, elm);
                }
            };

            tick.q = $q;
            tick.last = +new Date();
            tick.elm = elm;
            tick.speed = parseInt(speed)||1000;
            tick.lastVal = ((1/ ((tick.speed/700)||1) )/10)||0.25;
            tick.opacity = opacity === false ? elmFunc.fadeOpacityValue[ $q ] : Number(elm.css( 'opacity' ));
            tick.fadeTo = opacity !== false ? opacity : false;
            tick.callback = _z.isFunction(callback) ? callback : false;

            // check if other fade on this element
            if( _z.eff === false || gVar[ 'fadeStatus' ] === false || (
                isset(gVar[ 'fade' ]) && _z.size(gVar[ 'fade' ]) &&
                gVar[ 'fade' ][ 'tick' ] != tick &&
                gVar[ 'fade' ][ 'elm' ] == tick.elm )
            ) {
                if( gVar[ 'fade' ][ 'aftimeOut' ] )
                    cancelAnimationFrame( gVar[ 'fade' ][ 'aftimeOut' ] );
                else if( gVar[ 'fade' ][ 'timeOut' ] )
                    clearTimeout( gVar[ 'fade' ][ 'timeOut' ] );
            }

            gVar[ 'fade' ] = gVar[ 'fade' ] || {};
            gVar[ 'fade' ][ 'tick' ] = tick;
            gVar[ 'fade' ][ 'elm' ] = tick.elm;

            if( $q == 'In' && opacity === false ) elm.show();

            tick();
            return this;
        },

        // opacity default values
        fadeOpacityValue: { In:0, Out:1 },

    },
    // parse functions
    parssing = {
        // parseHTML
        html: function() { return parssing.parseHTML.apply(parssing, arguments); },
        parseHTML: function parseHTML( str ) {
            try{
                if( doc.isdocument !== true ) return;

                var tmp = document.implementation.createHTMLDocument();
                tmp.body.innerHTML = str;
                return tmp.body.children;
            } catch( _err ){ return console.error( "Parse Error[parseHTML]:", _err), false; }
        },
        // text to html node list
        parseHTMLNode: function parseHTMLNode( str ) {
            try{
                if( doc.isdocument !== true ) return;

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
                    if( window.DOMParser ) {
                        parser = new DOMParser();
                        xml = parser.parseFromString( str, "text/xml" );
                    } else // Internet Explorer
                    {
                        xml = new ActiveXObject("Microsoft.XMLDOM");
                        xml.async = false;
                        xml.loadXML( str );
                    }
                } catch( e ) { xml = null; }

                if( !!!xml )
                    return fns.t.e( "Invalid XML: " + str ), null;

                return xml;
            } catch( e ) { fns.t.e( "Parse Error:"+ e ); }
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
                } catch( e ) { return fns.t.e( "error while parssing: " + e ), null; }

                return xml;
            } catch( e ) { fns.t.e( "Parse Error:"+ e ); }
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

    // functions ( shortcuts )
    fns = {
        // this for programming test
        registeredEvents: events,
        propertyGetter: function( cb, args ) {
            return { get () { return cb( ...(args||[]) ); } };
        },
        ef: emptyFunction,
        inputbox: function inputbox() { return prompt.apply(window, arguments) || undefined; },
        arg: function consoleArguments() { console.log.apply(console, arguments) },
        trc: function consoleTrace() { console.trace.apply(console, arguments) },
        logthis: function consoleThis() { console.log.apply(console, this) },
        log: function consoleThisAndArguments() { console.log.apply(console, [this, arguments]) },
        wrn: function consoleWarn() { console.warn.apply(console, arguments) },
        dir: function consoleDir() { console.dir.apply(console, arguments) },
        info: function consoleDir() { console.info.apply(console, arguments) },
        confirm: function yesOrNo() {
            this.confirm.off = !!this.confirm.off;
            if( this.confirm.off )
                return true;

            return confirm.apply(window, arguments);
        },
        alert: new Function("alert.apply(null, arguments)"),
        'true': trueFunction,
        'false': falseFunction,

        toLowerCase: toLC,
        toUpperCase: toUC,

        objProp: function objProp( obj, ps ) {
            ps = ps===undefined ? [] : ps;
            var newProping = extendFunction({}, protos.objectProp);
            newProping['enumerable'] = ps['e']!==undefined ? !!ps['e'] : true;
            newProping['configurable'] = ps['c']!==undefined ? !!ps['c'] : true;
            newProping['writable'] = ps['w']!==undefined ? !!ps['w'] : true;
            newProping['add'] = ps['add']!==undefined && typeOfVar( ps['add'] )==varsType.a ? ps['add'] : false;
            newProping['skip'] = ps['skip']!==undefined ? !!ps['skip'] : false;

            if( newProping['add'] )
                foreach(newProping['add'], ( i, p )=>{ p&&Object.defineProperty( obj, p, newProping); } );

            if( !!!newProping['skip'] )
                foreach(obj, (p)=>{ Object.defineProperty( obj, p, newProping); } );

            return obj;
        },

        isSetisFunc: function isSetAndIsFunction( v, k ) { k = k || false;
            return !!( v && !!( k!==false ? v[k] : v ) && _z.isFunction( ( k!==false ? v[k] : v ) ) );
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

        // current timestamp
        time: function time(c) {
            c = c || false;
            var t = new Date();
            return c===false ? t.getTime() : (c == 's' ? t.getSeconds() : (c == 'm' ? t.getMinutes() : (c == 'h' ? t.getHours() : t)));
        },

        // eval
        eval: ( window.execScript || function _zEval( code ) { window[ "eval" ].call( window, code ); }),
        tryEval: function tryEval( code ) {
            var returns="";
            code = code.replace("/\\/", "/\\/\\");
            if( triming.call( code ) )
                try{ returns = fns.eval( triming.call( code ) ) || ""; } catch (e1) {
                    try { returns = fns.eval( '('+triming.call( code )+')' ) || ""; } catch(e2) {
                        try { returns = (new Function( triming.call( code ) ))() || ""; } catch(e3) { console.error(e3);returns=""; }
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
                anyQuery['arguments'] = anyQuery['passed'] && (o == 'arguments' && this['o']['arg'] || typeOfVar(o)==varsType.n&&this['o']['arg'][ o ]) || false;
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

            str = false;
            var $return = [];

            elm = _z(elm);
        } catch(e) {
            return elm.info.selector;
        }

        if( elm && elm.length ) {
            elmFunc.elmLoop( elm, function( e ) {
                if( e && e[selType] ) {
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
                data: {}
            };
            return 'UnderZ_' + newID + '_' + newStamp + '_' + _newID;
        };
    new_zID.data = [];
    new_zID.edata = [];

    // register global variables
    window.fns = window.fns || fns;
    window.Math.__random = isset(window.Math['__random']) ? window.Math['__random'].bindSelf() : window.Math['random'].bindSelf();
    window.Math.random = function() { return arguments.length ? _z.rnd( ...arguments ) : window.Math['__random'](); };
    // register global variables

    // Promiser module like promise
    var Promiser = function Promiser( callback ) {
        if( typeof(callback)!==typeof(this.push) )
            return fns.t.t("Promiser: argument is not Function!");

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
                while( f=this.resolving.error.shift() ) {
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
                while( f=this.resolving.success.shift() ) {
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
            return (s===false||s)&&(this.relayFns.success=s),
            (e===false||e)&&(this.relayFns.error=e), this;
        },
        relays: function( type, result ) {
            if( type&&this.relayFns[type] && (this.relayFns[type]).isType("function") &&result )
                this.relayFns[type](result);
            else if( type&&this.relayFns[type]&& (this.relayFns[type]).isType("function") && !!!result&&this.resolving[type]) {
                result = Array.from(this.resolving[type]);
                var r;
                while( r=result.shift() )
                    this.relays(type, r);
            }

        },

        by: 'hlaCk For UnderZ Engine 2017',
        length: 0,
        relayFns: [],
        push: [].push,
        sort: [].sort,
        splice: [].splice
    };

    var selectorPatterns = {
        // selector get indexed elements
        indexed: /\s*?(^|\#|\s|!\.|[PATTREN]?)\b(\w+)\b(\[)\*(\])/,
        indexedAttr: /\b(\w+)\b[\=]{2}/,
        index: [ "(?:(.*?)\\:{2}([PATTREN])|.+)" ],
        indexFullPattrenTpl: "(.*?)\\:{2}([PATTREN])",
        idx: {
            // selector get first element
            first: "first\\b",
            // last
            last: "last\\b",
        },
    };

    // css selector pattrens prepare
    Object.keys( selectorPatterns.idx ).forEach(function( s ) { selectorPatterns.index.push( selectorPatterns.idx[s] ); });
    selectorPatterns.index =
        selectorPatterns.indexBackup =
            selectorPatterns.index.length > 2 ?
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

        if( typeOfVar( args[0] ) === varsType.b ) {
            deep = args[ idx++ ];
            extended = args[ idx ] || extended;
        }

        // extend _z when use _z()
        if( length === (idx + 1) )
            extended = this;

        // extend as ArrayLike
        if( typeOfVar( args[0] )==varsType.a && Object.keys(extended).length === 0)
            extended = [];

        // Merge the object into the extended object
        var merge = function(obj) {
            for( var prop in obj ) {
                if(
                    (hasProp( obj, prop ) && isDeclare( prop, obj )) ||
                    obj[ prop ] === extended
                ) continue;

                if( hasProp( obj, prop ) )//&& !(obj[prop] && extended[prop] && obj[prop] === extended[prop]))
                // If deep merge and property is an object, merge properties
                    if( deep && typeOfVar( obj[prop] ) === varsType.o )
                        extended[prop] = extend( true, extended[ prop ], obj[ prop ] );
                    else
                        extended[prop] = obj[prop];
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
        $this = (this && this.window === this) ? _z : ( !this['window'] ? _z : this );

        if( arguments.length == 1 && arguments[0] instanceof _z ) return arguments[0];

        // check if the argument is function to try to execute it
        if( arguments[0] && _z.isFunction(arguments[0]) && !is_z(arguments[0]) ) {
            if( $this.execFunctions || $this.$.execFunctions || false ) {
                if( _z.document.isReady() )
                    return arguments[0].call(doc, arguments[0]);
                else
                    return _z.ready(arguments[0]);
            } else arguments[0] = [ arguments[0] ];
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
    _z.mix = mix;
    // engine id
    _z._counter = 0;
    // functions guid
    _z._fguid = 0;
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
        'Boolean',
        'Null',
        'Undefined'
    ].forEach(function( name ) {
        // do not override// if( isset( _z['is' + name] ) && !override )// return;
        if( !isset( _z['is' + name] ) )
            _z['is' + name] = function(obj) {
                return typeOfVar( obj ) == toLC( name );
            };
    });

    // do not return if NaN #fix
    _z.isNumber = function isNumber(n) { return typeOfVar( n ) == varsType.n && !isNaN(n); };

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
                !( _z.isString( arguments[0] ) || _z.isNumber( arguments[0] ) ) &&
                arguments[0] || false;

            // context
            if( !!!isObj ) {
                // DOM
                var head = arguments[1]&&
                    (_z.isDOM( arguments[1] ) || _z.is_z( arguments[1] )) &&
                    arguments[1] || false;
                // nodeList
                head = head || _z.type( arguments[1] ) == 'NodeList' &&
                    _z.toArray( arguments[1] ) || false;
                // string
                head = head || _z.isString( arguments[1] ) &&
                    _z( arguments[1] ) ||
                    doc;
            } else
                var head;

            // search by underZ pattrens
            if( isset(arguments[0]) && _z.isString( arguments[0] ) && $elements===false ) {
                if(
                    selectorPatterns.index &&
                    (arguments[0].match(new RegExp(selectorPatterns.index))||[]).length > 0 &&
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
            if( isset(arguments[0]) && head && head != doc && _z.isString( arguments[0] ) ) {
                var qSelector = arguments[0];
                $elements = [];
                _z( head ).for(function( k, v, _all ) {
                    if( _z.isDOM( v ) || _z.type( v ) != 'NodeList' )
                        v = _z.toNodeList( v )[0];

                    if( v && v['querySelectorAll'] ) {
                        v = v.querySelectorAll( qSelector );
                        if( v.length ) $elements.add( ..._z( v ).element() );
                    }
                });
                $elements =$elements.unique();
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
                    if( isset(arguments[0]) && _z.isTypes( 'HTMLDOM', arguments[0] ) && arguments[0].length ) {
                        $elements = parssing.parseHTML( arguments[0] );
                        // not html code
                        if( !!!$elements.length )
                            fns.t.generate( e );
                        else { // html code
                            head = document;
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

            if( arguments[0] && _z.isString( arguments[0] ) )
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

            this.filter(( v, k ) => {
                if( k > a.length - 1 ) {
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
                anElements = _z(anElements).toArray();
            } catch ( err ) { }
            // console.log(anElements);
            ( $anElements=this.element() ).push( ...( typeOfVar( anElements )==varsType.a ? anElements : [anElements] ) );
            return this.newSelector( $anElements );
        },

        // add elements to this object, return same underz
        addThis: function addThisElements( anElements ) {
            try {
                (aE=toArray( anElements )) && ( anElements = aE);
            } catch ( err ) { }
            ( $anElements=this.element() ).push( ...( typeOfVar( anElements )==varsType.a ? anElements : [anElements] ) );

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
            return this.request( ()=> new Notifications( ...(arguments||[]) ) );

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
            body: "By M.F.Al-Safadi, UnderZ Library.",

            icon : "favicon.ico",
            image : "favicon.ico",
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

                if( isset( this['events'][ eName ] ) && (this['events'][ eName ].length) ) {
                    _z.for(this['events'][ eName ], function( fIdx, fName ) {
                        var ELArgs = [ (eName || 'click').replace(/^on/, ''), fName ],
                            addEL;
                        if( n.addEventListener ) {
                            ELArgs.push( false );
                            addEL = n.addEventListener;
                        } else addEL = n.detachEvent;

                        if( fns.isSetisFunc( fName ) )
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

    // [ arg1, args... ].mix => _z.mix( arg1, ...args )
    Object.defineProperty( Array.prototype, 'mix', {
        get: function() {
            return this.length > 1 ? mix( this[0], ...subArray( 1, this ) ) : this[0];
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

            if( arguments.length === 1 || ( !!!attrName && elm ) ) {
                attrName = elm;
                elm = this;
            }

            if( _z.isArray( attrName ) && attrName.length ) {
                var $return = true;
                _z(attrName).each(function() {
                    if( $return === false ) return;

                    $return = _z( elm ).hasAttr( this );
                });

                return $return;
            }

            attrName = _z.trim( attrName );
            if( !!!attrName ) return false;

            if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length ) return false;
            else if( !_z.is_z( elm ) ) elm = _z( elm );

            if( elm.len || elm.length ) {
                var $return = false;
                ( _z.is_z( elm ) ? elm : _z( elm ) ).each(function() {
                    if( $return !== false ) return;

                    if( _z.isDOM( this ) ) $return = this.hasAttribute( attrName );
                });

                return $return;
            }

            return false;
        },

        // remove attribute from element
        remAttr: function removeAttr( elm, attrName ) {
            if( arguments.length === 1 || ( !!!attrName && elm ) ) {
                attrName = elm;
                elm = this;
            }

            if( _z.isArray( attrName ) && attrName.length ) {
                _z( attrName ).each(function() {
                    _z( elm ).removeAttr( this );
                });

                return this;
            }

            attrName = _z.trim( attrName );
            if( !!!attrName || ( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length ) )
                return this;

            if( !_z.is_z( elm ) ) elm = _z( elm );

            if( elm.len || elm.length ) {
                ( elm ).each(function() {
                    if( _z.isDOM( this ) ) this.removeAttribute( attrName );
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

            var attrValueExist = isset(attrValue);
            // todo: if attrName is null
            attrName = triming.call( attrName );
            isset(attrValue)&&( attrValue = triming.call( attrValue ) );

            if( !!!attrName ) return false;

            if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length ) return false;

            if( !_z.is_z( elm ) ) elm = _z( elm );

            if( elm.len || elm.length ) {
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

                return ( attrValueExist ? this : ( $return.length===1 ? ( $return[0]||"" ) : $return) );
            }

            return attrValueExist ? this  : "";
        },

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
                ) {
                    deleteAttr = ( arguments[0]===true || toLC( arguments[0] ) == 'delete' || toLC( arguments[1] ) == 'delete' );
                    returnAttr = ( arguments[1]===true || toLC( arguments[0] ) == 'return' || toLC( arguments[1] ) == 'return' );
                }
                var _arguments = [];
                _arguments = ( arguments[0]!==true && toLC( arguments[0] ) != 'return' && toLC( arguments[0] ) != 'delete' ) ? [...arguments] : subArray( 1, [...arguments] );

                if( !!!( arguments[1]!==true && toLC( arguments[1] ) != 'return' && toLC( arguments[1] ) != 'delete' ) )
                    _arguments = subArray( 1, _arguments );

                arguments = _arguments;
            }

            if( arguments.length === 1 && (_z.isDOM( arguments[0] ) || _z.is_z( arguments[0] )) ) {
                thisElement = arguments[0];
                arguments = [];
            } else thisElement = this;

            // search for attributes
            if( arguments.length === 1 ) {
                if( arguments[0] && (_z.isTypes("string", arguments[0]) || _z.isArray(arguments[0])) )
                    idxOF = toLC(arguments[0]);

                arguments = [];
            }

            if( arguments.length === 0 ) {
                if(_z.size( thisElement ) === 0) return null;

                var pushIt = _z.size( thisElement ) > 1;
                obj = pushIt ? [] : {};

                if( idxOF&&_z.isArray(idxOF)&&idxOF.length>1 ) {
                    var $__return = {};
                    foreach(idxOF, function(__k, __v) {
                        var $__val = _z(thisElement).attrs( deleteAttr, returnAttr, __v );
                        $__return = _z.extend($__return, $__val );
                    });

                    return $__return;
                }

                _z( thisElement ).each(function() {
                    var $elm = this;
                    var subObj = {};
                    _z.each( _z.toArray( $elm.attributes ), function() {
                        if( idxOF !== "" ) {
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
                            ) {
                                if( pushIt ) subObj[ this.name ] = this.value;
                                else obj[ this.name ] = this.value;
                            } else if(
                                (returnAttr===false && deleteAttr===false) ||
                                (returnAttr===false && deleteAttr===true)
                            )
                                obj = obj;
                        }
                    });

                    if( pushIt ) {
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
            if( arguments.length === 1 || ( !!!className && elm ) ) {
                className = elm;
                elm = this;
            }

            if( _z.isArray( className ) && className.length ) {
                var $return = true;
                _z(className).each(function() {
                    if( $return === false ) return;

                    $return = _z( elm ).hasClass( this );
                });

                return $return;
            }

            className = _z.trim( className );
            if( !!!className ) return false;

            className = ' ' + className + ' ';

            if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length )
                return false;
            else if( !_z.is_z( elm ) )
                elm = _z( elm );


            if( elm.len || elm.length ) {
                var $return = false;
                ( _z.is_z( elm ) ? elm : _z( elm ) ).each(function() {
                    if( $return !== false ) return;

                    if( _z.isDOM( this ) )
                        $return = new RegExp( className ).test(' ' + this.className + ' ');
                });

                return $return;
            }

            return false;
        },

        // add class to element
        addClass: function addClass( elm, className ) {
            if( arguments.length === 1 || ( !!!className && elm ) ) {
                className = elm;
                elm = this;
            }

            if( _z.isArray( className ) && className.length ) {
                _z(className).each(function() {
                    _z( elm ).addClass( this );
                });

                return this;
            }

            className = _z.trim( className );
            if( !!!className ) return this;

            if( !_z.isDOM( elm ) && !_z.is_z( elm ) && !elm.length )
                return this;
            else if( !_z.is_z( elm ) )
                elm = _z( elm );

            if( elm.len || elm.length ) {
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
            if( arguments.length === 1 || ( !!!className && elm ) ) {
                className = elm;
                elm = this;
            }

            if( _z.isArray( className ) && className.length ) {
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

            if( elm.len || elm.length ) {
                ( _z.is_z( elm ) ? elm : _z( elm ) ).each(function() {
                    if( _z.isDOM( this ) ) {
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
            if( arguments.length === 1 || ( !!!className && elm ) ) {
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

            if( elm.len || elm.length ) {
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

            if( elm.len || elm.length ) {
                ( _z.is_z( elm ) ? elm : _z( elm ) ).each(function() {
                    if( _z.isDOM( this ) )
                        $classList.add( ..._z.toArray( this.classList || []) );
                });
            }
            return $classList.unique();
        },

        // css of element
        css: function css( elm, $var, $val ) {
            if( isset(elm) ) {
                if( _z.isDOM(elm) ) elm = _z( elm );

                if( !_z.is_z(elm) ) {
                    if( isset($var) ) $val = $var;

                    $var = elm,
                        elm = this;
                }
            } else elm = this;

            elm = ( _z.is_z( elm ) ? elm :
                ( (_z.isDOM(elm)||_z.isArray( elm )) ? _z(elm) : false ));
            if( elm===false ) return this;

            // get style
            if( $var&&!!!_z.isObject( $var ) ) {
                $var = _z.privates.prepareCSS( _z($var) );
                var $return=[];

                elmFunc.elmLoop( elm, function( e ) {
                    if( isset($val) ) {
                        if( e['style'] )
                            e['style'][ $var ] = _z.isFunction( $val ) ? $val.apply( e, arguments ) : $val;
                    }
                    else
                        $return.push( ( (compStyle(e, null)||e.currentStyle)[ $var ]||"" ) );
                });

                return isset( $val ) ? this : ( elm.length==1 ? ($return[0]||"") : $return );
            } else if( $var&&_z.isObject( $var ) ) {
                elmFunc.elmLoop( elm, function( e, k ) {
                    _z.for( $var, function( $k, $v ) {
                        _z(e).css( $k, $v );
                    });
                });
                return this;
            }

            var $return=[];
            if( elm.length > 1 ) {
                elm.each(function() {
                    $return.add( ..._z.toArray( _z(this).css() ) );
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

                        if( elmFunc.matches( e, rules[r].selectorText ) ) {
                            var pcss1 = elmFunc.prepareCSS( rules[r].style )||{},
                                pcss2 = _z(e).attr('style');
                            pcss2 = pcss2 ? (elmFunc.prepareCSS( pcss2 )||{}) : {};

                            o[ k ] = _z.extend( o[ k ], pcss2, pcss1 );
                        }
                    }, fns.true);
                }
            }

            if($var) {
                elmFunc.elmLoop( elm, function( e, k ) {
                    if( o.length ) {
                        o[ k ]||(o[ k ] = {});

                        if( o[ k ] && ($var in o[ k ]))
                            o[ k ] = o[ k ][$var];
                        else
                            o[ k ] = "";
                    } else
                        o[ k ]={};
                });
            }

            return elm.length==1 ? o[0] : o;
        },

    };
    __zClassFunctions.removeClass = __zClassFunctions.remClass;

    // for _z()
    var __zElementsFunctions = {
        // add last selector elements, elm = filter by selector
        addBack: function addBack( elm ) {
            return this.newSelector( this.add( ...(isset( elm ) ? this.end().whereIs( elm ) : this.end()).element() ) );
        },

        equalsAll: function matchesAllElements( iObj ) {
            var o1 = this.element();
            var o2 = _z( !_z.isFunction(iObj) ? iObj : [iObj] ).element();

            if (o1.length !== o2.length) return false;

            if( _z.isArray(o1) && _z.isArray(o2) ) {
                for( var a=0, aa=o1.length; a<aa; a++)
                    if( o2.inArray(o1[a])==-1 ) return false;

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

            if( !_z.isDOM( elm ) && !elm.len && !elm.length ) return false;

            if( elm.len || elm.length ) {
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

            if( !_z.isDOM( elm ) && !elm.len && !elm.length ) return false;

            if( elm.len || elm.length ) {
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

            if( !_z.isDOM( elm ) && !elm.len && !elm.length ) return this;

            if( elm.len || elm.length ) {
                ( elm.len ? elm : _z(elm) ).each(function() {
                    if( _z.isDOM( this ) ) {
                        var display;
                        if( displayStyle == 'toggle' )
                            display = (compStyle(this, null)||this.currentStyle).display == 'none' ?
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
            var tag = tag || this.element( 0 ).tagName || false ;
            if( !tag )
                return '';
            gVar["defaultDisplayStyleLog"] = gVar["defaultDisplayStyleLog"] || {};
            tag = String( tag ).replace( /^\s+|\s+$/g, '' );

            if( isset( gVar["defaultDisplayStyleLog"][ tag ] ) )
                return gVar["defaultDisplayStyleLog"][ tag ];

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
            var display = (compStyle(testEl, null)||testEl.currentStyle).display
            iframe.parentNode.removeChild(iframe);

            gVar["defaultDisplayStyleLog"][ tag ] = display;
            return display;
        },

        // scroll To element
        scrollTo: function scrollToElement( elm/* , eIdx */ ) {
            if( !isset(elm) && !isset(this['underZ'], this['element']) ) return false;

            var topOfElement,
                $return = false;

            // check if elm is Top
            if( _z.isNumber(elm) ) {
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
                else if(
                    ( arguments.length==0 || ( !isset( elm ) && !_z.isNumber( topOfElement ) ) ) &&
                    scroller && _z.isDOM(scroller) &&
                    _z.isFunction( (scrollIntoView = _z(scroller).prop('scrollIntoView')) )
                ) return scrollIntoView.call( scroller ), _z( scroller );

                var $returnTester = isset(elm) ? elm.rect('top') : 1;
                if( (topOfElement = topOfElement || $returnTester)==$returnTester ) $return = _z( elm.element(0) );

                $returnTester = _z(scroller).rect('top');
                if( (topOfElement = topOfElement || $returnTester)==$returnTester ) $return = _z( _z(scroller).element(0) );

                if( _z.isArray(topOfElement) ) topOfElement = topOfElement[0];

                if( _z.isNumber(topOfElement) ) {
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

                } else {
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

                if( !doExec ) return _z(resp);

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
                self: this,
                last: undefined
            });
            str = tunning.call();

            if( !isset(str) ) return "";

            if( str && !!!str['underZ'] ) str = _z(str);

            if( !str.selector && !str.len ) return "";

            var t = triming,
                trimmedContext = str.selector ? String(str.selector) : false;

            trimmedContext = trimmedContext || str.element( 0 ) || trimmedContext;
            if( !trimmedContext ) return "";

            if( _z.isDOM( trimmedContext ) && trimmedContext['textContent'])
                trimmedContext = trimmedContext.textContent || trimmedContext;

            try {
                if( !trimmedContext.length && t.call( trimmedContext ).length )
                    return trimmedContext = t.call( trimmedContext );
            } catch (e) {

            }

            if( trimmedContext.length ) return t.call( trimmedContext );

            return trimmedContext;
        },

        // Object, Array, String length
        size: function size( obj ) {
            var obj = obj || false;
            if( !!!obj ) return this.length || 0;

            if( _z.is_z( obj ) ) obj = obj.element();

            return Object.keys( obj||{} ).length || 0;
        },

        // new typeof(`obj`), sameValue = new typeof(`obj`)( obj )
        createAs: function createAs( obj, sameValue ) {
            obj = obj || false,
                sameValue = sameValue || false;
            if( !!!obj ) return false;

            try{
                var newObject = eval( _z.type( obj ) );
                if( newObject['constructor'] )
                    if( sameValue )
                        return new newObject( obj );
                    else
                        return new newObject;
            } catch(e) {
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
            if( !isset( _z.cssRole['styleSheet'] ) ) {
                _z.cssRole['styleSheet'] = document.createElement('style');
                document.head.appendChild( _z.cssRole['styleSheet'] );
            }
            if( arguments.length == 0 ) return this;

            var styleSheet = _z.cssRole['styleSheet']['sheet'];

            c = _z.isArray(c) ? c : [c];
            _z.for( c, (_IDc, _Vc)=>{
                _Vc && styleSheet.insertRule( _Vc, 0 );
            });

            return this;
        },

        // get current active dom element as _z()
        activeElment: function activeElement() {
            try { return _z( document.activeElement ); } catch ( err ) { return _z(); }
        },

    }, {
        // effect status, true = enabled, false = disabled
        eff: true,
    }, {
        // extends objects only
        extendObjects: extendObjFunction,

        // return current time stamp
        now: function currentTimeStamp() {
            return Date.now();
        },

        // bind function
        proxy: function proxy( fn, fn2 ) {
            if ( arguments.length > 1 && _z.isString(fn2) && isset(fn[ fn2 ]) ) {
                _fn = fn[ fn2 ];
                fn2 = fn;
                fn = _fn;
            }

            if( !_z.isFunction(fn) ) return fn;

            var args = protos.array.slice.call( arguments, 2 );
            var $this = this;
            function newProxy() {
                return fn.apply( fn2 || $this, args.concat( protos.array.slice.call( arguments ) ) );
            }
            newProxy.guid = fn.guid = fn.guid || _z._fguid++;

            return newProxy;
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

        // execute codes in HTMLDOM, exec src or innertext
        execScript: function execScript( e ) {
            if( !e ) return false;

            try {
                var resp;

                elmFunc.elmLoop( _z(e), ( elem ) => {
                    if( elem.src ) {
                        _z.ready({ ajax: _z._URL_(elem.src) });
                    } else {
                        resp = _z.globaleval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( /^\s*<!(?:\[CDATA\[|\-\-)/, "/*$0*/" ) );
                    }
                }, (x)=>_z.isObject(x)&&x['src']||_z(x).isDOMElement( true ));
            } catch(eEval) {
                console.error(eEval);
                resp = false;
            }

            return resp;
        },

    }].mix;

    // shared, functions in _z & _z()
    var __zFunctions = {
        // object.hasOwnProperty
        hasProp: hasProp,

        // var in obj
        hasVar: hasVar,

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
            if( elm.len || elm.length ) {
                var $return = [],
                    copyOfElm;
                elm.each(function() {
                    if( _z.isDOM( this ) ) {
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
        rnd: function( min, max ) {
            if( arguments.length > 2 || (min&&!_z.isNumber(min)) || (max&&!_z.isNumber(max)) )
                return arguments[ _z.rnd( arguments.length-1 ) ];

            if( _z.isNull(max) )
                max = Number.MAX_SAFE_INTEGER;

            if( !!!max )
                max = min,
                    min = 0;

            max = Math.__random() * ( ( ( max - min ) +1 ) || 100 ),
                max = Math.floor( max || 100 );

            return min + max;
        },

        // argument to array
        Array: function Array( input ) {
            input = input || [];
            if( _z.isString(input) ) input = [ input ];

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
            if( !!!op || !!!(op['callback'] = fns.isSetisFunc(op['callback'])&&op['callback'] || false) ) return false;

            elm = _z( elm );

            op['result'] = fns.isSetisFunc(op['result'])&&op['result'] || function(c) { return c; };
            op['valid'] = fns.isSetisFunc(op['valid'])&&op['valid'] || fns.true;

            var result = [false];
            if( _z.is_z(elm) )
                result = elm.length ? elmFunc.elmLoop( elm, op['callback'], op['valid']) : [false];

            return op['result']( result, elm );
        },

        // forEach
        each: function each( obj, callback, args ) {
            if( _z.isFunction( obj ) ) {
                if( callback ) args = callback;

                callback = obj;
                obj = this.toArray();
            }

            var obj = obj || [],
                value,
                i = 0,
                length = obj.length,
                isArray = _z.isArray( obj );

            if( isArray ) {
                for (; i < length; i++ ) {
                    value = args ? callback.apply( obj[ i ], args ) : callback.call( obj[ i ], i, obj[ i ] );
                    if( value === false ) break;
                }
            } else {
                for( i in obj ) {
                    value = args ? callback.apply( obj[ i ], args ) : callback.call( obj[ i ], i, obj[ i ] );
                    if( value === false ) break;
                }
            }

            return obj;
        },

        // foreach( Object|Array, function ), when function return false will break the loop
        for: foreach,

        // array map
        map: function map( array, func ) {
            if( _z.isFunction( array ) && !!!func ) {
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
            }
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
                    if( (input=_z(input)) && input.prop('name') ) {
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
                    if( (input=_z(input)) && input.prop('name') ) {
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

    // timer
    var interval = function interval() {
        $this = (this && this.window === this) ? interval : (this instanceof interval) ? this : interval;

        if( arguments.length == 1 && arguments[0] instanceof interval )
            return arguments[0];

        return new ( $this.init.bind( $this ) )( ...arguments );
    };
    // hold timer
    interval.hold = false;
    // timer default interval = 1 second
    interval.interval = 1000;
    // timer inestanss
    interval.instances = [];
// stop all timers
    interval.stopAll = function stopAll() {
        for(var i = 0, iL = this.instances.length; i < iL; i++)
            this.instances[i].stop();

        return this;
    };
// start all timers
    interval.startAll = function startAll() {
        for(var i = 0, iL = this.instances.length; i < iL; i++)
            this.instances[i].start();

        return this;
    };
// remove all timers
    interval.removeAll = function removeAll(keepData) {
        // do not delete data
        keepData = keepData || false;
        for(var i = 0, iL = this.instances.length; i < iL; i++)
            this.instances[i].remove(keepData);

        return this;
    };

    // _z.interval timer prototype
    interval.timer = interval.prototype = {
// timer version
        version: "0.0.1",
// timer id
        id: 0,
// timer interval
        interval: 0,
// timer isrunning
        isRunning: false,
// timer for one execution
        isOnce: false,
// timer for one execution is runned
        executionCount: 0,
// assign time
        stamp: 0,
// timer callback
        callback: fns.false,

        constructor: interval,

// create new instance _z()
        init: function timer(fn, iv) {
            // run once
            if( this.stamp !== 0 ) return false;

            fn = fn || fns.false;
            iv = iv || interval.interval;

            // register timer interval
            this.interval = ( _z.isNumber(fn) && fn ) || ( _z.isNumber(iv) && iv ) || interval.interval;
            // register timer callback
            this.callback = ( _z.isFunction(iv) && iv ) || ( _z.isFunction(fn) && fn ) || fns.false;

            // register timer created time
            this.stamp = fns.time();

            // register this instance
            interval.instances.push(this);
            return this;
        },

// run callback
        execFunction: function execFunction(force) {
            if( this.stamp === undefined ) return false;

            // do not check timer class status
            force = force || false;

            // check timer class status
            if( interval.hold !== false && force === false ) {
                this.isRunning = false;
                return this;
            }

            // if its timer once
            if( this.isOnce === true )
                this.stop();
            else
                this.isRunning = true;


            this.executionCount++;
            // execute function
            return this.callback.call();
        },

// check if this timer can start
        isReady: function isReady() {
            if( this.stamp === undefined ) return false;

            return (
// timer system not on hold
                interval.hold === false &&
                // no already running
                this.isRunning === false &&
                // if its once ? not run yet
                ((this.isOnce === true && this.executionCount < 1) || this.isOnce === false) );
        },

// start timer once
        once: function once(status) {
            status = arguments.length ? !!status : null;
            if( status === null ) return this.isOnce;

// change timer typer
            this.isOnce = !!status;

            return this;
        },

// start timer
        start: function start() {
            if( this.stamp === undefined ) return false;

            // is it already running ?
            if( this.isRunning === false ) {
                // if its timer once
                if( this.isOnce === true && this.executionCount > 0 ) return this;

                // create interval & register id & change status
                this.isRunning = !!(this.id = setInterval(this.execFunction.bind(this), this.interval));
            }

            return this;
        },

// stop timer
        stop: function stop() {
            if( this.stamp === undefined ) return false;

            if( this.id && this.id != 0 ) {
                // stop interval
                clearInterval(this.id);
                // update status
                this.isRunning = false;
                // remove interval id
                this.id = 0;
            }

            return this;
        },

// delete timer
        remove: function remove(keepData) {
            if( this.stamp === undefined ) return false;

            // do not delete data
            keepData = keepData || false;
            var thisIndex = interval.instances.indexOf(this);
            if( thisIndex !== -1 ) {
                // if timer running stop it
                if( this.isRunning ) return this.stop().remove(keepData);
                // remove it
                interval.instances.remove(thisIndex);
            }
            else
                return false;

            // delete data
            if( keepData !== true )
                _z.for(this, (k, v)=>this[k] = undefined);

            return true;
        },
    };
    interval.timer.init.prototype = interval.timer;

    // timer system
    var __zWindowAddons = {
        timer: interval
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
            callback: false,

            // default init function
            initFunction: "",

            // call when module requesting function, return false = cancel load
            whenRequest: "",

            // register this module in window.[MODULE]
            global: function global() {
                if( _z.isset(this.global.registered) && this.global.registered===true ) return this;

                this.global.registered = true;
                return this.hook( window );
                var w = window;
                if( !_z.isWindow(w) ) return console.error("UnderZ[" + this.id + "]: No Window Found."), this;

                if( _z.isset(w[ this.id ]) ) return console.error("UnderZ[" + this.id + "]: Already Exist!"), this;

                this.global.registered = true;
                return this.hook( window );
            },

            // recall function after while
            timeout: function timeout( method, limiter ) {
                if(!!method && _z.isFunction( method )) {
                    if( limiter ) { // limiter = seconds of tryng
                        limiter = ((parseFloat(limiter-1)*1000)/10) || 0;
                        this.limiter = this.limiter || 0;

                        if( limiter )
                            if( (parseFloat(this.limiter)*10) > limiter ) return;
                            else this.limiter++;
                    }

                    if( this.timeout.timeoutHandler )
                        clearTimeout( this.timeout.timeoutHandler );

                    this.timeout.timeoutHandler = setTimeout( method, 100);
                }

                return this;
            },

            // set requirment of module ( execute before load module )
            require: function require( req ) {
                if(!!req) this.requires.push( req );

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

                // check if load request sent
                if( this.loaded && this.loaded === true )
                    this.init(fns.true);

                // console.log('method1', this);
                return this;
            },

            // execute right now, if return true load all requirments
            init: function init( method ) {
                if(!!method && _z.isFunction( method ))
                    if(method.apply(this) == true && this.whenRequest.apply( this ) !== false )
                        this.loadDeclare.apply( this );

                return this;
            },

            // todo: load method when called
            // try to load requirments
            loadDeclare: function loadDeclare() {
                var module = this || false;
                if( !!!module || module.loaded ) return this.callback||this;

                if( module.whenRequest.apply( module ) === false ) return this;

                if(module.requires.length) {
                    _z( module.requires ).each(function() {
                        if(!!!this || this['loaded']) return this;

                        if( _z.isFunction( this ) ) {
                            this.apply( this );

                        } else if( this['js'] ) {
                            _z.loader.js( this['js'] );

                        } else if( this['css'] ) {
                            _z.loader.css( this['css'] );
                        }
                        this.loaded = true;
                    });
                }
                this.loaded = true;

                return this.callback||this;
            },

            // declare new module in specifiec object
            hook: function hookObject( obj ) {
                if( !_z.isObject(obj) && !_z.isArray(obj) && !_z.isFunction(obj) && !_z.isWindow(obj) )
                    obj = false;

                if( obj ) {
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
                newDeclare.initFunction = window.fns.true;

            if( !_z.isFunction(newDeclare.whenRequest) )
                newDeclare.whenRequest = window.fns.true;

            if( !!!module ) return newDeclare;

            if( !isset( hook.obj['declares'] ) ) hook.obj['declares'] = {};

            if( isDeclare( module ) ) return isDeclare( module );

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

            if( module.callback && _z.isFunction( module.callback ) ) {
                var handler = this,
                    arg = arguments;
                return module.callback.apply( handler, _z(arg).subArray(1) || [] );
            } else { }

            return this;
        },
    };

    // ajax system
    var ajax = function ajax(){
        if( !!!(this instanceof ajax) ) return new ( ajax.bind( this ) )( ...arguments );

        return new ( this.init.bind( this ) )( ...arguments );
    };

    ajax.config = {
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

    ajax.ajaxer = ajax.prototype = {
        aguid: 0,

        init: function Ajaxer( options, response ) {
            this.aguid = ++ajax.config.id;
            this['xhrFuncs'][ this.aguid ] = [];

            var param = this.param = _z.extend({ xhr: false }, __zAjax.ajaxSettings, options || {} ),
                $this = this,
                xhr = {},
                xhrFuncs = this['xhrFuncs'][ this.aguid ],
                convertResponse = this.convertResponse;

            param.xhr = xhr;
            param.xhr.ajaxer = {};
            ajax.config.xhr( param.xhr );

            if( isset( param.xhr['xhr'] ) ) param.xhr = param.xhr.xhr;

            xhr = param.xhr;

            try{
                xhr['withCredentials'] = param['withCredentials'];
            } catch ($withCredentials) { }

            // url
            if( !!!param['url'] )
                try { param['url'] = location.href; }
                catch( e ) {
                    // Use the href attribute of an A element
                    // since IE will modify it given document.location
                    param['url'] = document.createElement( "a" );
                    param['url'].href = "";
                    param['url'] = param['url'].href;
                }

            param['url'] += ( param['url'].indexOf('?') === -1 ? '?' : '&' );
            var cacheVar = !!!param['cache'] ? "_cache=" + fns.time() + '&' : '';

            param.async = param.async == undefined ? true : param.async;

            _z.mix($this, {
                always: $this.xhrFuncsSetter( 'always' , $this ),
                done: $this.xhrFuncsSetter('done' , $this),
                doneAndArguments: $this.xhrFuncsSetter('doneAndArguments' , $this),
                success: $this.xhrFuncsSetter('done' , $this),
                complete: $this.xhrFuncsSetter('complete' , $this),
                error: $this.xhrFuncsSetter('error' , $this),
                fail: $this.xhrFuncsSetter('error' , $this),
                progress: $this.xhrFuncsSetter('progress' , $this),
                timeout: $this.xhrFuncsSetter('timeout' , $this),
                onreadystatechange: $this.xhrFuncsSetter('onreadystatechange' , $this),
            },{
                pipe: param.promise,
                then: function(s, e) { return param.promise.then.call(param.promise, s, e), this; },
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

            foreach( ajax.config.ajaxObjectTrans, function( realFuncName, alterFuncNames) {
                foreach( alterFuncNames, function( k, alterFuncName) {
                    if( isset( param[ alterFuncName ] ) )
                        $this.xhrFuncsSet( realFuncName , param[ alterFuncName ] );
                }, this);
            }, $this);

            if( !!!($this.param.async != false) ) {
                var data = convertResponse( $this.param );

                $this.xhrFuncsApply( 'done', true, [ data ] );
            }

            var start = function start() {
                if( param.fired == true ) return this;

                if( toLC(param.type) != "get" ) {
                    xhr.open( param.type, ajax.config.urling( param.url + cacheVar ), param.async != false );

                    if( param.processData === false && param.contentType === false) {

                    } else if( param.contentType === true )
                        xhr.setRequestHeader( 'Content-Type', param.contentType );
                    else
                        xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
                } else
                    xhr.open( param.type, ajax.config.urling(param.url + ajax.config.params( param.data ) + '&' + cacheVar),
                        param.async != false );

                if( param.data != null || param.data != undefined ) {
                    xhr.send( ( param.processData === false && param.contentType === false ) ?
                        param.data : ajax.config.params( param.data ) );
                } else xhr.send();

                $this.xhrFuncsApply( 'always', false, [ xhr ]);

                param.fired = true;
                return this;
            };

            $this.promise = param.promise = _z.Promiser(function( resolve, reject ) {
                xhr.onprogress = function onprogress( event ) {
                    $this.xhrFuncsApply( 'progress', false, [{ loaded: event.loaded }, "success", event]);
                };

                xhr.ontimeout = function ontimeout() {
                    $this['abort'] && $this.abort();
                    this.abort();

                    $this.xhrFuncsApply( 'timeout', false, [ "timeout" ] );
                    reject( "timeout" );
                };

                xhr.onerror = function onerror() {
                    $this.xhrFuncsApply( 'error', false, [ xhr.responseText, "error" ]);
                    reject( xhr.responseText );
                };

                xhr.onreadystatechange = function onreadystatechange( ) {
                    if( param['statusCodes']&&param['statusCodes'][ this.status ]&&
                        _z.isFunction( param['statusCodes'][ this.status ] ) )
                        param['statusCodes'][ this.status ]( xhr );

                    if( param['states']&&param['states'][ this.readyState ]&&
                        _z.isFunction( param['states'][ this.readyState ] ) )
                        param['states'][ this.readyState ]( xhr );

                    $this.xhrFuncsApply( 'onreadystatechange', false, [ this.readyState, xhr ] );
                    if( this.readyState == 4 ) {
                        if( this.status == 200 )
                        // --ajax.config.id,
                            $this.xhrFuncsApply( 'success', false, [ xhr, $this ]);
                        else
                            $this.xhrFuncsApply( 'done', false, [ xhr, $this ]);

                        $this.xhrFuncsApply( 'always', false, [ xhr, $this ]);
                    }

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

                };

                xhr.onload = function onloadFunction( event ) {
                    // var xhr = param.xhr,
                    //     xhrFuncs = param.xhrFuncs;

                    if( param.xhr.status === 200 ) {
                        var data = convertResponse( param );

                        if( resolve )
                            resolve([ data, "success", xhr, $this ]);
                    } else {
                        $this.xhrFuncsApply( 'error', false, [ param.xhr.responseText, "error", xhr, $this ]);
                        reject([ param.xhr.responseText, "error", xhr, $this ]);
                    }

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
                    return;
                };

                if( param.timeout != undefined && param.async != false )
                    xhr.timeout = param.timeout;
                else if( param.async != false )
                    xhr.timeout = 20000;

                return start();
            });

            // $this.xhrFuncsSetTest = ()=>{ param.promise.success(), param.promise.error(); };

            param.promise.then(function(result) {
                $this.xhrFuncsApply( 'done', true, result );
            }, function(result) {
                $this.xhrFuncsApply( 'error', true, result );
            });

            return $this; // param.promise;//
        },

        // current ajax options
        param: {},

        abort: function abort( response ) {
            if( XMLHttpRequest != null ) {
                this.param.xhr.abort();
                ajax.config.stopCalling = false;

                if( _z.isFunction( response ) )
                    response( { status: "success" } );
            }
        },

        // exec function
        xhrFuncsApply: function xhrFuncsApply( fname, deleteIt, args ) {
            var fnsList = this['xhrFuncs'][ this.aguid ] || [];
            fnsList = fnsList[ fname ] || [];
            var fs, fnsLen = fnsList.length || 0;

            if( fnsList.length )
                for( var i = 0; i < fnsLen; i++ ) {
                    fs = !!!deleteIt ? fnsList[i] : fnsList.shift();
                    if( _z.isFunction(fs) )
                        fs.callSelf( this, ...(args || []));
                }
        },

        // create function
        // xhrFuncsSetTest: "",

        xhrFuncsSet: function xhrFuncsSet( fname, fn ) {
            if( !_z.isFunction(fn) ) return false;

            this['xhrFuncs'][ this.aguid ][ fname ] = this['xhrFuncs'][ this.aguid ][ fname ] || [];
            this['xhrFuncs'][ this.aguid ][ fname ].push( fn );

            // if( _z.isFunction($this.xhrFuncsSetTest) ) this.xhrFuncsSetTest();
        },

        // return setter function
        xhrFuncsSetter: function xhrFuncsSetter( fname, $return ) {
            var funcSet = this.xhrFuncsSet,
                _this = this;
            return function( $fn ) {
                if( _z.isFunction( $fn ) )
                    funcSet.apply(_this, [ fname, $fn ] );

                return ( $return['param']&&$return['param']['scoop'] ) || $return;
            };
        },

        xhrFuncs: [],

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
        xhr: null
    };
    ajax.ajaxer.init.prototype = ajax.ajaxer;

    // abort all xhr
    ajax.config.xhrs.abortAll = function() {
        var requests = [];
        for( var index in this )
            if( isFinite( index ) === true )
                requests.push( this[ index ] );

        for( index in requests && requests[ index ]['ajaxer'])
            requests[ index ]['ajaxer'].abort();
    };

    // remove one xhr
    ajax.config.xhrs.remove = function removeXHR( xhr ) {
        var $this = this;
        for( var index in $this )
            if( $this[index]['xhr'] === xhr ) {
                try {
                    $this[index]['xhr'].abort();
                } catch (e) {

                }
                $this.splice( index, 1 );
                break;
            }
    };


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
    [ _z.$, __zElementsFunctions, __zClassFunctions, __zAttrFunctions ].mix;

    // add sheared functions to _z.$
    [ _z.$, __zFunctions ].mix;

    // add serialize functions to _z.$
    [ _z.$, __zSerialize ].mix;

    // elements function
    [ _z.$, {
        // is this element/elements = HTMLDOM
        isDOMElement: function isDOMElement( orIsWindow ) { orIsWindow = orIsWindow || false;
            if( this.element().length ) {
                return !!( elmFunc.elmLoop( this, fns.true, orIsWindow ? _z.isDOMOW : _z.isDOM ).length == this.length );
            } else return false;
        },

        // get indexed element
        indexed: cssSelectorsIndexed,

        // index element in elements list
        index: function indexOfElement( elms, elm ) {
            elm = elm?_z( ( arguments.length==1&&elms ) ? elms : elm ):false;
            elms = ( arguments.length==1 ) ? this : (elms?_z(elms):false);

            if( !arguments.length ) elms = this;

            if( elm !== false )
                return _z.inArray(elm.element(0), elms.element());

            var newElm = _z( (( elm !== false ) ? elm : elms).subArray(-1) );

            if( newElm.length == 0) return false;

            var _name = newElm.attr('name') || newElm.attr('id') || "";
            var _ex;
            _name = (_ex = /\[(\d+)\]/.exec(_name))!=null ? _ex[1] : false;
            return _name;
        },

        // element/elements HTML
        html: function html( elm, $val ) {
            $val = ( arguments.length == 1 && (_z.isString( elm )||_z.isNumber( elm )) ) ? elm : $val;
            elm = ( arguments.length == 1 && (_z.isString( elm )||_z.isNumber( elm )) ) ? this : _z( elm );

            if( !arguments.length ) elm = this;

            var $return = [];
            elmFunc.elmLoop( elm, function( e ) {
                if( isset( $val )&&isset(e['innerHTML']) ) {
                    e.innerHTML = $val,
                        $return.push( e.innerHTML );

                    if( _z.Array(_z($val).tagName(x=>x=="script")).length > 0 )
                        _z.execScript( $val );
                } else if( isset(e['innerHTML']) ) $return.push( e.innerHTML );
            });

            return isset( $val ) ? this : ( elm.length==1 ? ($return[0]||"") : $return );
        },

        // element/elements prop
        prop: function elementProp( prop, val ) {
            if( arguments.length == 0 ) return this;

            var elm = this;
            var $return = [];
            elmFunc.elmLoop( elm, function( e ) {
                if( isset( e[ prop ] ) ) {
                    if( isset(val) ) e[ prop ] = val;
                    else $return.push( e[ prop ] );
                }
            });

            return isset(val) ? this : ( this.length==1 ? $return[0] : $return );
        },

        // get element/elements value(val) as number
        numval: function elementValueToNumber() {
            var $return = [];
            elmFunc.elmLoop( this, function( e ) {
                try {
                    $return.push( (Number(e.value)||0) );
                } catch( err ) { }
            });

            return this.length > 1 ? $return : $return[0];
        },

        // set element/elements value(val) if value = (IFVal)
        valIF: function elementValue( IFVal, val ) {
            elmFunc.elmLoop( this, function( e ) {
                try {
                    if( _z.isFunction( IFVal ) ) {
                        if( IFVal(e.value, e) ) e.value = val;
                    } else
                    if( e.value == IFVal )
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
                    ) {
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

                        if( isset( val ) && $return_options.length==0 ) e['selectedIndex'] = -1;

                        if( !isset( val ) && toLC(e['type']) === "select-multiple" )
                            $return.push( $return_options );
                        else if( !isset( val ) )
                            $return.push( $return_options[0] );
                    } else {
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
            $val = ( arguments.length == 1 && (_z.isString( elm )||_z.isNumber( elm )) ) ? elm : $val;
            elm = ( arguments.length == 1 && (_z.isString( elm )||_z.isNumber( elm )) ) ? this : _z( elm );

            if( !arguments.length ) elm = this;

            var $return = [];
            elmFunc.elmLoop( elm, function( e ) {
                var findRightAttr = e['innerText'] ? 'innerText' : (e['textContent'] ? 'textContent' : false);
                if( !findRightAttr ) return ;

                if( isset( $val )&&e[ findRightAttr ] ) e[ findRightAttr ] = $val;
                else if( e[ findRightAttr ] ) $return.push( e[ findRightAttr ] );
            });
            return isset( $val ) ? this : (( elm.length==1 ? $return[0] : $return ) || "");
        },

        // sum all vallues
        sum: function sumValues( elm ) {
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

            if( !elm ) elm = this;
            if( !elm.length || !elm2.length) return false;

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
            filter = filter || fns.true;
            var elm = elm || this;
            elm = (_z.isDOM(elm)||_z.isArray(elm)) ? _z( elm ) : (
                _z.is_z(elm) ? elm : ( _z.isArray(elm) ? elm : false )
            );

            if( !elm ) elm = this;
            if( !elm.length ) return "";

            var $return = [];
            elmFunc.elmLoop( elm, function( e ) {
                var tn;
                if( e[ 'tagName' ]&&(tn=e.tagName.toLowerCase()) ||
                    e['outerHTML']&&(tn=( /<([\w:]+)/.exec( e.outerHTML ) ||
                        ["", ""] )[1].toLowerCase()) )
                    if( _z.isFunction(filter) && filter.callSelf( tn ) || !_z.isFunction(filter) )
                        $return.push( tn );
            });

            return elm.length == 1 ? ( $return[0] || "" ) : $return;
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
            var elm = elm || this,
                callback=false;

            if( _z.isFunction(elm) )
                callback = elm,
                    elm = this;

            elmFunc.elmLoop( elm, function( e ) {
                try {
                    var remThis=true;
                    if( callback&&_z.isFunction( callback ) ) remThis = callback(e, elm);

                    if( remThis===true ) e.parentNode.removeChild( e );
                } catch( er ) { }
            });

            return this;
        },

        // append element
        append: function append( $val ) {
            if( !isset( $val ) || ( !_z.is_z( $val ) && !_z.isDOM( $val )  && !_z.isString( $val ) ) || !this.length )
                return this;

            if( _z.isString( $val ) ) {
                var _$val = _z.parse.parseHTMLNode($val);
                if( _z.isNodeList( _$val ) ) $val = _z.toArray( _$val );
            }

            if( _z.isDOM($val) || !_z.is_z($val) ) $val = _z($val);

            var elm = this;
            elmFunc.elmLoop( elm, function( e ) {
                if( !e['appendChild'] ) return;

                $val.for( function( key, value ) {
                    if( _z.isDOM( value ) || _z.type( value )=='Text' ) {
                        e['appendChild']( value );

                        if( _z(value).tagName() == "script" ) {
                            _z.execScript(value);
                        }
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
            if( !isset( $val ) || ( !_z.is_z( $val ) && !_z.isDOM( $val )  && !_z.isString( $val ) ) || !this.length )
                return this;

            if( _z.isString( $val ) ) {
                var _$val = _z.parse.parseHTMLNode($val);
                if( _z.isNodeList( _$val ) ) {
                    $val = _z.toArray( _$val );
                    if( $val['reverse'] ) $val.reverse();
                }
            }

            if( _z.isDOM($val) || !_z.is_z($val) ) $val = _z($val);

            var elm = this;
            elmFunc.elmLoop( elm, function( e ) {
                if( !e['insertBefore'] || !e['firstChild'] ) return;

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
                try {
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

            if( this.length > 1 ) {
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

            if( _z(this) )
                var status = _z(this).hasClass( 'hidden' ) ? true :
                    ( /hidden|none/i.test( _z( this ).css( 'visibility' ) +" "+ _z( this ).css( 'display' ) ) );

            status = ( ret==true && !!!status ) ? this : !!!status;

            return status;
        },

        // is element hidden
        isHidden: function isHidden() {
            status = false;

            if( this.length > 1 ) {
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

            if( _z(this) )
                var status = _z(this).hasClass( 'hidden' ) ? true :
                    ( /hidden|none/i.test( _z( this ).css( 'visibility' ) +" "+ _z( this ).css( 'display' ) ) );

            status = ( ret==true && !!!status ) ? this : !!!status;

            return status;
        },

        isHide: function isHidden() { return !!!this.isShow(); },

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
            callback = _z.isFunction(speed) ? speed : ( callback || false );
            speed = _z.isNumber(callback) ? callback : ( speed || 1000);
            callback = !_z.isFunction(callback)? false : callback;

            return elmFunc.fade.apply( this, [ 'In', speed, callback ] );
        },
        // fade element/s in/out
        fadeOut: function fadeOut( speed, callback ) {
            callback = _z.isFunction(speed) ? speed : ( callback || false );
            speed = _z.isNumber(callback) ? callback : ( speed || 1000);
            callback = !_z.isFunction(callback) ? false : callback;

            return elmFunc.fade.apply( this, [ 'Out', speed, callback ] );
        },
        // fade element/s to
        fadeTo: function fadeTo( speed, opacity, callback ) {
            callback = _z.isFunction(callback) ? callback : ( callback || false );
            speed = _z.isNumber(speed) ? speed : ( speed || 1000);
            opacity = _z.isNumber(opacity) ? ((opacity >= 0 || opacity <= 1) ? opacity : 1) : 1;

            return elmFunc.fade.apply( this, [ 'To', speed, opacity, callback ] );
        },

        // todo:animate element
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
                    if( isset( $val ) ) {
                        _z.for( _z.toArray( e['children'] ), function( k, v) {
                            if( _z.isDOM( $val ) ) {
                                if( v['isEqualNode'] && v['isEqualNode']( $val ) ) $return.push( v );
                            } else if( _z.isTypes( 'selector', $val ) )
                                if( elmFunc.matches( v, $val ) ) $return.push( v );
                        });
                    } else $return.add( ..._z.toArray( e['children'] ) );
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
                v = v==doc ? doc.documentElement : v;
                v = _z.toNodeList( v )[0];

                if( v && v['querySelectorAll'] ) {
                    v = v.querySelectorAll( qSelector );
                    if( v.length ) $return.add( ..._z( v ).element() );
                }
            }, (v)=>{ return ( _z.isDOM( v ) || _z.type( v ) != 'NodeList' ); });

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
                if( _z(e).find($_ELM).length ) $return.push( e );
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

                if( v ) $return.push( getHTML( v ) );
            });

            return this.length==1 ? $return[0] : $return;
        },

        // get last element as _z
        last: function lastElement( len ) {
            if( _z.isArray(len) ) return _z.subArray( -1, len);

            len = parseInt(len) || 1;
            var newInstance = this.newSelector( this.subArray(len<=0?len:len*-1) );
            newInstance.args = arguments;
            newInstance.selector = "::last";

            return newInstance;
        },

        // get first element as _z
        first: function firstElement( len ) {
            if( _z.isArray(len) ) return _z.subArray( 0, 1, len);

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
                    if( isset( $val ) ) {
                        _z.for( [ e['nextElementSibling'] ], function( k, v) {
                            if( _z.isDOM( $val ) ) {
                                if( v['isEqualNode'] && v['isEqualNode']( $val ) ) $return.push( v );
                            } else if( _z.isTypes( 'selector', $val ) )
                                if( elmFunc.matches( v, $val ) ) $return.push( v );
                        });
                    } else $return.push( e['nextElementSibling'] );
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
            if( arguments.length==1 && !!selector ) {
                cb = _z.isFunction( selector ) ? selector : fns.true;
                selector = !_z.isFunction( selector ) ? selector : "";
            } // case cb && selector
            else if( arguments.length==2 && !!selector && !!cb ) {
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
                if( $return.length > 0 ) return;

                if(
                    ( selector && _z(el).is( selector ) && cb && _z.isFunction( cb ) && ( cb.call(el, el, selector) == true ) )
                    ||
                    ( !!!selector && cb && _z.isFunction( cb ) && ( cb.call(el, el, selector) == true ) )
                    ||
                    ( ( !!selector && _z(el).is( selector ) ) && !!!cb || !_z.isFunction( cb ) )
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
                    if( isset( $val ) ) {
                        _z.for( [ e['previousElementSibling'] ], function( k, v) {
                            if( _z.isDOM( $val ) ) {
                                if( v['isEqualNode'] && v['isEqualNode']( $val ) ) $return.push( v );
                            } else if( _z.isTypes( 'selector', $val ) )
                                if( elmFunc.matches( v, $val ) )
                                    $return.push( v );
                        });
                    } else $return.push( e['previousElementSibling'] );
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

            if( !$val ) return false;

            elmFunc.elmLoop( elm, function( e ) {
                elmFunc.elmLoop( $val, function( e2 ) {
                    if( _z.isDOM( e2 ) )
                        $return += _z.toNum( e['isEqualNode'] && e['isEqualNode']( e2 ) );
                    else if( _z.isTypes( 'selector', e2 ) )
                        elmFunc.matches( e, e2 )&&(++$return);
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

                if( isWindow( e ) ) {
                    var height = e.innerHeight ||
                        e.document.documentElement.clientHeight ||
                        e.document.body.clientHeight || 0,

                        width = e.innerWidth ||
                            e.document.documentElement.clientWidth ||
                            e.document.body.clientWidth || 0;

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
                else if( e.nodeType === 9 ) {
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
                } else {
                    var rect = ( e['getBoundingClientRect'] ) ? e.getBoundingClientRect() : {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    };
                    var style = compStyle(e)||e.currentStyle;
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

                        // outer
                        // the height of an element (includes padding, border and margin).
                        outerHeightWP: (
                            e.offsetHeight +
                            parseInt(style.marginTop) +
                            parseInt(style.marginBottom)
                        ),

                        // inner
                        // the height of an element (includes padding).
                        innerHeight: e.clientHeight || e.scrollHeight,

                        width: parseInt( style.width ),

                        // the width of an element (includes padding and border).
                        outerWidth: e.offsetWidth,

                        // the width of an element (includes padding, border and margin).
                        outerWidthWP: (
                            e.offsetWidth +
                            parseInt(style.marginLeft) +
                            parseInt(style.marginRight)
                        ),

                        innerWidth: e.clientWidth || e.scrollWidth,
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
                    $return.push({
                        top: (e['offsetTop'] || 0),
                        left: (e['offsetLeft'] || 0),
                    });
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
                { }
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

                    if( !!selector && pElement && _z.isDOM(pElement) && _z(pElement).is(selector) ) {
                        if( !$return.includes( pElement ) ) $return.push( pElement );
                    } else if( !!!selector )
                        $return.push( pElement );

                } while(
                    ( !!!selector && pElement && _z.isDOM(pElement) ) ||
                    ( !!selector && pElement && _z.isDOM(pElement) )
                    );
            });

            if( !!!$return.length ) $return = [];

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
                        if( !filter || filter.callSelf( e ) )
                            $return.push( e );
                        e = e.parentElement;
                    }
                }
            });

            if( !!!$return.length ) $return = [];

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
                $return = [];

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
                if( e['outerHTML'] ) {
                    $return.push( _z(e).clone() );
                    e['outerHTML'] = is_z($html) ? $html.toHTML() : $html;
                } else if( e['replaceWith'] ) {
                    $return.push( _z(e).clone() );
                    e['replaceWith']( $html );
                }
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
            if( !eventName ) return this;

            // handle multi event
            if( _z.isString(eventName) && eventName.split(" ").length > 1 )
                eventName = eventName.split(" ");

            if( _z.isArray(eventName) ) {
                eventName = _z.filter(eventName).toArray();

                _z.for(eventName, function(eKey, eName) {
                    _z(elm).trigger( eName );
                });

                return this;
            }

            var _alias = [], alias = [];
            if( alias.length ) {
                _alias = alias;
                alias = [];
            }

            alias = events.getAlias(eventName);
            var aliasQry =  (alias.length ? "." + alias.join(".") : "");
            eventName = events.getEventName(eventName);

            var elmentWithNS = [];
            if( alias.length ) {
                _z.for(elm, function (Index, e) {
                    var needleData = {};
                    e&&(needleData['element'] = e);
                    eventName&&(needleData['eventName'] = eventName);
                    alias&&(needleData['alias'] = alias);
                    var _elmentWithNS = events.find( needleData );

                    if( _z.size(_elmentWithNS) == 0 ) return ;
                    else {
                        elmentWithNS.push(_elmentWithNS);
                        _z.for(_elmentWithNS, function (_Index, _e) {

                            eventName = events.getEventName( _e["eventName"] );
                            var NSalias = _e["alias"];
                            var NSaliasQry =  (NSalias.length ? "." + NSalias.join(".") : "");

                            var event = (e.ownerDocument ? e.ownerDocument : e).createEvent('HTMLEvents');
                            event.initEvent(eventName + NSaliasQry, true, true);
                            try {
                                event.synthetic = true;
                                if( e.dispatchEvent )
                                    e.dispatchEvent(event);
                                else
                                    event = { target: e, type: eventName + NSaliasQry };

                                _e["proxyCallback"].apply(e, [event, _e]);
                            } catch (er) {
                                console.error(er);
                            }
                        });
                        return this;
                    }
                });

                return this;
            }

            elmFunc.elmLoop( elm, function( e ) {
                // todo: must try to call element.eventname first 
                events.createEventAnddispatch(e, eventName + aliasQry);
            }, fns.true);

            return this;
        },

        // attach an event
        on: function attachEvent( eventName, qselector, callback ) {
            var elm = this,
                eventName = eventName || false,
                qselector = qselector || false,
                callback = callback || false,
                alias = [];

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

            if( !eventName && !qselector )
                return this;

            if( arguments.length == 2 && _z.isFunction( qselector ) )
                callback = qselector,
                    qselector = false;

            if( !_z.isFunction(callback) ) return this;

            // handle multi event
            if( _z.isString(eventName) && eventName.split(" ").length > 1 )
                eventName = eventName.split(" ");

            if( _z.isArray(eventName) ) {
                var oldArgs = _z.filter([eventName, qselector||"", callback||""]).toArray();

                _z.for(eventName, function(eKey, eName) {
                    oldArgs.shift();
                    oldArgs.unshift(eName);
                    _z(elm).on(...oldArgs);
                });
                return this;
            }

            var alias = events.getAlias(eventName);
            var aliasQry =  (alias.length ? "." + alias.join(".") : "");
            eventName = events.getEventName(eventName);

            // .on("hover")
            if( eventName == "hover" ) {
                eventName = "mouseenter" + aliasQry + " mouseleave" + aliasQry;
                return _z(elm).on( ...[eventName, qselector||"", callback||""].filter(x=>x) );
            }

            elmFunc.elmLoop( elm, function( e ) {
                var elms = e;

                if( !elms ) return this;

                var proxyCallback = function proxyCallback( event ) {
                    var eventName = events.getEventName(event.type);
                    if( qselector && event && event.target && _z(event.target).parents(qselector).addBack(qselector).length || !qselector )
                        return callback.call(event.target, event);
                };

                events.register( {
                    element: elms,
                    eventName: eventName,
                    qselector: qselector,
                    alias: alias,
                    proxyCallback: proxyCallback,
                    realcallback: callback
                } );
            }, fns.true);

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

            var alias = events.getAlias(eventName);
            var aliasQry =  (alias.length ? "." + alias.join(".") : "");
            eventName = events.getEventName(eventName);

            // .un("hover")
            if( eventName == "hover" ) {
                eventName = "mouseenter" + aliasQry + " mouseleave" + aliasQry;
                return _z(elm).un( ...[eventName, qselector||"", callback||""].filter(x=>x) );
            }

            // hamdle multi callback
            if( callback && _z.isArray(callback) ) {
                var oldArgs = _z.filter([eventName + aliasQry, qselector||"", callback||""]).toArray();

                _z.for(callback, function(cKey, cName) {
                    oldArgs.pop();
                    oldArgs.push(cName);
                    _z(elm).un(...oldArgs);
                });
                return this;
            }

            elmFunc.elmLoop( elm, function( e ) {
                var needleData = false;

                if( needleData == false ) {
                    needleData = {};
                    e&&(needleData['element'] = e);
                    eventName&&(needleData['eventName'] = eventName);
                    qselector&&(needleData['qselector'] = qselector);
                    callback&&(needleData['realcallback'] = callback);
                    alias&&(needleData['alias'] = alias);
                }

                try {
                    needleData&&events.unRegister( needleData );
                } catch(__error) { }

            }, fns.true);

            return this;
        },

        // trigger event
        callEvent: function callEvent(evt) {
            var evt = evt || false;
            if( !evt )
                return this;

            var alias = events.getAlias(evt);
            var aliasQry =  (alias.length ? "." + alias.join(".") : "");
            evt = events.getEventName(evt);


            return this.each( function( evtN, alias, elm ) {
                if( alias.length ) {
                    var needleData = {};
                    this && (needleData['element'] = this);
                    evtN && (needleData['eventName'] = evtN);
                    alias && (needleData['alias'] = alias);
                    var _elmentWithNS = events.find(needleData);

                    if (_z.size(_elmentWithNS) == 0) return;
                    else
                        return _z.for(_elmentWithNS, function (_Index, _e) {
                            evtN = events.getEventName( !evtN  ? _e['eventName'] : evtN );

                            elm.callEvent(evtN);
                        });
                }

                var _doc;
                if( hasVar(this, 'ownerDocument')&&hasVar((_doc=this.ownerDocument), 'createEvent') || hasVar((_doc=document), 'createEvent') ) {
                    var evt = _doc.createEvent( 'MouseEvents' );
                    evt.initMouseEvent( evtN, true, true, _doc .defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                    // this.dispatchEvent( evt );
                    events.dispatch.apply(this, [evt, { element: this, eventName: evtN, alias: alias }]);
                } else if( hasVar(this, evtN) )
                    this[ evtN ](); // IE Boss!
            }, [ evt, alias, this ] );
        },

        // trigger keyboard event
        callKEvent: function callKEvent(evt,evtData) {
            var evt = evt || false;
            var evtData = evtData || false;

            if( !evt )
                return this;

            var alias = events.getAlias(evt);
            var aliasQry =  (alias.length ? "." + alias.join(".") : "");
            evt = events.getEventName(evt);


            return this.each( function( evtN, evtD, alias, elm ) {
                if( alias.length ) {
                    var needleData = {};
                    this && (needleData['element'] = this);
                    evtN && (needleData['eventName'] = evtN);
                    alias && (needleData['alias'] = alias);
                    var _elmentWithNS = events.find(needleData);

                    if (_z.size(_elmentWithNS) == 0) return;
                    else
                        return _z.for(_elmentWithNS, function (_Index, _e) {
                                    evtN = events.getEventName( !evtN  ? _e['eventName'] : evtN );

                                    elm.callKEvent(evtN, evtD);
                                });
                }

                if( hasVar(document, 'createEvent') ) {
                    var keyboardEvent = document.createEvent("KeyboardEvent");
                    var initMethod = typeof(keyboardEvent.initKeyboardEvent) !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

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
                    // this.dispatchEvent(keyboardEvent);
                    events.dispatch.apply(this, [keyboardEvent, { element: this, eventName: evtN, alias: alias }]);
                }
                else if( hasVar(this, evtN) )
                    this[ evtN ](evtD, alias); // IE Boss!
            }, [ evt, evtData, alias, this ] );
        },

        // on DOM change event
        dchange: function DOMChange( func ) {
            if( !_z.isFunction(func) )
                throw new Error(func + " Is not function!!");

            return this.on("DOMSubtreeModified", func);
        },

        // un DOM change event
        undchange: function unBindDOMChange( func ) {
            var arg = ["DOMSubtreeModified"];
            if( _z.isFunction(func) )
                arg.push(func);

            return this.un(...arg);
        },

        // todo: what is this ! ;wait for DOM change on specifiec selector
        watchIn: function watchInDOMTree( forSelector, callback ) {
            var watch = this;
            if( !isset( callback ) && _z.isFunction( forSelector ) ) {
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

            if( elm.length ) {
                var $this = this;
                elm.each(function( i, e ){
                    // get data & no data
                    if( !isset(e[ version ]) && getData ) {
                        $return.push( {} );
                        return;
                    }

                    // new data & create object
                    if( !isset(e[ version ]) )
                        e[ version ] = new_zID();

                    var crnt_zIDData = new_zID.data[ e[ version ] ];

                    // set data
                    if( !!$var && !!$isVal && !!e[ version ] ) {
                        crnt_zIDData['data'][$var] = $val;
                        $return.push(e);
                    }
                    else if( !!$var && !!!$isVal )
                        if( !_z.isObject($var) ) // get data
                            $return.push(
                                (crnt_zIDData['data']&&_z.isset(crnt_zIDData['data'][$var]) ?
                                    crnt_zIDData['data'][$var] : undefined )
                            );
                        else { // set data
                            crnt_zIDData['data'] = crnt_zIDData['data'] || { data: { } };
                            crnt_zIDData['data'] = _z.extend(crnt_zIDData['data'], $var);
                        }
                    else if( !!!$var && !!!$isVal ) // get all data
                        $return.push(crnt_zIDData['data']);
                });
            }

            return newData ? this : ( this.length==1?$return[0]:$return );
        },

        // remove data\s for element
        remData: function removeData( $var ) {
            var elm = this;

            elmFunc.elmLoop( elm, function( e, v ) {
                if( !isset(e[ version ]) )
                    return;

                if( !!$var && !!e[ version ] )
                    delete new_zID.data[ e[ version ] ]['data'][$var];
                else if( !!!$var && !!e[ version ] ) {
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
    } ].mix;

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

    } ].mix;

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

    ].mix;
// _z.$ }


// _z {

    // add global functions to _z
    [ _z, __zGlobalFunctions ].mix;

    // add shared functions to _z
    [ _z, __zFunctions ].mix;

    // add serialize settings to _z
    [ _z, __zSerializeSettings ].mix;

    // add ajax & url tools functions to _z
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
                if( typeOfVar( object ) === varsType.a ) {
                    for( i = 0, len = object.length; i < len; i++ )
                        if ( /\[\]$/.test( perfix ) )
                            add( perfix, object[i] );
                        else
                            param( object[i], perfix + '[' + ( typeOfVar( object[i] ) === varsType.o ? i : '' ) + ']', parts );
                }
                // object
                else if( typeOfVar( object ) === varsType.o ) {
                    for( var prop in object )
                        param( object[ prop ], perfix + '[' + prop + ']', parts );
                }
                // string
                else add( perfix, object );
            }
            else if( typeOfVar( object ) === varsType.a ) {
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
    ].mix;

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
                    'document': !!(obj==doc || obj==doc.documentElement),
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
    } ].mix;

    // Objects function
    [ _z, {
        // todo: optmize remove from `obj` the `attr`
        removeFrom: function removeFrom( obj, attr ) {
            if( arguments.length == 0 )
                return [];

            // array
            if( _z.isArray( obj ) ) {
                obj = Array.from(obj);
                if( obj.indexOf( attr )!== -1 )
                    obj.splice( obj.indexOf( attr ), 1);
            }

            // object
            if( _z.isObject( obj ) ) {
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
        toNum: function toNumber( v ) { return Number( v )||0; },
        // todo: add dom is empty; isEmpty array, string, object
        isEmpty: function isEmpty( obj ) {
            if( obj == null || !!!obj )
                return true;

            if( _z.isArray( obj ) || _z.isString( obj ) || _z.isArguments( obj ) )
                return obj.length === 0;

            return _z.size( obj ) === 0;
        },

        // todo: add dom is not empty; isNotEmpty array, string, object
        isNotEmpty: function isNotEmpty() {
            return !!!_z.isEmpty.apply( this, arguments );
        },

        // type of `val`
        type: function type( val ) { return TOV(val); },

        // is element == window
        isWindow: isWindow,

        // is element== document
        isDocument: function isDocument( element ) {
            return !!(element==doc);//!!(element==doc || element==doc.documentElement);
        },

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

            while( !!args.length ) {
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
        is_z: is_z,

        // is `elm` == _z
        isCore: isCore,

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

            return array1.length;
        },

        // todo: what is this for ?; DOM Node Types
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
            element: doc.ELEMENT_NODE || 1,
            attr: doc.ATTRIBUTE_NODE || 2,
            text: doc.TEXT_NODE || 3,
            comment: doc.COMMENT_NODE || 8,
            document: doc.DOCUMENT_NODE || 9
        },

        // todo: what is this for ?; get HTMLNodes by types
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


    } ].mix;

    // inject timer system to _z
    [ _z, __zWindowAddons ].mix;

    // inject timer system to window
    [ window, __zWindowAddons ].mix;

    // _z features
    [ _z, {
        // _z.URLToBlob64( url_to_get, function_callback)
        // convert url to data base64
        URLToBlob64: function URLToBlob64(url, callback) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        callback(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.responseType = 'blob';
                xhr.send();
            } catch (e) {

            }
        },
        // _z.stringToBlob64(string, function_callback, content_type)
        // convert string to data base64
        stringToBlob64: function stringToBlob64(string, callback, type) {
            try {
                var blob = new Blob([string], { type: type || 'plain/text' });
                var reader = new FileReader();
                reader.onload = ()=>callback(reader.result);
                reader.readAsDataURL(blob);
            } catch (e) {

            }
        }
    }, {
        // selector, action, prevent true||false
        prevent: function prevent(s, a, p) {
            var s = s || '*',
                a = a || '*',
                p = p || false;

            if( a.indexOf(' ') >= 0 )
                a = a.split(' ');

            if(a instanceof Array) {
                if( a.length == 0 ) {
                    fns.t.r("Unknown Action: "+a.join(' '));
                    return this;
                }
                a.forEach(function(e) {
                    this.prevent(s,e,p);
                }.bind(this));

                return this;
            }

            if( s.indexOf(' ') >= 0 )
                s = s.split(' ');

            if(s instanceof Array) {
                if( s.length==0 ) {
                    fns.t.r("Unknown Selector: "+s.join(' '));
                    return this;
                }
                s.forEach(function(e) {
                    this.prevent(e,a,p);
                }.bind(this));

                return this;
            }

            var elm = _z(s);

            switch(a) {
                case "*":
                case "selection":
                    elm.selection( !p ? 1 : 0);
                    if(a!='*')
                        break;

                case "*":
                case "cut":
                    elm.un("cut");
                    p && elm.on("cut", function(e){
                            e.preventDefault();
                        });
                    if(a!='*')
                        break;

                case "*":
                case "copy":
                    elm.un("copy");
                    p && elm.on("copy", function(e){
                            e.preventDefault();
                        });
                    if(a!='*')
                        break;

                case "*":
                case "contextmenu":
                    elm.un("contextmenu");
                    p && elm.on("contextmenu", function(e){
                            e.preventDefault();
                        });

                    if(a!='*')
                        break;

                case "*":
                case "autocomplete":
                    elm.attr('autocomplete',p?'on':'off');
                    if(a!='*')
                        break;

                default:
                    if( a!='*' )
                        fns.t.r("Unknown Action: "+a);
            }

            if( !_z.document.isReady || !_z.document.isReady() )
                _z.ready(function(){
                    _z.prevent(s, a, !p);
                });

            return this;
        },

        // document functions
        document: {
            // get document Status
            status: function documentStatus() {
                return doc.readyState;
            },

            // document is ready ?
            isReady: function documentIsReady() {
                return ( doc.readyState === 'complete' );
            },

        },

        // parse functions
        parse: parssing,

        // base64 en/decoder
        base64: base64,

        // get variables from location
        _GET: function _GET( variable ) {
            if( !!!(location && doc.location) ) return false;

            try {
                var q = ( location||doc.location ).search.substring( 1 ),
                    asArray = [],
                    p = [],
                    getAll = ( !!!variable );

                var v = q.split( "&" );
                for( var i = 0, iv = v.length; i < iv; i++ ) {
                    p = v[ i ].split( "=" );
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

        // get current url location
        _URL_: function _URL_(f) { f = f || false;
            try {
                if( f && f.indexOf("://") > -1 ) return f;

                var _URL_ = _z._FILE_()&&(window.location.href.indexOf(_z._FILE_())>-1)&&location.href.split(_z._FILE_())[0]||location.href.toString();
                if( f ) {
                    _URL_ += (_URL_.substr(-1) == "/" ? "" : "/");
                    _URL_ = ( f.indexOf("://") > -1 ) ? f : _URL_ + f;
                }
                return _URL_;
            } catch (e) { return false; }
        },

        // return css selector from dom element
        cssSelector: cssSelector,

    } ].mix;

    // loader include js, css, data
    [ _z, {
        // loaded files
        __loaders: [],

        // check if file has been loaded
        isLoaded: function(f) {
            // var f = "a/b/c.d";
            if( !!!f ) return false;

            var a = _z.privates.pathToArray( f );
            a = _z.isArray( a ) ? a.reverse() : [];

            var returns = false;
            for( var ii = 0, LIL = this.__loaders.length; ii < LIL; ii++ ) {
                var a2 = this.__loaders[ii];
                a2 = _z.isArray(a2) ? Array.from( a2 ).reverse() : [];

                returns = true;
                for( var i =0, aL = a.length; i < aL; i++ )
                    if( a[i] != a2[i] ) {
                        returns = false;
                        break;
                    }

                if( returns ) return returns;
            }

            return returns;
        },

        // load single
        loader: (function() {
            // Function which returns a function: https://davidwalsh.name/javascript-functions
            function _load( tag ) {
                return function( url ) {
                    if( _z.isArguments(url) ) url = _z.Array(url);

                    var cb = _z.isArray(url) ? url.slice(1) : false;
                    url = _z.isArray(url) ? url[0] : url;
                    cb = cb&&cb.length ? (cb[0] || false) : false;


                    if( _z['isLoaded']&&_z['isLoaded']( url ) )
                        return new Promise(function(resolve, reject) { reject("file exist"); });

                    if( _z['privates']&&_z['privates']['pathToArray'] )
                        _z.__loaders.push( _z.privates.pathToArray(url) );
                    else
                        _z.__loaders.push( url.replace(/^.*[\\\/]/, '') );

                    var loadInBody = false;
                    if( (document.readyState!=='complete' && tag=='script') || ((loadInBody=true) && tag=='script')) {
                        return new Promise(function(resolve, reject) {
                            try {
                                // _z.execScript({ src: url });
                                _z( loadInBody ? "body" : "head" ).append('<script type="text/javascript" class="_z-loader" src="'+url+'"></script>');
                            } catch (_err) { reject(err); }

                            try {
                                if(cb && _z.isFunction(cb)) cb();
                            } catch (_err) { reject(err); }

                            resolve(true);
                        });
                    } else {
                        // todo: when this code is active
                        console.log([
                            document.readyState,
                            tag,
                            cb,
                            url
                        ]);
                    }

                    if( tag=='data' ) {
                        try {
                            if(cb && _z.isFunction(cb)) {
                                return _z.URLToBlob64(url, cb);
                            }
                        } catch (_err) {  }
                        return false;
                    }
                    // This promise will be used by Promise.all to determine success or failure
                    return new Promise(function(resolve, reject) {
                        var element = document.createElement(tag);
                        var parent = 'body';
                        var attr = 'src';

                        // Important success and error for the promise
                        element.onload = function() {
                            if( cb && _z.isFunction(cb) ) cb();

                            resolve(url);
                        };
                        element.onerror = function() {
                            reject(url);
                        };

                        // Need to set different attributes depending on tag type
                        switch(tag) {
                            case 'script':
                                element.async = false;
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
                        resolve([element]);
                    });
                };
            }

            return {
                css: _load( 'link' ),
                js: _load( 'script' ),
                data: _load( 'data' )
            }
        })()

    }, {
        ready_Blobs: {
            ajax: ()=>{ return [
                "importScripts('"+_z._URL_("_z.js")+"');",
                `self.onmessage = function (event) { var rr=self.postMessage; _z.ajax({ url: event.data.url, type: "GET", dataType: "text", async: false, success: function(a,x){ x.onloadend=function(){ rr(this.responseText); }; }, }); };`
            ] },
            return: ()=>[ `self.onmessage = function (event) { self.postMessage(event.data); };` ]
        },
        ready_workers: { 'return': [], 'ajax': [] },
        runWorker: function runWorker() {
            var wArray;
            var a1 = $this.ready_workers[(wArray='ajax')].filter(x=>!(x===false||!(!x['isCalled']||!x['isDone'])));
            if( !a1.getSize() ) {
                if( !$this.ready_workers[(wArray='return')].filter(x=>!(x===false||x['isCalled'])).getSize() ) return 0;
            }

            var totalRun = 0;
            _z.for($this.ready_workers[wArray], function (i, w) {
                if( !!!w || (!!w['isCalled']) ) return;

                if( w['send'] && _z.isFunction(w['send']) ) {
                    $this.ready_workers[wArray][i].send();
                    $this.ready_workers[wArray][i]['isCalled'] = true;
                    totalRun++;
                }

                return false;
            });

            return totalRun;
        },
        newWorker: function newWorker( type ) {
            type = type || 'return';
            var $this = this;

            var _worker = { type: type },
                wType = ($this.ready_workers[type] ? type : 'return'),
                thisIndx = $this.ready_workers[wType].push( _worker );

            _worker.worker = new Worker( window.URL.createObjectURL( new Blob((this.ready_Blobs[ type ] || fns.ef)(), { type: 'application/javascript' }) ) );
            _worker.terminate = function() {
                if( _z.isFunction(_worker['done']) )
                    try {
                        _worker['done']();
                    } catch(fnError) { console.error(fnError); }

                $this.ready_workers[wType][thisIndx-1] = false;
                _worker.worker.terminate();
                _worker = {};
            };

            _worker.worker.onmessage = function(event) {
                var respText = event.data;

                if(respText && type == 'ajax')
                    resp = _z.ajaxSettings.converters.script( ( respText || "" ).replace( /^\s*<!(?:\[CDATA\[|\-\-)/, "/*$0*/" ) );

                _worker.terminate();
            };
            _worker.worker.onerror = function () {
                console.error(...arguments);
                _worker.terminate();
            };
            _worker.send = function(data) {
                _worker.worker.postMessage(data||"");
            };
            return _worker;
        },

        // eval function when document is ready
        ready: function ready( fn ) {
            var d = doc,
                w = window,
                $this = this;

            if( !_z.isFunction( fn ) ) {
                if( _z.isObject(fn) && fn['ajax'] ) {
                    var worker = $this.newWorker('ajax');
                    var worker_send = worker.send;
                    worker['isDone'] = false;
                    worker['isCalled'] = false;
                    worker.send = function() {
                        worker_send({ url: fn['ajax'] });
                    };
                    worker.done = ()=>{ worker['isDone'] = true; };
                } else return $this;
            } else {
                var worker = $this.newWorker('return');
                worker['isDone'] = false;
                worker['isCalled'] = false;
                worker.done = ()=>{ fn(); worker['isDone'] = true; };
            }

            var $DOMContentLoaded = function() {
                if(d.readyState == 'complete') {
                    if( $this.runWorker() == 1 )
                        cleanLoadinEvents();
                    else
                        setTimeout($DOMContentLoaded, 16);
                }
            };

            var cleanLoadinEvents = function() {
                if ( d.addEventListener ) {
                    d.removeEventListener( "readystatechange", $DOMContentLoaded, false );
                    w.removeEventListener( "load", $DOMContentLoaded, false );
                } else {
                    d.detachEvent( "onreadystatechange", $DOMContentLoaded );
                    w.detachEvent( "onload", $DOMContentLoaded );
                }
            };

            switch ( d.readyState ) {
                // The document has finished loading. We can now access the DOM elements.
                // But sub-resources such as images, stylesheets and frames are still loading.
                case "interactive":
                    $DOMContentLoaded();
                    break;

                // The page is fully loaded.
                case "complete":
                    $DOMContentLoaded();
                    break;

                // case "loading": // The document is still loading.
                default:
                    if( d.addEventListener ) {
                        d.addEventListener('readystatechange', $DOMContentLoaded , false );
                        w.addEventListener('load', $DOMContentLoaded , false );
                    } else {
                        d.attachEvent('onreadystatechange', $DOMContentLoaded);
                        w.attachEvent( "onload", $DOMContentLoaded );
                    }

                    break;
            }

            return $this;
        },

    } ].mix;

    // declare system
    [ _z, __zDeclare ].mix;

    // cookie system
    [ _z, { // cookie
        cookie: {
            set: function (name, value, days) {
                return this.setBySec(name, value, days * 24 * 60 * 60);
            },

            // add cookie expires within seconds
            setBySec: function (name, value, seconds) {
                if( !!!name ) return this;

                var expires = "";
                if( seconds && typeOfVar(seconds) == varsType.n ) {
                    var date = new Date();
                    date.setTime( date.getTime() + (seconds * 1000) );
                    expires = "; expires=" + date.toGMTString();
                }
                var ck = name + "=" + (value || "") + expires + "; path=/";
                document.cookie = ck;
                return this;
            },

            get: function (name) {
                var name = name || "",
                    nameEQ = name + "=";
                var ca = document.cookie.split(';').filter(Boolean),
                    cs = {};
                for( var i = 0, caL = ca.length; i < caL; i++ ) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);

                    if( name && c.indexOf(nameEQ) == 0 )
                        return c.substring(nameEQ.length, c.length);
                    else if ( !!!name ) {
                        c = c.split('=');
                        cs[ c[0] ] = c.length > 2 ? c.slice(1) : c[1];
                    }
                }

                return name ? "" : (cs || {});
            },

            delete: function (name) {
                return this.set(name, '', -1);
            }
        }
    } ].mix;
// _z }
// disable [_z, {}].extend
    // _z.extend.status = false;
    _z.extend.status = true;

// bind library
    window._z = _z;

// bind load function
    ( !window._1 )&&(window._1 = _z.ready.bind(_z));

    if( typeof define === "function" && define.amd && define.amd._z )
        define( "_z", [], function () { return _z; } );

// auto load script
    var scripts = _z('[underZ]').element( -1 ); // last
    if( scripts&&scripts['innerText'] ) // auto load
        try{ eval( scripts['innerText'] ); } catch( e ) { console.error(e); }

    // assign function
    typeOfVar.varsType = varsType;
    _z.typeOfVar = typeOfVar;
    return _z;
})( this, this.document || {
    isdocument: false,
    getRootNode: ()=>{},
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9
} );