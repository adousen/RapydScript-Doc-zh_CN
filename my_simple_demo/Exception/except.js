(function(){
    "use strict";
    var _$rapyd$_Temp;
    function _$rapyd$_print() {
        var args = [].slice.call(arguments, 0);
        var output;
        output = JSON.stringify(args);
        if (typeof console === "object") {
            console.log(output.substr(1, output.length - 2));
        }
    }
    function _$rapyd$_extends(child, parent) {
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
    }
    var bar;
    bar = {};
    bar.foo = bar;
    try {
        _$rapyd$_print(foo);
    } catch (_$rapyd$_Exception) {
        if (_$rapyd$_Exception instanceof ReferenceError) {
            var err = _$rapyd$_Exception;
            _$rapyd$_print(err.name + ":" + err.message);
        } else {
            throw _$rapyd$_Exception;
        }
    }
    try {
        _$rapyd$_print(bar);
    } catch (_$rapyd$_Exception) {
        if (_$rapyd$_Exception instanceof TypeError) {
            _$rapyd$_print("One of foo's attributes references foo");
        } else {
            throw _$rapyd$_Exception;
        }
    }
    function MyError() {
        MyError.prototype.__init__.apply(this, arguments);
    }
    _$rapyd$_extends(MyError, Error);
    MyError.prototype.__init__ = function __init__(message){
        var self = this;
        self.name = "Error";
        self.message = message;
    };

    try {
        throw new MyError("This is a custom error!");
    } catch (_$rapyd$_Exception) {
        if (_$rapyd$_Exception instanceof MyError) {
            var err = _$rapyd$_Exception;
            _$rapyd$_print(err.name + ":" + err.message);
        } else {
            throw _$rapyd$_Exception;
        }
    }
    try {
        _$rapyd$_print(foo);
    } catch (_$rapyd$_Exception) {
        if (_$rapyd$_Exception instanceof ReferenceError
        || _$rapyd$_Exception instanceof TypeError) {
            var e = _$rapyd$_Exception;
            _$rapyd$_print(e.name + ":" + e.message);
        } else {
            throw _$rapyd$_Exception;
        }
    }
})();