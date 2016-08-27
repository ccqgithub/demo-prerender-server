#!/usr/bin/env node

process.env.BASIC_AUTH_USERNAME = 'season';
process.env.BASIC_AUTH_PASSWORD = '123456';
process.env.ALLOWED_DOMAINS = 'localhost,www.baidu.com';
process.env.BLACKLISTED_DOMAINS = '';

var prerender = require('prerender');

var server = prerender({
  port: 3000,
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
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

server.start();
