var express = require('express');
var router = express.Router();
console.log("Inside home.js");

var user = require('../models/model');

router.get('/login',function(req,res){
    console.log("login");
    res.render('login',{data: ""});
});  
router.get('/signup',function(req,res){
    console.log("signup");
    res.render('signup');
});
router.get('/dashboard',function(req,res){
    let users = req.session.user;
    if(users){
        user.list(function(err,results){
            console.log("list");
            res.render('dashboard',{opp:req.session.opp, data:users, results: results});
        });
        
    }else{      
        res.redirect('/us/login');
    }
});
router.get('/login_false',function(req,res){
    // res.render('login_false',{results : "hello"});
    user.list(function(err,results){
        console.log("list");
        res.render('login_false',{results: results});
    });
});
router.get('/chat/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    res.render('chat');
    user.test(null,id);
})
/* router.post('/chat/:id',function(req,res){
    console.log(id);
    res.render('chat');
})
 */
router.post('/signup',function(req,res){
    console.log("signup_in");
    user.user_signup(req.body,function(err,data){
        if (!err) {
            req.session.user = data;
            req.session.opp = 0;
            res.redirect('dashboard')
            // res.render('dashboard')
        }else{
            console.log("err",err);
            res.send(err);
        }
    });
});

router.post('/login',function(req,res){
    console.log("login_in");
    user.login_user(req.body,function(err,data,id){
        if (data == "error") {
            res.render('login',{data:"name/password wrong"});
        }else if(!err){
            req.session.user = data;
            req.session.opp =1;
            res.redirect('/us/dashboard');   
            // user.test(id,null);       
        }
    });
});

router.get('/logout',function(req,res){
    if(req.session.user){
        req.session.destroy(function(){
            res.redirect('/');
        })
    }
})


module.exports = router;