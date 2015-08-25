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
    var a, b, increment;
    a = 1;
    b = 1;
    increment = function() {
        a += b;
    };
    increment();
    _$rapyd$_print(a);
    function fun1() {
        var a, b;
        a = 5;
        b = function() {
            var c;
            a *= 2;
            c = function() {
                return a += 1;
            };
            return c;
        };
        b()();
        _$rapyd$_print(a);
    }
    fun1();
})();