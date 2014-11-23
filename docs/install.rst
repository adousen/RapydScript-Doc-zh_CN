===================
安装与使用
===================

安装编译器
------------------
首先，确认你已经正确安装了最新版本的 NodeJS_ (在安装完后，你可能需要重启你的系统)。有可能你还需要安装optimist库。

 - 使用NPM安装一个命令行程序：

    .. code-block:: bash

        npm install rapydscript -g

 - 使用NPM安装在当前项目下

    .. code-block:: bash

        npm install rapydscript

 - 从Git安装

    .. code-block:: bash

        git clone git://github.com/atsepkov/RapydScript.git
        cd RapydScript
        npm link . 

如果你是OSX系统，你可以使用相同的命令(如果有问题请告诉我们)。如果你使用的是Windows系统，在安装node.js和Git，你应该也能使用相似的命令。

编译代码
------------------
在你安装RapydScript编译器后，程序编译只需运行一条像下面这样的命令：

.. code-block:: bash

    rapydscript <location of main file> [options]

默认输出到STDOUT。通过设置 ``--output`` 参数，也可以输出到指定文件。生成文件以后，就可以像普通的JavaScript文件那样，在html页面中对其进行引用。如果你只是想要使用RapydScript中的类和函数的话，那么只做这些就可以了。

如果你想使用额外的Python方法，比如 ``range(), print(), list.append(), list.remove()`` ，那么你还需要将RapydScript的 ``stdlib.js`` 链接到你的html页面中。这里有两种方法：一种是将JavaScript文件包含到你的HTML代码中；另外一种方法是在代码中使用 ``import`` 语句，然后让RapydScript编译器自动将有关代码提取并加入到你的代码中。


RapydScript编译器支持输入多个文件进行处理。建议你先指定输入文件，然后在指定可选参数。RapydScript编译器将会把多个文件放入一个序列中进行处理，然后应用所有指定的选项。所有文件的代码都被解释到同一个全局作用域中。也就是说，从一个文件对另一个文件中声明的变量/函数进行的引用是得到正确匹配的。

如果你想要从STDIN读取，则传递一个破折号替代输入文件即可。

可用选项如下:

-o, --output             输出文件 (默认为 STDOUT).
-b, --bare               去除对生成代码作用域进行保护的包装器。
-p, --prettify           输出整齐的代码，或者指定一些输出选项。[string]
-n, --namespace-imports  pythonic的import方式 (试验中)
-v, --verbose            详细信息[boolean]
-V, --version            打印完rapydscript的版本号就退出。[boolean，可以指定true或false]
-t, --test               运行单元测试，使用时确保编译器生成可用的代码。
-m, --omit-baselib       从已生成代码中去除基础库的代码, 使用时确认代码中包含有baselib.js的代码。
-i, --auto-bind          自动绑定方法到它们所属的类(这更加Pythonic, 但可能会收到其他JS库的干扰)
--screw-ie8              编译优化Optimize compilation, 牺牲了与其它老的编译器的兼容性。

其余的选项都是由UglifyJS提供，但目前还有没有全部测试通过，原因是RapydScript与UglifyJS的AST（语法树）不相同。这些选项最终会被移除，或者对与RapydScript有关的做一定的修改。

下面是一个典型的编译命令：

.. code-block:: bash

    rapydscript helloworld.pyj -o helloworld.js

.. _NodeJS: http://nodejs.org/