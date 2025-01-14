var express     = require('express'),
    router      = express.Router(),
    Tags        = require("../module/tag"),
    multer       = require("multer"),
    fs          = require('fs'),
    Posts       = require("../module/post"),
    Users_detail= require("../module/user_detail"),
    Users          = require("../module/user"),
    Comments     = require("../module/comment"),
    popup       = require("sweetalert");

//specifying destination for image
var upload = multer({ dest: 'uploads/' });

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
router.get("/alltag/tag/post/:id",isLoggedIn,function(req,res){
    var post_id = req.params.id;
    // console.log(post_id);
    Posts.findById(post_id).populate("comment").exec(function(err,foundPost){
        // console.log("foundPost is folowing.................");
        // console.log(foundPost);
        if(err)
            console.log(err);
        else
        {
            // console.log(req.user.image);
            // console.log(foundPost.comment[1].contentType);
            res.render("post_template/post_temp",{post:foundPost,user : req.user});
        }
    });

});

//making a post request to post a comment on post
router.post("/alltag/tag/post/:id/comment",isLoggedIn,function(req,res){
    
    Posts.findById(req.params.id).populate("comment").exec(function(err,foundPost){
        Comments.create(req.body.comment,function(err,comment_data){
            if(err)
            {
                console.log(err);
                res.redirect("/alltag/tag/post/"+ req.params.id + "/comment");
            }
            else
            {
                comment_data.author    = req.user.username;
                comment_data.post_time = set_time();
                comment_data.post_date = set_date();
                comment_data.author_image.data = req.user.image.data;
                comment_data.author_image.contentType = req.user.image.contentType;

                // console.log(comment_data.author_image);

                comment_data.save();

                // console.log("new comment added");
                // console.log(comment_data);


                foundPost.comment.push(comment_data);
                foundPost.save();
                req.user.save();

                // console.log("foundPost");
                // console.log(foundPost);

                // console.log("user");
                // console.log(req.user);
                res.redirect("/alltag/tag/post/"+req.params.id);
            }
        });
    });

    
});

//making a post request to like the specific post
router.get("/alltag/tag/post/:id/like",isLoggedIn,function(req,res){

    Posts.findById(req.params.id).populate("comment").exec(function(err,foundPost){
        if(err)
        {
            console.log(err);
        }
        else
        {
            var foundUser = foundPost.like_user.find(function(usname){
                // console.log(typeof(usname) + "  =========  " + typeof(req.user.username));
                return usname === req.user.username;
            });
            if(foundUser)
            {
                popup("No","You have liked before","error");
                res.redirect("/alltag/tag/post/"+req.params.id);
            }
            else
            {
                foundPost.like_count = foundPost.like_count + 1;
                foundPost.like_user.push(req.user.username);
                foundPost.save();
                // console.log(foundPost);
                res.redirect("/alltag/tag/post/"+req.params.id);
            }
        }
    });
   
});


//making a get request to show tranding posts according like
router.get("/trending",function(req,res){
    Posts.find({index : 0}).sort({like_count : 1} ).limit(3).exec(function(err,post){
        if(err)
        {
            console.log(err);
        }
        else
        {
            // console.log(typeof(post));
            // console.log(post);
            res.render("post_template/trending_post",{post : post});

        }
    });
});

//making a post request to delete post
router.get("/alltag/tag/post/:id/delete",isLoggedIn,function(req,res){
    var post_id = req.params.id;
    
    // console.log(post_id);
    Posts.findById(post_id).populate("comment").exec(function(err,foundPost){
        // console.log(foundPost);
        if(err)
            console.log(err);
        else
        {
            if(foundPost.author === req.user.username)
            {
                var tag_name = foundPost.tag;
                // console.log(foundPost.comment[3].author_image);
                // res.render("post_template/post_temp",{post:foundPost,user : req.user});
                Tags.findOne({name : tag_name}).populate("post").exec(function(err,foundTag){

                    // console.log(foundTag);
                    var i=0;
                    var foundIdx = foundTag.post.find(function(post){
                        if(post.id == req.params.id)
                        {
                            return i;
                        }
                        i++;
                    });
                    // console.log(i);
                    // console.log(foundIdx);
                    if(i!=foundTag.post.length)
                    {
                        // foundIdx = foundIdx-1;
                        foundTag.post.splice(i,1);
                        foundTag.save();
                    }
                    // console.log(foundTag);
                    Posts.findByIdAndDelete(req.params.id).populate("comment").exec(function(err,deletedPost){
                        if(err)
                        {
                            throw err;
                        }
                        else
                        {
                            // console.log("deleted Post : "+ deletedPost);
                            res.redirect("/alltag/"+foundTag._id);
                        }
                    });
                });
            }
            else
            {
                res.redirect("/alltag/tag/post/" + req.params.id)
            }
        }
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

    var div ;
    var d = new Date();
    var c_hour = d.getHours();
    if(c_hour==12)
    {
        div = "PM";
    }
    else if(c_hour==24)
    {
        c_hour = 12;
        div = "AM";
    }
    else if(c_hour>12 && c_hour<24)
    {
        c_hour = c_hour-12 ;
        div = "PM";
    }
    else
    {
        div = "AM";
    }
    var c_min = d.getMinutes();
    var c_sec = d.getSeconds();
    var t = c_hour + ":" + c_min + ":" + c_sec + " "+div;
    return t;
}
// console.log(set_time());

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
