var express     = require('express'),
    router      = express.Router(),
    Tags        = require("../module/tag"),
    Posts       = require("../module/post"),
    Users_detail = require("../module/user_detail"),
    Users       = require("../module/user");
    
//=========================================
//User routs
//=========================================

//making get request to access user profile page 
router.get("/user/profile/:user", isLoggedIn ,function(req,res,err){

    var user_name = req.params.user;

    // res.render("profile_template/profile",{user:req.user});

    // Users.find({}).populate("post").exec(function(err,req.user){
        Users.findOne({username : req.params.user}).populate("post").exec(function(err,foundUser){
            // console.log(req.user.post);
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.render("profile_template/profile",{user:foundUser});
                // res.render("/");
            }
        // });

    });
});


//function for checking a user is loged in or not
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/user/login");
};

module.exports = router;