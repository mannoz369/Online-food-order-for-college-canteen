const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport")
const {saveRedirectUrl, isAdmin} = require("../middleware.js");
const { isAbsolute } = require("express/lib/utils.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome!");
            res.redirect("/listings");
        });
        
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));


router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});


// router.post("/login", saveRedirectUrl,passport.authenticate("local", { failureRedirect: "/login", failureFlash: true}) , async(req,res)=>{
//     if(isAdmin){
//         req.flash("success","Welcome!You are logged in as Admin");
//     }else{
//         req.flash("success","Welcome!You are logged in.");
//     }
    
//     let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
// });
router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), async (req, res) => {
    // Check if the user is an admin after successful authentication
    const isAdmin = req.user && req.user.Admin; // Assuming 'Admin' is the field indicating admin status

    if (isAdmin) {
        req.flash("success", "Welcome! You are logged in as Admin.");
    } else {
        req.flash("success", "Welcome! You are logged in.");
    }

    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});


router.get("/logout",( req, res, next) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You are Logged out!");
        
        res.redirect("/listings")
    })
})

module.exports = router;