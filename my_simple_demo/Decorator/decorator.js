(function(){
    function makebold(fn) {
        function wrapped() {
            return "<b>" + fn() + "</b>";
        }
        return wrapped;
    }
    function makeitalic(fn) {
        function wrapped() {
            return "<i>" + fn() + "</i>";
        }
        return wrapped;
    }
    
    
    function hello() {
        return "hello world";
    }    hello = makebold(makeitalic(hello));

    $(document).ready(function() {
        $("#display").append(hello());
    });
})();