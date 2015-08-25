===================
类
===================

.. contents:: 目录

----------------------

RapydScript的类
----------------------

``````````````````````
类的定义
``````````````````````

这是RapdyScript真正精彩的部分。众所周知，JavaScript中类的实现相当地不方便。实际上，它是在普通函数基础上进行hack。有经验的用户都建议使用外部库来创建，而不是使用纯JavaScript。然而，RapydScript实现了真正的类的定义方式。

假设我们要需要一个特殊的文字输入框控件，它接受用户输入描述颜色的字符串，并相应地修改输入框的背景颜色。我们可以用下面的方式来创建： ::

    class ColorfulTextField:
        def __init__(self):
            field = $('<input></input>')
            changeColor = def(event):
                field.css('background', field.val())
            field.blur(changeColor)

            self.widget = field

这个类中DOM的行为可能不是太严密，当输入不合法的颜色时，输入框的背景会被设为最开始的颜色。虽然，增加一个错误检查逻辑可以解决，但现在我们还是先不要考虑。

``````````````````````
创建类的实例
``````````````````````

可以用下面的代码将该字段添加到页面中： ::

    textfield = ColorfulTextField()
    $('body').append(textfield.widget)

如果你习惯了JavaScript，在你的脑海中上面的代码会引发许多红色警告。因为，在纯JavaScript代码中，你必须使用 ``new`` 来创建对象。但是你不用担心，RapydScript编译器会将上面的代码编译成正确的JavaScript代码：

.. code-block:: javascript

    var textfield;
    textfield = new ColorfulTextField()
    $('body').append(textfield.widget);

RapydScript会假设你使用类来创建对象时，因此会自动在编译后的代码中加入 'new' 关键字。此外，在列表中或返回值中，你也可以轻松地创建对象，比如： ::

    fields = [ColorfulTextField(), ColorfulTextField(), ColorfulTextField()]

过去当你忘记使用关键时，会导致创建出'undefined'对象。因此，RapydSCript中类的定义方式有一个极大的好处是它可以帮你避免。还有一点需要指出，常规的DOM/JavaScript对象也可以采用这样的方式创建，比如你不需要使用new关键字来创建DOM中的image元素: ::

    myImage = Image()

``````````````````````
类的继承
``````````````````````

RapydScript中类的能力并仅不限于此，与Python一样，RapydScript支持类的继承。
假设我们需要实现一个与上面的字段工作方式相似的新字段。它不仅根据字段改变背景的颜色，而且通过一个ID为"target"的按钮来实现，这个按钮被放在字段右边。没有问题，我们可以这样： ::

    class TextFieldAffectingOthers(ColorfulTextField):
        def __init__(self):
            ColorfulTextField.__init__(self)
            field = self.widget
            submit = $('<button type="button">apply</button>')
            applyColor = def(event):
                $('#target').css('background', field.val())
            submit.click(applyColor)
            self.widget = $('<div></div>')\
                .append(field)\
                .append(submit)

有一些东西需要说一下。我们可以像在Python中一样，使用 ``Parent.method(self, ...)`` 这样的语法来调用父类中的方法。并且，我们也可以通过一些参数来确定执行调用父类中哪个方法。另外，注意上面的代码中使用 \ 操作符来打断代码行，这也是Python中保持代码行短小和易读的方法。在RapydScript中同样得到支持，但是要求保持缩进。

Python 和 RapydScript 的类之间有一个重要的差别，RapydScript不支持多重继承。可能会觉得这是一个大问题，但实际上几乎不会带来麻烦。当使用多重继承的时候，我们一般关心的仅仅是类中的少数一些方法。并且，通过JavaScript中的原型继承，RapydScript允许我们即使不通过继承，也可以复用其他类中的方法： ::

    class Something(Parent):
        def method(self, var):
            Parent.method(self, var)
            SomethingElse.method(self, var)
            SomethingElse.anotherMethod(self)

