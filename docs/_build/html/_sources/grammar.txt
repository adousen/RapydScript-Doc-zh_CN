===================
基本语法
===================

.. contents:: 目录

------------------


元组 (tuple)
------------------

``````````````````````
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

``````````````````````
元组打包
``````````````````````

元组打包操作是元组解包的反向操作。它发生在对成组元素将进行分配的时候，而不是具体怎么被分配的过程中。比如，它可以发生在变量赋值和函数返回值的时候： ::

    def fun():
        return 1, 2, 3 # 实际上返回的是元组 (1, 2, 3)

总的来说，元组打包与解包操作基本只是一个语法糖，它删除了分配逻辑中让程序显得丑陋的代码。比如，在本节开始处，交换两个变量值的操作的等价代码如下： ::

    tmp = [b, a]
    a = tmp[0]
    b = tmp[1]

列表 (List)
------------------

```````````````````````````````````
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

``````````````````````
列表的上限
``````````````````````

与在Pyhton中一样，RapydScript也有一个 range() 函数。虽然它很强大，但只是看代码的话，会发现它生成的结果并不明显。这有点让人难受，因为要花数秒钟来阅读代码，还要记住它不包含上限，这有损代码的流畅。作为补救，RapydScript从LiveScript中借用了 ``to/til`` 操作符（它也是Ruby中 ``list[../...]`` 分片操作的易读版本）。

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

``````````````````````
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

``````````````````````
while循环
``````````````````````

函数
------------------

通过上一章的 `简单的例子 <start.html#id3>`__ ，我们在写第一个RapydScript程序时，已经学会了如何在RapydScript中定义一个函数。下面我们要介绍一些更多有关RapydScript函数的知识。

``````````````````````
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

``````````````````````
内联函数
``````````````````````
你应该注意到，在上面的这个例子中，将函数定义的头部（即def()）和函数体放在了同一行。我们将其称为内联函数。它是RapydScript中，一种可以简化代码的特性。尽管使用 ``;`` 可以把多条函数语句链接起来，构成一个更长的函数。但是，还是最好问问自己是否有必要将所有语句都写在同一行中，这是一条很好的经验法则。一般来说，如果分号超过2个，答案往往是否定的。

| **注：** 在上一节的 `params对象的例子 <start.html#id5>`__ 中可以看到，在非内联函数中也可以使用分号来作为新行的分隔符。
| 

``````````````````````
参数魔法
``````````````````````

函数可选参数
``````````````````````

| **注：** 可选参数（或者缺省参数）是指如果在调用函数时不为其传递值，该参数将获得它定义时所给的缺省值。可选参数的定义时使用了传递 `关键字参数 <grammar.html#kwargs>`__ 的方式。
| 

与Python一样，JavaScript的函数参数支持可选参数。不过，JavaScript与Python不同的是，如果给函数的参数分配默认值，是不起作用的。如果你忘记给一个参数传值，JavaScript只是简单的将参数变量的值设为 undefined，怎么处理则完全交给你。如果你忘记处理，此后遇到任何类型的算术计算，你都会为此付出代价。那时，你将会最终会得到 NaN（而不是数字）、无限值或者其它奇怪的值，以及引发一个几百行由此导致的错误报告（祝你调试顺利）。

幸运的是，RapydScript允许使用更为理智的可选参数，它与Python极为相似。例如下面的例子中，允许你向函数参数color传入一个表示背景颜色的参数值，或者使用缺省的参数值的black（格式是 [r,g,b,a]）。 ::

    def setColor(color=[0,0,0,1]):
        $('body').css('background', 'rgba('+','.join(color)+')')

这里有一点需要注意，与Python略有不同的是，RapydScript会在每次调用函数的时候，都重新穿件一个单独的局部变量对象来保存函数可选参数的默认值。这使得RapydScript在这方面不是那么高效，但是可以避免扰乱现有的对象。

| **注：** 在实际的Python中，可选参数的默认值可以为一个可以调用的外部函数，函数仅在第一次执行时对可选参数进行求值。以后即使可选参数默认的外部函数返回值或代码逻辑有所改变，外部函数也不会得到重新执行，函数只会重复使用默认参数第一次传入的值。
| 
| 

