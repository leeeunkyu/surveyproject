var express = require('express');
var router = express.Router();
var User = require('../models/User');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SURVEY' });
});

router.get('/facebooklogin', function(req, res, next) {

  User.find({},function(err,user){
    console.log("시작@@@@@@@@@@@@@@@");
    console.log(user);
  res.render('start/index', {user:user});
  });

});



module.exports = router;
