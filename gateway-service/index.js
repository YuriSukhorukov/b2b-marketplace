const {appConfig}       = require('./config.json');
const app               = require('./app');

const port 				= process.env.PORT || appConfig.port;

app.listen(port, () => {
  console.log(`API Gateway server listening on port ${port}`);
});