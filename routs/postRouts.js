var express     = require('express'),
    router      = express.Router(),
    Tags        = require("../module/tag"),
    Posts       = require("../module/post"),
    Users_detail= require("../module/user_detail"),
    Users          = require("../module/user");
    Comments     = require("../module/comment");


//=================================
//Post Routs
//=================================

//get request making a template to post something new
router.get("/alltag/:tag/post/new",isLoggedIn,function(req,res){

    Tags.findById(req.params.tag,function(err,foundTags){
        // console.log(foundTags);
        if(err)
            console.log(err);
        else
        {
            res.render("post_template/newpost",{tag:foundTags});
        }
    });
});

//making a get request to access full post info using 'more' link
router.get("/alltag/tag/post/:id",function(req,res){
    var post_id = req.params.id;
    // console.log(post_id);
    Posts.findById(post_id).populate("comment").exec(function(err,foundPost){
        // console.log(foundPost);
        if(err)
            console.log(err);
        else
        {
            // console.log(foundPost.comment[3].author_image);
            res.render("post_template/post_temp",{post:foundPost,user : req.user});
        }
    });

});

//making a post request to post a comment on post
router.post("/alltag/tag/post/:id",isLoggedIn,function(req,res){
    
    Posts.findById(req.params.id).populate("comment").exec(function(err,foundPost){
        Comments.create(req.body.comment,function(err,comment_data){
            if(err)
            {
                console.log(err);
                res.redirect("/alltag/tag/post/"+ req.params.id);
            }
            else
            {
                comment_data.author     = req.user.username;
                comment_data.post_time = set_time();
                comment_data.post_date = set_date();
                comment_data.author_image = req.user.image;

                comment_data.save();

                console.log("new comment added");
                // console.log(comment_data);


                foundPost.comment.push(comment_data);
                foundPost.save();
                req.user.save();

                // console.log("foundPost");
                // console.log(foundPost);

                // console.log("user");
                // console.log(req.user);
                res.render("post_template/post_temp",{post : foundPost})
            }
        });
    });

    
});

//function for checking a user is loged in or not
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/user/login");
};

//defining function to use in routs
function set_time() {

    var d = new Date();
    var c_hour = d.getHours();
    var c_min = d.getMinutes();
    var c_sec = d.getSeconds();
    var t = c_hour + ":" + c_min + ":" + c_sec;
    return t;
}

function set_date() {
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = d. getDate();
    var month = d. getMonth() ; // Since getMonth() returns month from 0-11 not 1-12.
    var year = d. getFullYear();
    var dateStr = months[month] + " " + date  + ", " + year;
    return dateStr;
}

module.exports = router;