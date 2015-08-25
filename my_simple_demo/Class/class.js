(function(){
    function _$rapyd$_extends(child, parent) {
        child.prototype = new parent;
        child.prototype.constructor = child;
    }
    function ColorfulTextField(){
        var self = this;
        var field, changeColor;
        field = $("<input></input>");
        changeColor = function(event) {
            console.log(field.val());
            field.css("background", field.val());
        };
        field.blur(changeColor);
        self.widget = field;
    };


    $(document).ready(function() {
        var textfield;
        textfield = new ColorfulTextField();
        $("#display").append(textfield.widget);
    });
})();