var mongoose                = require('mongoose'),
    passportLocalMongoose   = require("passport-local-mongoose"),
    Tags                    = require("./tag"),
    Posts                   = require("./post");

mongoose.connect("mongodb://localhost/YouUp1",{useNewUrlParser:true, useUnifiedTopology:true});

var user_schema    = new mongoose.Schema({
        username : String,
        password  : String,
        name    : String,
        image   : String,
        field   : String,
        place   : String,
        pincode : Number,
        // tag   : [
        //     {
        //         type : mongoose.Schema.Types.ObjectId,
        //         ref  : "Tags"
        //     }
        // ],

        post : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref  : "Posts"
            }
        ]
});

//pluging passportlocalmongoose to use more functions in schema model
user_schema.plugin(passportLocalMongoose);

//exporting model
module.exports = mongoose.model("Users",user_schema);