var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send(`I'm Auth`);
})

router.get('/signup', function (req, res) {
  res.send('Signup page');
});

router.get('/signup', function (req, res) {
  res.send('Signup page');
})

module.exports = router;
