(function (root, factory) {
	var hookWith_z = { worker: factory(root) };
	
    if ( typeof define === 'function' && define.amd ) {
        define([], hookWith_z);
    } else if ( typeof exports === 'object' ) {
        module.exports = hookWith_z;
    } else {
        root.worker = hookWith_z;
    }
	
	_z.declare('worker').method(hookWith_z.worker);
})(typeof global !== 'undefined' ? global : this._z || this.window || this.global, (function (root) {
	
	var _zW = function ( WName ) {
		if( !!!document.querySelectorAll('script[type'+(WName?'':'^')+'=\'text\/_z-'+WName+'\']').length )
			return false;
	
		return new _zW.UnderZWorker( WName );
	};

	_zW.UnderZWorker = function UnderZWorker( WName ) {
		this.wname = WName;
		// this.scripts = document.querySelectorAll('script[type=\'text\/_z-'+this.wname+'\']');
		this.scripts = document.querySelectorAll('script[type'+(this.wname?'':'^')+'=\'text\/_z-'+this.wname+'\']');
		
		if( !!!this.scripts.length )
			return false;
		
		this.blob = new Blob(
				Array.prototype.map.call( 
					[ 
						{ textContent: "Object.defineProperty(self, 'onmsg', { set (v){ self['onmessage']=v; }, get (){ return self['onmessage']; } }); self.send = self.postMessage; " },
						...this.scripts
					],
					(oScript)=>{ return oScript.textContent; }
				),
				{ type: 'text/javascript' }
			);
		this.objectURL = window.URL.createObjectURL( this.blob );
		this.worker = new Worker( this.objectURL );
			this.worker.onmessage = this.onmsg;
			this.worker.onerror = this.error;
			this.worker.send = this.worker.postMessage;
		
		this.length = 0;
		return this;
	};

	_zW.UnderZWorker.prototype = {
				by: 'hlaCk For UnderZWorker Engine 2017',
				
				scripts: undefined,
				wname: undefined,
				worker: undefined,
				blob: undefined,
				objectURL: undefined,
				
				start: function initWorker( ) { this.worker&&this.worker.postMessage( '' ); },
				end: function shutdownWorker( ) { this.worker&&this.worker.terminate(); },
				send: function sendMessageToWorker( d ) { this.worker&&this.worker.postMessage( d ); },
				onmsg: function onReceiveMessage( m ) { console.log("receive from UnderZWorker: "+m.data); },
				error: function onError( ) {  },
				
				length: 0,
				push: [].push,
				sort: [].sort,
				splice: [].splice
			};
	
	return _zW;
}));