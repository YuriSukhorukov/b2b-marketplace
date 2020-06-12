const port 					= process.env.PORT || 8080;

const express 			= require("express");
const app 					= express();
const router        = require('express').Router();

app.use(`/`, require(`./components/routes`));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
