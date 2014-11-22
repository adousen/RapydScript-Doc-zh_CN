===================
基本语法
===================

.. contents:: 目录

------------------

元组 (tuple)
------------------

元组解包与推断
``````````````````````
与Python一样，RapydScript支持元组 打包(packing)以及解包(unpacking)时的推断与分配。

| **注：** python对元组、列表、字典等序列或可迭代对象均支持解包操作。
| 

虽然推断/隐含通常来说不太好，但有些时候可以让代码变得简洁。并且，它符合 `Python之禅 <http://blog.csdn.net/gzlaiyonghao/article/details/2151918>`__ 中所描述的指导原则：'beautiful' takes priority over 'explicit'（美的优先级高于显）。

比如，若要交换两个变量，下面的代码看起来要比显式地定义一个临时变量要简洁： ::
    
    # 先将等号右侧两个变量打包成新的元组(b, a)
    # 赋值时再将其解包并分别赋给两个新的变量a和b
    a, b = b, a 

同样，如果一个函数可以返回多个值，那么一个简单的语句就可以将其分配给多个变量： ::

    a, b, c = fun()

而不是: ::

    tmp = fun()
    a = tmp[0]
    b = tmp[1]
    c = tmp[2]

由于JavaScript不支持元组，因此RapydScript在背后，实际使用的是JavaScript数组来做元组打包和解包操作，但实现了与在Python中一样的功能。注意，只有在将元组分配给多个参数时，解包操作才会发生： ::

    a, b, c = fun()     # 做了解包操作
    tmp = fun()         # 未解包, tmp将会存储一组元素

在for循环中（参见 `for循环 <#for>`__ ），也可以做解包操作： ::

    for index, value in enumerate(items):
        print(index+': '+value)

| **注：** enumerate()是一个内建的全局函数，用于迭代产生值。在python中，所有元组、列表、字典等序列或可迭代对象均可以被enumerate操作。
| 

元组打包
``````````````````````

元组打包操作是元组解包的反向操作。它发生在对成组元素将进行分配的时候，而不是具体怎么被分配的过程中。比如，它可以发生在变量赋值和函数返回值的时候： ::

    def fun():
        return 1, 2, 3 # 实际上返回的是元组 (1, 2, 3)

总的来说，元组打包与解包操作基本只是一个的语法糖，它删除了分配逻辑中让程序显得丑陋的代码。比如，在本节开始处，交换两个变量值的操作的等价代码如下： ::

    tmp = [b, a]
    a = tmp[0]
    b = tmp[1]

列表 (List)
------------------

