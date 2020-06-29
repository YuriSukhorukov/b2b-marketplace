const {register} = require(`./actions.js`);

const empty = (req, res) => {
  res.json({message: 'hi'});
};

const signup = (req, res) => {
  console.log(`login: ${req.query.login}`);
  console.log(`password: ${req.query.password}`);
  register({...req.query});
  res.send('signup page');
};

const signin = (req, res) => {
  res.send('signin page');
};

module.exports = {
  empty,
  signup,
  signin,
}
