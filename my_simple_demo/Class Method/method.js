(function(){
    "use strict";
    var _$rapyd$_Temp;
    function _$rapyd$_extends(child, parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
    }
    function _$rapyd$_print() {
        var args = [].slice.call(arguments, 0);
        var output;
        output = JSON.stringify(args);
        if (typeof console === "object") {
            console.log(output.substr(1, output.length - 2));
        }
    }
    function getattr(obj, name) {
        return obj[name];
    }
    function _$rapyd$_bind(fn, thisArg) {
        var ret;
        if (fn.orig) {
            fn = fn.orig;
        }
        if (thisArg === false) {
            return fn;
        }
        ret = function() {
            return fn.apply(thisArg, arguments);
        };
        ret.orig = fn;
        return ret;
    }
    function _$rapyd$_rebindAll(thisArg, rebind) {
        if (typeof rebind === "undefined") {
            rebind = true;
        }
        for (var p in thisArg) {
            if (thisArg[p] && thisArg[p].orig) {
                if (rebind) {
                    thisArg[p] = _$rapyd$_bind(thisArg[p], thisArg);
                } else {
                    thisArg[p] = thisArg[p].orig;
                }
            }
        }
    }
    var tod, bound, tod2;
    function makeDiv() {
        makeDiv.prototype.__init__.apply(this, arguments);
    }
    makeDiv.prototype.__init__ = function __init__(){
        var s = this;
        s.method = function() {
            return s.makeDivThatTurnsGreen();
        };
    };
    makeDiv.prototype.makeDivThatTurnsGreen = function makeDivThatTurnsGreen(){
        var s = this;
        var div, turnGreen, resetColor;
        div = $("<div></div>").text("Press on it to see the change of color");
        turnGreen = function(event) {
            div.css("background", "green");
        };
        div.mousedown(turnGreen);
        resetColor = function(event) {
            div.css("background", "");
        };
        div.mouseup(resetColor);
        return div;
    };

    $(document).ready(function() {
        $("#display").append(new makeDiv().method());
    });
    function Boy() {
        Boy.prototype.__init__.apply(this, arguments);
    }
    Boy.prototype.__init__ = function __init__(name){
        var self = this;
        self.name = name;
    };
    Boy.prototype.greet = function greet(){
        var self = this;
        _$rapyd$_print("My name is" + self.name);
    };

    tod = new Boy("Tod");
    tod.greet();
    _$rapyd$_print(getattr(tod, "name"));
    bound = _$rapyd$_bind(getattr(tod, "greet"), tod);
    bound();
    function Boy2() {
        Boy2.prototype.__init__.apply(this, arguments);
    }
    Boy2.prototype.__init__ = function __init__(name){
        var self = this;
        self.name = name;
        _$rapyd$_rebindAll(self);
    };
    Boy2.prototype.greet = function greet(){
        var self = this;
        _$rapyd$_print("My name is" + self.name);
    };

    tod2 = new Boy2("Tod2");
    tod2.greet();
    getattr(tod2, "greet")();
})();