var childProcess = require('child_process');
var program = require('commander');
var path = require('path');
var fs = require('fs');

var projectPath = path.join(__dirname, '../');

program
  .option('-p, --port [port]', '[prerender server:] Specify the port(3000 by default)', parseInt)
  .parse(process.argv);

// fis
var port = program.port || 3000;

// 创建目录
function mkdirsSync(dirname, mode) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname), mode)) {
      fs.mkdirSync(dirname, mode);
      return true;
    }
  }
}

function stopServer() {
  var fisCommand = 'pm2 delete prerender';
  var child;

  try {
    child = childProcess.execSync(fisCommand, {
      stdio: 'inherit'
    });
  } catch (e) {
    console.log(e.message);
  }
}

// 启动pm2
function startServer() {
  var serverJs = path.join(projectPath, 'server.js');
  var logFile = path.join(projectPath, 'logs/pm2.log');
  var fisCommand = 'pm2 start ' + serverJs + ' --name prerender -f --log='+ logFile + ' -- ' + '--port '+ port;
  var child;

  mkdirsSync(path.dirname(logFile));
  child = childProcess.execSync(fisCommand, {
    stdio: 'inherit'
  });
}

stopServer();
startServer();
