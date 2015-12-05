var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/Login', function(req, res, next) {
  console.log("test");
  res.render('adlogin');
});


module.exports = router;
