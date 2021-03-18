const express = require('express');
const passport = require("passport");
const router = express.Router();

router.get('/',function(req,res){
    res.render("vue")
});

router.get('/googleSignUp',passport.authenticate('google', { failureRedirect: '/error' }),function(req,res){
    res.redirect('/');
})

router.get("/auth/google/callback",
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
      res.redirect('/');
    }
);

router.get("/auth/googleapi/callback",
    passport.authenticate('googleApi', { failureRedirect: '/error' }),
    function(req, res) {
      res.redirect('/');
    }
);

router.get("/googleAuth", passport.authenticate("google", {
    accessType: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
}));

router.get("/googleApi",passport.authenticate("googleApi",{
    accessType: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      "https://www.googleapis.com/auth/drive"
    ]
}));

router.get("/error",function(req,res,){
  res.render('vue')
})

module.exports = router;