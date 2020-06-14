var bodyParser  = require('body-parser'),
    request     = require("request"),
    express     = require('express'),
    mongoose    = require("mongoose"),
    app         = express();

//connecting mongodb using mongoose
mongoose.connect("mongodb://localhost/YouUp");

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

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
    

// var tags =
// [
//     {name:"Tech",image:"https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",page : {}},
//     {name:"Education",image:"https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",page : {}},
//     {name:"Art",image:"https://images.unsplash.com/photo-1526304760382-3591d3840148?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",page : {}},
//     {name:"Sports",image:"https://images.unsplash.com/photo-1541983663620-7571a820610c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",page : {}},
//     {name:"Food",image:"https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",page : {}},
//     {name:"Science",image:"https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",page : {}},
//     {name:"Business",image:"https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",page : {}}
   
// ]

//building schema for YouUp databse tags collections
tags_schema = new mongoose.Schema({
    name : String,
    image : String,
    post : Object
});

//building schema for post
post_schema = new mongoose.Schema({
    name        : String,
    image       : String,
    description : Array
});

//making a model to accese database collection
var Tags = mongoose.model("Tags",tags_schema);


// Tags.create(
//     {name:"Business",image:"https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",page : {}},
//     function(err,tag){
//         if(err)
//             console.log(err);
//         else
//         {
//             console.log("data added : ");
//             console.log(tag);
//         }
//     }
// );

//request for root page
app.get("/",function(req,res){
    res.render("home_page/homepage");
    
});

//making an post request for specific tag using form search by name
app.post("/",function(req,res,body){
    var tag = req.body.tag;
    // console.log(Tags.find.({name : { $eq : tag}}));
    
    //finding using name in database
    Tags.find({name : { $eq : tag}},function(err,foundTags){
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
                res.redirect(301,"/alltags/"+tag);
            }
            // console.log(foundTags.length);
        }
    });
    // res.render("template/tag_template");
    
});

//get request for view all tags
app.get("/alltags",function(req,res){

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
app.get("/alltags/:tag",function(req,res){
    
    Tags.findById(req.params.tag,function(err,foundTags){
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
// app.post("/alltags/:tag",function(req,res){
//     var post_name           = req.body.name;
//     var post_image          = req.body.name;
//     var post_description    = req.body.description;
//     var newPost = {name:post_name,image:post_image,description:post_description};



// });

//making a temlate to post something new
app.get("/alltag/:tag/post/new",function(req,res){

    // res.render("post_template/newpost",{tag:foundTags});    
    // console.log(req.headers.referer);
    var str = req.headers.referer;
    // console.log(typeof(str));
    var id = str.slice(30,str.length);
    // console.log(id);

    Tags.findById(id,function(err,foundTags){
        // console.log(foundTags);
        if(err)
            console.log(err);
        else
        {
            res.render("post_template/newpost",{tag:foundTags});
        }
    });
});

//setting env for running application
app.listen(3000, function () {
    console.log("App listening on port 3000!");
});