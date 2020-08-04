const { runService } = require('./src/utility/index');

runService('node', [`../gateway-service/index.js`], { shell: true });
runService('node', [`../auth-service/index.js`,], { shell: true });
runService('node', [`../market-service/index.js`,], { shell: true });