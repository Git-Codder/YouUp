var express     = require('express'),
    router      = express.Router(),
    bodyParser  = require('body-parser'),
    passport    = require("passport"),
    Tags        = require("../module/tag"),
    Posts       = require("../module/post"),
    Users = require("../module/user");


//=============================
//Auth Rout
//=============================

//request for root page
router.get("/",function(req,res){
    res.render("home_page/homepage");
    
});


//making an post request for specific user  search by username
router.post("/",isLoggedIn,function(req,res,body){
    var user = req.body.user;
    // console.log(Tags.find.({name : { $eq : tag}}));
    
    //finding using name in database
    Users.find({username : { $eq : user}}).populate("post").exec(function(err,foundUsers){
        // console.log(foundTags.length);
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(foundUsers.length==0)
            {
                res.render("errors/error_search.ejs");
            }
            else
            {
                // res.render("template/tag_template.ejs",{tag:foundTags[0]});
                var user_id = foundUsers[0]._id;
                Users.findById(user_id).populate("post").exec(function(err,foundUser){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        res.render("profile_template/profile",{user : foundUser});
                    }
                   
                });
                // console.log(tag);

                //redirecting to another url
                
            }
            // console.log(foundTags.length);
        }
    });
    // res.render("template/tag_template");
    
});


//making a get request for register on site
router.get("/user/register",function(req,res){
    res.render("authentication/register");
}); 

//making a post request to register in user_detail module database in web application
router.post("/user/register",function(req,res){

    var newUser =  {
        username : req.body.username,
        image    : req.body.image,
        name     : req.body.name,
        field    : req.body.field,
        place    :  req.body.place,
        pincode  : req.body.pincode
    };

    Users.register(newUser,req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            return res.render("authentication/register");
        }
        else
        {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/alltag");
            });
        }

    });
});

//making a get request for login on site
router.get("/user/login",function(req,res){
    res.render("authentication/login");
}); 


//making a post request to login in user_detail module database in web application
router.post("/user/login",passport.authenticate("local",
{
    successRedirect:"/alltag",
    failureRedirect: "/user/login"

}),function(req,res){

});

//making a get request to logout from site 
router.get("/user/logout",function(req,res){
    req.logout();
    res.redirect("/");
});


//function for checking a user is loged in or not
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/user/login");
};


module.exports = router;