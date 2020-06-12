const empty = (req, res) => {
  res.json({message: 'hi'});
};

const signup = (req, res) => {
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
