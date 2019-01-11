(function (root, factory) {
    var hookWith_z = { inlineEdit: factory(root) };

    if ( typeof define === 'function' && define.amd ) {
        define([], hookWith_z);
    } else if ( typeof exports === 'object' ) {
        module.exports = hookWith_z;
    } else {
        root.inlineEdit = hookWith_z.inlineEdit;
    }
	
    _z.declare('inlineEdit').method(hookWith_z.inlineEdit);
})(typeof global !== 'undefined' ? global : this._z2 || this.window || this.global, (function (root) {
	
	var crntIE;
	var activeOtherElm;
	
    var IEDefaults = {
			inputMode: "input", // input || textarea
            blur: false, // false = cancel, true = submit when click out the input
            allowEmpty: false, // allow to submit when the field is empty
            emptyString: " {  } ", // text to set if allowEmpty & value is empty
            maxLength: false, // max length to enter
            bottons: true, // show action buttons apply, cancel
			
			// callbacks
            submit: fns.ef,
            cancel: fns.ef,
			
            attrName: '[plgIE=*]', // attr name for container
            oldValue: '', // for plugin check
			
			// plugin template
            tpl: '<div plgIE="inlineEdit"><div><input type="text" plgIE="input"/></div>'
				+ '<div><textarea plgIE="textarea" ></textarea></div>'
				+ '<div><button plgIE="submit" >Apply</button>'
				+ '<button plgIE="cancel">Cancel</button></div></div>'
        };
	
    var inlineEdit = function inlineEdit(data, options) {
		var inlineEditData = {
			init: function init(element, options) {
				if( !this.check(element, options) ) return;
				
				this.options = _z.extend({}, IEDefaults, options);
				this.element = element.hide();
				this.create(); // new instance
				this.initEvent(); // attachEvents
				return this.tplDOM;
			},

			check: function check( element ) {
				if( crntIE ) // other instance exist
					if( crntIE.options.blur ) { // call submit on blur
						if( crntIE.submit )
							crntIE.submit();
						else if( crntIE.cancel )
							crntIE.cancel();
					} else {
						activeOtherElm = element;
						return false;
					}
				
				return true;
			},

			// get attr name
			getAttrName: function getAttrName( attrName ) {
				attrName = attrName || this.options.inputMode || 'input';
				return this.options.attrName.replace( '*', attrName ) || "";
			},

			// new instance
			create: function newInstance() {
				var oldValue = this.options.oldValue;
				if( !oldValue.length ) {
					var crntText = this.element.text();
					crntText = ( this.options.allowEmpty && crntText == this.options.emptyString ) ? "": this.element.text();
					
					oldValue = this.options.oldValue = crntText;
				}
				
				var tplDOM = _z(this.options.tpl).first();
				tplDOM&&tplDOM.find( this.getAttrName('input') ).val( oldValue ).hide();
				tplDOM&&tplDOM.find( this.getAttrName('textarea') ).val( oldValue ).hide();
				tplDOM&&tplDOM.find( this.getAttrName() ).show();
				if( !this.options.bottons ) { // remove btn
					tplDOM&&
					tplDOM.find( this.getAttrName('submit') ).remove();
					tplDOM&&
					tplDOM.find( this.getAttrName('cancel') ).remove();
				}
				this.tplDOM = tplDOM;
				crntIE = this;
			},

			// on submit
			submit: function onsubmit() {
				if( !this.tplDOM ) return;
				var options = this.options;
				
				var newvalue = _z.trim( this.tplDOM.find( this.getAttrName() ).trigger("keydown").val()||"" );
				var modedValue;
				if( newvalue.length || options.allowEmpty ) {
					if( _z.isFunction( options.submit ) ) {
						if( (modedValue = options.submit( this.element, newvalue )) !== false ) {
							if( modedValue && !_z.isBoolean(modedValue) ) newvalue = _z.trim(modedValue);
							
							if( options.allowEmpty && options.emptyString && _z.isEmpty(_z.trim(newvalue)) )
								this.element.text( options.emptyString );
							else
								this.element.text( newvalue );
								
							this.cancel( true );
						}
					}
				} else
					this.cancel();
			},

			// on cancel
			cancel: function oncancel( force ) { force = force || false;
				if( !this.tplDOM ) return;
				var $this = this;
				
				var cancel = function () {
					$this.tplDOM&&$this.tplDOM.remove();
					$this.tplDOM = undefined;
					crntIE = undefined;
					$this.element.show();
					if( activeOtherElm ) {
						activeOtherElm.trigger('click');
						activeOtherElm = undefined;
					}
				};
				
				if( !force && _z.isFunction( $this.options.cancel ) ) {
					if( $this.options.cancel( $this.element ) !== false && $this.tplDOM ) cancel();
				} else
					cancel();
			},

			initEvent: function addEventListeners() {
				var $this = this,
					tplDOM = $this.tplDOM;

				tplDOM.un('click.plgIE')
				// submit handle
					.on('click.plgIE', $this.getAttrName('submit'), function( e ) {
						$this.submit();
						e.stopPropagation();
					});

				// cancel handle
				tplDOM.on('click.plgIE', $this.getAttrName('cancel'), function( e ) {
					$this.cancel();
					e.stopPropagation();
				});

				// click on input
				tplDOM.on('click.plgIE', $this.getAttrName(), function( e ) {
					e.stopPropagation();
				});
				
				// check maxLength & if enter pressed
				tplDOM.un( 'keydown.edit.plgIE' )
					.on( 'keydown.edit.plgIE', $this.getAttrName(), function( e ) {
						if( e.keyCode == 27 )
							return $this.cancel(), false;
						
						if( e.keyCode == 13 && $this.options.inputMode != "textarea" )
							return $this.submit(), false;
						
						var thisVal = _z(this).val();
						// maxLength reached
						if( $this.options.maxLength && thisVal.length >= $this.options.maxLength ) {
							if ( !(
								// Allow: backspace, delete, tab, escape, enter and .
								_z.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) > -1 ||
								// Allow: Ctrl+A
								(e.keyCode == 65 && e.ctrlKey === true) || 
								// Allow: home, end, left, right
								(e.keyCode >= 35 && e.keyCode <= 39) || 
								// Allow: type when text is selected
								(this.selectionEnd != this.selectionStart)
							) ) e.preventDefault();
						
							if( thisVal.length > $this.options.maxLength )
								_z(this).val( thisVal.substr(0, $this.options.maxLength) );
						}
							
					});

				// catch blur
				_z( document ).un( 'click.plgIE' )
					.on( 'click.plgIE', function( e ) {
						if( crntIE && e.target )
							if( e.target == crntIE.element.element(0) || 
								_z( e.target ).is( crntIE.getAttrName('inlineEdit') ) || 
								_z( e.target ).parents( crntIE.getAttrName('inlineEdit') ).length > 0 )
						return;
						
						if( crntIE ) {
							if( crntIE.options.blur )
								crntIE.submit&&crntIE.submit()
							else
								crntIE.cancel&&crntIE.cancel();
						}
					});
			}
		};

        if( _z.isString(data) ) { // command
            switch( data ) {
                case 'submit': // trigger submit inlineEdit
					if( crntIE && crntIE.element.is(this) )
						return crntIE.submit&&crntIE.submit();
				break;
                case 'cancel': // trigger cancel inlineEdit
					if( crntIE && crntIE.element.is(this) )
						return crntIE.cancel&&crntIE.cancel();
				break;
                case 'create': // run inlineEdit
					return _z(this).trigger("click.plgIEInit");
				break;
            }
        } else { // options
			options = options || _z.isObject(data) ? data : {};
			data = _z.isObject(data) ? {} : data;
			
            _z(this).un('click.plgIEInit')
				.on('click.plgIEInit', function () {
					if( _z.isWindow(this) ) return false;
					
					var edit = inlineEditData.init(_z(this), options);
					if( edit ) {
						_z(this).after(edit);
						_z(edit).find( inlineEditData.getAttrName() ).first().focus()[0].select();
					}
				});
			
			_z(this).for(function(i, elm) {
				var crntText = _z(elm).text();
				if( options.maxLength && _z(elm).text().length > options.maxLength )
					_z(elm).text( _z(elm).text().substr(0, options.maxLength) );
			});
			
        }
    };
	
    return inlineEdit;
}));

