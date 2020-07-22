var mongoose    = require("mongoose"),
    Posts       = require("./post"),
    Tags        = require("./tag");
    Users       = require("./user");

//connecting mongodb using mongoose
// mongoose.connect("mongodb://localhost/YouUp_3",{useNewUrlParser:true, useUnifiedTopology:true});
// mongoose.connect("mongodb+srv://aditya:iamtheaditya@youupdata.zew8k.mongodb.net/YouUpdata?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});
// mongoose.connect("mongodb+srv://aditya:iamtheaditya@youup.zew8k.mongodb.net/YouUp?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});


//building schema for user 
user_detail_schema = new mongoose.Schema({
    name    : String,
    image   : String,
    field   : String,
    place   : String,
    user_info: {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Users"
        },
        username : String
    },
    tag   : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Tags",
        }
    ],

    // post    : [
    //     {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref  : "Posts",
    //     }
    // ]

    // Comment : [
    //     {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref  : "Comments"
    //     }
    // ]
});

//making module to access user data and exporting module
module.exports = mongoose.model("Users_detail",user_detail_schema);