const empty = (req, res) => {
  console.log('Auth server got request');
  res.json({message: 'hi'});
};

const signup = (req, res) => {
  console.log('Auth server got request');
  res.send('signup page');
};

const signin = (req, res) => {
  console.log('Auth server got request');
  res.send('signin page');
};

module.exports = {
  empty,
  signup,
  signin,
}
