const { runService } = require('./src/utility/index');

runService('node', [`../gateway-service/index.js`], { shell: true });
runService('node', [`../auth-service/index.js`,], { shell: true });
runService('node', [`../offer-service/index.js`,], { shell: true });