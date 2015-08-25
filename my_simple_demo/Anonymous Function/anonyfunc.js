(function(){
    "use strict";
    var _$rapyd$_Temp;
    function makeDivThatTurnsGreen() {
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
    }
    $(document).ready(function() {
        $("#display").append(makeDivThatTurnsGreen());
    });
})();