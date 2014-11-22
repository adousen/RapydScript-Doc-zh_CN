===================
开始编程
===================

.. contents:: 目录

------------------

简单的例子
------------------

与JavaScript一样，RapydScript可以做从快速创建一个函数，到创建一个复杂web-app的所有事情。RapydScript可以用相同的方式，实现所有常规JavaScript能做的事情。首先，让我们来看一个想要用弹出框表达问候的函数。它的代码如下： ::

    def greet():
        alert("Hello World!")

在 `编译 <install.html#id3>`__ 之后，代码将被转换成下面的JavaScript代码：

.. code-block:: javascript

    function greet() {
        alert("Hello World!");
    }

现在，你可以在其它的JavaScript或者当前的页面中引用这个函数（比如，使用在"onclick"上）。

在页面中调用
------------------
下面一个例子中，我们来看一个斐波那契数列的计算函数： ::

    def factorial(n):
        if n == 0:
            return 1
        return n * factorial(n-1)

现在，我们把它写入我们的页面中，使我们可以与它交互。首先，我们在页面的body中添加一个input控件,以及一个用于显示输入数字的斐波那契数的div元素（将computeFactorial()绑定在它的onblur事件上）。这样，当input失去焦点之后，数字就会立即显示在div中。

**提示**：作为RapydScript的补充，atsepkov还写了一个 `RapydML <http://bitbucket.org/pyjeon/rapydml>`__ 。它是一个HTML的预编译器，与RapydScript的性质差不多。

我们继续在RapydScript代码中完成computeFactorial()函数： ::

    def computeFactorial():
        n = document.getElementById("user-input").value
        document.getElementById("result").innerHTML = factorial(n)

我们再次注意到，RapydScript可以做到所有JavaScript可以做的事，比如直接操作DOM元素。在编译之后，这个函数就是下面这样：

.. code-block:: javascript

    function computeFactorial() {
        var n;
        n = document.getElementById("user-input").value;
        document.getElementById("result").innerHTML = factorial(n);
    }

注意，在你尝试给一个变量复制的时候，RapydScript负责自动将其声明到局部作用域中。这不仅可以使你的代码变得更加简短，而且可以避免你重写全局变量错误，这是一个在JavaScript中的通常会犯的错误。了解更多关于控制变量作用域的的内容，可以查看 ``Scope Control`` 小节。

使用外部的API
------------------
除了与在python中类似的stdlib模块，RapydScript没有任何自己的api。其实也没有必要，因为我们已经有了更好的选择，那就是利用大量已有的外部API。

调用jQuery
``````````````````

比如，如果我们愿意，还可以使用jQuery重写上面的斐波那契函数。我们可以简单地像下面这样： ::

    def computeFactorial():
        n = $("#user-input").val()
        $("#result").text(factorial(n))

向外部API传递对象参数
````````````````````````````````

在许多的外部API中，都使用对象来描述输入。与在JavaScript一样，你可以很简单地使用RapydScript创建，方式与你在JavaScript中相同，只不过是以一个Python字典： 

.. code-block:: javascript

    styles = {
        'background-color': '#ffe',
        'border-left':      '5px solid #ccc',
        'width':            50,
    }

你可以像下面这样，将其传递给 jQuery： 

.. code-block:: javascript

    $('#element').css(styles)


RapydScript的另外一个特性是，你可以直接将一个函数写成一个对象的一部分。JavaScript的API经常使用一个带有 callback/handler 函数的对象作为其输入参数。RapydScript允许你创建这样的对象，并且没有怪癖的写法。例如： ::

     params = {
        width:  50,
        height: 30,
        onclick:    def(event):
            alert("you clicked me"),
        onmouseover:    def(event):
            $(this).css('background', 'red')
        ,
        onmouseout: def(event):
            # reset the background
            $(this).css('background', '')
    }

注意在函数定义完之后新的一行中的 逗号，编译需要通过它知道对象在此之后还有写有更多属性。它不能写在函数定义最后一条语句的同一行中，否则编译器会把它解析为函数的一部分。

与在Python中相似，RapydScript支持在代码中使用 分号 表示开始新的一行。因此，你也可以像下面这样，将逗号放在函数定义的最后一条语句所在的同一行中： 

.. code-block:: javascript

    hash = {
        'foo':  def():
            print('foo');,
        'bar':  def():
            print('bar')
    }

调用更多的API
``````````````````````

正是因为RapydScript可以很方便地整合原生的JavaScript库，RapydScript可以保持自身的库尽可能小的体积。例如，和原生Python一样，RapydScript没有实现字符串插值。尽管如此，在RapydScript中，你可以使用 `sprinf.js` 库(https://github.com/alexei/sprintf.js)创建相同实现： ::

    string = vsprintf('%d bottles of %s on the wall', (99, 'beer'))

查看Github项目代码 ``examples`` 目录的代码，可以看到 RapydScript 与 ``jQuery`` 、 ``jQuery-UI`` 、 ``D3`` 以及 ``Google Charts`` 整合的示例。