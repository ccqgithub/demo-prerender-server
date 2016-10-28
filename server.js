#!/usr/bin/env node

var program = require('commander');
var prerender = require('prerender');

// 参数
program
  .option('--env [env]', '[koa server:] Specify the env(local by default)')
  .parse(process.argv);

var config = require('./config/' + program.env);

// 设置环境变量给prerender插件
process.env.BASIC_AUTH_USERNAME = config.basic_auth_username;
process.env.BASIC_AUTH_PASSWORD = config.basic_auth_password;
process.env.ALLOWED_DOMAINS = config.allowed_domains;
process.env.BLACKLISTED_DOMAINS = config.blacklisted_domains;

var server = prerender({
  port: config.port,
  workers: 1,
  iterations: 40,
  softIterations: 30,
  cookiesEnabled: true,
  logRequests: false,
  pageDoneCheckTimeout: 300,
  resourceDownloadTimeout: 10000,
  waitAfterLastRequest: 500,
  jsTimeout: 10000,
  jsCheckTimeout: 300,
  noJsExecutionTimeout: 3000,
  evaluateJavascriptCheckTimeout: 300
});

// <meta name="prerender-status-code" content="302">
// <meta name="prerender-header" content="Location: http://www.google.com">
server.use(prerender.sendPrerenderHeader());

server.use(prerender.basicAuth());
server.use(prerender.whitelist());
server.use(prerender.blacklist());
server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

server.start();
