===================
模块和库
===================

.. contents:: 目录

----------------------


模块
----------------------

``````````````````````
模块的导入
``````````````````````

RapydScript的模块系统的工作方式与Python几乎相同。模块文件以 ``.pyj`` 为后缀，而包是包含 ``__init__.pyj`` 文件的目录。

唯一需要注意的就是，``*`` 符号的导入方式目前还不被支持（这是设计上的考虑，``*`` 号导入很容易被滥用）。

另外，目前使用 ``as`` 的定义别名目前也不被支持，但这已在我的TODO列表上了。


``````````````````````
模块的编写
``````````````````````

与Python相同，RapydScript允许将其他模块的代码导入当前代码中。

对于还不熟悉模块导入的人来说，我们可以设想正在编写的一个上千行代码的大项目。我们当然可以把所有代码都放在一个文件中，但是这样可能就会不清晰（特别是在多个开发者参与的项目中）。不同的是，我们可以通过划分，将代码放进不同的文件里。

例如，我们假设编写的是一个视频游戏项目，并且我们编写了一个继承'BasicCharacter'类的模块，这个模块在NPC、monster以及主角等角色的代码中都有使用。并且，我们将这个类的代码保存在Basic.pyj模块文件中（这是RapydScript最喜欢的扩展方式）。现在，我们在另一个模块中创建主角类： :: 

    from Basic import BasicCharacter

    class MainCharacter(BasicCharacter):
        """
        This is the main character class, similar to basic but it implements attack and hp
        """
        def __init__(self):
            BasicCharacter.__init__(self)
            self.hp = 100
            self.damage = 10

        def attack(self, something):
            something.getHurt(self.damage)

        def getHurt(self, damage):
            self.hp -= damage

使用RapydScript的导入方式，你不必担心需要将多个独立的JavaScript文件包含进html文件中， 因为所有.pyj文件中的代码都会被融入到一个单独.js文件，只需要将它其包含进页面代码即可。这个.js文件将与输入RapydScript编译器的.pyj文件同名。

RapydScript默认已经加入了多个可被导入的模块，比如 ``stdlib`` 、 ``yql`` 。你可以通过查看模块代码中的内嵌示例文档，了解它们如何使用。


代码库
----------------------

``````````````````````
使用外部JavaScript库
``````````````````````
我们知道Python主要的强大之处在于它为开发者提供了大量可用的库，但这只被少数 ``Python-in-a-browser`` 所理解。在浏览器中都是以JavaScript为王，并且无论社区为特定的项目编写了多少的库文件，现成可用的JavaScript库的数量总是会超过它们。正因如此，从一开始RapydScript的设计就保持与JavaScript和DOM的集成。事实上，用 ``underscore.js`` 替代RapydScript的 ``stdlib`` 同样可以工作良好。一些开发者可以尝试这样做，总之 ``underscore.js`` 也是非常Pythonic和完整的库。同样， ``sprintf.js`` (https://npmjs.org/package/sprintf-js) 也能够用在RapydScript中实现Python的字符串插值。

正因如此，我们总是保持RapydScript的附件尽可能小。RapydScript最强大之处是很容易与JavaScript和DOM集成，这使得我可以保持理智，并且不再重编写那些已存在的库。

``````````````````````
可用的标准库
``````````````````````
但是，这并不意味着RapydScript不能编写python式的库。为了证明这一点，我克隆并实现了一些轻量级的流行的Python库，并将其捆绑到RapydScript中，你可以在源代码的 ``src`` 目录找到它们，主要包含下面的这些库： :: 

    stdlib/stdlib2      # see stdlib section
    math                # 基本实现了Python的 math 库的所有功能
    re                  # 基本实现了Python的 re 库的所有功能
    unittest            # 基本实现了Python的 unittest 库的所有功能
    random              # 实现了Python的 unittest 库的大多数功能
    yql                 # 能够运行Yahoo Query Language请求的轻量级的库

在大多数情况下,这些库函数的实现逻辑与各个版本的Python完全相同。需要格外提醒的一点是， ``unitest`` 库中的类需要与 ``global``（nodejs） 或 ``window``（浏览器） 对象绑定，以使其能被 ``unittest.main()`` 取得。 ``unitetest.pyj`` 文件中有这方面的用例。如果社区中的其他成员想要实现更好的库，我是很高兴将他们包含进来的（这也是很有意思的， ``re.pyj`` 就是一个好例子）。

但还是要强调，与其他大多数Python至JavaScript编译器不同，RapydScript并不完全需要完整的库，因为本来就已经有大量原生JavaScript库可以使用。






























