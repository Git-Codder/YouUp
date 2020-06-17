var express     = require('express'),
    router      = express.Router(),
    Tags        = require("../module/tag"),
    Posts       = require("../module/post"),
    Users       = require("../module/user_detail"),
    Users_detail = require("../module/user");



//====================================
//Tag routs
//====================================

//making an post request for specific tag using form search by name
router.post("/",function(req,res,body){
    var tag = req.body.tag;
    // console.log(Tags.find.({name : { $eq : tag}}));
    
    //finding using name in database
    Tags.find({name : { $eq : tag}}).populate("post").exec(function(err,foundTags){
        // console.log(foundTags.length);
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(foundTags.length==0)
            {
                res.render("errors/error_search.ejs");
            }
            else
            {
                // res.render("template/tag_template.ejs",{tag:foundTags[0]});
                var tag = foundTags[0]._id;
                // console.log(tag);

                //redirecting to another url
                res.redirect(301,"/alltag/"+tag);
            }
            // console.log(foundTags.length);
        }
    });
    // res.render("template/tag_template");
    
});

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
//                 // console.log("requser" + req.user.id);
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
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     else
    //     {
    //         // console.log(foundTag)
    //         var tag_name = foundTag.name;
    //         var tag_id  = foundTag._id;
    //         // console.log(tag_name);

            // Posts.find({tag : tag_name}).populate("comment").exec(function(err,foundTags){
            //     console.log(foundTags);
                if(err)
                    console.log(err);
                else
                {
                    
                    // if(!foundTags)
                    // {
                    //     var tag = {
                    //         post:foundTags,
                    //         tag_id : foundTag._id
                    //     };
                    //     // res.render("template/tag_template",{tag : tag});
                    // }
                    // else
                    // {   var tag = {
                    //         post:foundTag,
                    //         tag_id : foundTag._id
                    //     };

                    //     // res.render("template/tag_template",{tag:foundTag, tag_id : foundTag._id});
                    // }
                    // console.log(tag);
                    res.render("template/tag_template",{tag : foundTag});
                }
            });
    //     }
    // });
        
        
});

// //post request using form in specific tagpage and add database 
router.post("/alltag/:tag",isLoggedIn,function(req,res){
    
    var user_id = req.user._id;

    // Posts.create(req.body.post,function(err,post_data){
    //     if(err)
    //     {
    //         console.log(err);
    //         res.redirect("/alltag");
    //     }
    //     else
    //     {
    //         post_data.author.id        = req.user._id;
    //         post_data.author.username   = req.user.username;
    //         post_data.save();
    //         console.log("Added new Post");
    //         // console.log(post_data);
    //         req.user.post.push(post_data);
    //         req.user.save();
    //         // res.redirect("/alltag/" + foundUser.tag._id);
    //     }
    // });

    // Tags.find({name : { $eq : req.body.post.tag}}).populate("post").exec(function(err,foundTag){
    Tags.findById(req.params.tag,function(err,foundTag){
        // console.log(foundTag);
        if(err)
        {
            console.log(err);
        }
        else
        {
            // var  author_ = {
            //     id        : req.user._id,
            //     username  : req.user.username
            // };
            // var newPost = {
            //     name : req.body.post.name,
            //     image : req.body.post.image,
            //     discription : req.body.post.discription,
            //     tag   : req.body.post.tag,
            //     author : req.user.username
            // };
            

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
                    post_data.save();

                    var post_obj = {
                        id  :  post_data._id,
                        name : post_data.name,
                        image : post_data.image
                    }
                    console.log(post_data.author);
                    foundTag.post.push(post_obj);
                    foundTag.save();
                    console.log("Added new Post");
                    // console.log(foundTag);
                    // console.log(post_data);
                    req.user.post.push(post_data);
                    
                    req.user.save();
                    console.log("********************************");
                    // console.log(req.user);
                    // console.log(foundTag);
                    res.redirect("/alltag");

                }
            });
            // Posts.create(req.body.post,function(err,post_data){
            //     if(err)
            //     {
            //         console.log(err);
            //         res.redirect("/alltag");
            //     }
            //     else
            //     {
            //         // foundTag.post.id = post_data.id;
            //         foundTag.post.push(post_data);
            //         foundTag.save();
            //         // console.log(foundTag);
            //         res.redirect("/alltag/" + foundTag._id);
            //     }
            // });
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

module.exports = router;