注意，Something 类没有 ``__init__`` 方法。与Python一样，该方法的定义是可选的。如果你没有定义，RapydScript会自动创建一个空的构造函数（或者在继承的类中，使用父类的构造函数）。此外注意，我们没有从 SomethingElse 类继承，但是我们却同样可以调用其方法。这也引出了下面的一点，从其他类继承的真正好处是可以自动从父类拷贝一些方法。当然，我们也会关心 `isinstance()` 方法(用在需要与非主要的父类有关的工作上)，它与JavaScript的 `instanceof()` 操作等价。

| **注：** 如果你编译时没有使用 ``--screw-ie8`` 标志，那么某个父类的构造函数会在每次创建子类的时候都执行一次。在大多数情况下，这并不会影响到你，但在某些情况下你会看到一些奇怪的副作用。例如，如果父类构造函数中有一个 ``print()`` 语句，这会导致你尽管一个实例都没有创建，但在执行到每个子类定义地方都会打印出一些内容。 ``--screw-ie8`` 选项通过增加 Internet Explorer 6-8 的兼容代码，修正了这个问题。
| 

不过，RapydScript中有一个叫 ``mixin`` 的方法，它可以让你非常方便地将指定类的方法分配给其他的类，这与Python的多重继承有几分相似。 ::

    mixin(Snake, Animal, false)     # 将Animal类中方法添加进Snake类中，但不会重写Snake类中已定义的方法
    mixin(Snake, Animal, true)      #将Animal类中方法添加进Snake类中，并重写Snake类中已定义的方法

``````````````````````
绑定参数self
``````````````````````

对RapydScript的类的总结就是，它可以按Python类的方式工作，但还有一些独特之处。比如，下面等价的两段代码： ::

    class Aclass:
        def __init__(self):
            pass

        def method(self):
            doSomething(self)

    class Aclass:
        def __init__(self):
            self.method = def():
                doSomething(self)

上面例子中的变量 ``self`` 并不是关键字，与在Python中相同，这个变量可以是任何的名字。因为在Python中，类中普通函数的第一个变量始终与类本身绑定在一起，这与JavaScript习惯使用 ``this`` 关键字不同。

不过，RapydScript 仍然支持 `this` 关键字，用法与在JavaScript中一样。比如： ::


class Main:
    def __init__(s):
        main = this
        method = def():
            main.doSomething()
        $('#element').click(method)

    def doSomething(s):
        ...

或者，用下面Pythonic的写法，利用第一参数的绑定特性，可以将上面的代码简化： ::

    class Main:
        def __init__(s):
            method = def():
                s.doSomething()
            $('#element').click(method)

        def doSomething(s):
            ...

``````````````````````
静态方法
``````````````````````

RapydScript支持Python中的静态方法。给类方法加上 ``@staticmethod`` 装饰器，则该方法在编译时不会绑定到类对象的实例中，并且还保证对该方法的只允许使用静态方式调用。 :: 

    class Test:
        def normalMethod(self):
            return 1

        @staticmethod
        def staticMethod(a):
            return a+1

所以，一些JavaScript的原生类的方法，比如 ``String.fromCharCode()`` 可以被看作是为方便开发者的静态方法。

外部类
----------------------

在同一个作用域，RapydScript会内自动地检测类的定义（只要满足其定义在被使用之前），以及在某个内部模块中定义的类（如果要使用某个模块中的类，则这个模块必须的明确引入）。

RapydScript会自动检查出使用了JavaScript的原生类的情况（比如String, Array, Date）,但遗憾的是，RapydScript没有办法检查出你使用的是到第三方库中的类。在这种情况下，你每次创建一个外部类的实例时，可能就得使用 ``new`` 关键字了。不过，RapydScript提供了使用 ``external`` 的替代方案。

将一个类标记为外部类的方法是使用 ``external`` 装饰器。你不需要在类中写具体的代码，只需要简单的 ``pass`` 语句即可： :: 

    @external
    class Alpha:
        pass

