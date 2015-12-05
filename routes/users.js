var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Ad = require('../models/Ad');



//계정 삭제하기
/*
router.put('/delete', function(req, res, next) {
console.log('1');
  User.findOneAndRemove(req.param.id,function(err,user) {
    if (err) {
      console.log('1');
      return next(err);
    }
    res.redirect('back');
  });
});
*/





router.delete('/:id', function(req, res, next) {
  console.log('test');

  User.findOneAndRemove({_id: req.params.id}, function(err) {
    console.log('넘어가니?');
    if (err) {
      return next(err);
    }
    console.log('넘어가니?2');
    User.find({},function(err,users){
      console.log(users.id);
      res.render('user/setup',{users:users});

    });
    });
});








router.get('/ad', function(req, res, next) {
  console.log("test");
  res.render('adlogin');
});

router.post('/adlog', function(req, res, next) {
  Ad.find({}, function(err, ad) { //데이터 베이스에 저장되있는 아이디 확인용 콘솔창으로
  console.log(req.body.name);
  console.log(req.body.password);
  });
  //관리자용 로그인창
  //몽고 디비로 저장해놨던 관리자 아이디비번 비교후 맞으면 회원관리

  Ad.findOne({name:req.body.name}, function(err, ad) {
      console.log(req.body.name);
      console.log(req.body.password);
    if (err) {
      res.render('error', {message: "Error", error: err});
    } else if (!ad) {
    //  req.flash('danger', '존재하지 않는 사용자 입니다.');
      console.log('1');
      res.redirect('back');
    } else if (ad.password !==req.body.password) {
    //  req.flash('danger', '비밀번호가 일치하지 않습니다.');
      console.log('2');
      res.redirect('back');
    } else {
      User.find({},function(err,users){
        console.log(users.id);
        res.render('user/setup',{users:users});
        console.log(users.id);
        console.log(users);
      });
    }
  });
});




/* GET users listing. */
//로그인
router.get('/Login', function(req, res, next) {
  res.render('user/Login',{user:{}});
});
//설문지 만들기
router.get('/make', function(req, res, next) {
  res.render('start/makesurvey');
});
/*
module.exports = function(app, passport) {
app.post('/signin', passport.authenticate('local-signin', {
    successRedirect : '/todos', // redirect to the secure profile section
    failureRedirect : '/signin', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
};
*/
router.get('/signin', function(req, res, next) {
  res.render('user/Login');
});

/*
User.find({}, function(err, user) { //데이터 베이스에 저장되있는 아이디 확인용 콘솔창으로
console.log(user);
  });*/


router.post('/signin', function(req, res, next) {
  console.log(req.body);                      //로그인용
 User.findOne({name:req.body.name}, function(err, user) {
   console.log(user);
    //console.log(user);
    //res.end("asd");
    if (err) {
      res.render('error', {message: "Error", error: err});
    } else if (!user) {
    //  req.flash('danger', '존재하지 않는 사용자 입니다.');
      res.redirect('back');
    } else if (user.password !== req.body.password) {
    //  req.flash('danger', '비밀번호가 일치하지 않습니다.');
      res.redirect('back');
    } else {
      //req.session.name = name;

      res.render('start/index',{user: user});
    }


  });
});


//아이디 새로만들고 저장
router.get('/new',function(req,res,next){
  res.render('user/newuser',{user:""});
});

router.post('/:id', function(req, res, next) {

  User.findById({namd:req.params.name}, function(err, user) {
    if (err) {
      return next(err);
    }
    if (req.body.password === user.password) {
      user.email = req.body.email;
      user.name = req.body.name;
      user.save(function(err) {
        res.redirect('/users/' + req.params.id);
      });
    }
    //res.redirect('back');
  });

});


router.post('/', function(req, res, next) {

  var user = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });
  console.log(user);

  user.save({},function(err, doc) {
    if (err) {
      return next(err);
    }
    console.log(user.id);
    res.redirect('/users/' + doc.id);
  });

});

router.get('/:id', function(req, res, next) {
  console.log(req.param('id'));
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      user.save(function(err) { });
      res.render('start/index',{user:user});
    }
    return next(new Error('not found'));
  });
});


module.exports = router;
