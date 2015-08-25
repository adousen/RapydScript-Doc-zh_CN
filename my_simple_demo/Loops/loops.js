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
    var newDom, a;
    a = 0;
    while (a < 5) {
        _$rapyd$_print(a);
        a += 1;
    }
    a = 5;
    newDom = $("<div></div>");
    do {
        newDom.append(a + ": from do-while</br>");
        a += 1;
    } while (a < 5);
    $(document).ready(function() {
        $("#display").append(newDom);
    });
})();