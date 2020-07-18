const { runService } = require('./utility/index');

runService('node', [`../gateway-service/index.js`], { shell: true });
runService('node', [`../auth-service/index.js`,], { shell: true });