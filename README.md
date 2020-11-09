# rss-to-dingtalk

>   转发RSS到钉钉

转发RSS到钉钉，通过轮询来推送最新RSS

## 运行环境

-   node  >= 12

## 安装

从 [releases](https://github.com/CaoMeiYouRen/rss-to-dingtalk/releases) 下载 index.js 文件即可运行。

本项目采用 webpack 打包，因此无需额外安装 node_modules 即可运行。

```
node index.js
```

### 配置

#### 环境变量

```ini
#配置 .env 文件
# 一轮访问后的延时
SLEEP_TIME=60000
# 访问的延时
API_SLEEP_TIME=7000
# 钉钉推送
# 群机器人 ACCESS_TOKEN
DINGTALK_ACCESS_TOKEN=''
# 加密 SECRET ，可选，但是建议使用
DINGTALK_SECRET=''
```

#### 订阅源

在项目根目录编写 subscribeList.txt 文件，每一行是一条订阅源

```txt
https://rsshub.app/weibo/user/6355669027
https://rsshub.app/bilibili/user/dynamic/10822025
```

PS：除此之外的配置项是无效的

## 使用效果

备注：出于优化用户体验的考虑，一个订阅在一轮推送中最多推送1条

![mark](http://cdn.cmyr.ltd/blog/20201109/yGhVQIverEzK.png?imageslim)

## 关于

-   为什么会有这个项目
    -   和 [bili-dynamic-forward](https://github.com/CaoMeiYouRen/bili-dynamic-forward) 类似，也是想整个推送器
    -   无聊之下的开发成果

## 作者


👤 **CaoMeiYouRen**

* Website: [https://blog.cmyr.ltd](https://blog.cmyr.ltd)
* GitHub: [@CaoMeiYouRen](https://github.com/CaoMeiYouRen)

## 支持

如果觉得这个项目有用的话请给一颗⭐️，非常感谢

## 📝 License

Copyright © 2020 [CaoMeiYouRen](https://github.com/CaoMeiYouRen).<br />
This project is [MIT](https://github.com/CaoMeiYouRen/rss-to-dingtalk/blob/master/LICENSE) licensed.

