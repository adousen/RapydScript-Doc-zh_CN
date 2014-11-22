(function(){
    function makeDivThatTurnsGreen() {
        var div, turnGreen, resetColor;
        div = $("<div></div>").text("press on it to see the color change");
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
    $("#display").append(makeDivThatTurnsGreen());
    $(document).ready(function() {
        $("#display").append(makeDivThatTurnsGreen());
    });
})();