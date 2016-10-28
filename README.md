# prerender server demo

a SEO prerender server proxy with [prerender](https://github.com/prerender/prerender).

## 与 koa 一起使用

just use [koa-prerender-m](https://github.com/ccqgithub/koa-prerender-m);

## 安装配置

`git clone https://github.com/ccqgithub/prerender-server-demo.git`  

`cd prerender-server-demo`

`npm install`

`npm install -g pm2`

`node deploy/run.js --env prod` // env 表示发布的环境，对应config下相应配置

## 访问

```
http://localhost:3000/http://www.baidu.com/
```