变长参数列表 (``def func(*args)``)
```````````````````````````````````````````````
RapydScript的函数定义支持采用一种特殊的形式定义函数的参数，从而允许用户在调用函数时，向其传递任意数量的参数，这是Python中一种对个数变化的参数值进行收集的魔法。

虽然与Python一样，JavaScript也允许编写参数个数可变的函数，并有在此之上有自己完整实现逻辑。比如，在JavaScript中利用了这个特性的 Math.max() 、 console.log() 以及 数组的 concat() 方法等。然而，JavaScript并不像Python，它提供的支持并不直观。你必须在函数中使用一个特殊的可迭代元素，叫做 ``arguments``，它具有数组的一些属性但没有支持数组的所有功能。因此，在函数调用中，如果你想要把数组展开为一个参数列表供函数使用，你必须使用 ``.apply`` 方法，而不是用一般的方式调用这个函数。

现在，RapydScript实现了将Python风格的 ``*args`` 方式转换为JavaScript。比如，下面定义的函数接受两个参数a、b，并且把传递进来的余下参数值包装成一个列表（虽然实际转换的JavaScript代码是用一个数组实现，但不是JavaScript那样用一个蹩脚的 ``arguments`` 对象。）： ::

    def doSomething(a, b, *args):
        ...

| **注：** ``*args`` 它表示 args 接收到的是余下任意个数参数值组成的列表。比如 doSomething(a, b, c, d)，甚至更多的值。你也可以在别处预先定义一个列表 args_list = (c, d) 或 args_list = [c, d]，然后使用doSomething(a, b, *args_list)的方式调用。
| 
| 虽然，与Python有些不同，RapydScript不是采用元组来打包余下的参数，但对我们的要实现功能没有影响。
| 
| 更多变长知识可以参考 `《python官方文档中文版》 <http://www.pythondoc.com/pythontutorial27/controlflow.html#tut-arbitraryargs>`__ ，或者w3cschool的 `《python基础教程》 <http://www.w3cschool.cc/python/python-functions.html>`__ 。
| 
| 

分配参数 (``func(*args_list)``)
```````````````````````````````````````
反过来，在类似下面的函数调用中，则会将一个包装成元组或列表的多个变量（实际是一个数组）解包为独立的参数值，并依次传递给函数的多个非关键字参数或一个变长的魔法参数。 ::
    
    doSomethingElse(*args_list)

| **注：** 函数doSomethingElse参数列表除了定义成 def doSomethingElse(*args)，还可以定义为普通的函数形式 def doSomethingElse(a, b, c, d) 。
| 
| 它们都可以采用上面的调用方式。然而，定义方式取决于你在编写 doSomethingElse() 时，你是否真的知道函数的具体有哪些参数。不过，这种调用的方式最适用的情况还是函数定义时也采用变长的魔法参数时候。
| 

所以，当你得到一个由多个元素组成的列表，并且不知道列表的具体长度时，这种方式非常有用。

下面的例子中，print函数（内建全局函数，内部调用的是console.log方法）本身接受变长参数，下面是两种等价的调用打印函数print的方式： ::

    # 普通方式
    a = 'I was here'
    b = 'and there'
    print(a, b)

    # 解包列表进行分配方式
    a = 'I was here'
    b = 'and there'
    args_list = [a, b]
    print(*argslist)

在这个例子中，我们还不能完全看出是用 * 操作符的好处。但是，如果 ``args_list`` 的值是来自外部（比如来自其它函数执行的结果），我们很有可能不知道它的长度。那么， * 操作符将会非常方便。

关键字参数(``**kwargs``)
```````````````````````````
| **注：** 关键字参数 （Keyword Arguments）：是相较于位置参数而言的，它解决了在调用函数时，必须按参数位置传递参数值的问题。位置参数、关键字参数、可选参数、列表解包都是参数传递的方式（此外，Python还有将多余关键字参数传递给 `**kwargs`` 收集的方式，但RapydScript还不支持）。
| 
| 因为传递参数时使用了参数的名字，因此关键字参数有时也被称为命名参数。
| 
| 位置参数和关键字参数（命名参数）是可以联合使用的。但是，除非你很确定有这个必要，否则应避免混合使用。一般来说，位置参数一般是强制要求用户传递的参数。
| 
| 前面已经看到，关键字参数在定义函数的 `可选参数 <grammar.html#id11>`__ 时直接使用到。
| 

