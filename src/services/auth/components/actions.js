const {repository} = require('./repository.js');

exports.register = (params) => {
  repository.sayHi();
  console.log(params);
}
