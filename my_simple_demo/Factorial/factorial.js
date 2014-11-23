(function(){
    function greet() {
        alert("Hello World!");
    }
    function factorial(n) {
        if (n == 0) {
            return 1;
        }
        return n * factorial(n - 1);
    }
    function computeFactorial() {
        var n;
        n = document.getElementById("user-input").value;
        document.getElementById("result").innerHTML = factorial(n);
    }
})();