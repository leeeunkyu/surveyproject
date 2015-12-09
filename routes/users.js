var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Ad = require('../models/Ad');
var Post = require('../models/Post');
var Comment = require('../models/Comment');

/*
router.get('/count',function(req,res,next){
console.log("넘어오니?2");
  Post.find({post:req.params.id , count:req.body.count},function(err,post){
    if (err) {
      return next(err);
    }
    console.log("넘어오니?");
    post.count = post.count + 1;
    console.log(post.count);

      Post.findByIdAndUpdate(req.params.id, {$inc: {numComment: 1}}, function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/users/survey/'+ req.params.id);
      });
  });
});
*/
router.get('/count/:id',function(req,res,next){
console.log("넘어오니?2");
Post.findById(req.params.id, function(err) {
  if(err){
    return next(err);
  }
  console.log("아이디값2");
  console.log(req.params.id);
  var post = new Post({
    count1: req.body.count1,
    count2: req.body.count2,
    count3: req.body.count3,
    count4: req.body.count4,
    count5: req.body.count5
  });
  console.log("카운트값");
  console.log(post.count1);
  if(post.count1){
  post.count1 = post.count1 + 1;

  }
  if(post.count2){
    post.count2 = post.count2 + 1;
  }
  post.save(function(err) { });
  res.redirect('/users/survey/'+ req.params.id);
return next(new Error('not found'));

});
});

router.get('/survey/:id', function(req, res, next) {
console.log('1');
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    console.log("아이디값");
    console.log(req.params.id);
    Comment.find({post: post.id}, function(err, comments) {
      if (err) {
        return next(err);
      }
      if (post) {
      post.read = post.read + 1;
      post.save(function(err) { });
      res.render('start/survey',{post: post, comments: comments});
    }
  return next(new Error('not found'));
  });
});
});


router.post('/:id/comments', function(req, res, next) {
  var comment = new Comment({
    post: req.params.id,
    content: req.body.content
  });

  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    Post.findByIdAndUpdate(req.params.id, {$inc: {numComment: 1}}, function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/users/survey/'+ req.params.id);
    });
  });
});





router.post('/complete',function(req,res,next){
console.log('test');
  var post = new Post({
    surveytitle: req.body.surveytitle,
    surveycontent: req.body.surveycontent,
    surveytitle2: req.body.surveytitle2,
    surveycontent2: req.body.surveycontent2,
    surveycontent3: req.body.surveycontent3,
    surveycontent4: req.body.surveycontent4,
    surveycontent5: req.body.surveycontent5,
    surveycontent6: req.body.surveycontent6
  });

  post.save(function(err, doc){
    if(err){
      return next(err);
    }
    console.log(post.surveycontent2);
    res.redirect('/users/make');
  });
});







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
router.get('/newsurvey',function (req,res,next){
  res.render('start/makesurvey');
});







router.get('/make', function(req, res, next) {
  Post.find({},function(err,posts){
    if(err){
      return next;
    }
  res.render('start/first',{posts:posts});
});

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


/*
router.get('/signin', function(req, res, next) {
  res.render('user/Login');
});
*/


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

      req.flash('success', '로그인 되었습니다.');
      res.render('start/index',{user: user});
    }


  });
});


//아이디 새로만들고 저장

router.get('/new',function(req,res,next){
  console.log("test");
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
        res.redirect('/users/'+user.id);
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
    res.redirect('/users/'+doc.id);
  });

});

router.get('/:id', function(req, res, next) {
  console.log("tt2");
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
