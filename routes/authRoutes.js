const express=require('express');
const User = require('../models/user');
const router = express.Router();
const passport =  require('passport');
const flash =  require('connect-flash');

//for sign up page/form
router.get('/register' ,(req,res)=>{
    res.render('auth/signup', {message:req.flash('error')});
})

//routes to register
router.post('/register',async(req,res)=>{
    try{
        // console.log(req.body);
    const user = {
        firstName: req.body.firstname,
        lastName:req.body.lastname,
        email: req.body.email,
        username:req.body.username
    }
    const newUser = await User.register(user,req.body.password);
    // res.send(newUser);
    // res.render('layouts/main-layout')
    res.render('auth/login')
    // res.send("it worked");

    }
    catch(e){
        req.flash('error' , e.message)
        res.redirect('/register');

    }  
})

module.exports = router;

//login route
router.get('/login',(req,res)=>{
    res.render('auth/login');
})
//for the verification purpose if authentication is successful or not
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), (req,res)=>{
    res.redirect('home');
});

//Logout(this function accepts the callback)
router.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/login');
    })
});
