## 小程序留言板

### 简介

这是我去年写的小程序，当初是公众号没有留言功能，所以写了这么一个小程序，因为当初还不会用thinkphp就用这种方法完成了后端。不过还是能用，如果你需要的话可以把后台用其他方法重新写出来。

### 环境

应该是php版本大于等于5.6都可以。MySQL版本是5.6。

### 配置

要配置以下几个方面：

1. server文件夹内的文件放到一个目录里面。
2. 把sql文件导入到数据库。
3. 在conn.php文件里配置数据库
4. 在info.php里填写小程序的APPID和APPKEY。
5. 在小程序的app.js文件里设置你的后端目录，目录必须以斜杠结束。
6. 最后记得把自己的域名在小程序后台加到白名单就OK！

### 向导

add_board.php文件的最后几行有几行代码已被注释掉了，作用是当你新建留言板时它会自动帮你添加一条留言。如果你需要，可以去掉注释并利用，记得修改网址。

help.php文件你可以加以开发，小程序主页有个按钮，点击那个按钮后小程序就会跳转到help.php里的一个网址。

[Github仓库](https://github.com/abdwhp/massage-board)

[Gitee仓库](https://gitee.com/abdwhp/massage-board)