列表推导式 (list comprehension)
```````````````````````````````````

RapydScript的列表与JavaScript中的数组在概念上是一样的，都是可变的序列。不过，这里的列表有一些特殊的操作和用法，它们与Python中列表的特性很相像。

RapydScript同样支持列表推导式，使用的语法和Python相同。

| **注：** 列表推导式，就是利用列表创建新的列表，类似数学中的集合推导式
| 

例如，你不必像下面这样写： ::

    # 对range范围中的每个数求平方
    # 如果不是3的倍数，就将其添加到列表myArray中
    myArray = []
    for index in range(1,20):
        if index*index % 3 == 0:
            myArray.append(index*index)

这段代码可以写成： ::

    myArray = [i*i for i in range(1,20) if i*i%3 == 0]

| **注：** range函数用于创建一个指定上下限的序列（列表），产生的序列包含下限的值，但不包含上限。
| 

**提示：** 这一小节有部分内容已经移除，原因是其中的一些怪异的部分在一些旧的Python编译器中并没有。当前实现的列表推导式与普通循环的工作方式差不多。


列表的上限
``````````````````````
与在Pyhton中一样，RapydScript也有一个 range() 函数。虽然它很强大，但只是看代码的话，会发现它生成的结果并不明显。这有点让人难受，因为要花数秒钟来阅读代码，还要记住它不包含上限，这有损代码的流畅。作为补救，RapydScript从LiveScript中借用了 ``to/til`` 操作符（它也是Ruby中 ``list[../...]`` 分片操作容易阅读的版本）。

比如，下面的4行代码具有相同的作用： ::

    a = [3 to 8]
    a = [3 til 9]
    a = range(3, 9)
    a = [3, 4, 5, 6, 7, 8]

你还可以在循环中使用这种形式的序列： ::
    
    for i in [1 to 5]:
        print(i)

或者在列表推导式中使用： ::

    [i*i for i in [1 to 6] if i%2 == 0]

在编译时，``to/til`` 语句将会转换成 range()。因此，上限和下限甚至可以使用变量或表达式。 ::

    num = 5
    rng = [num to num * 2]

由于 ``to/til`` 操作符的优先级严格低于算术操作符，因此算术表达式的括号是可选的。

循环
------------------

for循环
``````````````````````

RapydScript中的循环工作方式与在Python中很相像，但与JavaScript很不相同。比如，你不能使用 ``for(i=0;i<max;i++)`` 这样的语法。不过，你可以在一个序列上使用 ``for ... in`` 语法。并且，你不用担心转换的JavaScript代码会添加一些额外不相关的东西。 ::

    animals = ['cat', 'dog', 'mouse', 'horse']
    for animal in animals:
        print('I have a '+animal)


如果想在循环中使用序列中元素的索引，你可以使用 enumerate() 函数： ::

    for index, animal in enumerate(animals):
        print("index:"+index, "animal:"+animal)

与Python相同，如果只是想根据序列中元素的索引进行操作，你可使用到 range() 函数： ::
    
    for index in range(len(animals)):    # 或者用 range(animals.length)
        print("animal "+index+" is a "+animals[index])

在编译成JavaScript基本语法的过程中，RapydScript会尽可能帮你自动对循环进行优化。所以，虽然你不能直接调用JavaScript的for语句，但也不会失去太多什么。

while循环
``````````````````````

函数
------------------

通过上一章的 `简单的例子 <start.html#id3>`__ ，我们在写第一个RapydScript程序时，已经学会了如何在RapydScript中定义一个函数。下面我们要介绍一些更多有关RapydScript函数的知识。

匿名函数
``````````````````````
与JavaScript一样，RapydScript运行我们使用匿名的函数。实际上，我们已经在前面的章节见到过（参见 `向外部API传递对象参数 <start.html#id5>`__ ），当时我们创建了一个字典的字面对象，并且直接书写代码将匿名函数赋给 'onmouseover' 和 'onmouseout'。这看起来与Python的 lambda函数很相似，不过它的语法不像lamdba那样不方便，它并限制函数的所有代码必须写在一行中。下面是两种函数定义的方式，它们实际是等价的： ::

    def factorial(n):
        if n == 0:
            return 1
        return n * factorial(n-1)

    factorial = def(n):
        if n == 0:
            return 1
        return n * factorial(n-1)

也许现在一开始还看不出有什么好处。如果放到Python中，上面这段代码还会显得有点怪，因为它不能明显表示这种函数是要被拷贝或者分配给其它对象的。但是，如果你熟悉JavaScript的话，你就知道这对程序员来说，这种语法是很有用的，特别是在处理嵌套函数的时候。

为了证明这种语法确实有用，下面我们来定义一个函数，用于创建并返回一个页面div元素。在用户按下鼠标不放的过程中，这个元素将会改变一个颜色。 ::

    def makeDivThatTurnsGreen():
        div = $('<div></div>')

        turnGreen = def(event):
            div.css('background', 'green')

        div.mousedown(turnGreen)

        resetColor = def(event):
            div.css('background', '')

        div.mouseup(resetColor)

        return div

