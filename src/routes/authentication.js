const express = require('express');
const router = express.Router();
const passport = require('passport'); //traemos la libreria de passport, ya seteada en nuestro archivo passport
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');  

// SIGNUP
router.get("/signup", isNotLoggedIn, (req, res) => {
    res.render("auth/signup");
});

// router.post("/signup", (req, res) => {
//     passport.authenticate('local.signup', {
//         successRedirect: "/profile",
//         failureRedirect: "/signup",
//         failureFlash: true
//     });
//     console.log(req.body);
//     res.send("recieved");
// });
router.post("/signup", isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
}));

// SINGIN
router.get("/signin", (req, res) => {
    res.render("auth/signin");
});
// router.post("/signin", (req, res) => {
//     passport.authenticate('local.signin', {
//         successRedirect: "/profile",
//         failureRedirect: "/signin",
//         failureFlash: true
//     }), (req, res, next) => {
//         console.log(req.body);
//         res.send("recieved");
//     };
// });
router.post("/signin", passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  }));

//Profile
router.get('/profile', isLoggedIn, (req, res) => {
    res.render("profile");
});

//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/signin');
});

module.exports = router;    