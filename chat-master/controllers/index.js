var express = require('express');
var router = express.Router();
console.log("Inside index.js");

router.use('/us',require('./home'));
router.get('/',function(req,res){
    let user=req.session.user;
    if(user){
        res.redirect('/us/dashboard');
        return;
    }
    res.render('view');
});

module.exports = router;