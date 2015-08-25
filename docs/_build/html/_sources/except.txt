=========================
异常处理
=========================

.. contents:: 目录

------------------

try/except
------------------

与Python相同，RapydScript有异常处理的逻辑。例如，在下面的代码中会输出变量 `foo` 未定义的警告： :: 

    try:
        print(foo)
    except:
        print("Foo wasn't declared yet")

捕获特定异常
------------------
        
上面实例很好，但是却只适用于捕获的异常恰好是我们期望的。思考下面的例子，如果 `foo` 被定义为一个循环引用的结构（在其属性中自引用）： :: 

    foo = {}
    foo.bar = foo

这同样会触发一个异常，但是异常原因却于完全不同。实际上，`try/except` 代码块更好的编写方式是： :: 

    try:
        print(foo)
    except ReferenceError:
        print("Foo wasn't declared yet")

如果需要，我们同样可以处理循环引用异常： :: 

    try:
        print(foo)
    except ReferenceError:
        print("Foo wasn't declared yet")
    except TypeError:
        print("One of foo's attributes references foo")

另外，我们还可以将异常中的信息输出给用户： :: 

try:
    print(foo)
except as err:
    print(err.name + ':' + err.message)，

在这个例子中， `err` 是一个JavaScript的Error对象，具有 `name` 和 `message` 属性，更多的信息可以查看 https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error 。

自定义的异常类
------------------

与在Python中相同，你还可以从Error类继承，创建一个自定义的异常类： :: 

    class MyError(Error):
        def __init__(self, message):
            self.name = 'Error'
            self.message = message

    raise MyError('This is a custom error!')


你还可以把多种异常的处理放在一个except语句块中： :: 

    try:
        print(foo)
    except ReferenceError, TypeError as e:
        print(e.name + ':' + e.message)


try/except/finally
------------------
 
RapydScript中的 `try/except/finally` 与在Python 3中基本相似，唯一不同是没有 `else`（实现它没有似乎太大用处）。

抛出异常
------------------
与在Python和JavaScript中一样，异常可以相互嵌套，并且可以使用 `raise ` 语句再次向用户抛出将异常： :: 

    try:
        print(foo)
    except ReferenceError as e:
        if e.message == 'foo is not defined':
            print('undefined')
        else:
            raise e
    finally:
        # reset foo
        foo = 'bar'

与Python相似（但这与常规的JavaScript不同），你可以仅使用 `raise` 关键字就可以在 `except` 语句块抛出最后一次捕获的异常。
























