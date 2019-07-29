## 前言
本项目基于[SwitchHosts](https://github.com/oldj/SwitchHosts)，在原有功能上额外拓展了自动切换nginx配置的功能，目前暂且支持`macOS`, windows版本正在开发中

那么我们来看看二次开发专用版SwitchHost增加了什么功能吧~

## 新的创建类型

下图所示，我们创建规则可以新增Nginx类型

![image.png](https://upload-images.jianshu.io/upload_images/8032324-f77b4d0a80718bc3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##  新的侧边看板

Nginx处于新的看板之中，同时，为了方便你的查找，我们可以展开收起看板列表

![image.png](https://upload-images.jianshu.io/upload_images/8032324-091fec4a205e0772.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/8032324-f6e8da4e76b89dd2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 自动的Nginx启动关闭

我们点击开关的时候，会自动启动或者重启你的Nginx,当没有任何开关打开的时候，则会自动关闭Nginx服务器，节约你电脑的性能哦（因为Nginx的特殊性，不像host可以多个，所以只能开启一个哦，程序已经处理了）

![image.png](https://upload-images.jianshu.io/upload_images/8032324-1233be5c0693a938.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## Nginx专有编辑面板

采用Nginx专有编辑面板，方便你快速编辑你本地的Nginx配置文件

![image.png](https://upload-images.jianshu.io/upload_images/8032324-fbe8a66747ee43c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 支持从顶部菜单快捷切换Nginx
![image.png](https://upload-images.jianshu.io/upload_images/8032324-9144d9659d4b48a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

TODO List
-   ~~兼容原先的hosts数据~~
-   ~~配置Nginx列表~~
-   ~~自动重启Nginx~~
-   ~~在Tray中切换Nginx~~
-   支持其他操作系统

## 构建项目
- clone 该项目
- npm run build-and-make 
- dist目录将会创建对应的app以及dmg,使用即可
 
当然，也可以直接使用我提前打包好的版本
下载地址: [https://pan.baidu.com/s/1R6zE6K4L7oAjdqDZYdjmSg] 提取码: hary



