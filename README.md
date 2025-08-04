# qlindrop3.0
[Original HomePage](https://www.qilindrop.cn)\
[Original DEMO](https://qilindrop.cn/)\
Based on the original repository [qilindrop](https://github.com/linzxcw/qilindrop.git), with several issues fixed and improvements made. This version includes Internet support, fixes the bug with Firefox receiving files, and resolves the connection interruption issue when selecting files on mobile devices.

## How to run
Download the repository in a folder, `cd qilindrop`, install all dependencies with `npm i` and use this command: `node index.js`.

## Run within your ip
Use this command, instead, to run not locally but in your public "sharable" ip: `node index.js public`.\
Make sure to check your ip address using your OS command.

## How to use
By default, it is used inside the LAN.\
Users who are not in the same LAN can establish a connection by entering the same room name.\
Enter a blank room name to return to LAN mode.


## 中文安装步骤：
1、命令行运行git clone https://github.com/DreamKex/qilindrop.git ,或者在首页的code按钮，下载压缩包解压。\
2、安装nodejs框架，百度有详细教程，此处略过。\
3、进入qilindrop文件夹\
      `cd qilindrop`\
4、npm安装模块\
      `npm i`\
5、运行js文件\
      `node index.js`\
6、没有报错的话，打开本机ip地址的3000端口，例如：192.168.1.6:3000\
7、连接同一内网，使用其他设备打开上述网址，如果能相互发现即安装成功。

## 使用Docker Compose运行
1、确保已安装Docker和Docker Compose
2、在项目根目录运行以下命令构建并启动服务：
      `docker-compose up -d --build`
3、服务启动后，访问 http://localhost:3000 或 http://<您的IP地址>:3000
4、停止服务：
      `docker-compose down`

## 修改内容清单
1. 修复移动端浏览器，选择文件造成通讯中断问题
2. 增加页面日志查看器
3. 修复via浏览其中加载慢问题
4. 修改日志查看器开关通过环境变量控制，环境变量中增加`LOG_BUTTON_VISIBLE=true`即可开启
5. 修复了设备名称生成数组越界造成undefined问题
