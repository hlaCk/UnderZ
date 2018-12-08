/*!
 * toggleByClick v0.0.1: toggle-untoggle dom on click
 * (c) 2018 hlaCk
 * UnderZ Plugin
 */
(function (root, factory) {
    var hookWith_z = { toggleByClick: factory(root) };

    if ( typeof define === 'function' && define.amd ) {
        define([], hookWith_z);
    } else if ( typeof exports === 'object' ) {
        module.exports = hookWith_z;
    } else {
        root.toggleByClick = hookWith_z;
    }
    _z.declare('toggleByClick').method(hookWith_z.toggleByClick);
})(typeof global !== 'undefined' ? global : this._z || this.window || this.global, (function (root) {
    'use strict';

    function untoggleByClick(id) {
        id = id || false;
        if( !id && !this.length ) return false;

        var parentSel = "[togglebyclick='"+id+"']";
        var newFunc = _z(parentSel).data("toggleByClick") || "";

        if( this.length )
            parentSel = _z(this);

        if( newFunc )
            _z(parentSel).un("click",  _z(parentSel).data("toggleByClick"));

        _z(parentSel).remAttr("_tbc");
        return this;
    }
    // _z.declare('untoggleByClick').method(untoggleByClick).hook(_z.$);

    // toggleByClick
    // id > false = unbind, id > String = bind to this id
    // id = attr in dom to toggle
    // sendclick = bind & toggle
    function toggleByClick_( id, sendClick ) {
        id = id || false;
        sendClick = sendClick || false;
        if( !id ) return untoggleByClick.apply(this);

        var parentSel = "[togglebyclick='"+id+"']";
        var childSel = "["+id+"]";
        if( this.length ) {
            parentSel = _z(this);
        }

        if( _z(parentSel).data("toggleByClick") )
            untoggleByClick.apply(this, [id]);

        var newFunc = function(ev) {
            _z(childSel).toggle();
        };
        _z(parentSel).data("toggleByClick", newFunc);
        _z(parentSel).attr("_tbc", id);
        _z( parentSel ).on("click", newFunc);
        if( sendClick )
            newFunc.apply( _z(parentSel) );

        return this;
    }

    // control toggled&untoggled elm
    // toggoleMode: true = show, false = hide, EMPTY = auto
    toggleByClick_.toggleAll = function (toggleMode) {
        toggleMode = toggleMode || (toggleMode===false ? false : "auto");

        _z("[_tbc]").for(function(k, v){
            var nFun = _z(v).data("toggleByClick") || false;
            if( _z.isFunction(nFun) )
                if( toggleMode === "auto") {
                    nFun.apply(_z(v));
                } else if( !toggleMode ) {
                    var el = _z(v).attr("_tbc");
                    if( el && _z("["+el+"]").isShow() )
                        nFun.apply(_z(v));
                } else {
                    var el = _z(v).attr("_tbc");
                    if( el && !_z("["+el+"]").isShow() )
                        nFun.apply(_z(v));
                }
        });
    };

    return toggleByClick_;
}));