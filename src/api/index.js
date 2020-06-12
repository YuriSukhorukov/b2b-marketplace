var router = require('express').Router();

const apiVersion = 'v1';

router.use(`/${apiVersion}/auth`, require(`./${apiVersion}/auth.route.js`));

module.exports = router;


// var router = require('express').Router();
//
// const apiVersion = 'v1';
//
// router.use(`/${apiVersion}/wiki`, require(`./${apiVersion}/wiki`));
// router.use(`/${apiVersion}/users`, require(`./${apiVersion}/users`));
// router.use(`/${apiVersion}/offers`, require(`./${apiVersion}/offers`));
// router.use(`/${apiVersion}/tickets`, require(`./${apiVersion}/tickets`));
// router.use(`/${apiVersion}/profiles`, require(`./${apiVersion}/profiles`));
// router.use(`/${apiVersion}/articles`, require(`./${apiVersion}/articles`));
// router.use(`/${apiVersion}/customers`, require(`./${apiVersion}/customers`));
//
// router.use(function(err, req, res, next){
//   if(err.name === 'ValidationError'){
//     return res.status(422).json({
//       errors: Object.keys(err.errors).reduce(function(errors, key){
//         errors[key] = err.errors[key].message;
//
//         return errors;
//       }, {})
//     });
//   }
//
//   return next(err);
// });
//
// module.exports = router;
