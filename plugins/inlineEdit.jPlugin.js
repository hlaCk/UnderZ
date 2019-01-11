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

	var IE = { $: {} };
	
    IE.inlineEdit = {
        defaults: {
            attrName: '[plgIE=?]', // attr name for container
            oldValue: '', // value
            blur: false, // submit on field blur
            autoSubmit: true, // autoSubmit
            checkOld: true, // check the old value
            allowEmpty: false, // allow to submit when the field is empty
            maxLength: false, // max length to enter
            showBtns: true, // show action buttons apply, cancel
			
			// callbacks
            submit: fns.ef,
            cancel: fns.ef,
			
			// plugin template
            tpl: '<div plgIE="inlineEdit"><div><input type="text" plgIE="input"/></div>'
				+ '<div><button plgIE="submit" >Apply</button>'
				+ '<button plgIE="cancel">Cancel</button></div></div>'
        },

        init: function init(element, options) {
            if( !this.check(element, options) ) return;
			
			this.options = _z.extend({}, this.defaults, options);
            this.element = element.hide();
            this.create(); // new instance
            this.initEvent(); // attachEvents
            return this.tplDOM;
        },

        check: function check( element ) {
            if( this.tplDOM ) // other instance exist
                if( this.options.blur ) { // call submit on blur
                    this.options.autoSubmit && this.submit&&this.submit() || this.cancel&&this.cancel();
                } else {
                    this.hook = element;
                    return;
                }
			
            return true;
        },

        // get attr name
        getAttrName: function getAttrName( attrName ) {
            return this.options.attrName.replace( '?', attrName ) || "";
        },

        // new instance
        create: function newInstance() {
            var oldValue = this.options.oldValue;
            if( !oldValue.length )
				oldValue = this.options.oldValue = this.element.text();
			
            var tplDOM = _z(this.options.tpl).first();
            tplDOM&&tplDOM.find( this.getAttrName('input') ).val( oldValue );
            if( !this.options.showBtns ) { // remove btn
                this.options.blur = true;
                this.options.autoSubmit = true;
				tplDOM&&
                tplDOM.find( this.getAttrName('submit') ).remove();
				tplDOM&&
                tplDOM.find( this.getAttrName('cancel') ).remove();
            }
            this.tplDOM = tplDOM;
        },

		// on submit
        submit: function onsubmit() {
			if( !this.tplDOM ) return;
            var options = this.options;
			
            var newvalue = _z.trim( this.tplDOM.find( this.getAttrName('input') ).val()||"" );
            if( (newvalue.length || options.allowEmpty) && (newvalue != options.oldValue || !options.checkOld) ) {
                if( _z.isFunction( options.submit ) )
					if( options.submit( this.element, newvalue ) !== false ) {
						this.element.text( newvalue );
						this.cancel( true );
					}
            } else
				this.cancel();
        },

		// on cancel
        cancel: function oncancel( force ) { force = force || false;
            if( !this.tplDOM ) return;
            var $this = this;
			
            var cancel = function () {
                $this.tplDOM.remove();
                $this.tplDOM = undefined;
                $this.element.show();
                if( $this.hook ) {
                    $this.hook.trigger('click');
                    $this.hook = undefined;
                }
            };
			
            if( !force && _z.isFunction( this.options.cancel ) ) {
				if( this.options.cancel( this.element ) !== false && this.tplDOM ) cancel();
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
            tplDOM.on('click.plgIE', $this.getAttrName('input'), function( e ) {
                e.stopPropagation();
            });
			
            // check maxLength & if enter pressed
            tplDOM.un( 'keyup.edit.plgIE' )
				.on( 'keyup.edit.plgIE', $this.getAttrName('input'), function( e ) {
					if( e.keyCode == 13 ) {
						$this.submit();
						return false;
					}
					
					// maxLength reached
					if( e.keyCode != 8 )
					if( $this.options.maxLength && _z(this).val().length > $this.options.maxLength )
						e.preventDefault(),
						_z(this).val( _z(this).val().substr(0, $this.options.maxLength) );
				});

            // catch blur
            _z( document ).un( 'click.plgIE' )
				.on( 'click.plgIE', function( e ) {
					if( e.target )
						if( e.target == $this.element.element(0) || 
							_z( e.target ).is( $this.getAttrName('inlineEdit') ) || 
							_z( e.target ).parents( $this.getAttrName('inlineEdit') ).length > 0)
					return;
					
					$this.options.blur &&
					$this.options.autoSubmit && 
					$this.submit() || $this.cancel();
				});
        }
    };

    IE.$.inlineEdit = function inlineEdit(data, options) {
        if( _z.isString(data) ) { // command
            switch( data ) {
                case 'submit':
                    IE.inlineEdit.submit&&IE.inlineEdit.submit();
				break;
                case 'cancel':
                    IE.inlineEdit.cancel&&IE.inlineEdit.cancel();
				break;
                case 'create': // new instance & return it
					return IE.inlineEdit.init( _z(this), options );
            }
        } else { // options
			options = options || _z.isObject(data) ? data : {};
			data = _z.isObject(data) ? {} : data;
			
            _z(this).on('click', function () {
				if( _z.isWindow(this) ) return false;
				
                var edit = IE.inlineEdit.init(_z(this), options);
                if( edit ) {
                    _z(this).after(edit);
                    _z(edit).find('input').first().focus()[0].select();
                }
            });
			
        }
    };
	
    return IE.$.inlineEdit;
}));

