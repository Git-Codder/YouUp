var bodyParser  = require('body-parser'),
    request     = require("request"),
    express     = require("express"),
    passport    = require("passport"),
    passportLocal = require("passport-local"),
    app         = express(),
    mongoose    = require("mongoose"),
    seed        = require("./seedDB"),
    Tags        = require("./module/tag"),
    Posts       = require("./module/post"),
    Users       = require("./module/user"),
    Users_details = require("./module/user_detail");

passport.use(Users_details.createStrategy());


//defining directories as public to use them in web 
app.use(express.static("public"));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/views/home_page'));
app.use(express.static(__dirname + '/views/template'));
app.use(express.static(__dirname + '/views/partials'));
app.use(express.static(__dirname + '/views/other'));
app.use(express.static(__dirname + '/views/css'));
app.use(express.static(__dirname + '/views/tag_landing'));
app.use(express.static(__dirname + '/views/post_template'));
app.use(express.static(__dirname + '/views/errors'));
app.use(express.static(__dirname + './module'));
app.use(express.static(__dirname + '/views/profile_template'));
app.use(express.static(__dirname + '/views/authentication'));

//passport configuration using passport package 
app.use(require("express-session")({
    secret: "You can be up with up",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(Users_details.authenticate()));

passport.serializeUser(Users_details.serializeUser());
passport.deserializeUser(Users_details.deserializeUser());


//setting view engin as a ejs formate file 
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
 
//making a middleware to pass current loged in user info
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
}); 

//calling seedDB.js file which contain initial data of the web
// seed();

//request for root page
app.get("/",function(req,res){
    res.render("home_page/homepage");
    
});

//making an post request for specific tag using form search by name
app.post("/",function(req,res,body){
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
app.get("/alltag",function(req,res){

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

//get request for about page
app.get("/about",function(req,res){
    res.render("other/about");
});

//get request using a link in alltag page for specific tag find by Id
app.get("/alltag/:tag",function(req,res){
    
    Tags.findById(req.params.tag).populate("post").exec(function(err,foundTags){
        // console.log(foundTags);
        if(err)
            console.log(err);
        else
        {
            res.render("template/tag_template",{tag:foundTags});
        }
    });
});

// //post request using form in specific tagpage and add database 
app.post("/alltag/:tag",isLoggedIn,function(req,res){
    

    Tags.findById(req.params.tag,function(err,foundTags){
        // console.log(foundTags);
        if(err)
        {
            console.log(err);
        }
        else
        {
            Posts.create(req.body.post,function(err,post_data){
                if(err)
                {
                    console.log(err);
                    res.redirect("/alltag");
                }
                else
                {
                    console.log("Added new Post");
                    console.log(post_data);
                    foundTags.post.push(post_data);
                    foundTags.save();
                    res.redirect("/alltag/" + foundTags._id);
                }
            });
        }
    });

});

//get request making a template to post something new
app.get("/alltag/:tag/post/new",isLoggedIn,function(req,res){

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
app.get("/alltag/tag/post/:id",function(req,res){
    var post_id = req.params.id;

    Posts.findById(post_id,function(err,foundPosts){
        // console.log(foundTags);
        if(err)
            console.log(err);
        else
        {
            res.render("post_template/post_temp",{post:foundPosts});
        }
    });

});

//making get request to access user profile page 
app.get("/user/:id/profile",isLoggedIn,function(req,res,err){


    // Users.find({user_name : { $eq : req.params.id}}).populate("post").exec(function(err,foundUsers){
        Users.findById(foundUsers._id).populate("post").exec(function(err,foundUsers){
        // console.log(foundUsers);
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.render("profile_template/profile",{user:foundUsers});
            }
        });

    });
// });


//=============================
//Auth Rout
//=============================

//making a get request for register on site
app.get("/user/register",function(req,res){
    res.render("authentication/register");
}); 

//making a post request to register in user_detail module database in web application
app.post("/user/register",function(req,res){
    // console.log(req.body.username);
    // console.log(req.body.password);
    // var newUsers_detail = new Users_details({user_name : req.body.username});

    Users_details.register(({username : req.body.username}),req.body.password,function(err,user_detail){
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
app.get("/user/login",function(req,res){
    res.render("authentication/login");
}); 


//making a post request to login in user_detail module database in web application
app.post("/user/login",passport.authenticate("local",
{
    successRedirect:"/alltag",
    failureRedirect: "/user/login"

}),function(req,res){

});

//making a get request to logout from site 
app.get("/user/logout",function(req,res){
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

//setting env for running application
app.listen(3000, function () {
    console.log("App listening on port 3000!");
});