RapydScript所支持的关键字参数与Python不是完全的一致（没有实现 ** 操作符，它在Python中用于收集传递的参数值列表中剩余的关键字参数）。这是出于减小性能开销的考虑。因为你编写的函数99%不需要这个特性。

首先，让我来看一下RapydScript中函数调用的两种等价方式： ::

    test('baz', foo=1, 99, bar=3)
    test('baz', 99, {foo: 1, bar: 3})

| **注：** 实际上Python与此有不同，Pyhton是不允许在用命名参数的传递方式之后再用非命名参数方式传递普通参数，否则会报错，但RapydScript没有如此严格。
| 
| 尽管如此，更符合Python风格的好习惯是按照下面的普通参数、关键字参数、哈希列表（字典）的顺序传递参数，比如:  test( 'baz', bar=99, {foo: 1, bar: 3} )
|   

对于已经熟悉Python的人，可能容易体会这种调用方式的方便之处。

但就两种方式本身来说，它们都会首先在对命名参数（关键字参数）进行收集，然后将其放进一个哈希表（字典）中，并将哈希表传递给函数的最后一个参数（最后，会把剩下的参数按位置分配）。这也就是说，除非你的函数明显知道（其实是要你自己清楚这一点）收集的命名参数的哈希表位于最后一个参数中。否则，RapydScript普通函数是不能自己确定最后一个参数是什么的。

我们来看一个例子，函数的定义如下，可以看一下在上面的调用后，它的每个参数取得的值： ::

    def test(foo, bar, kw):
        print(foo)  # 'baz'
        print(bar)  # 99
        print(kw)   # {foo: 1. bar: 3}
        print(kw["foo"])   # 1

| **注：** 我们先记住RapydScript有这样的收集约定，不过只是这样收集起来，还不能实现Python中关键字参数最重要的特性。关键字参数最为重要的用途是可以在传递参数时不用考虑参数的位置，
| 

幸运地是，RapydScript有一个 ``kwargs`` 函数修饰符，可以模仿Python中传递关键字参数时忽略参数实际位置的特性。比如： ::

    def test_kwargs(foo, bar, kw):
        print(foo)  # 1
        print(bar)  # 3
        print(kw)   # {foo: 1. bar: 3}
        print(kw["foo"])   # 1

    # works: 
    test_kwargs(bar=3, foo=1, kw={foo: 1, bar: 3})



``````````````````````
函数修饰符
``````````````````````

是的，和Python一样，RapydScript支持函数修饰符，只不过目前函数修饰符还不能接受参数。尽管如此，基本修饰符的功能与在Python中的修饰符是几乎一样的：

| **注：** 从实现上讲，修饰符其实就是一个以函数为参数的函数。并且，在它内部嵌套了一个加入了新的逻辑的函数，并将其返回后用来替代被装饰的原函数。一般为了保证原函数的逻辑被执行，在嵌套的函数中会对原函数进行一次调用。
| 

:: 

    # 利用函数嵌套定义修饰符
    def makebold(fn):
        def wrapped():
            return "<b>" + fn() + "</b>"
        return wrapped

    def makeitalic(fn):
        def wrapped():
            return "<i>" + fn() + "</i>"
        return wrapped

    # 使用修饰符   
    @makebold
    @makeitalic
    def hello():
        return "hello world"

    hello() # returns "<b><i>hello world</i></b>"

