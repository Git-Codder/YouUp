var bodyParser  = require('body-parser'),
    request     = require("request"),
    express     = require("express"),
    util        = require("util"),
    fs          = require('fs'),
    multer       = require("multer"),
    GridFsStorage = require("multer-gridfs-storage"),
    passport    = require("passport"),
    popup       = require("sweetalert"),
    passportLocal = require("passport-local"),
    app         = express(),
    mongoose    = require("mongoose"),
    seed        = require("./seedDB"),
    Tags        = require("./module/tag"),
    Posts       = require("./module/post"),
    Users       = require("./module/user");
   

var authRouts       = require('./routs/authRouts'),
    postRouts       = require('./routs/postRouts'),
    userRouts       = require('./routs/userRouts'),
    otherRouts      = require('./routs/otherRouts'),
    tagRouts        = require('./routs/tagRouts');

passport.use(Users.createStrategy());

//connecting database
// mongoose.connect("mongodb://localhost/YouUp_6",{useNewUrlParser:true, useUnifiedTopology:true});
mongoose.connect("mongodb+srv://aditya:iamtheaditya@youup.zew8k.mongodb.net/YouUp?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});

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
app.use(express.json());

passport.use(new passportLocal(Users.authenticate()));

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());


//setting view engin as a ejs formate file 
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));

//making a middleware to pass current loged in user info
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
}); 

//function for checking a user is loged in or not
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/user/login");
};


//calling seedDB.js file which contain initial data of the web
// seed();

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


//using custom routs 
app.use(authRouts);
app.use(tagRouts);
app.use(postRouts);
app.use(userRouts);
app.use(otherRouts);

//setting env for running application
app.listen(process.env.PORT ,process.env.IP, function () {
    console.log("App listening on port 3000!");
});
