const { spawn } = require('child_process');

const runService = async (cmd, args, env) => {
  return new Promise((res, rej)=>{
    const service = spawn('node', args, env);
    service.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    service.stderr.on('data', (data) => {
      console.error(`child stderr:\n${data}`);
    });
    service.on('exit', function (code, signal) {
      console.log(`child process exited with code ${code} and signal ${signal}`);
      service.kill('SIGTERM');
    });
    res(service);
  });
}

module.exports = runService;