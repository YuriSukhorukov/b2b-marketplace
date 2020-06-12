const port 					= process.env.PORT || 8080;

const express 			= require("express");
const app 					= express();
const router        = require('express').Router();

const {
  AUTH,
  EMPTY,
} = require(`${process.env.PWD}/src/const/auth.route.const.js`);

app.use(`/${AUTH}`, require(`./auth.routes`));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get(`/${EMPTY}`, (req, res) => {
  res.status(200).send("I'm gateway");
});
