var mongoose    = require("mongoose"),
    Posts       = require("./post"),
    Tags        = require("./tag");

//connecting mongodb using mongoose
mongoose.connect("mongodb://localhost/YouUp_user",{useNewUrlParser:true, useUnifiedTopology:true});


//building schema for user 
user_schema = new mongoose.Schema({
    user_name : String,
    name    : String,
    image   : String,
    field   : String,
    place   : String,
    post    : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Tags",
            required : true
        }
    ]

    // Comment : [
    //     {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref  : "Comments"
    //     }
    // ]
});

//making module to access user data and exporting module
module.exports = mongoose.model("Users",user_schema);