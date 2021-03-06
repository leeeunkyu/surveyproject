var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Ad = require('../models/Ad');
var Post = require('../models/Post');
var Comment = require('../models/Comment');

router.delete('/edit/:id', function(req, res, next) {
  User.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    User.find({},function(err,users){
      res.render('/index');
    });
    });
});

router.get('/edit/:id',function(req,res,next) {
  User.findById(req.params.id,function(err,user){
  res.render("user/edit",{user:user});
  });
});




router.put('/signin2/:id', function(req, res, next) { //로그인
  var user = new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  });
      console.log('@@@@@@@@@@@@@@');
      user.save(function(err){
        if(err){
          return next;
        }
      res.render('start/index',{user:user});
    });
});

router.post('/count/:id',function(req,res,next){
Post.findById(req.params.id, function(err,post){
  if(err){
    return next(err);
  }
  Post.find({},function(err,value){
    if(err){
       return next(err);
     }
    post.count1 = post.count1 +1;
    if(post.count2){
      post.count2 = post.count2 +1;
    }
     post.count3 = post.count3 +1;

     if(post.count4){
       post.count4 = post.count4 +1;
     }
      if(post.count5){
        post.count5 = post.count5 +1;
    }
       post.save(function(err) {});
       console.log(post);
     });
       res.redirect('/users/survey/'+ post.id);
    return next(new Error('not found'));
    });
});









/*
router.post('/count/:id',function(req,res,next) {
Post.findById(req.params.id,function(err,doc){
Post.find({},function (err,post){


  console.log('@@@@@@@@@@');
  console.log(post.count1);
  console.log(post.surveycontent7);
  // body...
      res.redirect('/users/survey/'+doc.id);
  });
});
});
*/

router.get('/survey/:id', function(req, res, next) {
console.log('1');
console.log('@@@@@@');

  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }

    Comment.find({post: post}, function(err, comments) {
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
    surveycontent6: req.body.surveycontent6,
    value:req.body.value,
    value1:req.body.value1,
    value2:req.body.value2,
    value3:req.body.value3,
    value4:req.body.value4
  });
  post.save(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/users/make');
  });
});







//계정 삭제하제




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
    console.log(posts);
  res.render('start/first',{posts:posts});
});

});

router.post('/signin', function(req, res, next) { //로그인
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