也许第一眼看上去，匿名函数的好处还是不够明显。我们也可以创建一个匿名函数，然后分配给变量，这种方法替代方式也可以很容易做到上面的事。尽管如此，使用匿名函数最重要的是可以帮助我们迅速地表明意图：这些函数是用于将其绑定到另外的对象，既不是创建它们的主函数，也不是触发它们的逻辑，在我们的例子中，它们属于一个div对象。匿名函数最为有用的应用场景是：在一个匿名函数当前所在的对象中，创建一个在其它函数或对象中使用的元素，并且不会与当前代码混淆。

下面，我们可以借助 jQuery 的 $(document).ready() 方法（参见 `调用jQuery <start.html#jquery>`__ ），将这个自定义的div元素添加到一个页面元素中。$(document).ready() 接受一个函数作为参数，并且在页面加载完毕时对其进行调用。由于与函数名无关，因此通常传递一个匿名函数。用RapydScipt编写这段代码如下： ::

    $(document).ready( 
            def(): $("#display").append(makeDivThatTurnsGreen());
        ); 


此外，正如你在前面章节见到的，匿名函数可以用于避免创建过多的临时变量，从而让代码更简洁： ::

    math_ops = {
        add:    def(a, b): return a+b;,
        sub:    def(a, b): return a-b;,
        mul:    def(a, b): return a*b;,
        div:    def(a, b): return a/b;,
        roots:  def(a, b, c):
            r = Math.sqrt(b*b - 4*a*c)
            d = 2*a
            return (-b + r)/d, (-b - r)/d
    }

我肯定你一定同意上面的代码绝对要比先分别声明5个临时变量，然后再将它们分配给5个关键字所代表的对象要简单得多。

内联函数
``````````````````````
你应该注意到，在上面的这个例子中，将函数定义的头部（即def()）和函数体放在了同一行。我们将其称为内联函数。它是RapydScript中，一种可以简化代码的特性。尽管使用 ``;`` 可以把多条函数语句链接起来，构成一个更长的函数。但是，还是最好问问自己是否有必要将所有语句都写在同一行中，这是一条很好的经验法则。一般来说，如果分号超过2个，答案往往是否定的。

| **注：** 在上一节的 `params对象的例子 <start.html#id5>`__ 中可以看到，在非内联函数中也可以使用分号来作为新行的分隔符。
| 

函数可选参数
``````````````````````

与Python一样，JavaScript允许向函数传递可选参数。

不过，JavaScript不像Python那样，可以给函数参数分配默认值，可选参数也不能正常工作。如果你忘记给一个参数传值，JavaScript只是简单的将参数变量的值设为 undefined，怎么处理则完全交给你。如果你忘记处理，此后遇到任何类型的算术计算，你都会为此付出代价。那时，你将会最终会得到 NaN（而不是数字）、无限值或者其它奇怪的值，以及引发一个几百行由此导致的错误报告（祝你调试顺利）。

幸运的是，RapydScript允许使用更为理智的可选参数，它与Python极为相似。例如下面的例子中，允许你向函数参数color传入一个表示背景颜色的参数值，或者使用默认参数值的black（格式是 [r,g,b,a]）。 ::

    def setColor(color=[0,0,0,1]):
        $('body').css('background', 'rgba('+','.join(color)+')')

这里有一点需要注意，与Python略有不同的是，RapydScript会在每次调用函数的时候，都重新穿件一个单独的局部变量对象来保存函数可选参数的默认值。这使得RapydScript在这方面不是那么高效，但是可以避免扰乱现有的对象。

| **注：** 在实际的Python中，可选参数的默认值可以为一个可以调用的外部函数，函数仅在第一次执行时对可选参数进行求值。以后即使可选参数默认的外部函数返回值或代码逻辑有所改变，外部函数也不会得到重新执行，函数只会重复使用默认参数第一次传入的值。
| 

变长非关键字参数(``*args``)
```````````````````````````
与Python一样，JavaScript允许

关键字参数(``**kwargs``)
```````````````````````````

函数修饰符
``````````````````````

链式代码块
``````````````````````

其它惯用法
------------------------

