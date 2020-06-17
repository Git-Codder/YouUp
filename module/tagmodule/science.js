var mongoose    = require("mongoose"),
    Posts       = require("./post"),
    Users       = require('./user');

//connecting mongodb using mongoose
mongoose.connect("mongodb://localhost/YouUp1",{useNewUrlParser:true, useUnifiedTopology:true});


//building schema for YouUp databse tags collections
tags_schema = new mongoose.Schema({
    name : String,
    image : String,
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Users"
        },
        username : String
    },
    post : [
        {
            type    : mongoose.Schema.Types.ObjectId,
            ref     : "Posts"
        }
    ]
});

//making a model to accese database collection and exporting that module
module.exports = mongoose.model("scienceTags",tags_schema);