现在,无论Alpha是否定义在当前的域中，RapydScript都会将其当作类对待，在需要 ``new`` 关键字地方自动地添加，并且由 ``prototype`` 访问类的方法（可以在下一节的 ``casperjs`` 例子中看到实际使用是怎么样的）。
 除非需要指定某个方法为静态的，类中的方法一般不需要预先声明（即使声明也无非是作为个人参考，编译器会完全忽略这些内容）。 :: 

    @external
    class Alpha:
        @staticmethod
        def one():
            pass

现在 `Alpha.one` 是静态方法，但其它 `Alpha` 上的方法仍被作为普通方法来调用。

你可以在当前域的 ``Alpha`` 类中预先声明打算使用的其它方法，这不是强制的，它只是使得你的代码可以容易被其他开发者阅读。从某种层面上说，这种的 `external` 声明方式相当于 `Alpha` 的目录表。看下面的代码： :: 

    @external
    class Alpha:
        def two(): pass
        def three(): pass

        @staticmethod
        def one(): pass

正如上面提到的，这种方式只是使得你的代码容易阅读。编译器本身会忽略到除使用 ``staticmethod`` 装饰器以外的所有方法的声明。

你还可以使用 ``external`` 装饰器来忽略掉未被正确导入的RapydScript模块。但是，如果这些模块在你的管控之下，那么更好的方案还是去修正这些导入。


方法与对象的绑定
----------------------

默认情况下，RapydScript不会将方法与其定义所在的类对象绑定起来。这种行为与Python有所不同，但与JavaScript是相同的。例如，看看下面的代码： :: 

    class Boy:
        def __init__(self, name):
            self.name = name

        def greet(self):
            print('My name is' + self.name)

    tod = Boy('Tod')
    tod.greet()                 # Hello, my name is Tod
    getattr(tod, 'greet')()     # Hello, my name is undefined

``````````````````````
bind()
``````````````````````

尽管默认情况是上面这样，但是有的时候，有可能还是希望保持方法与所在对象的绑定。为此，RapydScript提供了 ``bind`` 函数。与普通 ``Function.prototype.bind`` 不同的是，RapydScript的 ``bind`` 函数能够将已经被绑定的方法重新绑定。因此，在上面例子中，我们所期望的绑定可以通过下面的方式实现： ::

    bound = bind(getattr(tod, 'greet'), tod)
    bound()                     # Hello, my name is Tod 

相应地，如果你想要取消一个方法的绑定，方法很简单，即不传递方法要绑定的对象给函数的第二个参数，而是传递 `false `。

``````````````````````
rebind()
``````````````````````

你还可以通过调用 ``rebind_all`` 在类对象初始化时自动绑定所有的方法： :: 

    class Boy:
        def __init__(self, name):
            self.name = name
            rebind_all(self)

        def greet(self):
            print('My name is' + self.name)

    tod = Boy('Tod')
    tod.greet()                 # Hello, my name is Tod
    getattr(tod, 'greet')()     # Hello, my name is To

同样地， ``rebind_all(self, false)`` 可以解绑所有的方法。

``````````````````````
--auto-bind 标志
``````````````````````

RapydScript不建议对从第三方库继承的类做自动绑定。例如 ``casperjs`` 的 ``Casper`` 类, 在RapydScript中很容易对其做下面的继承和扩展： ::  

    @external
    class Casper:
        pass

    class Scraper(Casper):
        def __init__(self):
            Casper.__init__(self)
            self.start()

    s = Scraper()
    s.thenOpen('http://casperjs.org',
        def(): this.echo(this.getTitle())
    )
    s.run()

尽管在上面的构造函数中可以调用 ``rebind_all`` ，但是会对Casper造成破坏(thenOpen方法就是需要javascript的这种闭包特性)。正因为如此，RapydScript默认不将 ``rebind_all`` 添加到构造函数里。但是，你还是可以使用 ``--auto-bind`` 编译标志使RapydScript在编译时自动地绑定方法。还有一点就是在这个标志的幕后，为保证绑定与Python中的行为相同，将牺牲一些性能以及与 ``casperjs`` 这样的库的兼容性。















































