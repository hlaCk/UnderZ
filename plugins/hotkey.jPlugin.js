(function (root, factory) {
    var hookWith_z = { hotkey: factory(root) };

    if ( typeof define === 'function' && define.amd ) {
        define([], hookWith_z);
    } else if ( typeof exports === 'object' ) {
        module.exports = hookWith_z;
    } else {
        root.hotkey = hookWith_z.hotkey;
    }
	
    _z.declare('hotkey').method(hookWith_z.hotkey);
})(typeof global !== 'undefined' ? global : this._z2 || this.window || this.global, (function (root) {

	var codes = {
		3: "BREAK",
		8: "BACKSPACE",
		9: "TAB",
		13: "ENTER",
		16: "SHIFT",
		17: "CTRL",
		18: "ALT",
		19: ["PAUSE/BREAK", "PAUSE", "BREAK"],
		20: "CAPS LOCK",
		27: ["ESCAPE", "ESC"],
		32: "SPACE",
		33: "PAGE UP",
		34: "PAGE DOWN",
		35: "END",
		36: "HOME",
		37: ["LEFT ARROW", "LEFT"],
		38: ["UP ARROW", "UP"],
		39: ["RIGHT ARROW", "RIGHT"],
		40: ["DOWN ARROW", "DOWN"],
		44: ["PRINT SCREEN", "PRTSC"],
		45: ["INSERT", "INS"],
		46: ["DELETE", "DEL"],
		91: ["WINDOWS KEY HOME", "WINDOWS KEY", "WINDOWS", "WIN"],
		92: ["RIGHT WINDOW KEY", "RIGHT WINDOW", "RIGHT WINDOWS", "WIN"],
		93: ["WINDOWS RIGHT MENU", "RIGHT MENU", "RIGHT MOUSE MENU"],
		96: "NUMPAD 0",
		97: "NUMPAD 1",
		98: "NUMPAD 2",
		99: "NUMPAD 3",
		100: "NUMPAD 4",
		101: "NUMPAD 5",
		102: "NUMPAD 6",
		103: "NUMPAD 7",
		104: "NUMPAD 8",
		105: "NUMPAD 9",
		106: ["MULTIPLY", "*"],
		107: ["ADD", "+"],
		109: ["SUBTRACT", "-"],
		110: ["DECIMAL POINT", "NUMPAD ."],
		111: ["DIVIDE", "/"],
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NUM LOCK",
		145: "SCROLL LOCK",
		186: ["SEMI-COLON", ";"],
		187: ["EQUAL SIGN", "="],
		188: ["COMMA", ","],
		189: ["DASH", "-"],
		190: ["PERIOD", "."],
		191: ["FORWARD SLASH", "/"],
		192: ["GRAVE ACCENT", "~"],
		219: ["OPEN BRACKET", "["],
		220: ["BACK SLASH", "\\"],
		221: ["CLOSE BRACKET", "]"],
		222: ["SINGLE QUOTE", "'"],
		
		isShift: function( key ) { 
			key = _z.isObject(key) ? key['shift']&&"shift+"||"" : _z.trim(key).toLowerCase();
			return (key=_z.trim(key).toLowerCase()).indexOf("shift+")>-1 || key.indexOf("+shift")>-1 || false;
		},
		isCtrl: function( key ) { 
			key = _z.isObject(key) ? key['ctrl']&&"ctrl+"||"" : _z.trim(key).toLowerCase();
			return key.indexOf("ctrl+")>-1 || key.indexOf("+ctrl")>-1 || false;
		},
		isAlt: function( key ) { 
			key = _z.isObject(key) ? key['alt']&&"alt+"||"" : _z.trim(key).toLowerCase();
			return key.indexOf("alt+")>-1 || key.indexOf("+alt")>-1 || false;
		},
		// search for key code or name
		search: function( needle, returns ) {
			returns = returns||"auto"; // code(number) or name(string) or all(object)
			
			var result;
			// search by name
			if( _z.hasVar(this.search.BW, _z.trim(needle).toUpperCase()) )
				result = this.search.BW[ _z.trim(needle).toUpperCase() ];
			
			// search by code
			if( _z.isNumber( needle ) && !_z.hasVar(this, needle) )
				result = needle;
			
			if( !result )
			this.search.BW.each(function(k, c) {
				if( _z.isFunction(c) || _z.isFunction(k) ) return;
				
				var check = _z.isNumber( needle ) ? c : k;
				if( _z.trim(needle).toUpperCase() == _z.trim(check).toUpperCase() )
					result = c;
				
				if( result )
					return false;
			});
			
			result = result ? result : _z.trim( needle ).toUpperCase().charCodeAt(0);
			
			if( returns == "code" )
				result = _z.toNum(result);
			else if( returns == "name" )
				result = this[result] || String.fromCharCode( _z.trim(result) ).toUpperCase();
			else if( returns == "all" )
				result = { [result]: (this[result] || String.fromCharCode( _z.trim(result) ).toUpperCase()) };
			else
				result = _z.isNumber( needle ) ? 
							(this[result]&&this[result]||String.fromCharCode( _z.trim(result) ).toUpperCase()) : 
							_z.toNum(result);
			
			return _z.isArray(result) ? result.slice(-1)[0] : result;
		}
	};
	
	var hotkeys = { 
		/*code: [ 
			{ 
				code: code, 
				desc: keyDescription, 
				function: func, 
				ctrl: true|false, 
				shift: true|false, 
				alt: true|false, 
				target: element 
			} 
		]*/ 
	};
	
	// return value if (!undefined & !null) or return fix
    var fixValue = function fixValue( v, fix ) { fix = isValue(fix) ? fix : undefined;
		return (_z.isset(v) && !_z.isNull(v)) ? v : fix;
	};
	// is valid value !undefined & !null
    var isValue = function isValue( v ) {
		return _z.isset(v) && !_z.isNull(v);
	};
	
	// get registered hotkey data
    var getHotkey = function getHotkey(key, func, desc, isShift, isCtrl, isAlt, target) {
		// return all
		if( arguments.length == 0 ) return hotkeys;
		
		key = fixValue(key);
		func = fixValue(func);
		desc = fixValue(desc);
		isShift = isValue(key)&&codes.isShift(key) || fixValue(isShift);
		isCtrl = isValue(key)&&codes.isCtrl(key) || fixValue(isCtrl);
		isAlt = isValue(key)&&codes.isAlt(key) || fixValue(isAlt);
		target = fixValue(target);
		
		var code = _z.isObject(key) ? fixValue(key['code']) : key;
		var keyName = !isValue(code) ? undefined : 
			(_z.isNumber(code) ? code : _z.trim(code).toLowerCase().replaceArray(["+alt","alt+","+shift","shift+","+ctrl","ctrl+"], ""));
		
		if( isValue(keyName) ) {
			code = codes.search(keyName, "all");
			keyName = code[ Object.keys(code)[0] ];
			keyName = _z.isArray(keyName) ? keyName.slice(-1)[0] : keyName;
			code = _z.toNum( Object.keys(code)[0] );
		} else {
			code = undefined;
			keyName = undefined;
		}
		
		if( !_z.isObject(key) ) {
			key = {
				code: code,
				desc: fixValue(desc),
				function: fixValue(func), 
				ctrl: fixValue(isCtrl), 
				shift: fixValue(isShift), 
				alt: fixValue(isAlt), 
				target: fixValue(target)
			};
		} else if( isValue(key["code"]) )
			key["code"] = code;
		
		var objNdl={};
		var result=[];
		key.each(function(k, v) {
			if( isValue(this[k]) )
				objNdl[k] = this[k];
		});
		
		if( objNdl.getSize()==0 || hotkeys.getSize()==0 ) return [];
		
		var matchNeedls = function(dObj) {
			if( dObj.getSize()==0 || objNdl.getSize()==0 ) return false;
			
			var nResult = false;
			objNdl.each(function(k, v) {
				if( _z.isset(dObj[k]) && dObj[k] != this[k] )
					return (nResult = false), false;
				else if( _z.isset(dObj[k]) && dObj[k] == this[k] )
					nResult = true;
			});
			
			return !!nResult;
		};
		
		hotkeys.each(function(_code, dataArr) {
			if( dataArr.getSize()==0 ) return;
			
			// match code
			if( objNdl["code"] && objNdl["code"]!=_code ) return;
			
			_z.for(dataArr, function(eKey, data) {
				if( data['is'] && data.is(objNdl) || !data['is'] && matchNeedls(data) )
					result.push( data );
			});
		});
		
		return result;
	};
	
	var fireHotKey = function fireHotKey( event ) {
		var $arg = arguments;
		var code = event.keyCode || event.which;
		var nhotkey = {
				code: code,
				ctrl: event.ctrlKey, 
				shift: event.shiftKey, 
				alt: event.altKey, 
				target: _z(event.target)
			};
		var HKData = getHotkey(nhotkey);
		
		if( HKData.getSize() == 0 ) return false;
		
		_z.for(HKData, function(eKey, data) {
			if( data["function"] && _z.isFunction( data["function"] ) )
				if( data["function"].apply(this, [event])===false ) {
					event.stopPropagation();
					event.preventDefault(false);
					event.returnValue=false;
				}
			
		}, this);
		
		return false;
	};
	
	// plugin _z().hotkey(false) to remove hotkey
    var hotkey = function hotkey(key, func, desc, isShift, isCtrl, isAlt, target) {
		desc = desc || "";
		var $this = _z.is_z(this) ? this : undefined;
		
		if( arguments.length == 1 && _z.isObject(key) ) {
			func = fixValue(key['function']);
			desc = fixValue(key['desc']);
			isShift = fixValue(key['shift']);
			isCtrl = fixValue(key['ctrl']);
			isAlt = fixValue(key['alt']);
			target = fixValue(key['target']);
			key = fixValue(key['code']);
		}
		
		// remove element hotkey
		if( arguments.length == 1 && key === false ) {
			if( !isValue($this) ) return false;
			var nhotkey = $this.data('hotkey');
			if( !nhotkey ) return false;
			
			var code = _z.toNum( nhotkey['code'] );
			hotkeys[ code ].remove( nhotkey );
			
			if( _z.is_z( nhotkey['target'] ) ) {
				nhotkey['target'] = nhotkey['target'].not($this);
				$this.remData('hotkey');
				if( nhotkey['target'].length > 0) {
					nhotkey['target'].data('hotkey', nhotkey);
					hotkeys[ code ].push(nhotkey);
					return true;
				}
			}
			
			if( hotkeys[ code ].length==0 )
				delete hotkeys[ code ];
			
			return true;
		}
		
		if( arguments.length == 0 )
			return this;
			
		if( !_z.isFunction(func) || !isValue(key) ) return false;
		
		
		isCtrl = codes.isCtrl(key) || fixValue(isCtrl, false);
		isShift = codes.isShift(key) || fixValue(isShift, false);
		isAlt = codes.isAlt(key) || fixValue(isAlt, false);
		target = fixValue(target, $this);
		
		var keyName = _z.trim(key).toLowerCase().replaceArray(["+alt","alt+","+shift","shift+","+ctrl","ctrl+"], "");
		var code = codes.search(keyName, "all");
		keyName = code[ Object.keys(code)[0] ];
		keyName = _z.isArray(keyName) ? keyName.slice(-1)[0] : keyName;
		code = _z.toNum( Object.keys(code)[0] );
		
		var nhotkey = {
				code: code,
				desc: desc || ((isAlt?"ALT+":"")+(isCtrl?"CTRL+":"")+(isShift?"SHIFT+":"")+keyName) || "",
				function: func, 
				ctrl: isCtrl, 
				shift: isShift, 
				alt: isAlt, 
				target: target
			};
		if( getHotkey(nhotkey).getSize()>0 ) return false;
		
		nhotkey['is'] = function matchNeedls(dObj) {
			if( dObj.getSize()==0 || nhotkey.getSize()==0 ) return false;
			
			var nResult = false;
			nhotkey.each(function(k, v) {
				if( ["is", "remove"].inArray(k) < 0 )
					if( _z.isset(dObj[k]) || !isValue(v) )
						if( k == "target" && (!isValue(v) || v.filter(dObj[k]).length) )
							nResult = true;
						else if( dObj[k] != nhotkey[k] )
							return (nResult = false), false;
						else if( dObj[k] == nhotkey[k] )
							nResult = true;
			});
			
			return !!nResult;
		};
		
		hotkeys[ code ] = hotkeys[ code ] || [];
		hotkeys[ code ].push( nhotkey );
		
		if( isValue($this) )
			$this.data('hotkey', nhotkey);
		
		_z.ready(function(){
			_z( "body" ).un("keydown.hotkey", fireHotKey)
				.on("keydown.hotkey", fireHotKey);
		});

		return this;
    };
	
	if( !_z.isset(codes.search['BW']) ) {
		codes.search.BW = {};
		codes.each(function(c, k) {
			if( _z.isFunction(k) ) return;
			
			if( _z.isArray(k) ) {
				_z.for(k, function(i, k) {
					codes.search.BW[k] = c;
				});
			} else codes.search.BW[k] = c;
		});
	}
	
	hotkey["get"] = getHotkey;
	hotkey["codes"] = codes;
	hotkey["isValue"] = isValue;
	hotkey["fixValue"] = fixValue;
    return hotkey;
}));

