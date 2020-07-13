var express     = require('express'),
    router      = express.Router(),
    Tags        = require("../module/tag"),
    Posts       = require("../module/post"),
    Users       = require("../module/user_detail"),
    Users_detail = require("../module/user");



//====================================
//Tag routs
//====================================


//get request for view all tags
router.get("/alltag",function(req,res){

    Tags.find({},function(err,tags){
        // console.log(tags);
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("tag_landing/tag_landing_template",{tag:tags});
        }
    });

   
});

// //making a get request to add new Tag in web app
// router.get("/alltag/newtag",isLoggedIn,function(req,res){
//     res.render("template/newtag");
// });

// //making a post request to add new tag 
// router.post("/alltag",isLoggedIn,function(req,res){
    
   
//     // Users.findById(req.user.id).populate("tag").exec(function(err,foundUser){

//         Tags.create(req.body.post,function(err,added_tag){
//             if(err)
//             {
//                 console.log(err);
//                 res.redirect("/alltag");
//             }
//             else
//             {
//                 added_tag.author.id        = req.user._id;
//                 added_tag.author.username   = req.user.username;
//                 added_tag.save();
//                 req.user.tag.push(added_tag);
//                 req.user.save();
//                 console.log("Added new Tag");
//                 // console.log("found" + req.user);
//                 // console.log("requser" + req.user._id);
//                 // console.log("foundUser" + foundUser._id);
//                 // console.log(post_data);
//                 res.redirect("/");
//             }
//         });
//     });

// // });


//get request using a link in alltag page for specific tag find by Id
router.get("/alltag/:tag",function(req,res){
    
    Tags.findById(req.params.tag).populate("post").exec(function(err,foundTag){
    
            // Posts.find({tag : tag_name}).populate("comment").exec(function(err,foundTags){
            //     console.log(foundTags);
                if(err)
                    console.log(err);
                else
                {
                    
                    res.render("template/tag_template",{tag : foundTag});
                }
            });
    //     }
    // });
        
        
});

// making a post request using form in specific tagpage to post something new and add database 
router.post("/alltag/:tag",isLoggedIn,function(req,res){
    
    var user_id = req.params.tag;
    Tags.find({name : { $eq : req.body.post.tag}},function(err,foundTags){
        if(foundTags.length!=0)
        {
            console.log("********************************");
            user_id=foundTags[0]._id;
            Tags.findById(user_id,function(err,foundTag){
                // console.log(foundTag);
                if(err)
                {
                    console.log(err);
                    alert("Put Right Imformation");
                    res.render("/alltag/"+req.param.tag);
                    
                }
                else
                {
                    // foundTag = foundTags[0];
        
                    Posts.create(req.body.post,function(err,post_data){
                        if(err)
                        {
                            console.log(err);
                            res.redirect("/alltag");
                        }
                        else
                        {
                            // post_data.author.id        = req.user._id;
                            // post_data.author.username   = req.user.username;
                            post_data.author = req.user.username;
                            post_data.post_time = set_time();
                            post_data.post_date = set_date();
                            post_data.tag = foundTag.name;
                            post_data.like_count = 0;
                            post_data.like_user.push(req.user._id);
                        
                            post_data.save();
        
                            var post_obj = {
                                id  :  post_data._id,
                                name : post_data.name,
                                image : post_data.image,
                                author : req.user.username
                            }
                            // console.log(post_data.author);
                            foundTag.post.push(post_obj);
                            foundTag.save();
                            // console.log("Added new Post");
                            // console.log(foundTag);
                            // console.log(post_data);
                            req.user.post.push(post_data);
                            
                            req.user.save();
                            // console.log("********************************");
                            // console.log(req.user);
                            // console.log(foundTag);
                            res.redirect("/alltag");
        
                        }
                    });
                }
            });
        
        }
        else
        {
            Tags.findById(user_id,function(err,foundTag){
                console.log(foundTag);
                if(err)
                {
                    console.log(err);
                    alert("Put Right Imformation");
                    res.render("/alltag/"+req.param.tag);
                    
                }
                else
                {
                    // foundTag = foundTags[0];
        
                    Posts.create(req.body.post,function(err,post_data){
                        if(err)
                        {
                            console.log(err);
                            res.redirect("/alltag");
                        }
                        else
                        {
                            // post_data.author.id        = req.user._id;
                            // post_data.author.username   = req.user.username;
                            post_data.author = req.user.username;
                            post_data.post_time = set_time();
                            post_data.post_date = set_date();
                            post_data.tag = foundTag.name;
                            post_data.like_count = 0;
                            post_data.like_user.push(req.user._id);
                        
                            post_data.save();
                            // console.log(post_data);
                            var post_obj = {
                                id  :  post_data._id,
                                name : post_data.name,
                                image : post_data.image,
                                author : req.user.username
                            }
                            // console.log(post_data.author);
                            foundTag.post.push(post_obj);
                            foundTag.save();
                            // console.log("Added new Post");
                            // console.log(foundTag);
                           
                            req.user.post.push(post_data);
                            
                            req.user.save();
                            // console.log("********************************");
                            // console.log(req.user);
                            // console.log(foundTag);
                            res.redirect("/alltag");
        
                        }
                    });
                }
            });
        
        }
        // console.log(foundTags[0]._id);
        // console.log(foundTags);
    });
    console.log("user id  " + user_id);
    // Tags.find({name : { $eq : req.body.post.tag}}).populate("post").exec(function(err,foundTag){
    
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

function set_date() {
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = d. getDate();
    var month = d. getMonth() ; // Since getMonth() returns month from 0-11 not 1-12.
    var year = d. getFullYear();
    var dateStr = months[month] + " " + date  + ", " + year;
    return dateStr;
}

// console.log(set_date());

module.exports = router;