| **注：** 函数修饰符是Python中的一种常用的语法。上例中在调用函数hello()时，其实相当于执行了 makebold( makeitalic( hello()) ，这其实是面向对象编程中的装饰器模式的语法支持。
| 
| 更多关于Python函数修饰符的知识可以参考 `Python官方文档 <https://docs.python.org/2/whatsnew/2.4.html?highlight=decorator#pep-318-decorators-for-functions-and-methods>`__ ，或者  `有关中文文档 <http://wiki.woodpecker.org.cn/moin/WeiZhong/DecoratorsInPython24>`__ 。
| 
| 




其它惯用法
------------------------

``````````````````````
列表的操作
``````````````````````

RapydScript在许多时候，与许多地方允许你同时使用Python风格和JavaScript风格的方法名。例如，向一个数组追加一个元素，既可以使用 ``push()`` ，也可以使用 ``append()``： ::

    arr = []
    arr.push(2)
    arr.append(4)
    print(arr) # outputs [2,4]

但为了能使用Python风格的方法，你还是需要包含RapydSript的stdlib.js文件。你有两种方式可以采用，一种是将下面的文件添加到html页面中： ::

    <script type="text/javascript" src='stdlib.js'></script>

另一种方式是在RapydScript文件的头部包含下面的一行代码：

.. code-block:: html

    import stdlib

第二种方法的优点是，你不需要手动拷贝stdlib.js库到你JavaScript目录中，它会自动加入代码到RapydScript转换的JavaScript代码中。尽管如此，当你有多个独立编译地RapydScript程序时，第一种方法还是非常有有用的，它可以避免每个文件中都包含相同的stdlib代码。

为了模仿类似python的方法，我将一部分的JavaScript本身的方法做了变化。比如，重写后的array.pop()的工作方式就与Python的pop()（或JavaScript的splice()）相似。 ::

    arr.pop()       # 移除最后一个元素 (JavaScript和Python均有的行为)
    arr.pop(2)      # 移除第3个元素 (Python中预期的行为, 但JavaScript没有)
    arr.splice(2,1) # removes third element (JavaScript中有的行为, 但Python没有)

上面最后两行代码还略微有些不同，arr.pop(2)返回的是一个元素，而arr.splice(2,1)返回的是一个只包含一个元素的数组。

````````````````````````````````
关键字
````````````````````````````````

RapydScript中的关键字，大多数可以与JavaScript进行互换的： ::

    RapydScript     JavaScript

    None/null       null
    False/false     false
    True/true       true
    undefined       undefined
    this            this

````````````````````````````````
操作符
````````````````````````````````

在RapydScript中不支持JavaScript的操作符，你可以使用它们的Python版本。下面是一个用法对照表：  ::

    RapydScript     JavaScript

    and             &&
    or              ||
    not             !
    is              ===
    is not          !==
    +=1             ++
    -=1             --
    **              Math.pow()

虽然说，JavaScript中的 ``===`` 与Python中 ``is``不是完全一样。但是，JavaScript在比较两个对象时还是比较特殊（两边值类型不同时不做转换）。

所以，你可能还会需要 ``stdlib`` 中 ``deep_eq`` 这样的函数，它可以对两个对象进行深层次的比较测试，并且在所有的类型上都可以工作，包括哈希表和数组 ::

    deep_eq([1,2,3], [1,[2,3]])     # False
    deep_eq([[1,2],3], [1,[2,3]])   # False
    deep_eq([1,[2,3]], [1,[2,3]])   # True

````````````````````````````````
三元条件表达式
````````````````````````````````

关于条件表达式话题争论了很长时间。在Python中，如果你想要在行内根据一个条件对变量进行赋值，那么你可以像下面这样写一个条件表达式的的语句： ::

    foo = "bar" if baz else 10

在JavaScript中，下面的代码具有相同的逻辑：

.. code-block:: javascript

    var foo = baz ? "bar" : 10

究竟哪种更加简洁一点，取决于个人的喜好（在大多数的 ``if`` 语句中，我喜欢首先见到的是条件，所以第二种方式对我更有用一点）。不过，第二种方式更胜一筹的地方是处理匿名函数的时候。实际上，Python不需要去处理这种情况，但RapydScirpt有时是需要的。因此，我决定在RapydScript中引入JavaScript的方式，使你可以使用与JavaScript类似的方式分配匿名函数： ::

    foo = baz ? def(): return bar; : def(): return 10

| **注：** 在Python和JavaScript中都有一个有趣的特性：短路逻辑（short-circuit logic）或者惰性求值（lazy evaluation）,它在一系列的布尔表达式中，仅计算最少的表达式来确定整个链的布尔值，从而避免无用地执行代码。三元条件表达式也有这个特性。
| 

``````````````````````
链式代码块
``````````````````````
如果在使用RapydScript的时候，还需要想办法处理一些JavaScript可以轻松处理的事情，那么RapydScript不会好用的。

JavaScript风格链式操作
``````````````````````

如果你曾使用过JavaScript或者jQuery，那么你一定见过下面的语法： ::

    function(){
        // some logic here
    }.call(this);

这段代码将会在定义之后立即执行，而不是等到将其分配给一个变量。但是，Python是完全不支持这种语法的，最为接近的可能就是： ::

    def tmp():
        # some logic here
    tmp.__call__()

虽然这不是那么差劲，但是我们还是在我们的命名空间中引入了一个临时变量。如果我们需要反复地做样的事，这样的方式会比较烦人的。正因如此，RapydScript打算做一些对于Python来说不太正统的事情，它实现了类似JavaScript的解决方案： ::

    def():
        # some logic here
    .call(this)

RapydScript 会将任何以``.``开头的语句行与正确缩进的整个代码块进行绑定。这中方式不只仅限与 ``.call()`` 方法，你还可以使用 ``.apply()`` 或者其它可以函数的方法和属性。比如，在jQuery中可以这样使用： ::

    $(element)
    .css('background-color', 'red')
    .show()

这中方式中有一个唯一的使用限制，如果你喜欢在链式调用中采用缩进，你仍然可以像下面这样使用 ``\`` 分隔符： ::

    $(element)\
        .css('background-color', 'red')\
        .show()

Python风格链式操作
``````````````````````
RapydScript实际还支持另一种替代语法，可以实现相同的功能。这种语法适合哪些习惯Python传统的人，它的代码外观是悬挂式缩进的： ::

    def(one, two) and call(this, 1, 2):
        ...

这段代码与下面的代码是等价的： ::

    def(one, two):
        ...
    .call(this, 1, 2)

也许有的人喜欢这个特性，而有的人则不会喜欢。RapydScript的目标总是希望让其独有的特性与普通的Python相比不会太过太突兀。从而使得假如你不认同RapydScript的这种特性，完全可以不使用它。

while循环的增强特性
``````````````````````
最近，do/while循环也增强了类似的链式操作特性： ::

    a = 0
    do:
        print(a)
        a += 1
    .while a < 1

在我看来，Python其实也可以吸收一下这种语法的好处。与函数一样，你也可以使用悬挂缩进的形式： ::
    
    a = 0
    do and while a < 1:
        print(a)
        a += 1

````````````````````````````````
输出语句print()
````````````````````````````````
最后，我们要介绍的就是 ``print()`` 与 ``console.log()`` 的差别。 ``print()`` 方法定义在RapydScript的stdlib库中，被设计用来模仿Python中的Print语句。 ``console.log()`` 是JavaScript版本的debug输出方法，它更加强大。但是如果只是想要快速输出，它则显得有点不方便。下面是一个例子： ::

    arr = [1,2,3,4]
    print(arr)          # [1,2,3,4]
    console.log(arr)    # [1,2,3,4]

    arr2 = [[1,2],[3,4]]
    print(arr2)         # [[1,2],[3,4]]
    console.log(arr2)   # [Array[2], Array[2]]

    hash = {'dogs': 1, 'cats': 2}
    print(hash)         # {"dogs":1,"cats":2}
    console.log(hash)   # Object


嵌入JS代码
------------------

在少数情况下，RapydScript可能没有办法让你做想做的事，那么此时你可以使用纯JavaScript代码。

这种情况下，你可以将JavaScript代码包括在一个字符串中，并且传递给 JS() 方法。不过，JS()方法并不是一个沙箱，其中的代码可以与普通的RapydScript代码进行交互： ::

    JS('a = {foo: "bar", baz: 1};')
    print(a.foo)    # prints "bar"

| **注：** 多行的代码可以使用多行字符串，即使用三引号 `"""` 。 