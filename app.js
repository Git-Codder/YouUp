var bodyParser  = require('body-parser'),
    request     = require("request"),
    express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    seed        = require("./seedDB"),
    Tags        = require("./module/tag"),
    Posts       = require("./module/post");
    // Users       = require("./module/user");


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


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
 
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
app.post("/alltag/:tag",function(req,res){
    

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
app.get("/alltag/:tag/post/new",function(req,res){

    // // res.render("post_template/newpost",{tag:foundTags});    
    // // console.log(req.headers.referer);
    // var str = req.headers.referer;
    // // console.log(typeof(str));
    // var id = str.slice(30,str.length);
    
    // // console.log(id);

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

//setting env for running application
app.listen(3000, function () {
    console.log("App listening on port 3000!");
});