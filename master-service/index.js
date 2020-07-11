const { runService } = require('./utility/index');

runService('node', [
    `../gateway-service/index.js`
], { shell: true });